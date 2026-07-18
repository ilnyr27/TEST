import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { thinkingStyleDimensions } from "@/lib/test-engine/thinking-style-data";

const DIMENSIONS = ["ANALYT", "INTUIT", "SYSTEM", "CREAT"] as const;

export class ThinkingStyleScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { ANALYT: [], INTUIT: [], SYSTEM: [], CREAT: [] };

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
      const meta = thinkingStyleDimensions[dim];
      const isHigh = score >= 60;
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
    const dominantMeta = thinkingStyleDimensions[dominant.key as keyof typeof thinkingStyleDimensions];
    const secondaryMeta = thinkingStyleDimensions[secondary.key as keyof typeof thinkingStyleDimensions];

    const isBalanced = sorted[0].score - sorted[3].score < 20;

    let summaryRu: string;
    let summaryEn: string;

    if (isBalanced) {
      summaryRu = `У вас сбалансированный стиль мышления — вы гибко переключаетесь между подходами. Небольшое преимущество у ${dominantMeta.nameRu.toLowerCase()} стиля (${dominant.score}%). Это делает вас адаптивным мыслителем.`;
      summaryEn = `You have a balanced thinking style — you flexibly switch between approaches. Slight edge toward ${dominantMeta.nameEn.toLowerCase()} style (${dominant.score}%). This makes you an adaptive thinker.`;
    } else {
      summaryRu = `Ваш доминирующий стиль — ${dominantMeta.nameRu.toLowerCase()} (${dominant.score}%), с сильной поддержкой ${secondaryMeta.nameRu.toLowerCase()} мышления (${secondary.score}%). Это ваш главный инструмент обработки информации.`;
      summaryEn = `Your dominant style is ${dominantMeta.nameEn.toLowerCase()} (${dominant.score}%), with strong support from ${secondaryMeta.nameEn.toLowerCase()} thinking (${secondary.score}%). This is your primary tool for processing information.`;
    }

    return {
      testSlug: "thinking-style",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
