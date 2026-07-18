import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { shadowDimensions } from "@/lib/test-engine/shadow-data";

const DIMENSIONS = ["PROC", "ANXI", "CONF", "PERF", "SELF", "IMPU"] as const;

export class ShadowScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = {
      PROC: [], ANXI: [], CONF: [], PERF: [], SELF: [], IMPU: [],
    };

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.value || !q.scoring_key) continue;
      const dim = q.scoring_key.dimension;
      if (dim in sums) sums[dim].push(ans.value);
    }

    const dimensions = DIMENSIONS.map((dim) => {
      const vals = sums[dim];
      const mean = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 3;
      const score = Math.round(((mean - 1) / 4) * 100);
      const meta = shadowDimensions[dim];
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
      testSlug: "shadow",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: {
        ru: this.buildSummary(dimensions, "ru"),
        en: this.buildSummary(dimensions, "en"),
      },
    };
  }

  private buildSummary(
    dims: { key: string; score: number }[],
    locale: "ru" | "en"
  ): string {
    const sorted = [...dims].sort((a, b) => b.score - a.score);
    const top = sorted[0];
    const second = sorted[1];
    const topMeta = shadowDimensions[top.key];
    const secondMeta = shadowDimensions[second.key];

    const tip = locale === "ru" ? topMeta.tipRu : topMeta.tipEn;

    if (locale === "ru") {
      const topName = topMeta.nameRu;
      const secondName = secondMeta.nameRu;
      return `Ваши главные слепые пятна — ${topName} (${top.score}%) и ${secondName} (${second.score}%). Совет: ${tip}`;
    }
    const topName = topMeta.nameEn;
    const secondName = secondMeta.nameEn;
    return `Your main blind spots are ${topName} (${top.score}%) and ${secondName} (${second.score}%). Tip: ${tip}`;
  }
}
