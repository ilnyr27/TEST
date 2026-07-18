import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { careerAptitudeDimensions } from "@/lib/test-engine/career-aptitude-data";

const DIMENSIONS = ["LEAD", "ANAL", "CREA", "TECH", "PEOP", "ENTR", "CRAFT"] as const;

export class CareerAptitudeScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { LEAD: [], ANAL: [], CREA: [], TECH: [], PEOP: [], ENTR: [], CRAFT: [] };

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
      const meta = careerAptitudeDimensions[dim];
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

    return {
      testSlug: "career-aptitude",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: {
        ru: this.buildSummary(dimensions, "ru"),
        en: this.buildSummary(dimensions, "en"),
      },
    };
  }

  private buildSummary(dims: { key: string; score: number }[], locale: "ru" | "en"): string {
    const sorted = [...dims].sort((a, b) => b.score - a.score);
    const top = sorted[0];
    const second = sorted[1];
    const meta = careerAptitudeDimensions;
    const topName = locale === "ru" ? meta[top.key].nameRu : meta[top.key].nameEn;
    const secondName = locale === "ru" ? meta[second.key].nameRu : meta[second.key].nameEn;
    const topRoles = (locale === "ru" ? meta[top.key].rolesRu : meta[top.key].rolesEn).slice(0, 3).join(", ");

    if (locale === "ru") {
      return `Ваша главная предрасположенность — ${topName} (${top.score}%), следом — ${secondName} (${second.score}%). Подходящие роли: ${topRoles}.`;
    }
    return `Your top aptitude is ${topName} (${top.score}%), followed by ${secondName} (${second.score}%). Fitting roles: ${topRoles}.`;
  }
}
