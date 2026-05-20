import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { creativeDimensions } from "@/lib/test-engine/creative-data";

const DIMENSIONS = ["OR", "FL", "FX", "EL"] as const;

export class CreativeScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string; reverse?: boolean } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { OR: [], FL: [], FX: [], EL: [] };

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
      const meta = creativeDimensions[dim];
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

    const overall = dimensions.length > 0
      ? Math.round(dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length)
      : 50;

    return {
      testSlug: "creative",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: {
        ru: this.buildSummary(dimensions, overall, "ru"),
        en: this.buildSummary(dimensions, overall, "en"),
      },
    };
  }

  private buildSummary(
    dims: { key: string; score: number }[],
    overall: number,
    locale: "ru" | "en"
  ): string {
    const sorted = [...dims].sort((a, b) => b.score - a.score);
    const top = sorted[0];
    const meta = creativeDimensions as Record<string, { nameRu: string; nameEn: string }>;
    const topName = locale === "ru" ? meta[top.key].nameRu : meta[top.key].nameEn;

    const levelRu = overall >= 75 ? "высокий" : overall >= 45 ? "средний" : "начальный";
    const levelEn = overall >= 75 ? "high" : overall >= 45 ? "moderate" : "developing";

    if (locale === "ru") {
      return `Ваш общий уровень творческой уверенности — ${levelRu} (${overall}%). Сильнейшее измерение — ${topName} (${top.score}%).`;
    }
    return `Your overall creative confidence level is ${levelEn} (${overall}%). Strongest dimension — ${topName} (${top.score}%).`;
  }
}
