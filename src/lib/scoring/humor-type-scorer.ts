import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { humorTypeDimensions } from "@/lib/test-engine/humor-type-data";

const DIMENSIONS = ["AFFIL", "SELF_ENH", "AGGR", "SELF_DEP"] as const;

export class HumorTypeScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { AFFIL: [], SELF_ENH: [], AGGR: [], SELF_DEP: [] };

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
      const meta = humorTypeDimensions[dim];
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
    const dominantMeta = humorTypeDimensions[dominant.key as keyof typeof humorTypeDimensions];

    const summaryRu = `Ваш ведущий стиль юмора — ${dominantMeta.nameRu.toLowerCase()} (${dominant.score}%). Юмор — важная часть личности: он влияет на отношения, стрессоустойчивость и восприятие мира.`;
    const summaryEn = `Your dominant humor style is ${dominantMeta.nameEn.toLowerCase()} (${dominant.score}%). Humor is an important part of personality: it affects relationships, stress resilience, and how you perceive the world.`;

    return {
      testSlug: "humor-type",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
