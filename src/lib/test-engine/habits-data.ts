import { Question, QuestionOption } from "@/types/database";

// Habit Audit — original habit assessment
// Dimensions: HH=Health Habits, PR=Productivity, MN=Mindfulness, SH=Social Habits, LR=Learning
// Scale 1-5: 1=Never, 5=Always
// Some items are reverse-scored (marked reverse: true)

interface HabitsQuestion {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "HH" | "PR" | "MN" | "SH" | "LR";
  reverse: boolean;
}

const habitsItems: HabitsQuestion[] = [
  // Health Habits (HH) — 5 items
  { number: 1, textRu: "Я регулярно занимаюсь физическими упражнениями", textEn: "I exercise regularly", dimension: "HH", reverse: false },
  { number: 2, textRu: "Я часто пропускаю приёмы пищи", textEn: "I often skip meals", dimension: "HH", reverse: true },
  { number: 3, textRu: "Я сплю не менее 7 часов в сутки", textEn: "I sleep at least 7 hours per night", dimension: "HH", reverse: false },
  { number: 4, textRu: "Я пью достаточно воды в течение дня", textEn: "I drink enough water throughout the day", dimension: "HH", reverse: false },
  { number: 5, textRu: "Я часто ем фастфуд или нездоровую пищу", textEn: "I often eat fast food or junk food", dimension: "HH", reverse: true },

  // Productivity (PR) — 5 items
  { number: 6, textRu: "Я планирую свой день заранее", textEn: "I plan my day in advance", dimension: "PR", reverse: false },
  { number: 7, textRu: "Я откладываю важные дела на потом", textEn: "I put off important tasks until later", dimension: "PR", reverse: true },
  { number: 8, textRu: "Я расставляю приоритеты и фокусируюсь на главном", textEn: "I prioritize tasks and focus on what matters most", dimension: "PR", reverse: false },
  { number: 9, textRu: "Я завершаю начатые дела в срок", textEn: "I finish tasks on time", dimension: "PR", reverse: false },
  { number: 10, textRu: "Я трачу много времени на бесцельное листание телефона", textEn: "I spend a lot of time mindlessly scrolling my phone", dimension: "PR", reverse: true },

  // Mindfulness (MN) — 5 items
  { number: 11, textRu: "Я выделяю время на тишину и размышления", textEn: "I set aside time for silence and reflection", dimension: "MN", reverse: false },
  { number: 12, textRu: "Я замечаю свои эмоции и реагирую на них осознанно", textEn: "I notice my emotions and respond to them mindfully", dimension: "MN", reverse: false },
  { number: 13, textRu: "Я часто действую на автопилоте, не задумываясь", textEn: "I often act on autopilot without thinking", dimension: "MN", reverse: true },
  { number: 14, textRu: "Я практикую благодарность или ведение дневника", textEn: "I practice gratitude or journaling", dimension: "MN", reverse: false },
  { number: 15, textRu: "Я умею отпускать тревожные мысли", textEn: "I am able to let go of anxious thoughts", dimension: "MN", reverse: false },

  // Social Habits (SH) — 5 items
  { number: 16, textRu: "Я регулярно общаюсь с друзьями и близкими", textEn: "I regularly communicate with friends and family", dimension: "SH", reverse: false },
  { number: 17, textRu: "Я избегаю общения, когда чувствую усталость", textEn: "I avoid socializing when I feel tired", dimension: "SH", reverse: true },
  { number: 18, textRu: "Я помогаю другим без ожидания чего-то взамен", textEn: "I help others without expecting anything in return", dimension: "SH", reverse: false },
  { number: 19, textRu: "Я активно слушаю собеседника, не перебивая", textEn: "I actively listen to others without interrupting", dimension: "SH", reverse: false },
  { number: 20, textRu: "Я провожу время с людьми, которые меня вдохновляют", textEn: "I spend time with people who inspire me", dimension: "SH", reverse: false },

  // Learning (LR) — 5 items
  { number: 21, textRu: "Я читаю книги или статьи для саморазвития", textEn: "I read books or articles for self-improvement", dimension: "LR", reverse: false },
  { number: 22, textRu: "Я изучаю новые навыки или темы каждую неделю", textEn: "I learn new skills or topics every week", dimension: "LR", reverse: false },
  { number: 23, textRu: "Мне сложно выделить время на обучение", textEn: "I find it hard to make time for learning", dimension: "LR", reverse: true },
  { number: 24, textRu: "Я анализирую свои ошибки и извлекаю уроки", textEn: "I analyze my mistakes and learn from them", dimension: "LR", reverse: false },
  { number: 25, textRu: "Я ставлю цели для своего развития и отслеживаю прогресс", textEn: "I set development goals and track my progress", dimension: "LR", reverse: false },
];

// Sort by question number for linear flow
const sortedItems = [...habitsItems].sort((a, b) => a.number - b.number);

const scaleLabels = {
  ru: {
    min: "Никогда",
    max: "Всегда",
  },
  en: {
    min: "Never",
    max: "Always",
  },
};

export const HABITS_TEST_ID = "habits";

export const habitsTestMeta = {
  id: HABITS_TEST_ID,
  slug: "habits",
  nameRu: "Аудит привычек",
  nameEn: "Habit Audit",
  descriptionRu:
    "Оцените качество ваших ежедневных привычек в 5 областях: здоровье, продуктивность, осознанность, общение, обучение.",
  descriptionEn:
    "Assess the quality of your daily habits across 5 areas: health, productivity, mindfulness, social life, and learning.",
  methodology: "Original habit assessment",
  estimatedMinutes: 6,
  questionCount: 25,
  category: "habits",
};

export function getHabitsQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `hab-q-${item.number}`,
    test_id: HABITS_TEST_ID,
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
      { id: `hab-o-${item.number}-1`, question_id: `hab-q-${item.number}`, option_key: "1", text_ru: "Никогда", text_en: "Never", sort_order: 0 },
      { id: `hab-o-${item.number}-2`, question_id: `hab-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `hab-o-${item.number}-3`, question_id: `hab-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `hab-o-${item.number}-4`, question_id: `hab-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `hab-o-${item.number}-5`, question_id: `hab-q-${item.number}`, option_key: "5", text_ru: "Всегда", text_en: "Always", sort_order: 4 },
    ],
  }));
}

// Dimension metadata for results display
export const habitsDimensions = {
  HH: {
    nameRu: "Здоровые привычки",
    nameEn: "Health Habits",
    descHighRu: "Вы заботитесь о своём здоровье: регулярно двигаетесь, правильно питаетесь и высыпаетесь.",
    descHighEn: "You take good care of your health: you exercise regularly, eat well, and get enough sleep.",
    descLowRu: "Ваши привычки в области здоровья нуждаются в улучшении. Обратите внимание на питание, сон и физическую активность.",
    descLowEn: "Your health habits need improvement. Pay attention to nutrition, sleep, and physical activity.",
    color: "#22c55e",
  },
  PR: {
    nameRu: "Продуктивность",
    nameEn: "Productivity",
    descHighRu: "Вы хорошо организованы, умеете расставлять приоритеты и доводить дела до конца.",
    descHighEn: "You are well-organized, skilled at prioritizing, and finish what you start.",
    descLowRu: "Вам стоит поработать над управлением временем и борьбой с прокрастинацией.",
    descLowEn: "You should work on time management and overcoming procrastination.",
    color: "#8b5cf6",
  },
  MN: {
    nameRu: "Осознанность",
    nameEn: "Mindfulness",
    descHighRu: "Вы живёте осознанно, замечаете свои эмоции и регулярно практикуете рефлексию.",
    descHighEn: "You live mindfully, notice your emotions, and regularly practice self-reflection.",
    descLowRu: "Вам не хватает осознанности в повседневной жизни. Попробуйте практики медитации или ведения дневника.",
    descLowEn: "You lack mindfulness in daily life. Try meditation or journaling practices.",
    color: "#06b6d4",
  },
  SH: {
    nameRu: "Социальные привычки",
    nameEn: "Social Habits",
    descHighRu: "Вы поддерживаете крепкие связи с окружающими, умеете слушать и помогать.",
    descHighEn: "You maintain strong connections with others, listen well, and offer support.",
    descLowRu: "Ваши социальные привычки нуждаются во внимании. Старайтесь больше общаться и поддерживать близких.",
    descLowEn: "Your social habits need attention. Try to communicate more and stay connected with loved ones.",
    color: "#f59e0b",
  },
  LR: {
    nameRu: "Обучение",
    nameEn: "Learning",
    descHighRu: "Вы активно учитесь, читаете, ставите цели для развития и учитесь на ошибках.",
    descHighEn: "You actively learn, read, set development goals, and learn from your mistakes.",
    descLowRu: "Вам стоит уделять больше времени саморазвитию и обучению новому.",
    descLowEn: "You should dedicate more time to self-development and learning new things.",
    color: "#ec4899",
  },
};
