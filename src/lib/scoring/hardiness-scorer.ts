import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { hardinessDimensions } from "@/lib/test-engine/hardiness-data";

const DIMENSIONS = ["COMMIT", "CONTROL", "CHALLENGE"] as const;

export class HardinessScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string; reverse?: boolean } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { COMMIT: [], CONTROL: [], CHALLENGE: [] };

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
      const meta = hardinessDimensions[dim];
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

    const totalScore = Math.round(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length);
    const sorted = [...dimensions].sort((a, b) => a.score - b.score);
    const weakest = sorted[0];
    const weakMeta = hardinessDimensions[weakest.key as keyof typeof hardinessDimensions];

    const summaryRu = totalScore >= 65
      ? `Ваша жизнестойкость высокая (${totalScore}%). Вы умеете справляться с трудностями, сохраняя смысл, активность и способность расти.`
      : totalScore >= 40
        ? `Жизнестойкость умеренная (${totalScore}%). Зона роста — ${weakMeta.nameRu} (${weakest.score}%).`
        : `Жизнестойкость требует внимания (${totalScore}%). Главная зона — ${weakMeta.nameRu} (${weakest.score}%). Над этим стоит поработать.`;

    const summaryEn = totalScore >= 65
      ? `Your hardiness is high (${totalScore}%). You handle difficulties while maintaining meaning, agency, and the ability to grow.`
      : totalScore >= 40
        ? `Hardiness is moderate (${totalScore}%). Growth area — ${weakMeta.nameEn} (${weakest.score}%).`
        : `Hardiness needs attention (${totalScore}%). Main area — ${weakMeta.nameEn} (${weakest.score}%). This is worth working on.`;

    return {
      testSlug: "hardiness",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
