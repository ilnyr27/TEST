import { StoredResult } from "@/lib/test-engine/results-store";

export interface Flag {
  key: string;
  severity: "info" | "warning" | "critical";
  titleRu: string;
  titleEn: string;
  messageRu: string;
  messageEn: string;
}

/**
 * Analyzes all completed test results and detects psychological flags
 * (burnout risk, high anxiety, low emotional stability, etc.)
 */
export function detectFlags(results: StoredResult[]): Flag[] {
  const flags: Flag[] = [];

  for (const r of results) {
    const dims = r.result.dimensions;
    const byKey = Object.fromEntries(dims.map((d) => [d.key, d.score]));

    // Big Five flags
    if (r.testSlug === "big-five") {
      if (byKey["N"] !== undefined && byKey["N"] > 75) {
        flags.push({
          key: "high-neuroticism",
          severity: "warning",
          titleRu: "Высокий нейротизм",
          titleEn: "High Neuroticism",
          messageRu: "Ваш уровень нейротизма выше среднего. Это может указывать на повышенную тревожность и эмоциональную реактивность. Рассмотрите практики управления стрессом.",
          messageEn: "Your neuroticism level is above average. This may indicate heightened anxiety and emotional reactivity. Consider stress management practices.",
        });
      }
      if (byKey["E"] !== undefined && byKey["E"] < 25 && byKey["N"] !== undefined && byKey["N"] > 65) {
        flags.push({
          key: "isolation-risk",
          severity: "info",
          titleRu: "Риск социальной изоляции",
          titleEn: "Social Isolation Risk",
          messageRu: "Сочетание низкой экстраверсии и высокого нейротизма может затруднять социальные контакты. Попробуйте начать с небольших социальных активностей.",
          messageEn: "Low extraversion combined with high neuroticism can make social interactions challenging. Try starting with small social activities.",
        });
      }
    }

    // Burnout flags
    if (r.testSlug === "burnout") {
      if (r.result.flags?.burnoutRisk) {
        flags.push({
          key: "burnout-risk",
          severity: "critical",
          titleRu: "Риск выгорания",
          titleEn: "Burnout Risk",
          messageRu: "Ваши результаты указывают на высокий риск профессионального выгорания. Рекомендуется обратиться к специалисту и пересмотреть рабочую нагрузку.",
          messageEn: "Your results indicate a high risk of professional burnout. Consider consulting a specialist and reviewing your workload.",
        });
      }
      if (byKey["EE"] !== undefined && byKey["EE"] > 70) {
        flags.push({
          key: "emotional-exhaustion",
          severity: "warning",
          titleRu: "Эмоциональное истощение",
          titleEn: "Emotional Exhaustion",
          messageRu: "Высокий уровень эмоционального истощения. Уделите внимание отдыху и восстановлению.",
          messageEn: "High level of emotional exhaustion detected. Prioritize rest and recovery.",
        });
      }
    }

    // EQ flags
    if (r.testSlug === "eq") {
      const avgEQ = dims.reduce((s, d) => s + d.score, 0) / (dims.length || 1);
      if (avgEQ < 35) {
        flags.push({
          key: "low-eq",
          severity: "info",
          titleRu: "Зона роста: эмоциональный интеллект",
          titleEn: "Growth Area: Emotional Intelligence",
          messageRu: "Ваш общий уровень EQ ниже среднего. Развитие эмоционального интеллекта может значительно улучшить качество жизни и отношений.",
          messageEn: "Your overall EQ is below average. Developing emotional intelligence can significantly improve life quality and relationships.",
        });
      }
    }

    // Attachment flags
    if (r.testSlug === "attachment-style") {
      const anxiety = byKey["anxiety"];
      const avoidance = byKey["avoidance"];
      if (anxiety !== undefined && avoidance !== undefined && anxiety > 70 && avoidance > 70) {
        flags.push({
          key: "fearful-attachment",
          severity: "warning",
          titleRu: "Тревожно-избегающий стиль привязанности",
          titleEn: "Fearful-Avoidant Attachment",
          messageRu: "Высокие показатели тревожности и избегания. Этот стиль привязанности может затруднять близкие отношения. Терапия может помочь.",
          messageEn: "High anxiety and avoidance scores. This attachment style can make close relationships difficult. Therapy can help.",
        });
      }
    }

    // Habits flags
    if (r.testSlug === "habits") {
      const avgHabits = dims.reduce((s, d) => s + d.score, 0) / (dims.length || 1);
      if (avgHabits < 30) {
        flags.push({
          key: "poor-habits",
          severity: "warning",
          titleRu: "Слабые привычки",
          titleEn: "Weak Habits",
          messageRu: "Ваши привычки нуждаются в серьёзном улучшении. Начните с одной маленькой привычки и постепенно наращивайте.",
          messageEn: "Your habits need significant improvement. Start with one small habit and gradually build up.",
        });
      }
    }
  }

  return flags;
}
