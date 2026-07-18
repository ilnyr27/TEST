import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { locusDimensions } from "@/lib/test-engine/locus-data";

const DIMENSIONS = ["INTERNAL", "EXTERNAL"] as const;

export class LocusScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string; reverse?: boolean } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { INTERNAL: [], EXTERNAL: [] };

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.value || !q.scoring_key) continue;
      let val = ans.value;
      if (q.scoring_key.reverse) val = 6 - val;
      const dim = q.scoring_key.dimension;
      if (dim in sums) sums[dim].push(val);
    }

    const dimensions = DIMENSIONS.map((dim) => {
      const vals = sums[dim];
      const mean = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 3;
      const score = Math.round(((mean - 1) / 4) * 100);
      const meta = locusDimensions[dim];
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

    const internal = dimensions.find((d) => d.key === "INTERNAL")!;
    const external = dimensions.find((d) => d.key === "EXTERNAL")!;
    const isMoreInternal = internal.score >= external.score;

    const summaryRu = isMoreInternal
      ? `У вас преобладает внутренний локус контроля (${internal.score}%). Вы склонны считать себя главным автором своей жизни. Внешний локус — ${external.score}%.`
      : `У вас преобладает внешний локус контроля (${external.score}%). Вы склонны замечать влияние обстоятельств и других людей. Внутренний локус — ${internal.score}%.`;

    const summaryEn = isMoreInternal
      ? `You have a predominantly internal locus of control (${internal.score}%). You tend to see yourself as the main author of your life. External locus — ${external.score}%.`
      : `You have a predominantly external locus of control (${external.score}%). You tend to notice the influence of circumstances and others. Internal locus — ${internal.score}%.`;

    return {
      testSlug: "locus-control",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
