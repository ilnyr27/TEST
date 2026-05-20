import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { gardnerDimensions } from "@/lib/test-engine/gardner-data";

const DIMENSIONS = ["LI", "LM", "SP", "MU", "BK", "IE", "IA", "NA"] as const;

export class GardnerScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string; reverse?: boolean } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = {
      LI: [], LM: [], SP: [], MU: [], BK: [], IE: [], IA: [], NA: [],
    };

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
      const meta = gardnerDimensions[dim];
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
      testSlug: "gardner",
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
    const top1 = sorted[0];
    const top2 = sorted[1];
    const meta = gardnerDimensions as Record<string, { nameRu: string; nameEn: string }>;
    const top1Name = locale === "ru" ? meta[top1.key].nameRu : meta[top1.key].nameEn;
    const top2Name = locale === "ru" ? meta[top2.key].nameRu : meta[top2.key].nameEn;

    if (locale === "ru") {
      return `Ваши ведущие типы интеллекта — ${top1Name} (${top1.score}%) и ${top2Name} (${top2.score}%).`;
    }
    return `Your leading intelligence types are ${top1Name} (${top1.score}%) and ${top2Name} (${top2.score}%).`;
  }
}
