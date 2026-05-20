import { Question, QuestionOption } from "@/types/database";

// Big Five Inventory (BFI-44) — adapted
// Dimensions: O=Openness, C=Conscientiousness, E=Extraversion, A=Agreeableness, N=Neuroticism
// Scale 1-5: 1=Strongly Disagree, 5=Strongly Agree
// Some items are reverse-scored (marked reverse: true)

interface BigFiveQuestion {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "O" | "C" | "E" | "A" | "N";
  reverse: boolean;
}

const bigFiveItems: BigFiveQuestion[] = [
  // Extraversion (E) — 8 items
  { number: 1, textRu: "Я разговорчивый человек", textEn: "I see myself as someone who is talkative", dimension: "E", reverse: false },
  { number: 6, textRu: "Я сдержанный, замкнутый", textEn: "I see myself as someone who is reserved", dimension: "E", reverse: true },
  { number: 11, textRu: "Я полон энергии", textEn: "I see myself as someone who is full of energy", dimension: "E", reverse: false },
  { number: 16, textRu: "Я генерирую много энтузиазма", textEn: "I see myself as someone who generates a lot of enthusiasm", dimension: "E", reverse: false },
  { number: 21, textRu: "Я обычно тихий", textEn: "I see myself as someone who tends to be quiet", dimension: "E", reverse: true },
  { number: 26, textRu: "У меня напористый характер", textEn: "I see myself as someone who has an assertive personality", dimension: "E", reverse: false },
  { number: 31, textRu: "Я иногда застенчив, скован", textEn: "I see myself as someone who is sometimes shy, inhibited", dimension: "E", reverse: true },
  { number: 36, textRu: "Я общительный, компанейский", textEn: "I see myself as someone who is outgoing, sociable", dimension: "E", reverse: false },

  // Agreeableness (A) — 9 items
  { number: 2, textRu: "Я склонен находить недостатки в других", textEn: "I see myself as someone who tends to find fault with others", dimension: "A", reverse: true },
  { number: 7, textRu: "Я готов помогать и быть бескорыстным", textEn: "I see myself as someone who is helpful and unselfish with others", dimension: "A", reverse: false },
  { number: 12, textRu: "Я часто начинаю ссоры с другими", textEn: "I see myself as someone who starts quarrels with others", dimension: "A", reverse: true },
  { number: 17, textRu: "Я умею прощать", textEn: "I see myself as someone who has a forgiving nature", dimension: "A", reverse: false },
  { number: 22, textRu: "Я обычно доверяю людям", textEn: "I see myself as someone who is generally trusting", dimension: "A", reverse: false },
  { number: 27, textRu: "Я иногда бываю холоден и отстранён", textEn: "I see myself as someone who can be cold and aloof", dimension: "A", reverse: true },
  { number: 32, textRu: "Я внимателен и добр к другим", textEn: "I see myself as someone who is considerate and kind to almost everyone", dimension: "A", reverse: false },
  { number: 37, textRu: "Я иногда бываю грубым с другими", textEn: "I see myself as someone who is sometimes rude to others", dimension: "A", reverse: true },
  { number: 42, textRu: "Я люблю сотрудничать с другими", textEn: "I see myself as someone who likes to cooperate with others", dimension: "A", reverse: false },

  // Conscientiousness (C) — 9 items
  { number: 3, textRu: "Я выполняю работу тщательно", textEn: "I see myself as someone who does a thorough job", dimension: "C", reverse: false },
  { number: 8, textRu: "Я бываю небрежным, неаккуратным", textEn: "I see myself as someone who can be somewhat careless", dimension: "C", reverse: true },
  { number: 13, textRu: "Я надёжный работник", textEn: "I see myself as someone who is a reliable worker", dimension: "C", reverse: false },
  { number: 18, textRu: "Я склонен к дезорганизации", textEn: "I see myself as someone who tends to be disorganized", dimension: "C", reverse: true },
  { number: 23, textRu: "Я склонен к лени", textEn: "I see myself as someone who tends to be lazy", dimension: "C", reverse: true },
  { number: 28, textRu: "Я настойчив, пока задача не выполнена", textEn: "I see myself as someone who perseveres until the task is finished", dimension: "C", reverse: false },
  { number: 33, textRu: "Я делаю вещи эффективно", textEn: "I see myself as someone who does things efficiently", dimension: "C", reverse: false },
  { number: 38, textRu: "Я строю планы и следую им", textEn: "I see myself as someone who makes plans and follows through with them", dimension: "C", reverse: false },
  { number: 43, textRu: "Я легко отвлекаюсь", textEn: "I see myself as someone who is easily distracted", dimension: "C", reverse: true },

  // Neuroticism (N) — 8 items
  { number: 4, textRu: "Я подавлен, грустен", textEn: "I see myself as someone who is depressed, blue", dimension: "N", reverse: false },
  { number: 9, textRu: "Я расслаблен, хорошо справляюсь со стрессом", textEn: "I see myself as someone who is relaxed, handles stress well", dimension: "N", reverse: true },
  { number: 14, textRu: "Я бываю напряжён", textEn: "I see myself as someone who can be tense", dimension: "N", reverse: false },
  { number: 19, textRu: "Я часто беспокоюсь", textEn: "I see myself as someone who worries a lot", dimension: "N", reverse: false },
  { number: 24, textRu: "Я эмоционально стабилен, не легко расстраиваюсь", textEn: "I see myself as someone who is emotionally stable, not easily upset", dimension: "N", reverse: true },
  { number: 29, textRu: "Я бываю капризным", textEn: "I see myself as someone who can be moody", dimension: "N", reverse: false },
  { number: 34, textRu: "Я сохраняю спокойствие в сложных ситуациях", textEn: "I see myself as someone who remains calm in tense situations", dimension: "N", reverse: true },
  { number: 39, textRu: "Я легко нервничаю", textEn: "I see myself as someone who gets nervous easily", dimension: "N", reverse: false },

  // Openness (O) — 10 items
  { number: 5, textRu: "Я оригинален, мне приходят новые идеи", textEn: "I see myself as someone who is original, comes up with new ideas", dimension: "O", reverse: false },
  { number: 10, textRu: "Мне интересны разные вещи", textEn: "I see myself as someone who is curious about many different things", dimension: "O", reverse: false },
  { number: 15, textRu: "Я изобретателен", textEn: "I see myself as someone who is ingenious, a deep thinker", dimension: "O", reverse: false },
  { number: 20, textRu: "У меня активное воображение", textEn: "I see myself as someone who has an active imagination", dimension: "O", reverse: false },
  { number: 25, textRu: "Я изобретателен", textEn: "I see myself as someone who is inventive", dimension: "O", reverse: false },
  { number: 30, textRu: "Я ценю художественные, эстетические переживания", textEn: "I see myself as someone who values artistic, aesthetic experiences", dimension: "O", reverse: false },
  { number: 35, textRu: "Я предпочитаю рутинную работу", textEn: "I see myself as someone who prefers work that is routine", dimension: "O", reverse: true },
  { number: 40, textRu: "Мне нравится размышлять, играть с идеями", textEn: "I see myself as someone who likes to reflect, play with ideas", dimension: "O", reverse: false },
  { number: 41, textRu: "У меня мало интересов в области искусства", textEn: "I see myself as someone who has few artistic interests", dimension: "O", reverse: true },
  { number: 44, textRu: "Я ценю интеллектуальный опыт", textEn: "I see myself as someone who is sophisticated in art, music, or literature", dimension: "O", reverse: false },
];

// Sort by question number for linear flow
const sortedItems = [...bigFiveItems].sort((a, b) => a.number - b.number);

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

export const BIG_FIVE_TEST_ID = "big-five";

export const bigFiveTestMeta = {
  id: BIG_FIVE_TEST_ID,
  slug: "big-five",
  nameRu: "Большая пятёрка (Big Five)",
  nameEn: "Big Five Personality Test",
  descriptionRu:
    "Определите ваши 5 ключевых черт личности: открытость, добросовестность, экстраверсия, дружелюбие, нейротизм. Тест основан на модели BFI-44.",
  descriptionEn:
    "Discover your 5 key personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism. Based on the BFI-44 model.",
  methodology: "BFI-44 (NEO-PI-R short)",
  estimatedMinutes: 15,
  questionCount: 44,
  category: "psychology",
};

export function getBigFiveQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `bf-q-${item.number}`,
    test_id: BIG_FIVE_TEST_ID,
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
      { id: `bf-o-${item.number}-1`, question_id: `bf-q-${item.number}`, option_key: "1", text_ru: "Совершенно не согласен", text_en: "Strongly disagree", sort_order: 0 },
      { id: `bf-o-${item.number}-2`, question_id: `bf-q-${item.number}`, option_key: "2", text_ru: "Скорее не согласен", text_en: "Disagree", sort_order: 1 },
      { id: `bf-o-${item.number}-3`, question_id: `bf-q-${item.number}`, option_key: "3", text_ru: "Нейтрально", text_en: "Neutral", sort_order: 2 },
      { id: `bf-o-${item.number}-4`, question_id: `bf-q-${item.number}`, option_key: "4", text_ru: "Скорее согласен", text_en: "Agree", sort_order: 3 },
      { id: `bf-o-${item.number}-5`, question_id: `bf-q-${item.number}`, option_key: "5", text_ru: "Полностью согласен", text_en: "Strongly agree", sort_order: 4 },
    ],
  }));
}

// Dimension metadata for results display
export const bigFiveDimensions = {
  O: {
    nameRu: "Открытость опыту",
    nameEn: "Openness to Experience",
    descHighRu: "Вы любопытны, креативны и открыты новому. Цените искусство и интеллектуальные переживания.",
    descHighEn: "You are curious, creative, and open to new experiences. You value art and intellectual stimulation.",
    descLowRu: "Вы практичны, предпочитаете привычное и проверенное. Цените стабильность и конкретику.",
    descLowEn: "You are practical and prefer familiar routines. You value stability and concrete thinking.",
    color: "#8B5CF6",
  },
  C: {
    nameRu: "Добросовестность",
    nameEn: "Conscientiousness",
    descHighRu: "Вы организованны, надёжны и дисциплинированны. Доводите дела до конца.",
    descHighEn: "You are organized, reliable, and disciplined. You follow through on commitments.",
    descLowRu: "Вы гибки и спонтанны, но можете испытывать трудности с организацией и планированием.",
    descLowEn: "You are flexible and spontaneous but may struggle with organization and planning.",
    color: "#3B82F6",
  },
  E: {
    nameRu: "Экстраверсия",
    nameEn: "Extraversion",
    descHighRu: "Вы энергичны, общительны и любите быть в центре внимания. Черпаете энергию от общения.",
    descHighEn: "You are energetic, sociable, and enjoy being the center of attention. You gain energy from social interaction.",
    descLowRu: "Вы интроверт — предпочитаете спокойствие и одиночество. Черпаете энергию в уединении.",
    descLowEn: "You are introverted — you prefer quiet and solitude. You recharge through alone time.",
    color: "#F59E0B",
  },
  A: {
    nameRu: "Дружелюбие",
    nameEn: "Agreeableness",
    descHighRu: "Вы добры, отзывчивы и готовы к сотрудничеству. Доверяете людям и избегаете конфликтов.",
    descHighEn: "You are kind, empathetic, and cooperative. You trust others and avoid conflict.",
    descLowRu: "Вы независимы, критичны и прямолинейны. Ставите свои интересы выше и не боитесь спорить.",
    descLowEn: "You are independent, critical, and direct. You prioritize your own interests and aren't afraid to argue.",
    color: "#10B981",
  },
  N: {
    nameRu: "Нейротизм",
    nameEn: "Neuroticism",
    descHighRu: "Вы эмоционально чувствительны, склонны к беспокойству и перепадам настроения.",
    descHighEn: "You are emotionally sensitive, prone to worry and mood swings.",
    descLowRu: "Вы эмоционально стабильны, спокойны и устойчивы к стрессу.",
    descLowEn: "You are emotionally stable, calm, and resilient to stress.",
    color: "#EF4444",
  },
};
