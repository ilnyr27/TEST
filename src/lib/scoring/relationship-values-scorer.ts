import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { relationshipValuesDimensions } from "@/lib/test-engine/relationship-values-data";

const DIMENSIONS = ["TRUST", "CARE", "SPACE", "GROW", "PASS", "STABLE"] as const;

export class RelationshipValuesScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { TRUST: [], CARE: [], SPACE: [], GROW: [], PASS: [], STABLE: [] };

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
      const meta = relationshipValuesDimensions[dim];
      const isHigh = score >= 65;
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
    const top2 = sorted.slice(0, 2);
    const topNames = top2.map((d) =>
      locale === "ru"
        ? relationshipValuesDimensions[d.key as keyof typeof relationshipValuesDimensions].nameRu
        : relationshipValuesDimensions[d.key as keyof typeof relationshipValuesDimensions].nameEn
    );

    const summaryRu = `Ваши главные ценности в отношениях: ${topNames.join(" и ")}. Это то, на что вы ориентируетесь при выборе партнёра и оценке качества связи. Знание своих ценностей помогает строить осознанные отношения.`;
    const summaryEn = `Your core relationship values are: ${topNames.join(" and ")}. These are what guide you in choosing a partner and assessing the quality of a connection. Knowing your values helps you build conscious relationships.`;

    return {
      testSlug: "relationship-values",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
