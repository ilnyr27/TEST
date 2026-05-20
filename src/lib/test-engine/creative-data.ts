import { Question, QuestionOption } from "@/types/database";

// Creative Confidence Self-Assessment
// Dimensions: OR=Originality, FL=Fluency, FX=Flexibility, EL=Elaboration
// Scale 1-5: 1=Strongly Disagree, 5=Strongly Agree
// Some items are reverse-scored (marked reverse: true)

interface CreativeQuestion {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "OR" | "FL" | "FX" | "EL";
  reverse: boolean;
}

const creativeItems: CreativeQuestion[] = [
  // Originality (OR) — 5 items
  { number: 1, textRu: "Мои идеи часто отличаются от идей окружающих", textEn: "My ideas often differ from those of people around me", dimension: "OR", reverse: false },
  { number: 2, textRu: "Я редко придумываю что-то новое", textEn: "I rarely come up with new ideas", dimension: "OR", reverse: true },
  { number: 3, textRu: "Мне нравится находить нестандартные решения проблем", textEn: "I enjoy finding unconventional solutions to problems", dimension: "OR", reverse: false },
  { number: 4, textRu: "Люди говорят, что мои идеи необычны", textEn: "People say my ideas are unusual", dimension: "OR", reverse: false },
  { number: 5, textRu: "Мне сложно предложить что-то оригинальное", textEn: "I find it hard to come up with something original", dimension: "OR", reverse: true },

  // Fluency (FL) — 5 items
  { number: 6, textRu: "Я легко генерирую множество идей за короткое время", textEn: "I easily generate many ideas in a short time", dimension: "FL", reverse: false },
  { number: 7, textRu: "Когда нужна идея, у меня часто пусто в голове", textEn: "When I need an idea, my mind often goes blank", dimension: "FL", reverse: true },
  { number: 8, textRu: "На мозговом штурме я предлагаю больше вариантов, чем другие", textEn: "In brainstorming I suggest more options than others", dimension: "FL", reverse: false },
  { number: 9, textRu: "Идеи приходят ко мне быстро и в большом количестве", textEn: "Ideas come to me quickly and in large numbers", dimension: "FL", reverse: false },
  { number: 10, textRu: "Мне нужно много времени, чтобы придумать хотя бы одну идею", textEn: "I need a lot of time to come up with even one idea", dimension: "FL", reverse: true },

  // Flexibility (FX) — 5 items
  { number: 11, textRu: "Я легко переключаюсь между разными подходами к задаче", textEn: "I easily switch between different approaches to a task", dimension: "FX", reverse: false },
  { number: 12, textRu: "Мне сложно отказаться от привычного способа действий", textEn: "I find it hard to abandon my usual way of doing things", dimension: "FX", reverse: true },
  { number: 13, textRu: "Я могу рассмотреть проблему с разных точек зрения", textEn: "I can look at a problem from many different angles", dimension: "FX", reverse: false },
  { number: 14, textRu: "Если один метод не работает, я быстро нахожу другой", textEn: "If one method doesn't work, I quickly find another", dimension: "FX", reverse: false },
  { number: 15, textRu: "Я предпочитаю проверенные методы и не люблю экспериментировать", textEn: "I prefer proven methods and don't like to experiment", dimension: "FX", reverse: true },

  // Elaboration (EL) — 5 items
  { number: 16, textRu: "Я люблю детально прорабатывать свои идеи", textEn: "I love working out my ideas in detail", dimension: "EL", reverse: false },
  { number: 17, textRu: "Мне скучно доводить идею до конца, хочется переключиться на новую", textEn: "I get bored finishing an idea and want to move on to the next one", dimension: "EL", reverse: true },
  { number: 18, textRu: "Я могу превратить грубый набросок в проработанный план", textEn: "I can turn a rough sketch into a polished plan", dimension: "EL", reverse: false },
  { number: 19, textRu: "Я обращаю внимание на мелкие детали, которые делают идею лучше", textEn: "I pay attention to small details that make an idea better", dimension: "EL", reverse: false },
  { number: 20, textRu: "Мне трудно объяснить свою идею так, чтобы другие её поняли", textEn: "I find it hard to explain my idea so that others understand it", dimension: "EL", reverse: true },
];

// Sort by question number for linear flow
const sortedItems = [...creativeItems].sort((a, b) => a.number - b.number);

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

export const CREATIVE_TEST_ID = "creative";

export const creativeTestMeta = {
  id: CREATIVE_TEST_ID,
  slug: "creative",
  nameRu: "Уверенность в творчестве",
  nameEn: "Creative Confidence",
  descriptionRu:
    "Оцените свои творческие способности по 4 измерениям: оригинальность, беглость, гибкость и проработанность. Узнайте, в чём ваша творческая сила.",
  descriptionEn:
    "Assess your creative abilities across 4 dimensions: Originality, Fluency, Flexibility, and Elaboration. Discover your creative strengths.",
  methodology: "Creativity self-assessment",
  estimatedMinutes: 5,
  questionCount: 20,
  category: "creativity",
};

export function getCreativeQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `cr-q-${item.number}`,
    test_id: CREATIVE_TEST_ID,
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
      { id: `cr-o-${item.number}-1`, question_id: `cr-q-${item.number}`, option_key: "1", text_ru: "Совершенно не согласен", text_en: "Strongly disagree", sort_order: 0 },
      { id: `cr-o-${item.number}-2`, question_id: `cr-q-${item.number}`, option_key: "2", text_ru: "Скорее не согласен", text_en: "Disagree", sort_order: 1 },
      { id: `cr-o-${item.number}-3`, question_id: `cr-q-${item.number}`, option_key: "3", text_ru: "Нейтрально", text_en: "Neutral", sort_order: 2 },
      { id: `cr-o-${item.number}-4`, question_id: `cr-q-${item.number}`, option_key: "4", text_ru: "Скорее согласен", text_en: "Agree", sort_order: 3 },
      { id: `cr-o-${item.number}-5`, question_id: `cr-q-${item.number}`, option_key: "5", text_ru: "Полностью согласен", text_en: "Strongly agree", sort_order: 4 },
    ],
  }));
}

// Dimension metadata for results display
export const creativeDimensions = {
  OR: {
    nameRu: "Оригинальность",
    nameEn: "Originality",
    descHighRu: "Вы мыслите нестандартно и генерируете уникальные идеи, которые выделяются на фоне привычных решений.",
    descHighEn: "You think outside the box and generate unique ideas that stand out from conventional solutions.",
    descLowRu: "Вы склонны опираться на проверенные решения. Попробуйте чаще задавать вопрос «А что, если?».",
    descLowEn: "You tend to rely on tried-and-true solutions. Try asking 'What if?' more often.",
    color: "#8b5cf6",
  },
  FL: {
    nameRu: "Беглость",
    nameEn: "Fluency",
    descHighRu: "Вы легко и быстро генерируете множество идей. Количество — ваша сильная сторона.",
    descHighEn: "You easily and quickly generate many ideas. Quantity is your strength.",
    descLowRu: "Генерация идей даётся вам с усилием. Практика мозговых штурмов поможет развить этот навык.",
    descLowEn: "Generating ideas takes effort for you. Practicing brainstorming can help develop this skill.",
    color: "#06b6d4",
  },
  FX: {
    nameRu: "Гибкость",
    nameEn: "Flexibility",
    descHighRu: "Вы легко переключаетесь между подходами и видите проблемы с разных сторон.",
    descHighEn: "You easily switch between approaches and see problems from multiple perspectives.",
    descLowRu: "Вам бывает сложно менять подход. Попробуйте намеренно искать альтернативные точки зрения.",
    descLowEn: "You may find it hard to change your approach. Try deliberately seeking alternative viewpoints.",
    color: "#f59e0b",
  },
  EL: {
    nameRu: "Проработанность",
    nameEn: "Elaboration",
    descHighRu: "Вы умеете детально развивать идеи и превращать наброски в готовые решения.",
    descHighEn: "You excel at developing ideas in detail and turning sketches into finished solutions.",
    descLowRu: "Доведение идей до конца — ваша зона роста. Попробуйте выделять время на проработку деталей.",
    descLowEn: "Finishing ideas is your growth area. Try setting aside time to work through the details.",
    color: "#ec4899",
  },
};
