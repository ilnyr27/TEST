import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { burnoutDimensions } from "@/lib/test-engine/burnout-data";

const DIMENSIONS = ["EE", "DP", "PA"] as const;

export class BurnoutScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string; reverse?: boolean } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { EE: [], DP: [], PA: [] };

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.value || !q.scoring_key) continue;
      const val = ans.value;
      if (q.scoring_key.dimension in sums) {
        sums[q.scoring_key.dimension].push(val);
      }
    }

    const scores: Record<string, number> = {};

    const dimensions = DIMENSIONS.map((dim) => {
      const vals = sums[dim];
      const mean = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 4;
      let score = Math.round(((mean - 1) / 6) * 100);

      // PA is inverted: high PA answers = low burnout score
      if (dim === "PA") {
        score = 100 - score;
      }

      scores[dim] = score;
      const meta = burnoutDimensions[dim];
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

    const flags: Record<string, boolean> = {};
    if (scores["EE"] > 70 && scores["DP"] > 60) {
      flags.burnoutRisk = true;
    }

    return {
      testSlug: "burnout",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: {
        ru: this.buildSummary(dimensions, scores, locale === "ru" ? "ru" : "ru"),
        en: this.buildSummary(dimensions, scores, "en"),
      },
      flags: Object.keys(flags).length > 0 ? flags : undefined,
    };
  }

  private buildSummary(
    dims: { key: string; score: number }[],
    scores: Record<string, number>,
    locale: "ru" | "en"
  ): string {
    const ee = scores["EE"];
    const dp = scores["DP"];
    const pa = scores["PA"];
    const burnoutRisk = ee > 70 && dp > 60;

    if (locale === "ru") {
      if (burnoutRisk) {
        return `Внимание: высокий риск профессионального выгорания. Эмоциональное истощение — ${ee}%, деперсонализация — ${dp}%. Рекомендуется обратить внимание на восстановление ресурсов.`;
      }
      const worst = [...dims].sort((a, b) => b.score - a.score)[0];
      const meta = burnoutDimensions as Record<string, { nameRu: string; nameEn: string }>;
      return `Наиболее выраженная шкала — ${meta[worst.key].nameRu} (${worst.score}%). Общий уровень выгорания: ${this.getLevel(ee, dp, pa, "ru")}.`;
    }

    if (burnoutRisk) {
      return `Warning: high professional burnout risk. Emotional Exhaustion — ${ee}%, Depersonalization — ${dp}%. Consider prioritizing recovery and stress management.`;
    }
    const worst = [...dims].sort((a, b) => b.score - a.score)[0];
    const meta = burnoutDimensions as Record<string, { nameRu: string; nameEn: string }>;
    return `Most pronounced scale — ${meta[worst.key].nameEn} (${worst.score}%). Overall burnout level: ${this.getLevel(ee, dp, pa, "en")}.`;
  }

  private getLevel(ee: number, dp: number, pa: number, locale: "ru" | "en"): string {
    const avg = (ee + dp + pa) / 3;
    if (avg >= 70) return locale === "ru" ? "высокий" : "high";
    if (avg >= 40) return locale === "ru" ? "средний" : "moderate";
    return locale === "ru" ? "низкий" : "low";
  }
}
