import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { workStyleDimensions } from "@/lib/test-engine/work-style-data";

const DIMENSIONS = ["EXEC", "INNOV", "CONN", "STRAT"] as const;

export class WorkStyleScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { EXEC: [], INNOV: [], CONN: [], STRAT: [] };

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
      const meta = workStyleDimensions[dim];
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
    const dominantMeta = workStyleDimensions[dominant.key as keyof typeof workStyleDimensions];
    const secondaryMeta = workStyleDimensions[secondary.key as keyof typeof workStyleDimensions];

    const isBalanced = sorted[0].score - sorted[3].score < 20;

    let summaryRu: string;
    let summaryEn: string;

    if (isBalanced) {
      summaryRu = `У вас универсальный рабочий стиль — вы гибко переключаетесь между режимами. Ваши ведущие стили: ${dominantMeta.nameRu} и ${secondaryMeta.nameRu}. Это делает вас адаптивным профессионалом.`;
      summaryEn = `You have a versatile work style — you flexibly switch between modes. Your leading styles: ${dominantMeta.nameEn} and ${secondaryMeta.nameEn}. This makes you an adaptive professional.`;
    } else {
      summaryRu = `Ваш ведущий рабочий стиль — ${dominantMeta.nameRu} (${dominant.score}%), с поддержкой от ${secondaryMeta.nameRu} (${secondary.score}%). Именно здесь вы работаете на пике своих возможностей.`;
      summaryEn = `Your dominant work style is ${dominantMeta.nameEn} (${dominant.score}%), supported by ${secondaryMeta.nameEn} (${secondary.score}%). This is where you perform at your peak.`;
    }

    return {
      testSlug: "work-style",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
