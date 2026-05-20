import { AnswerData, ScoringKey } from "@/types/database";
import { bigFiveDimensions } from "@/lib/test-engine/big-five-data";

export interface BigFiveScores {
  O: number; // 0-100
  C: number;
  E: number;
  A: number;
  N: number;
}

interface QuestionWithScoring {
  id: string;
  scoring_key: ScoringKey | null;
}

/**
 * Calculate Big Five scores from answers.
 * Each dimension is scored 0-100 based on mean of items (1-5 scale).
 * Reverse items are flipped: score = 6 - value.
 */
export function calculateBigFiveScores(
  questions: QuestionWithScoring[],
  answers: Record<string, AnswerData>
): BigFiveScores {
  const dimensionSums: Record<string, number[]> = {
    O: [],
    C: [],
    E: [],
    A: [],
    N: [],
  };

  for (const q of questions) {
    const answer = answers[q.id];
    if (!answer?.value || !q.scoring_key) continue;

    const { dimension, reverse } = q.scoring_key;
    let val = answer.value;
    if (reverse) {
      val = 6 - val; // Reverse: 1->5, 2->4, 3->3, 4->2, 5->1
    }
    if (dimension in dimensionSums) {
      dimensionSums[dimension].push(val);
    }
  }

  const result: Record<string, number> = {};
  for (const [dim, values] of Object.entries(dimensionSums)) {
    if (values.length === 0) {
      result[dim] = 50; // default middle
    } else {
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      // Convert 1-5 scale to 0-100: (mean - 1) / 4 * 100
      result[dim] = Math.round(((mean - 1) / 4) * 100);
    }
  }

  return result as unknown as BigFiveScores;
}

export function getBigFiveInterpretation(
  scores: BigFiveScores,
  locale: "ru" | "en"
) {
  const dims = Object.entries(scores) as [
    keyof BigFiveScores,
    number
  ][];

  return dims.map(([dim, score]) => {
    const meta = bigFiveDimensions[dim];
    const isHigh = score >= 50;
    return {
      key: dim,
      name: locale === "ru" ? meta.nameRu : meta.nameEn,
      score,
      description: isHigh
        ? locale === "ru"
          ? meta.descHighRu
          : meta.descHighEn
        : locale === "ru"
        ? meta.descLowRu
        : meta.descLowEn,
      color: meta.color,
    };
  });
}
