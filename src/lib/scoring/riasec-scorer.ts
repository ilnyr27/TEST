import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { riasecDimensions } from "@/lib/test-engine/riasec-data";

const DIMS = ["R", "I", "A", "S", "E", "C"] as const;

// yes=2, somewhat=1, no=0; max per dimension = 20 (10 items * 2)
const answerWeights: Record<string, number> = {
  yes: 2,
  somewhat: 1,
  no: 0,
};

export class RIASECScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const counts: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.selected || !q.scoring_key) continue;
      const dim = q.scoring_key.dimension;
      if (dim in sums) {
        sums[dim] += answerWeights[ans.selected] ?? 0;
        counts[dim]++;
      }
    }

    const dimensions = DIMS.map((dim) => {
      const maxPossible = counts[dim] * 2 || 20;
      const score = Math.round((sums[dim] / maxPossible) * 100);
      const meta = riasecDimensions[dim];
      return {
        key: dim,
        name: locale === "ru" ? meta.nameRu : meta.nameEn,
        score,
        description: locale === "ru" ? meta.descRu : meta.descEn,
        color: meta.color,
      };
    });

    // Top 3 = Holland code
    const sorted = [...dimensions].sort((a, b) => b.score - a.score);
    const hollandCode = sorted.slice(0, 3).map((d) => d.key).join("");

    return {
      testSlug: "riasec",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: {
        ru: `Ваш код Холланда: ${hollandCode}. Доминирующий тип — ${sorted[0].name} (${sorted[0].score}%).`,
        en: `Your Holland code: ${hollandCode}. Dominant type — ${sorted[0].name} (${sorted[0].score}%).`,
      },
    };
  }
}
