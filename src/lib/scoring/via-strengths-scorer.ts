import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { viaStrengthsDimensions } from "@/lib/test-engine/via-strengths-data";

const DIMENSIONS = ["CREAT", "LEARN", "LEAD", "PERS", "TEAM", "FAIR", "SOCI", "PRUD"] as const;

export class ViaStrengthsScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { CREAT: [], LEARN: [], LEAD: [], PERS: [], TEAM: [], FAIR: [], SOCI: [], PRUD: [] };

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
      const meta = viaStrengthsDimensions[dim];
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

    const sorted = [...dimensions].sort((a, b) => b.score - a.score);
    const top3 = sorted.slice(0, 3);
    const topNames = top3.map((d) =>
      locale === "ru"
        ? viaStrengthsDimensions[d.key as keyof typeof viaStrengthsDimensions].nameRu
        : viaStrengthsDimensions[d.key as keyof typeof viaStrengthsDimensions].nameEn
    );

    const summaryRu = `Ваши три ведущих сильных стороны: ${topNames.join(", ")}. Это ваш главный профессиональный капитал — используйте его осознанно при выборе ролей и проектов.`;
    const summaryEn = `Your three leading character strengths are: ${topNames.join(", ")}. This is your primary professional capital — use it consciously when choosing roles and projects.`;

    return {
      testSlug: "via-strengths",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
