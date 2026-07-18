import { Question, QuestionOption } from "@/types/database";

// Стиль работы — 28 вопросов, 4 измерения по 7 вопросов
// EXEC=Исполнитель, INNOV=Инноватор, CONN=Коннектор, STRAT=Стратег

interface WorkStyleItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "EXEC" | "INNOV" | "CONN" | "STRAT";
}

const items: WorkStyleItem[] = [
  // EXEC — Исполнитель (детали, надёжность, качество)
  { number: 1,  dimension: "EXEC", textRu: "Мне важно делать работу правильно с первого раза, даже если это займёт больше времени", textEn: "It's important to me to do the job right the first time, even if it takes longer" },
  { number: 2,  dimension: "EXEC", textRu: "Я чувствую удовлетворение, когда задача выполнена чётко и в срок", textEn: "I feel satisfaction when a task is completed precisely and on time" },
  { number: 3,  dimension: "EXEC", textRu: "Я хорошо работаю с деталями и замечаю ошибки, которые другие пропускают", textEn: "I work well with details and notice errors that others miss" },
  { number: 4,  dimension: "EXEC", textRu: "Мне нравится, когда у задачи есть чёткое описание и конкретный результат", textEn: "I like when a task has a clear description and a specific outcome" },
  { number: 5,  dimension: "EXEC", textRu: "Я надёжен: если взял на себя обязательство, выполню его несмотря ни на что", textEn: "I'm reliable: if I take on a commitment, I'll fulfill it no matter what" },
  { number: 6,  dimension: "EXEC", textRu: "Я предпочитаю стабильный ритм работы скачкообразному ритму с дедлайнами и паузами", textEn: "I prefer a stable work rhythm over a stop-and-go pattern of deadlines and pauses" },
  { number: 7,  dimension: "EXEC", textRu: "Качество конечного результата для меня важнее скорости его достижения", textEn: "The quality of the final result matters more to me than the speed of achieving it" },

  // INNOV — Инноватор (идеи, эксперименты, изменения)
  { number: 8,  dimension: "INNOV", textRu: "Я быстро теряю интерес к задачам, которые не требуют ничего нового", textEn: "I quickly lose interest in tasks that require nothing new" },
  { number: 9,  dimension: "INNOV", textRu: "Мне нравится экспериментировать — пробовать разные подходы и смотреть, что работает", textEn: "I enjoy experimenting — trying different approaches and seeing what works" },
  { number: 10, dimension: "INNOV", textRu: "Я лучше работаю в среде, где можно ошибаться и учиться на ошибках", textEn: "I work better in an environment where it's okay to make mistakes and learn from them" },
  { number: 11, dimension: "INNOV", textRu: "Новые проекты и неопределённость скорее заряжают меня, чем пугают", textEn: "New projects and uncertainty tend to energize me rather than scare me" },
  { number: 12, dimension: "INNOV", textRu: "Я первым замечаю, когда старый подход устарел, и предлагаю альтернативу", textEn: "I'm the first to notice when an old approach is outdated and suggest an alternative" },
  { number: 13, dimension: "INNOV", textRu: "Мне интереснее находить новый способ решить задачу, чем делать это по шаблону", textEn: "I find it more interesting to find a new way to solve a problem than to follow a template" },
  { number: 14, dimension: "INNOV", textRu: "Я легко генерирую идеи и предложения — иногда больше, чем успеваю реализовать", textEn: "I easily generate ideas and proposals — sometimes more than I manage to implement" },

  // CONN — Коннектор (люди, отношения, коммуникация)
  { number: 15, dimension: "CONN", textRu: "Мне важно, чтобы в коллективе была хорошая атмосфера — это влияет на мою продуктивность", textEn: "It's important to me that the team has a good atmosphere — it affects my productivity" },
  { number: 16, dimension: "CONN", textRu: "Я получаю энергию от общения с коллегами, клиентами, партнёрами", textEn: "I get energy from interacting with colleagues, clients, and partners" },
  { number: 17, dimension: "CONN", textRu: "Мне нравится помогать другим решать их задачи — это приносит удовлетворение", textEn: "I enjoy helping others solve their problems — it brings satisfaction" },
  { number: 18, dimension: "CONN", textRu: "Я хорошо слышу людей и умею выстраивать доверие быстро", textEn: "I listen well to people and can build trust quickly" },
  { number: 19, dimension: "CONN", textRu: "Мне легко найти общий язык с очень разными людьми", textEn: "I can easily find common ground with very different people" },
  { number: 20, dimension: "CONN", textRu: "Я часто становлюсь «связующим звеном» между людьми или командами", textEn: "I often become the 'connecting link' between people or teams" },
  { number: 21, dimension: "CONN", textRu: "В работе мне важна человеческая составляющая — не только задачи, но и люди вокруг них", textEn: "In work, the human element matters to me — not just the tasks but the people around them" },

  // STRAT — Стратег (системы, планирование, долгосрок)
  { number: 22, dimension: "STRAT", textRu: "Мне важно понимать общую картину прежде, чем погружаться в детали", textEn: "It's important to me to understand the big picture before diving into details" },
  { number: 23, dimension: "STRAT", textRu: "Я думаю на несколько шагов вперёд и планирую действия с учётом будущих последствий", textEn: "I think several steps ahead and plan actions considering future consequences" },
  { number: 24, dimension: "STRAT", textRu: "Мне нравится выстраивать системы и процессы, которые работают без постоянного контроля", textEn: "I enjoy building systems and processes that work without constant supervision" },
  { number: 25, dimension: "STRAT", textRu: "Я чувствую себя хорошо, когда понимаю связи между разными частями проекта или организации", textEn: "I feel good when I understand the connections between different parts of a project or organization" },
  { number: 26, dimension: "STRAT", textRu: "Мне интереснее сформулировать стратегию, чем воплощать её в жизнь пошагово", textEn: "I find it more interesting to formulate a strategy than to implement it step by step" },
  { number: 27, dimension: "STRAT", textRu: "Я умею расставить приоритеты так, чтобы важное не тонуло в срочном", textEn: "I can set priorities so that the important doesn't drown in the urgent" },
  { number: 28, dimension: "STRAT", textRu: "Я вижу риски и узкие места раньше, чем они становятся проблемой", textEn: "I see risks and bottlenecks before they become problems" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const WORK_STYLE_TEST_ID = "work-style";

export const workStyleTestMeta = {
  id: WORK_STYLE_TEST_ID,
  slug: "work-style",
  nameRu: "Стиль работы",
  nameEn: "Work Style",
  descriptionRu: "Как вы работаете наиболее эффективно? Тест определяет ваш доминирующий рабочий стиль из четырёх: Исполнитель, Инноватор, Коннектор и Стратег.",
  descriptionEn: "How do you work most effectively? The test identifies your dominant work style from four: Executor, Innovator, Connector, and Strategist.",
  methodology: "Work Style Inventory (original)",
  estimatedMinutes: 7,
  questionCount: 28,
  category: "career",
};

export const workStyleDimensions = {
  EXEC: {
    nameRu: "Исполнитель",
    nameEn: "Executor",
    color: "#10B981",
    descHighRu: "Исполнитель — ваш доминирующий стиль. Вы надёжны, внимательны к деталям и доводите дела до конца. Там, где нужна точность и стабильность, вы незаменимы. Лучшие роли: операционный менеджмент, качество, реализация проектов.",
    descHighEn: "Executor is your dominant style. You're reliable, detail-oriented, and follow through to completion. Where precision and stability are needed, you're indispensable. Best roles: operations management, quality, project delivery.",
    descLowRu: "Исполнительский стиль менее выражен — вам ближе идеи и стратегии, чем методичная реализация.",
    descLowEn: "Executor style is less pronounced — you're more drawn to ideas and strategies than methodical implementation.",
  },
  INNOV: {
    nameRu: "Инноватор",
    nameEn: "Innovator",
    color: "#F59E0B",
    descHighRu: "Инноватор — ваш ведущий стиль. Вы работаете лучше всего там, где можно экспериментировать, пробовать новое и создавать. Рутина вас гасит, а вызов — зажигает. Лучшие роли: продуктовая разработка, R&D, стартапы, дизайн.",
    descHighEn: "Innovator is your leading style. You work best where you can experiment, try new things, and create. Routine dims you, challenge ignites you. Best roles: product development, R&D, startups, design.",
    descLowRu: "Инновационный стиль менее выражен — вы предпочитаете улучшать существующее, а не изобретать с нуля.",
    descLowEn: "Innovative style is less pronounced — you prefer improving the existing rather than inventing from scratch.",
  },
  CONN: {
    nameRu: "Коннектор",
    nameEn: "Connector",
    color: "#8B5CF6",
    descHighRu: "Коннектор — ваш главный стиль. Люди — ваш ресурс и источник энергии. Вы создаёте связи, строите доверие и знаете, как найти подход к любому. Лучшие роли: продажи, HR, клиентский сервис, управление командой, партнёрства.",
    descHighEn: "Connector is your primary style. People are your resource and energy source. You create connections, build trust, and know how to reach anyone. Best roles: sales, HR, customer service, team management, partnerships.",
    descLowRu: "Коннекторский стиль менее выражен — вы предпочитаете работу с задачами, а не с людьми.",
    descLowEn: "Connector style is less pronounced — you prefer working with tasks rather than people.",
  },
  STRAT: {
    nameRu: "Стратег",
    nameEn: "Strategist",
    color: "#3B82F6",
    descHighRu: "Стратег — ваш ведущий стиль. Вы видите картину целиком, строите системы и думаете наперёд. Вам интереснее сформулировать направление, чем пошагово его реализовывать. Лучшие роли: стратегическое планирование, консалтинг, CEO, архитектура решений.",
    descHighEn: "Strategist is your leading style. You see the whole picture, build systems, and think ahead. You're more interested in setting direction than implementing it step by step. Best roles: strategic planning, consulting, CEO, solution architecture.",
    descLowRu: "Стратегический стиль менее выражен — вы предпочитаете конкретику и действие абстрактному планированию.",
    descLowEn: "Strategic style is less pronounced — you prefer concrete action over abstract planning.",
  },
};

export function getWorkStyleQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `ws-q-${item.number}`,
    test_id: WORK_STYLE_TEST_ID,
    question_number: idx + 1,
    text_ru: item.textRu,
    text_en: item.textEn,
    type: "scale" as const,
    depth_level: 1,
    scale_min: 1,
    scale_max: 5,
    scale_min_label_ru: "Совсем не про меня",
    scale_min_label_en: "Not me at all",
    scale_max_label_ru: "Очень точно",
    scale_max_label_en: "Very accurate",
    is_required: true,
    branch_logic: null,
    scoring_key: { dimension: item.dimension },
    metadata: null,
    created_at: new Date().toISOString(),
    options: [
      { id: `ws-o-${item.number}-1`, question_id: `ws-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `ws-o-${item.number}-2`, question_id: `ws-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `ws-o-${item.number}-3`, question_id: `ws-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `ws-o-${item.number}-4`, question_id: `ws-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `ws-o-${item.number}-5`, question_id: `ws-q-${item.number}`, option_key: "5", text_ru: "Очень точно", text_en: "Very accurate", sort_order: 4 },
    ],
  }));
}
