import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { conflictStyleDimensions } from "@/lib/test-engine/conflict-style-data";

const DIMENSIONS = ["COMPET", "COLLAB", "COMPR", "AVOID", "ACCOM"] as const;

export class ConflictStyleScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { COMPET: [], COLLAB: [], COMPR: [], AVOID: [], ACCOM: [] };

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
      const meta = conflictStyleDimensions[dim];
      const isHigh = score >= 55;
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

    const sorted = [...dimensions].sort((a, b) => b.score - a.score);
    const dominant = sorted[0];
    const secondary = sorted[1];
    const dominantMeta = conflictStyleDimensions[dominant.key as keyof typeof conflictStyleDimensions];
    const secondaryMeta = conflictStyleDimensions[secondary.key as keyof typeof conflictStyleDimensions];

    const isBalanced = sorted[0].score - sorted[4].score < 25;

    let summaryRu: string;
    let summaryEn: string;

    if (isBalanced) {
      summaryRu = `У вас гибкий стиль поведения в конфликте — вы ситуативно переключаетесь между подходами. Лёгкое преимущество у ${dominantMeta.nameRu.toLowerCase()} (${dominant.score}%). Это адаптивность.`;
      summaryEn = `You have a flexible conflict style — you situationally switch between approaches. Slight edge toward ${dominantMeta.nameEn.toLowerCase()} (${dominant.score}%). This is adaptability.`;
    } else {
      summaryRu = `Ваш доминирующий стиль в конфликте — ${dominantMeta.nameRu.toLowerCase()} (${dominant.score}%), с поддержкой от ${secondaryMeta.nameRu.toLowerCase()} (${secondary.score}%). Знание этого помогает осознанно выбирать стратегию.`;
      summaryEn = `Your dominant conflict style is ${dominantMeta.nameEn.toLowerCase()} (${dominant.score}%), supported by ${secondaryMeta.nameEn.toLowerCase()} (${secondary.score}%). Knowing this helps you consciously choose your strategy.`;
    }

    return {
      testSlug: "conflict-style",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
