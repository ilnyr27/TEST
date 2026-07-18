import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { timeManagementDimensions } from "@/lib/test-engine/time-management-data";

const DIMENSIONS = ["PLAN", "FOCUS", "ACTION", "BOUND"] as const;

export class TimeManagementScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { PLAN: [], FOCUS: [], ACTION: [], BOUND: [] };

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
      const meta = timeManagementDimensions[dim];
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

    const totalScore = Math.round(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length);
    const sorted = [...dimensions].sort((a, b) => a.score - b.score);
    const weakest = sorted[0];
    const strongest = sorted[sorted.length - 1];
    const weakMeta = timeManagementDimensions[weakest.key as keyof typeof timeManagementDimensions];
    const strongMeta = timeManagementDimensions[strongest.key as keyof typeof timeManagementDimensions];

    let summaryRu: string;
    let summaryEn: string;

    if (totalScore >= 65) {
      summaryRu = `Ваш тайм-менеджмент на высоком уровне (${totalScore}%). Особенно силён ${strongMeta.nameRu.toLowerCase()} (${strongest.score}%). Вы эффективно управляете временем и редко теряете его впустую.`;
      summaryEn = `Your time management is at a high level (${totalScore}%). Especially strong is ${strongMeta.nameEn.toLowerCase()} (${strongest.score}%). You manage time effectively and rarely waste it.`;
    } else if (totalScore >= 45) {
      summaryRu = `Тайм-менеджмент умеренный (${totalScore}%). Сила — ${strongMeta.nameRu.toLowerCase()} (${strongest.score}%). Зона роста — ${weakMeta.nameRu.toLowerCase()} (${weakest.score}%).`;
      summaryEn = `Time management is moderate (${totalScore}%). Strength — ${strongMeta.nameEn.toLowerCase()} (${strongest.score}%). Growth area — ${weakMeta.nameEn.toLowerCase()} (${weakest.score}%).`;
    } else {
      summaryRu = `Тайм-менеджмент требует системной работы (${totalScore}%). Начните с самого слабого звена: ${weakMeta.nameRu.toLowerCase()} (${weakest.score}%). Небольшие изменения здесь дадут наибольший эффект.`;
      summaryEn = `Time management requires systematic work (${totalScore}%). Start with the weakest link: ${weakMeta.nameEn.toLowerCase()} (${weakest.score}%). Small changes here will have the greatest impact.`;
    }

    return {
      testSlug: "time-management",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
