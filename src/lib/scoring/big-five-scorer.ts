import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { bigFiveDimensions } from "@/lib/test-engine/big-five-data";

const DIMENSIONS = ["O", "C", "E", "A", "N"] as const;

export class BigFiveScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string; reverse?: boolean } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { O: [], C: [], E: [], A: [], N: [] };

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.value || !q.scoring_key) continue;
      let val = ans.value;
      if (q.scoring_key.reverse) val = 6 - val;
      if (q.scoring_key.dimension in sums) {
        sums[q.scoring_key.dimension].push(val);
      }
    }

    const dimensions = DIMENSIONS.map((dim) => {
      const vals = sums[dim];
      const mean = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 3;
      const score = Math.round(((mean - 1) / 4) * 100);
      const meta = bigFiveDimensions[dim];
      const isHigh = score >= 50;
      return {
        key: dim,
        name: locale === "ru" ? meta.nameRu : meta.nameEn,
        score,
        description: isHigh
          ? locale === "ru" ? meta.descHighRu : meta.descHighEn
          : locale === "ru" ? meta.descLowRu : meta.descLowEn,
        color: meta.color,
      };
    });

    return {
      testSlug: "big-five",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: {
        ru: this.buildSummary(dimensions, "ru"),
        en: this.buildSummary(dimensions, "en"),
      },
    };
  }

  private buildSummary(dims: { key: string; score: number }[], locale: "ru" | "en"): string {
    const sorted = [...dims].sort((a, b) => b.score - a.score);
    const top = sorted[0];
    const low = sorted[sorted.length - 1];
    const meta = bigFiveDimensions as Record<string, { nameRu: string; nameEn: string }>;
    const topName = locale === "ru" ? meta[top.key].nameRu : meta[top.key].nameEn;
    const lowName = locale === "ru" ? meta[low.key].nameRu : meta[low.key].nameEn;

    if (locale === "ru") {
      return `Ваша сильнейшая черта — ${topName} (${top.score}%). Зона роста — ${lowName} (${low.score}%).`;
    }
    return `Your strongest trait is ${topName} (${top.score}%). Growth area — ${lowName} (${low.score}%).`;
  }
}
