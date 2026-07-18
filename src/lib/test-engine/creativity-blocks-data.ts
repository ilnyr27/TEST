import { Question, QuestionOption } from "@/types/database";

// Блоки творчества — 24 вопроса, 4 измерения по 6 вопросов
// Высокий балл = блок активен (мешает творчеству)
// FEAR=Страх оценки, PERF=Перфекционизм, RIGID=Ригидность, TIME=Нехватка пространства

interface BlockItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "FEAR" | "PERF" | "RIGID" | "TIME";
}

const items: BlockItem[] = [
  // FEAR — Страх оценки и ошибки
  { number: 1,  dimension: "FEAR", textRu: "Я откладываю творческие идеи, боясь, что они окажутся плохими или смешными", textEn: "I put off creative ideas, afraid they'll turn out bad or ridiculous" },
  { number: 2,  dimension: "FEAR", textRu: "Мысль «а что подумают другие» часто останавливает меня от выражения идей", textEn: "The thought 'what will others think' often stops me from expressing my ideas" },
  { number: 3,  dimension: "FEAR", textRu: "Я предпочитаю не рисковать творчески, чтобы не получить отказ или критику", textEn: "I prefer not to take creative risks to avoid rejection or criticism" },
  { number: 4,  dimension: "FEAR", textRu: "Ошибка в творческом проекте переживается мной тяжелее, чем в других областях", textEn: "A mistake in a creative project hits me harder than in other areas" },
  { number: 5,  dimension: "FEAR", textRu: "Мне сложно показать незавершённую работу — я боюсь, что меня осудят", textEn: "It's hard for me to show unfinished work — I'm afraid of being judged" },
  { number: 6,  dimension: "FEAR", textRu: "Я часто думаю: «Это уже сделали до меня лучше» — и это останавливает", textEn: "I often think 'someone else has already done this better' — and that stops me" },

  // PERF — Перфекционизм
  { number: 7,  dimension: "PERF", textRu: "Я не могу показать работу, пока она не станет идеальной — из-за этого проекты затягиваются или не заканчиваются", textEn: "I can't show a work until it's perfect — this causes projects to drag on or never finish" },
  { number: 8,  dimension: "PERF", textRu: "Черновик или набросок вызывает у меня дискомфорт — хочется сразу делать хорошо", textEn: "A draft or sketch makes me uncomfortable — I want to do it well right away" },
  { number: 9,  dimension: "PERF", textRu: "Я трачу непропорционально много времени на шлифовку деталей, которые другие не замечают", textEn: "I spend disproportionate time polishing details that others don't notice" },
  { number: 10, dimension: "PERF", textRu: "«Достаточно хорошо» — не в моём словаре: мне нужно либо отлично, либо я разочарован", textEn: "'Good enough' is not in my vocabulary: I need either excellent or I'm disappointed" },
  { number: 11, dimension: "PERF", textRu: "Страх несовершенства мешает мне начать новый проект", textEn: "Fear of imperfection keeps me from starting a new project" },
  { number: 12, dimension: "PERF", textRu: "Я нередко переделываю уже завершённое — не могу смириться с мелкими недостатками", textEn: "I often redo already completed work — I can't accept minor flaws" },

  // RIGID — Ригидность мышления
  { number: 13, dimension: "RIGID", textRu: "Мне сложно выйти за рамки привычного способа делать вещи", textEn: "It's hard for me to step outside the familiar way of doing things" },
  { number: 14, dimension: "RIGID", textRu: "Когда я сталкиваюсь с нестандартной задачей, я сначала пытаюсь применить знакомые методы", textEn: "When facing a non-standard task I first try to apply familiar methods" },
  { number: 15, dimension: "RIGID", textRu: "Мне некомфортно работать без чёткого плана или структуры — это сковывает свободу идей", textEn: "I'm uncomfortable working without a clear plan or structure — it constrains the freedom of ideas" },
  { number: 16, dimension: "RIGID", textRu: "Я склонен думать о проблемах в рамках устоявшихся категорий и не выхожу за их пределы", textEn: "I tend to think about problems within established categories and don't go beyond them" },
  { number: 17, dimension: "RIGID", textRu: "Нестандартные, «безумные» идеи я отметаю быстро — они кажутся нереалистичными", textEn: "I quickly dismiss unconventional, 'crazy' ideas — they seem unrealistic" },
  { number: 18, dimension: "RIGID", textRu: "Мне сложно принять, что задача может иметь несколько правильных решений", textEn: "It's hard for me to accept that a problem can have multiple right solutions" },

  // TIME — Нехватка времени и пространства
  { number: 19, dimension: "TIME", textRu: "В моей жизни почти не остаётся времени на творческие занятия — всё забирают дела", textEn: "There's almost no time in my life for creative activities — everything is taken up by tasks" },
  { number: 20, dimension: "TIME", textRu: "Я редко позволяю себе «просто играть» с идеями без конкретной цели", textEn: "I rarely allow myself to 'just play' with ideas without a specific goal" },
  { number: 21, dimension: "TIME", textRu: "У меня нет регулярного времени или места, где я могу творить без прерываний", textEn: "I don't have regular time or space where I can create without interruptions" },
  { number: 22, dimension: "TIME", textRu: "Творческие проекты кажутся мне «непозволительной роскошью» на фоне срочных дел", textEn: "Creative projects feel like an 'unaffordable luxury' against a backdrop of urgent tasks" },
  { number: 23, dimension: "TIME", textRu: "Я не веду дневников, скетчбуков или других пространств для накопления идей", textEn: "I don't keep journals, sketchbooks, or other spaces for accumulating ideas" },
  { number: 24, dimension: "TIME", textRu: "Моё рабочее или домашнее пространство не располагает к творческому настрою", textEn: "My work or home environment doesn't invite a creative mindset" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const CREATIVITY_BLOCKS_TEST_ID = "creativity-blocks";

export const creativityBlocksTestMeta = {
  id: CREATIVITY_BLOCKS_TEST_ID,
  slug: "creativity-blocks",
  nameRu: "Блоки творчества",
  nameEn: "Creativity Blocks",
  descriptionRu: "Что мешает вам быть творческим? Тест выявляет четыре главных блока: страх оценки, перфекционизм, ригидность мышления и нехватку пространства для творчества.",
  descriptionEn: "What prevents you from being creative? The test identifies four main blocks: fear of judgment, perfectionism, cognitive rigidity, and lack of creative space.",
  methodology: "Creativity Blocks Inventory (Adams adapted)",
  estimatedMinutes: 6,
  questionCount: 24,
  category: "creativity",
};

export const creativityBlocksDimensions = {
  FEAR: {
    nameRu: "Страх оценки",
    nameEn: "Fear of Judgment",
    color: "#EF4444",
    descHighRu: "Страх оценки активно блокирует вашу творческую свободу. Беспокойство о том, что подумают другие, мешает рисковать и выражать идеи. Хорошая новость: страх оценки уменьшается с практикой публичного творчества — даже маленькими шагами.",
    descHighEn: "Fear of judgment actively blocks your creative freedom. Worrying about what others will think prevents you from taking risks and expressing ideas. Good news: fear of judgment decreases with practice in public creativity — even small steps help.",
    descLowRu: "Страх оценки выражен слабо — вы достаточно свободны от мнений других в своём творчестве.",
    descLowEn: "Fear of judgment is weakly expressed — you're fairly free from others' opinions in your creativity.",
  },
  PERF: {
    nameRu: "Перфекционизм",
    nameEn: "Perfectionism",
    color: "#F59E0B",
    descHighRu: "Перфекционизм — ваш главный тормоз. Стремление к совершенству с первого раза блокирует эксперимент и завершение. Творчество требует права на черновик. Попробуйте принцип «готово лучше, чем идеально».",
    descHighEn: "Perfectionism is your main brake. The desire for perfection from the start blocks experimentation and completion. Creativity requires the right to draft. Try the principle 'done is better than perfect'.",
    descLowRu: "Перфекционизм выражен слабо — вы готовы работать с черновиками и несовершенными результатами.",
    descLowEn: "Perfectionism is weakly expressed — you're comfortable working with drafts and imperfect results.",
  },
  RIGID: {
    nameRu: "Ригидность мышления",
    nameEn: "Cognitive Rigidity",
    color: "#6366F1",
    descHighRu: "Ригидность мышления ограничивает творческий диапазон. Привычные категории, методы и ожидание «одного правильного ответа» сужают пространство идей. Расшатать это помогают случайные ассоциации, смена контекста и работа с метафорами.",
    descHighEn: "Cognitive rigidity limits your creative range. Familiar categories, methods, and expecting 'one right answer' narrow the idea space. Random associations, context switching, and working with metaphors can help loosen this.",
    descLowRu: "Ригидность мышления выражена слабо — вы гибко переключаетесь между разными подходами и категориями.",
    descLowEn: "Cognitive rigidity is weakly expressed — you flexibly switch between different approaches and categories.",
  },
  TIME: {
    nameRu: "Нехватка пространства",
    nameEn: "Lack of Creative Space",
    color: "#10B981",
    descHighRu: "Нехватка времени и пространства — системный блок. Без регулярного «творческого окна» даже самые способные люди теряют форму. Небольшие, но постоянные блоки для творчества (15–30 минут в день) меняют всё.",
    descHighEn: "Lack of time and space is a systemic block. Without a regular 'creative window' even the most talented people lose their form. Small but consistent creative blocks (15–30 minutes a day) change everything.",
    descLowRu: "Нехватка пространства не характерна — у вас есть время и среда для творчества.",
    descLowEn: "Lack of creative space is not typical — you have time and an environment for creativity.",
  },
};

export function getCreativityBlocksQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `cb2-q-${item.number}`,
    test_id: CREATIVITY_BLOCKS_TEST_ID,
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
      { id: `cb2-o-${item.number}-1`, question_id: `cb2-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `cb2-o-${item.number}-2`, question_id: `cb2-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `cb2-o-${item.number}-3`, question_id: `cb2-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `cb2-o-${item.number}-4`, question_id: `cb2-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `cb2-o-${item.number}-5`, question_id: `cb2-q-${item.number}`, option_key: "5", text_ru: "Очень точно", text_en: "Very accurate", sort_order: 4 },
    ],
  }));
}
