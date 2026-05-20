import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { loveLanguagesDimensions } from "@/lib/test-engine/love-languages-data";

const DIMS = ["WA", "AS", "RG", "QT", "PT"] as const;

export class LoveLanguagesScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { choices?: { a: string; b: string } } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const counts: Record<string, number> = { WA: 0, AS: 0, RG: 0, QT: 0, PT: 0 };
    let totalAnswered = 0;

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.selected || !q.scoring_key?.choices) continue;
      const choices = q.scoring_key.choices as { a: string; b: string };
      const dim = choices[ans.selected as "a" | "b"];
      if (dim && dim in counts) {
        counts[dim]++;
        totalAnswered++;
      }
    }

    // Each dimension appears in 8 of 20 questions (paired with 4 others, 2 times each)
    // Normalize: max possible per dimension varies, so use relative scoring
    const maxCount = Math.max(...Object.values(counts), 1);

    const dimensions = DIMS.map((dim) => {
      const count = counts[dim];
      const score = Math.round((count / maxCount) * 100);
      const meta = loveLanguagesDimensions[dim];
      const isHigh = score >= 50;
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
    const primary = sorted[0];
    const secondary = sorted[1];

    return {
      testSlug: "love-languages",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: {
        ru: `Ваш главный язык любви — ${primary.name}${secondary.score > 0 ? `, за ним следует ${secondary.name}` : ""}.`,
        en: `Your primary love language is ${primary.name}${secondary.score > 0 ? `, followed by ${secondary.name}` : ""}.`,
      },
    };
  }
}
