import { Question, QuestionOption } from "@/types/database";

// Стиль мышления — 24 вопроса, 4 измерения по 6 вопросов
// ANALYT=Аналитический, INTUIT=Интуитивный, SYSTEM=Системный, CREAT=Творческий

interface ThinkingItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "ANALYT" | "INTUIT" | "SYSTEM" | "CREAT";
}

const items: ThinkingItem[] = [
  // ANALYT — Аналитическое мышление
  { number: 1,  dimension: "ANALYT", textRu: "Прежде чем принять решение, я собираю и анализирую все доступные данные", textEn: "Before making a decision, I gather and analyze all available data" },
  { number: 2,  dimension: "ANALYT", textRu: "Мне нравится находить логические закономерности и причинно-следственные связи", textEn: "I enjoy finding logical patterns and cause-and-effect relationships" },
  { number: 3,  dimension: "ANALYT", textRu: "Я предпочитаю аргументы, основанные на фактах, а не на эмоциях или ощущениях", textEn: "I prefer arguments based on facts rather than emotions or feelings" },
  { number: 4,  dimension: "ANALYT", textRu: "Я склонен разбивать сложные вопросы на составные части и изучать каждую отдельно", textEn: "I tend to break complex questions into components and study each separately" },
  { number: 5,  dimension: "ANALYT", textRu: "Я доверяю доказательствам и проверенным методам больше, чем интуиции", textEn: "I trust evidence and proven methods more than intuition" },
  { number: 6,  dimension: "ANALYT", textRu: "Мне легче работать с цифрами, схемами и конкретными данными, чем с абстракциями", textEn: "I find it easier to work with numbers, diagrams, and concrete data than with abstractions" },

  // INTUIT — Интуитивное мышление
  { number: 7,  dimension: "INTUIT", textRu: "Я часто принимаю решения, опираясь на ощущение «это правильно», без полного анализа", textEn: "I often make decisions based on a feeling that 'this is right', without full analysis" },
  { number: 8,  dimension: "INTUIT", textRu: "Я замечаю паттерны и связи между вещами раньше, чем могу их объяснить словами", textEn: "I notice patterns and connections between things before I can explain them in words" },
  { number: 9,  dimension: "INTUIT", textRu: "Мои лучшие идеи приходят внезапно — озарением, а не в результате последовательного анализа", textEn: "My best ideas come suddenly — as insights, not as a result of sequential analysis" },
  { number: 10, dimension: "INTUIT", textRu: "Я хорошо чувствую людей и ситуации — часто без объяснения причин", textEn: "I'm good at reading people and situations — often without being able to explain why" },
  { number: 11, dimension: "INTUIT", textRu: "Когда мне нужно принять важное решение, я доверяю внутреннему голосу", textEn: "When I need to make an important decision, I trust my inner voice" },
  { number: 12, dimension: "INTUIT", textRu: "Я могу предвидеть развитие ситуации, не проводя детального анализа", textEn: "I can foresee how a situation will develop without conducting detailed analysis" },

  // SYSTEM — Системное мышление
  { number: 13, dimension: "SYSTEM", textRu: "Я всегда смотрю на ситуацию в целом — мне важно понять, как части связаны между собой", textEn: "I always look at the whole picture — it's important for me to understand how the parts connect" },
  { number: 14, dimension: "SYSTEM", textRu: "Меня интересует, как изменение одного элемента влияет на всю систему", textEn: "I'm interested in how changing one element affects the whole system" },
  { number: 15, dimension: "SYSTEM", textRu: "Прежде чем действовать, я хочу понять структуру и логику происходящего", textEn: "Before acting, I want to understand the structure and logic of what's happening" },
  { number: 16, dimension: "SYSTEM", textRu: "Я хорошо вижу долгосрочные последствия решений, которые другие не замечают", textEn: "I'm good at seeing long-term consequences of decisions that others miss" },
  { number: 17, dimension: "SYSTEM", textRu: "Мне нравится строить модели и схемы, чтобы разобраться в сложных процессах", textEn: "I enjoy building models and diagrams to make sense of complex processes" },
  { number: 18, dimension: "SYSTEM", textRu: "Я думаю о том, как решение повлияет на всех участников, а не только на непосредственную задачу", textEn: "I think about how a decision will affect all stakeholders, not just the immediate task" },

  // CREAT — Творческое мышление
  { number: 19, dimension: "CREAT", textRu: "Мне нравится искать нестандартные решения там, где другие идут привычным путём", textEn: "I enjoy finding unconventional solutions where others take the familiar path" },
  { number: 20, dimension: "CREAT", textRu: "Я легко нахожу аналогии между вещами из разных областей", textEn: "I easily find analogies between things from different domains" },
  { number: 21, dimension: "CREAT", textRu: "Ограничения и правила меня скорее вдохновляют на поиск обходных путей, чем блокируют", textEn: "Constraints and rules inspire me to find workarounds rather than block me" },
  { number: 22, dimension: "CREAT", textRu: "Я генерирую много идей быстро — даже самых странных и неочевидных", textEn: "I generate many ideas quickly — even the strangest and least obvious ones" },
  { number: 23, dimension: "CREAT", textRu: "Мне нравится смотреть на знакомые вещи под новым углом", textEn: "I enjoy looking at familiar things from a new angle" },
  { number: 24, dimension: "CREAT", textRu: "Я чувствую себя живым, когда задача требует придумать что-то новое, а не применить готовое решение", textEn: "I feel alive when a task requires inventing something new rather than applying a ready-made solution" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const THINKING_STYLE_TEST_ID = "thinking-style";

export const thinkingStyleTestMeta = {
  id: THINKING_STYLE_TEST_ID,
  slug: "thinking-style",
  nameRu: "Стиль мышления",
  nameEn: "Thinking Style",
  descriptionRu: "Как вы обрабатываете информацию и принимаете решения? Тест определяет ваш доминирующий стиль из четырёх: аналитический, интуитивный, системный и творческий.",
  descriptionEn: "How do you process information and make decisions? The test identifies your dominant style from four: analytical, intuitive, systemic, and creative.",
  methodology: "Cognitive Style Inventory adapted",
  estimatedMinutes: 6,
  questionCount: 24,
  category: "intelligence",
};

export const thinkingStyleDimensions = {
  ANALYT: {
    nameRu: "Аналитический",
    nameEn: "Analytical",
    color: "#3B82F6",
    descHighRu: "Вы мыслите аналитически: опираетесь на данные, логику и факты. Вы склонны разбивать задачи на части, искать закономерности и доверять доказательствам. Это делает вас надёжным в решении структурированных задач. Зона роста — доверие к интуиции там, где данных недостаточно.",
    descHighEn: "You think analytically: relying on data, logic, and facts. You tend to break tasks into parts, find patterns, and trust evidence. This makes you reliable in structured problem-solving. Growth area — trusting intuition where data is insufficient.",
    descLowRu: "Аналитический стиль менее выражен — вы реже опираетесь на данные и логику как основной инструмент мышления.",
    descLowEn: "Analytical style is less pronounced — you less often rely on data and logic as your primary thinking tool.",
  },
  INTUIT: {
    nameRu: "Интуитивный",
    nameEn: "Intuitive",
    color: "#8B5CF6",
    descHighRu: "Вы мыслите интуитивно: ваш мозг быстро обрабатывает паттерны и выдаёт ответ до того, как вы успеваете его объяснить. Это ценный ресурс в сложных, быстро меняющихся ситуациях. Важно сочетать интуицию с проверкой — она бывает права не всегда.",
    descHighEn: "You think intuitively: your brain quickly processes patterns and delivers an answer before you can explain it. This is a valuable resource in complex, fast-changing situations. It's important to combine intuition with verification — it's not always right.",
    descLowRu: "Интуитивный стиль менее выражен — вы предпочитаете осознанный анализ быстрым ощущениям.",
    descLowEn: "Intuitive style is less pronounced — you prefer conscious analysis over quick feelings.",
  },
  SYSTEM: {
    nameRu: "Системный",
    nameEn: "Systemic",
    color: "#10B981",
    descHighRu: "Вы мыслите системно: видите связи, структуры и долгосрочные последствия. Вы понимаете, как части влияют на целое. Это редкий и ценный навык в сложных средах. Зона внимания — не увлекаться анализом системы в ущерб быстрым действиям.",
    descHighEn: "You think systemically: you see connections, structures, and long-term consequences. You understand how parts affect the whole. This is a rare and valuable skill in complex environments. Watch out — don't get lost in systems analysis at the expense of quick action.",
    descLowRu: "Системный стиль менее выражен — вы склонны работать с задачами локально, а не глобально.",
    descLowEn: "Systemic style is less pronounced — you tend to work with tasks locally rather than globally.",
  },
  CREAT: {
    nameRu: "Творческий",
    nameEn: "Creative",
    color: "#F59E0B",
    descHighRu: "Вы мыслите творчески: легко генерируете идеи, видите нестандартные связи и находите обходные пути. Нестандартные задачи вас не пугают — они вдохновляют. Зона роста — доведение идей до реализации и внимание к деталям.",
    descHighEn: "You think creatively: easily generating ideas, seeing unusual connections, and finding workarounds. Non-standard tasks don't scare you — they inspire you. Growth area — following through on ideas and attention to detail.",
    descLowRu: "Творческий стиль менее выражен — вы предпочитаете проверенные методы новым нестандартным подходам.",
    descLowEn: "Creative style is less pronounced — you prefer proven methods over new unconventional approaches.",
  },
};

export function getThinkingStyleQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `ts-q-${item.number}`,
    test_id: THINKING_STYLE_TEST_ID,
    question_number: idx + 1,
    text_ru: item.textRu,
    text_en: item.textEn,
    type: "scale" as const,
    depth_level: 1,
    scale_min: 1,
    scale_max: 5,
    scale_min_label_ru: "Совершенно не согласен",
    scale_min_label_en: "Strongly disagree",
    scale_max_label_ru: "Полностью согласен",
    scale_max_label_en: "Strongly agree",
    is_required: true,
    branch_logic: null,
    scoring_key: { dimension: item.dimension },
    metadata: null,
    created_at: new Date().toISOString(),
    options: [
      { id: `ts-o-${item.number}-1`, question_id: `ts-q-${item.number}`, option_key: "1", text_ru: "Совершенно не согласен", text_en: "Strongly disagree", sort_order: 0 },
      { id: `ts-o-${item.number}-2`, question_id: `ts-q-${item.number}`, option_key: "2", text_ru: "Скорее не согласен", text_en: "Disagree", sort_order: 1 },
      { id: `ts-o-${item.number}-3`, question_id: `ts-q-${item.number}`, option_key: "3", text_ru: "Нейтрально", text_en: "Neutral", sort_order: 2 },
      { id: `ts-o-${item.number}-4`, question_id: `ts-q-${item.number}`, option_key: "4", text_ru: "Скорее согласен", text_en: "Agree", sort_order: 3 },
      { id: `ts-o-${item.number}-5`, question_id: `ts-q-${item.number}`, option_key: "5", text_ru: "Полностью согласен", text_en: "Strongly agree", sort_order: 4 },
    ],
  }));
}
