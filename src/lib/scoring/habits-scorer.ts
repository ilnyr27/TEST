import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { habitsDimensions } from "@/lib/test-engine/habits-data";

const DIMENSIONS = ["HH", "PR", "MN", "SH", "LR"] as const;

export class HabitsScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string; reverse?: boolean } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { HH: [], PR: [], MN: [], SH: [], LR: [] };

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
      const meta = habitsDimensions[dim];
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
      testSlug: "habits",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: {
        ru: this.buildSummary(dimensions, "ru"),
        en: this.buildSummary(dimensions, "en"),
      },
    };
  }

  private buildSummary(dims: { key: string; score: number }[], locale: "ru" | "en"): string {
    const overall = Math.round(dims.reduce((sum, d) => sum + d.score, 0) / dims.length);
    const sorted = [...dims].sort((a, b) => a.score - b.score);
    const weakest = sorted[0];
    const meta = habitsDimensions as Record<string, { nameRu: string; nameEn: string }>;
    const weakName = locale === "ru" ? meta[weakest.key].nameRu : meta[weakest.key].nameEn;

    if (locale === "ru") {
      return `Общее здоровье привычек — ${overall}%. Самая слабая область — ${weakName} (${weakest.score}%).`;
    }
    return `Overall habit health — ${overall}%. Weakest area — ${weakName} (${weakest.score}%).`;
  }
}
