import { AnswerData } from "@/types/database";
import { Scorer, ScoringResult } from "./types";
import { attachmentStyles } from "@/lib/test-engine/attachment-data";

export class AttachmentScorer implements Scorer {
  calculate(
    questions: { id: string; scoring_key: { dimension: string; reverse?: boolean } | null }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult {
    const sums: Record<string, number[]> = { anxiety: [], avoidance: [] };

    for (const q of questions) {
      const ans = answers[q.id];
      if (!ans?.value || !q.scoring_key) continue;
      let val = ans.value;
      if (q.scoring_key.reverse) val = 8 - val; // 7-point scale reverse
      if (q.scoring_key.dimension in sums) {
        sums[q.scoring_key.dimension].push(val);
      }
    }

    const calcScore = (vals: number[]) => {
      if (vals.length === 0) return 50;
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      return Math.round(((mean - 1) / 6) * 100); // 1-7 -> 0-100
    };

    const anxietyScore = calcScore(sums.anxiety);
    const avoidanceScore = calcScore(sums.avoidance);

    // Determine style
    const highAnx = anxietyScore >= 50;
    const highAv = avoidanceScore >= 50;
    let styleKey: keyof typeof attachmentStyles;
    if (!highAnx && !highAv) styleKey = "secure";
    else if (highAnx && !highAv) styleKey = "anxious";
    else if (!highAnx && highAv) styleKey = "avoidant";
    else styleKey = "fearful";

    const style = attachmentStyles[styleKey];

    const dimensions = [
      {
        key: "anxiety",
        name: locale === "ru" ? "Тревожность" : "Anxiety",
        score: anxietyScore,
        description: locale === "ru"
          ? "Страх быть брошенным, потребность в подтверждении"
          : "Fear of abandonment, need for reassurance",
        color: "#EF4444",
      },
      {
        key: "avoidance",
        name: locale === "ru" ? "Избегание" : "Avoidance",
        score: avoidanceScore,
        description: locale === "ru"
          ? "Дискомфорт от близости, ценность независимости"
          : "Discomfort with closeness, valuing independence",
        color: "#3B82F6",
      },
      {
        key: "style",
        name: locale === "ru" ? style.nameRu : style.nameEn,
        score: 100,
        description: locale === "ru" ? style.descRu : style.descEn,
        color: style.color,
      },
    ];

    return {
      testSlug: "attachment-style",
      dimensions,
      radarData: [
        { name: locale === "ru" ? "Тревожность" : "Anxiety", value: anxietyScore, fullMark: 100 },
        { name: locale === "ru" ? "Избегание" : "Avoidance", value: avoidanceScore, fullMark: 100 },
        { name: locale === "ru" ? "Безопасность" : "Security", value: Math.max(0, 100 - Math.max(anxietyScore, avoidanceScore)), fullMark: 100 },
        { name: locale === "ru" ? "Доверие" : "Trust", value: Math.max(0, 100 - avoidanceScore), fullMark: 100 },
      ],
      summary: {
        ru: `Ваш стиль привязанности: ${style.nameRu}. Тревожность: ${anxietyScore}%, Избегание: ${avoidanceScore}%.`,
        en: `Your attachment style: ${style.nameEn}. Anxiety: ${anxietyScore}%, Avoidance: ${avoidanceScore}%.`,
      },
    };
  }
}
