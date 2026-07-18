import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { creativityBlocksDimensions } from "@/lib/test-engine/creativity-blocks-data";

const DIMENSIONS = ["FEAR", "PERF", "RIGID", "TIME"] as const;

export class CreativityBlocksScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { FEAR: [], PERF: [], RIGID: [], TIME: [] };

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.value || !q.scoring_key) continue;
      const dim = q.scoring_key.dimension;
      if (dim in sums) sums[dim].push(ans.value);
    }

    const dimensions = DIMENSIONS.map((dim) => {
      const vals = sums[dim];
      const mean = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 3;
      // Score = уровень блока (высокий = блок активен)
      const score = Math.round(((mean - 1) / 4) * 100);
      const meta = creativityBlocksDimensions[dim];
      const isActive = score >= 50;
      return {
        key: dim,
        name: locale === "ru" ? meta.nameRu : meta.nameEn,
        score,
        description: isActive
          ? locale === "ru" ? meta.descHighRu : meta.descHighEn
          : locale === "ru" ? meta.descLowRu : meta.descLowEn,
        color: meta.color,
      };
    });

    const sorted = [...dimensions].sort((a, b) => b.score - a.score);
    const mainBlock = sorted[0];
    const activeBlocks = sorted.filter((d) => d.score >= 50);
    const mainMeta = creativityBlocksDimensions[mainBlock.key as keyof typeof creativityBlocksDimensions];

    let summaryRu: string;
    let summaryEn: string;

    if (activeBlocks.length === 0) {
      summaryRu = "У вас нет явных блоков творчества — вы действуете в условиях хорошей внутренней и внешней свободы. Это редкость. Продолжайте поддерживать это пространство.";
      summaryEn = "You have no obvious creativity blocks — you operate with good internal and external freedom. This is rare. Keep nurturing this space.";
    } else if (activeBlocks.length === 1) {
      summaryRu = `Главный блок — ${mainMeta.nameRu.toLowerCase()} (${mainBlock.score}%). Устранение этого одного барьера может значительно раскрепостить ваш творческий потенциал.`;
      summaryEn = `The main block is ${mainMeta.nameEn.toLowerCase()} (${mainBlock.score}%). Removing this single barrier can significantly unleash your creative potential.`;
    } else {
      summaryRu = `Активны ${activeBlocks.length} блока. Самый сильный — ${mainMeta.nameRu.toLowerCase()} (${mainBlock.score}%). С него и стоит начать — он оказывает наибольшее влияние на вашу творческую жизнь.`;
      summaryEn = `${activeBlocks.length} blocks are active. The strongest is ${mainMeta.nameEn.toLowerCase()} (${mainBlock.score}%). Start there — it has the greatest impact on your creative life.`;
    }

    return {
      testSlug: "creativity-blocks",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
