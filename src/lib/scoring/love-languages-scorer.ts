import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { loveLanguagesDimensions } from "@/lib/test-engine/love-languages-data";

const DIMS = ["WA", "AS", "RG", "QT", "PT"] as const;

export class LoveLanguagesScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { choices?: Record<string, string> } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    // Count how many times each dimension was selected
    const counts: Record<string, number> = { WA: 0, AS: 0, RG: 0, QT: 0, PT: 0 };

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.selected || !q.scoring_key?.choices) continue;
      const choices = q.scoring_key.choices;
      const dim = choices[ans.selected];
      if (dim && dim in counts) {
        counts[dim]++;
      }
    }

    // Normalize: top scorer = 100, others scaled proportionally
    const maxCount = Math.max(...Object.values(counts), 1);

    const dimensions = DIMS.map((dim) => {
      const score = Math.round((counts[dim] / maxCount) * 100);
      const meta = loveLanguagesDimensions[dim];
      const isHigh = score >= 50;
      return {
        key: dim,
        name: locale === "ru" ? meta.nameRu : meta.nameEn,
        score,
        description: isHigh
          ? (locale === "ru" ? meta.descHighRu : meta.descHighEn)
          : (locale === "ru" ? meta.descLowRu : meta.descLowEn),
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
        ru: `Ваш основной язык любви — ${primary.name} (${primary.score}%), за ним — ${secondary.name} (${secondary.score}%).`,
        en: `Your primary love language is ${primary.name} (${primary.score}%), followed by ${secondary.name} (${secondary.score}%).`,
      },
    };
  }
}
