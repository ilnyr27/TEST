import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { divergentThinkingDimensions } from "@/lib/test-engine/divergent-thinking-data";

const DIMENSIONS = ["FLUID", "FLEX", "ORIG", "ELAB"] as const;

export class DivergentThinkingScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { FLUID: [], FLEX: [], ORIG: [], ELAB: [] };

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
      const meta = divergentThinkingDimensions[dim];
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
    const sorted = [...dimensions].sort((a, b) => b.score - a.score);
    const strongest = sorted[0];
    const strongMeta = divergentThinkingDimensions[strongest.key as keyof typeof divergentThinkingDimensions];

    let summaryRu: string;
    let summaryEn: string;

    if (totalScore >= 65) {
      summaryRu = `Дивергентное мышление развито сильно (${totalScore}%). Ваш главный творческий актив — ${strongMeta.nameRu.toLowerCase()} (${strongest.score}%). Вы обладаете широким творческим диапазоном.`;
      summaryEn = `Divergent thinking is strongly developed (${totalScore}%). Your main creative asset is ${strongMeta.nameEn.toLowerCase()} (${strongest.score}%). You have a wide creative range.`;
    } else if (totalScore >= 45) {
      summaryRu = `Дивергентное мышление развито умеренно (${totalScore}%). Ярче всего — ${strongMeta.nameRu.toLowerCase()} (${strongest.score}%). Есть хороший потенциал для роста через практику.`;
      summaryEn = `Divergent thinking is moderately developed (${totalScore}%). Strongest is ${strongMeta.nameEn.toLowerCase()} (${strongest.score}%). There's good growth potential through practice.`;
    } else {
      summaryRu = `Дивергентное мышление — зона роста (${totalScore}%). Хорошая новость: его можно развить. Начните с регулярных упражнений на генерацию идей. Сильнейший компонент сейчас — ${strongMeta.nameRu.toLowerCase()}.`;
      summaryEn = `Divergent thinking is a growth area (${totalScore}%). Good news: it can be developed. Start with regular idea-generation exercises. Your strongest component right now is ${strongMeta.nameEn.toLowerCase()}.`;
    }

    return {
      testSlug: "divergent-thinking",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
