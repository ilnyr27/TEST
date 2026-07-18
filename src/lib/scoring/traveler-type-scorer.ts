import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { travelerTypeDimensions } from "@/lib/test-engine/traveler-type-data";

const DIMENSIONS = ["EXPLOR", "RELAXER", "CULTUR", "ADVENT"] as const;

export class TravelerTypeScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { EXPLOR: [], RELAXER: [], CULTUR: [], ADVENT: [] };

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
      const meta = travelerTypeDimensions[dim];
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
    const dominantMeta = travelerTypeDimensions[dominant.key as keyof typeof travelerTypeDimensions];
    const secondaryMeta = travelerTypeDimensions[secondary.key as keyof typeof travelerTypeDimensions];

    const isBalanced = sorted[0].score - sorted[3].score < 25;

    let summaryRu: string;
    let summaryEn: string;

    if (isBalanced) {
      summaryRu = `У вас гибкий стиль путешествий — вам подходят разные форматы. Лёгкое преимущество у типа «${dominantMeta.nameRu}». Это значит, что вы хорошо адаптируетесь к любому отпуску.`;
      summaryEn = `You have a flexible travel style — different formats suit you. A slight edge toward '${dominantMeta.nameEn}' type. This means you adapt well to any kind of vacation.`;
    } else {
      summaryRu = `Вы — ${dominantMeta.nameRu} (${dominant.score}%) с элементами типа «${secondaryMeta.nameRu}» (${secondary.score}%). Идеальный отпуск для вас — тот, где есть пространство для вашего главного стиля.`;
      summaryEn = `You're a ${dominantMeta.nameEn} (${dominant.score}%) with elements of '${secondaryMeta.nameEn}' type (${secondary.score}%). The ideal vacation for you is one with space for your main style.`;
    }

    return {
      testSlug: "traveler-type",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
