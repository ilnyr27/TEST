import { StoredResult } from "@/lib/test-engine/results-store";

export interface Flag {
  key: string;
  severity: "info" | "warning" | "critical";
  titleRu: string;
  titleEn: string;
  messageRu: string;
  messageEn: string;
  linkTo?: string;
  linkLabelRu?: string;
  linkLabelEn?: string;
}

/**
 * Analyzes all completed test results and detects psychological flags
 * (burnout risk, high anxiety, panic indicators, low emotional stability, etc.)
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
          titleRu: "Высокий нейротизм — возможна повышенная тревожность",
          titleEn: "High Neuroticism — Possible Elevated Anxiety",
          messageRu: "Ваш уровень нейротизма выше среднего. Это может указывать на повышенную тревожность, склонность к беспокойству и панике. У нас есть практическое руководство с техниками, которые помогают прямо сейчас.",
          messageEn: "Your neuroticism level is above average. This may indicate heightened anxiety, worry tendencies, and panic susceptibility. We have a practical guide with techniques that help right now.",
          linkTo: "/guide/anxiety",
          linkLabelRu: "Открыть руководство по тревоге",
          linkLabelEn: "Open anxiety guide",
        });
      }
      if (byKey["N"] !== undefined && byKey["N"] > 85) {
        flags.push({
          key: "anxiety-critical",
          severity: "critical",
          titleRu: "Критический уровень тревожности",
          titleEn: "Critical Anxiety Level",
          messageRu: "Ваши показатели тревожности крайне высоки. Если вы испытываете панические атаки, проблемы со сном или постоянное беспокойство — пожалуйста, ознакомьтесь с нашим руководством и рассмотрите обращение к специалисту.",
          messageEn: "Your anxiety scores are extremely high. If you experience panic attacks, sleep problems, or constant worry — please check our guide and consider seeking professional help.",
          linkTo: "/guide/anxiety",
          linkLabelRu: "Помощь при панике и тревоге",
          linkLabelEn: "Panic & anxiety help",
        });
      }
      if (byKey["E"] !== undefined && byKey["E"] < 25 && byKey["N"] !== undefined && byKey["N"] > 65) {
        flags.push({
          key: "isolation-risk",
          severity: "info",
          titleRu: "Риск социальной изоляции",
          titleEn: "Social Isolation Risk",
          messageRu: "Сочетание низкой экстраверсии и высокого нейротизма может затруднять социальные контакты и усиливать тревогу. Начните с небольших шагов.",
          messageEn: "Low extraversion combined with high neuroticism can make social interactions challenging and amplify anxiety. Start with small steps.",
          linkTo: "/guide/anxiety",
          linkLabelRu: "Техники управления тревогой",
          linkLabelEn: "Anxiety management techniques",
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
          messageRu: "Ваши результаты указывают на высокий риск профессионального выгорания. Выгорание часто сопровождается тревожностью и паническими состояниями. Рекомендуется обратиться к специалисту.",
          messageEn: "Your results indicate a high risk of professional burnout. Burnout is often accompanied by anxiety and panic states. Consider consulting a specialist.",
          linkTo: "/guide/anxiety",
          linkLabelRu: "Техники экстренной помощи",
          linkLabelEn: "Emergency relief techniques",
        });
      }
      if (byKey["EE"] !== undefined && byKey["EE"] > 70) {
        flags.push({
          key: "emotional-exhaustion",
          severity: "warning",
          titleRu: "Эмоциональное истощение",
          titleEn: "Emotional Exhaustion",
          messageRu: "Высокий уровень эмоционального истощения. Уделите внимание отдыху и восстановлению. Дыхательные техники могут помочь.",
          messageEn: "High level of emotional exhaustion detected. Prioritize rest and recovery. Breathing techniques can help.",
          linkTo: "/guide/anxiety",
          linkLabelRu: "Дыхательные упражнения",
          linkLabelEn: "Breathing exercises",
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
          messageRu: "Ваш общий уровень EQ ниже среднего. Низкий EQ может затруднять распознавание и управление своими эмоциями, включая тревогу.",
          messageEn: "Your overall EQ is below average. Low EQ can make it harder to recognize and manage your emotions, including anxiety.",
        });
      }
      // Low self-management = potential anxiety
      if (byKey["SM"] !== undefined && byKey["SM"] < 30) {
        flags.push({
          key: "low-self-management",
          severity: "warning",
          titleRu: "Низкое самоуправление эмоциями",
          titleEn: "Low Emotional Self-Management",
          messageRu: "Трудности с управлением эмоциями могут усиливать тревогу и приводить к паническим состояниям. Изучите техники саморегуляции.",
          messageEn: "Difficulty managing emotions can amplify anxiety and lead to panic states. Learn self-regulation techniques.",
          linkTo: "/guide/anxiety",
          linkLabelRu: "Техники саморегуляции",
          linkLabelEn: "Self-regulation techniques",
        });
      }
    }

    // Attachment flags
    if (r.testSlug === "attachment-style") {
      const anxiety = byKey["anxiety"];
      const avoidance = byKey["avoidance"];
      if (anxiety !== undefined && anxiety > 70) {
        flags.push({
          key: "attachment-anxiety",
          severity: "warning",
          titleRu: "Высокая тревожность привязанности",
          titleEn: "High Attachment Anxiety",
          messageRu: "Высокая тревожность в отношениях может проявляться как страх отвержения, ревность и панические мысли. Терапия и техники заземления помогают.",
          messageEn: "High relationship anxiety can manifest as fear of rejection, jealousy, and panicky thoughts. Therapy and grounding techniques help.",
          linkTo: "/guide/anxiety",
          linkLabelRu: "Техники заземления",
          linkLabelEn: "Grounding techniques",
        });
      }
      if (anxiety !== undefined && avoidance !== undefined && anxiety > 70 && avoidance > 70) {
        flags.push({
          key: "fearful-attachment",
          severity: "critical",
          titleRu: "Тревожно-избегающий стиль привязанности",
          titleEn: "Fearful-Avoidant Attachment",
          messageRu: "Высокие показатели тревожности и избегания. Этот стиль часто связан с сильной внутренней тревогой. Профессиональная помощь может значительно улучшить качество жизни.",
          messageEn: "High anxiety and avoidance scores. This style is often linked to intense inner anxiety. Professional help can significantly improve quality of life.",
          linkTo: "/guide/anxiety",
          linkLabelRu: "Помощь при тревоге",
          linkLabelEn: "Anxiety help",
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
          messageRu: "Ваши привычки нуждаются в улучшении. Плохие привычки сна и питания усиливают тревожность. Начните с одной маленькой привычки.",
          messageEn: "Your habits need improvement. Poor sleep and nutrition habits amplify anxiety. Start with one small habit.",
        });
      }
      // Specifically low mindfulness
      if (byKey["MN"] !== undefined && byKey["MN"] < 25) {
        flags.push({
          key: "low-mindfulness",
          severity: "info",
          titleRu: "Низкая осознанность",
          titleEn: "Low Mindfulness",
          messageRu: "Практика осознанности (mindfulness) — один из самых эффективных инструментов против тревоги. Даже 5 минут в день имеют значение.",
          messageEn: "Mindfulness practice is one of the most effective tools against anxiety. Even 5 minutes a day makes a difference.",
          linkTo: "/guide/anxiety",
          linkLabelRu: "Практики осознанности",
          linkLabelEn: "Mindfulness practices",
        });
      }
    }
  }

  return flags;
}
