import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { cognitiveBiasDimensions } from "@/lib/test-engine/cognitive-bias-data";

const DIMENSIONS = ["CATAS", "BWTHINK", "FILTER", "PERSON", "SHOULD", "JUMP"] as const;

export class CognitiveBiasScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { CATAS: [], BWTHINK: [], FILTER: [], PERSON: [], SHOULD: [], JUMP: [] };

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.value || !q.scoring_key) continue;
      const dim = q.scoring_key.dimension;
      if (dim in sums) sums[dim].push(ans.value);
    }

    const dimensions = DIMENSIONS.map((dim) => {
      const vals = sums[dim];
      const mean = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 1;
      const score = Math.round(((mean - 1) / 4) * 100);
      const meta = cognitiveBiasDimensions[dim];
      const isActive = score >= 50;
      return {
        key: dim,
        name: locale === "ru" ? meta.nameRu : meta.nameEn,
        score,
        description: isActive
          ? locale === "ru" ? meta.descHighRu : meta.descHighEn
          : locale === "ru" ? meta.descLowRu : meta.descLowEn,
        color: meta.color,
      };
    });

    const sorted = [...dimensions].sort((a, b) => b.score - a.score);
    const active = sorted.filter((d) => d.score >= 50);
    const topTwo = sorted.slice(0, 2);

    let summaryRu: string;
    let summaryEn: string;

    if (active.length === 0) {
      summaryRu = "Когнитивные искажения выражены слабо — вы мыслите достаточно гибко и реалистично. Это ценный ресурс для принятия решений и эмоциональной устойчивости.";
      summaryEn = "Cognitive distortions are weakly expressed — you think quite flexibly and realistically. This is a valuable resource for decision-making and emotional resilience.";
    } else if (active.length <= 2) {
      const names = topTwo.map((d) => locale === "ru" ? cognitiveBiasDimensions[d.key as keyof typeof cognitiveBiasDimensions].nameRu : cognitiveBiasDimensions[d.key as keyof typeof cognitiveBiasDimensions].nameEn);
      summaryRu = `Наиболее активные искажения: ${names.join(" и ")}. Они влияют на восприятие и решения. Хорошая новость — осознание уже меняет паттерн.`;
      summaryEn = `Most active distortions: ${names.join(" and ")}. They affect perception and decisions. The good news — awareness already changes the pattern.`;
    } else {
      summaryRu = `Несколько искажений активны одновременно (${active.length} из 6). Лидеры: ${topTwo.map((d) => cognitiveBiasDimensions[d.key as keyof typeof cognitiveBiasDimensions].nameRu).join(", ")}. Это сигнал поработать с КПТ-техниками или с психологом.`;
      summaryEn = `Several distortions are simultaneously active (${active.length} of 6). Leaders: ${topTwo.map((d) => cognitiveBiasDimensions[d.key as keyof typeof cognitiveBiasDimensions].nameEn).join(", ")}. This is a signal to work with CBT techniques or a psychologist.`;
    }

    return {
      testSlug: "cognitive-bias",
      dimensions,
      radarData: dimensions.map((d) => ({ name: d.name, value: d.score, fullMark: 100 })),
      summary: { ru: summaryRu, en: summaryEn },
    };
  }
}
