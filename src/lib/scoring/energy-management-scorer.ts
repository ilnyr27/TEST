import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { energyManagementDimensions } from "@/lib/test-engine/energy-management-data";

const DIMENSIONS = ["PHYS", "EMOT", "MENT", "PURP", "RECOV"] as const;

export class EnergyManagementScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { PHYS: [], EMOT: [], MENT: [], PURP: [], RECOV: [] };

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
      const meta = energyManagementDimensions[dim];
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

    const totalScore = Math.round(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length);
    const sorted = [...dimensions].sort((a, b) => a.score - b.score);
    const weakest = sorted[0];
    const weakMeta = energyManagementDimensions[weakest.key as keyof typeof energyManagementDimensions];

    let summaryRu: string;
    let summaryEn: string;

    if (totalScore >= 65) {
      summaryRu = `Ваш общий энергетический баланс высокий (${totalScore}%). Вы управляете всеми ключевыми источниками энергии осознанно. Это редкость — берегите этот ресурс.`;
      summaryEn = `Your overall energy balance is high (${totalScore}%). You manage all key energy sources consciously. This is rare — protect this resource.`;
    } else if (totalScore >= 45) {
      summaryRu = `Энергетический баланс умеренный (${totalScore}%). Главная зона роста — ${weakMeta.nameRu} (${weakest.score}%). Именно здесь потеря энергии наибольшая.`;
      summaryEn = `Energy balance is moderate (${totalScore}%). Main growth area — ${weakMeta.nameEn} (${weakest.score}%). This is where energy loss is greatest.`;
    } else {
      summaryRu = `Энергетический баланс требует внимания (${totalScore}%). Критическая зона — ${weakMeta.nameRu} (${weakest.score}%). Без работы с этим источником остальные улучшения дадут меньший эффект.`;
      summaryEn = `Energy balance needs attention (${totalScore}%). Critical zone — ${weakMeta.nameEn} (${weakest.score}%). Without addressing this source, other improvements will have less impact.`;
    }

    return {
      testSlug: "energy-management",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
