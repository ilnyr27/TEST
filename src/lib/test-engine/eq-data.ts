import { Question, QuestionOption } from "@/types/database";

// Emotional Intelligence (EQ-i adapted)
// Dimensions: SA=Self-Awareness, SM=Self-Management, SOC=Social Awareness, RM=Relationship Management
// Scale 1-5: 1=Strongly Disagree, 5=Strongly Agree
// Some items are reverse-scored (marked reverse: true)

interface EQQuestion {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "SA" | "SM" | "SOC" | "RM";
  reverse: boolean;
}

const eqItems: EQQuestion[] = [
  // Self-Awareness (SA) — 5 items
  { number: 1, textRu: "Я хорошо понимаю, какие эмоции испытываю в данный момент", textEn: "I am good at understanding what emotions I am feeling at any given moment", dimension: "SA", reverse: false },
  { number: 2, textRu: "Мне трудно объяснить другим, что я чувствую", textEn: "I find it hard to explain to others what I am feeling", dimension: "SA", reverse: true },
  { number: 3, textRu: "Я понимаю, как мои эмоции влияют на мои решения", textEn: "I understand how my emotions influence my decisions", dimension: "SA", reverse: false },
  { number: 4, textRu: "Я осознаю свои сильные и слабые стороны", textEn: "I am aware of my personal strengths and weaknesses", dimension: "SA", reverse: false },
  { number: 5, textRu: "Я часто не могу понять, почему я расстроен", textEn: "I often cannot figure out why I am upset", dimension: "SA", reverse: true },

  // Self-Management (SM) — 5 items
  { number: 6, textRu: "Я умею сохранять спокойствие в стрессовых ситуациях", textEn: "I am able to stay calm in stressful situations", dimension: "SM", reverse: false },
  { number: 7, textRu: "Когда я злюсь, мне сложно контролировать свои слова и действия", textEn: "When I am angry, I find it hard to control my words and actions", dimension: "SM", reverse: true },
  { number: 8, textRu: "Я быстро восстанавливаюсь после неудач и разочарований", textEn: "I recover quickly from setbacks and disappointments", dimension: "SM", reverse: false },
  { number: 9, textRu: "Я могу отложить немедленное удовольствие ради долгосрочной цели", textEn: "I can delay immediate gratification for a long-term goal", dimension: "SM", reverse: false },
  { number: 10, textRu: "Мне трудно адаптироваться, когда планы неожиданно меняются", textEn: "I find it difficult to adapt when plans change unexpectedly", dimension: "SM", reverse: true },

  // Social Awareness (SOC) — 5 items
  { number: 11, textRu: "Я легко замечаю, когда другой человек расстроен, даже если он это скрывает", textEn: "I easily notice when someone is upset, even if they try to hide it", dimension: "SOC", reverse: false },
  { number: 12, textRu: "Я хорошо чувствую настроение в группе людей", textEn: "I am good at sensing the mood in a group of people", dimension: "SOC", reverse: false },
  { number: 13, textRu: "Мне сложно поставить себя на место другого человека", textEn: "I find it hard to put myself in another person's shoes", dimension: "SOC", reverse: true },
  { number: 14, textRu: "Я внимательно слушаю собеседника и стараюсь понять его точку зрения", textEn: "I listen attentively and try to understand others' points of view", dimension: "SOC", reverse: false },
  { number: 15, textRu: "Я часто не замечаю, что мои слова задевают других", textEn: "I often don't realize that my words hurt others", dimension: "SOC", reverse: true },

  // Relationship Management (RM) — 5 items
  { number: 16, textRu: "Я умею вдохновлять и мотивировать других людей", textEn: "I am good at inspiring and motivating other people", dimension: "RM", reverse: false },
  { number: 17, textRu: "Я эффективно разрешаю конфликты между людьми", textEn: "I effectively resolve conflicts between people", dimension: "RM", reverse: false },
  { number: 18, textRu: "Мне трудно поддерживать близкие отношения долгое время", textEn: "I find it difficult to maintain close relationships over time", dimension: "RM", reverse: true },
  { number: 19, textRu: "Я умею давать конструктивную обратную связь, не обижая собеседника", textEn: "I can give constructive feedback without offending the other person", dimension: "RM", reverse: false },
  { number: 20, textRu: "Люди часто обращаются ко мне за поддержкой и советом", textEn: "People often come to me for support and advice", dimension: "RM", reverse: false },
];

const sortedItems = [...eqItems].sort((a, b) => a.number - b.number);

const scaleLabels = {
  ru: {
    min: "Совершенно не согласен",
    max: "Полностью согласен",
  },
  en: {
    min: "Strongly disagree",
    max: "Strongly agree",
  },
};

export const EQ_TEST_ID = "eq";

export const eqTestMeta = {
  id: EQ_TEST_ID,
  slug: "eq",
  nameRu: "Эмоциональный интеллект",
  nameEn: "Emotional Intelligence",
  descriptionRu:
    "Оцените ваш эмоциональный интеллект по 4 ключевым измерениям: самосознание, самоуправление, социальная осведомлённость и управление отношениями.",
  descriptionEn:
    "Assess your emotional intelligence across 4 key dimensions: Self-Awareness, Self-Management, Social Awareness, and Relationship Management.",
  methodology: "EQ-i adapted",
  estimatedMinutes: 5,
  questionCount: 20,
  category: "psychology",
};

export function getEQQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `eq-q-${item.number}`,
    test_id: EQ_TEST_ID,
    question_number: idx + 1,
    text_ru: item.textRu,
    text_en: item.textEn,
    type: "scale" as const,
    depth_level: 1,
    scale_min: 1,
    scale_max: 5,
    scale_min_label_ru: scaleLabels.ru.min,
    scale_min_label_en: scaleLabels.en.min,
    scale_max_label_ru: scaleLabels.ru.max,
    scale_max_label_en: scaleLabels.en.max,
    is_required: true,
    branch_logic: null,
    scoring_key: {
      dimension: item.dimension,
      reverse: item.reverse,
    },
    metadata: null,
    created_at: new Date().toISOString(),
    options: [
      { id: `eq-o-${item.number}-1`, question_id: `eq-q-${item.number}`, option_key: "1", text_ru: "Совершенно не согласен", text_en: "Strongly disagree", sort_order: 0 },
      { id: `eq-o-${item.number}-2`, question_id: `eq-q-${item.number}`, option_key: "2", text_ru: "Скорее не согласен", text_en: "Disagree", sort_order: 1 },
      { id: `eq-o-${item.number}-3`, question_id: `eq-q-${item.number}`, option_key: "3", text_ru: "Нейтрально", text_en: "Neutral", sort_order: 2 },
      { id: `eq-o-${item.number}-4`, question_id: `eq-q-${item.number}`, option_key: "4", text_ru: "Скорее согласен", text_en: "Agree", sort_order: 3 },
      { id: `eq-o-${item.number}-5`, question_id: `eq-q-${item.number}`, option_key: "5", text_ru: "Полностью согласен", text_en: "Strongly agree", sort_order: 4 },
    ],
  }));
}

// Dimension metadata for results display
export const eqDimensions = {
  SA: {
    nameRu: "Самосознание",
    nameEn: "Self-Awareness",
    descHighRu: "Вы хорошо понимаете свои эмоции, их причины и влияние на ваше поведение. Это помогает вам принимать осознанные решения.",
    descHighEn: "You understand your emotions well, their causes and how they affect your behavior. This helps you make mindful decisions.",
    descLowRu: "Вам бывает сложно определить свои эмоции и понять, как они влияют на ваши действия. Развитие осознанности поможет лучше управлять собой.",
    descLowEn: "You may struggle to identify your emotions and understand how they affect your actions. Developing mindfulness can help you manage yourself better.",
    color: "#8b5cf6",
  },
  SM: {
    nameRu: "Самоуправление",
    nameEn: "Self-Management",
    descHighRu: "Вы умеете контролировать импульсы, адаптироваться к переменам и сохранять позитивный настрой даже в трудных ситуациях.",
    descHighEn: "You are skilled at controlling impulses, adapting to change, and maintaining a positive outlook even in difficult situations.",
    descLowRu: "Вам бывает трудно управлять своими реакциями и адаптироваться к неожиданным переменам. Практика саморегуляции может помочь.",
    descLowEn: "You may find it hard to manage your reactions and adapt to unexpected changes. Practicing self-regulation can help.",
    color: "#06b6d4",
  },
  SOC: {
    nameRu: "Социальная осведомлённость",
    nameEn: "Social Awareness",
    descHighRu: "Вы тонко чувствуете эмоции других людей, умеете сопереживать и понимаете групповую динамику.",
    descHighEn: "You are attuned to others' emotions, empathetic, and understand group dynamics well.",
    descLowRu: "Вам бывает сложно считывать эмоции окружающих и понимать их переживания. Развитие эмпатии улучшит ваши социальные навыки.",
    descLowEn: "You may find it hard to read others' emotions and understand their experiences. Developing empathy will improve your social skills.",
    color: "#f59e0b",
  },
  RM: {
    nameRu: "Управление отношениями",
    nameEn: "Relationship Management",
    descHighRu: "Вы умеете вдохновлять, влиять на других и эффективно разрешать конфликты. Люди ценят ваше общение.",
    descHighEn: "You are skilled at inspiring, influencing others, and resolving conflicts effectively. People value your communication.",
    descLowRu: "Вам бывает трудно выстраивать прочные отношения и разрешать разногласия. Работа над коммуникативными навыками поможет.",
    descLowEn: "You may struggle to build strong relationships and resolve disagreements. Working on communication skills can help.",
    color: "#ec4899",
  },
};
