import { Question, QuestionOption } from "@/types/database";

// MBTI-light Personality Archetypes
// 4 dichotomies: E/I (Extraversion/Introversion), S/N (Sensing/Intuition),
// T/F (Thinking/Feeling), J/P (Judging/Perceiving)
// 30 questions: EI=8, SN=8, TF=7, JP=7
// Type: single_choice with 2 options (a / b)

export const MBTI_TEST_ID = "mbti-light";

export const mbtiTestMeta = {
  id: MBTI_TEST_ID,
  slug: "mbti-light",
  nameRu: "Архетипы личности",
  nameEn: "Personality Archetypes",
  descriptionRu:
    "Определите свой тип личности из 16 архетипов. 4 измерения: энергия, восприятие, принятие решений, образ жизни.",
  descriptionEn:
    "Discover your personality type among 16 archetypes. 4 dimensions: energy, perception, decision-making, lifestyle.",
  methodology: "MBTI-light adapted",
  estimatedMinutes: 7,
  questionCount: 30,
  category: "fun",
};

type MBTIDimension = "EI" | "SN" | "TF" | "JP";

interface MBTIItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: MBTIDimension;
  optionA: { textRu: string; textEn: string };
  optionB: { textRu: string; textEn: string };
  /** Which pole does option "a" map to, and which pole does option "b" map to */
  choice_scores: { a: string; b: string };
}

const items: MBTIItem[] = [
  // ===== E/I — Extraversion vs Introversion (8 questions) =====
  {
    number: 1,
    textRu: "Пятница вечером. Что звучит лучше?",
    textEn: "Friday evening. What sounds better?",
    dimension: "EI",
    optionA: { textRu: "Вечеринка с друзьями — чем больше людей, тем веселее", textEn: "Party with friends — the more people, the merrier" },
    optionB: { textRu: "Уютный вечер дома с книгой или сериалом", textEn: "Cozy evening at home with a book or a show" },
    choice_scores: { a: "E", b: "I" },
  },
  {
    number: 2,
    textRu: "На рабочей встрече вы обычно...",
    textEn: "In a work meeting you usually...",
    dimension: "EI",
    optionA: { textRu: "Сразу делюсь идеями, думаю вслух", textEn: "Jump in with ideas right away, think out loud" },
    optionB: { textRu: "Сначала слушаю, обдумываю, потом говорю", textEn: "Listen first, think it over, then speak" },
    choice_scores: { a: "E", b: "I" },
  },
  {
    number: 3,
    textRu: "После долгого дня с людьми вы чувствуете...",
    textEn: "After a long day with people you feel...",
    dimension: "EI",
    optionA: { textRu: "Заряженным энергией, хочется ещё общения", textEn: "Energized, craving even more interaction" },
    optionB: { textRu: "Вымотанным — нужно побыть одному", textEn: "Drained — need some alone time" },
    choice_scores: { a: "E", b: "I" },
  },
  {
    number: 4,
    textRu: "Ваш стиль знакомства с новыми людьми:",
    textEn: "Your style of meeting new people:",
    dimension: "EI",
    optionA: { textRu: "Легко подхожу первым и завожу разговор", textEn: "I easily approach others and start a conversation" },
    optionB: { textRu: "Жду, пока кто-то сам подойдёт ко мне", textEn: "I wait for someone to approach me first" },
    choice_scores: { a: "E", b: "I" },
  },
  {
    number: 5,
    textRu: "Вы лучше работаете, когда...",
    textEn: "You work best when...",
    dimension: "EI",
    optionA: { textRu: "Вокруг есть люди, можно обсудить задачу", textEn: "There are people around to discuss things with" },
    optionB: { textRu: "Вы в тишине и никто не отвлекает", textEn: "You're in silence with no distractions" },
    choice_scores: { a: "E", b: "I" },
  },
  {
    number: 6,
    textRu: "Ваш телефон звонит. Незнакомый номер.",
    textEn: "Your phone rings. Unknown number.",
    dimension: "EI",
    optionA: { textRu: "Без проблем отвечаю — может, что-то интересное", textEn: "No problem, I pick up — could be interesting" },
    optionB: { textRu: "Пусть оставят голосовое, потом перезвоню", textEn: "Let it go to voicemail, I'll call back later" },
    choice_scores: { a: "E", b: "I" },
  },
  {
    number: 7,
    textRu: "Идеальный отпуск для вас:",
    textEn: "Your ideal vacation:",
    dimension: "EI",
    optionA: { textRu: "Активный тур с группой, новые знакомства", textEn: "Active group tour, meeting new people" },
    optionB: { textRu: "Спокойное место подальше от толпы", textEn: "A quiet place away from crowds" },
    choice_scores: { a: "E", b: "I" },
  },
  {
    number: 8,
    textRu: "Когда у вас хорошие новости, вы...",
    textEn: "When you have good news, you...",
    dimension: "EI",
    optionA: { textRu: "Сразу рассказываю всем подряд", textEn: "Immediately tell everyone around" },
    optionB: { textRu: "Сначала обдумываю, потом делюсь с близкими", textEn: "Think it over first, then share with close ones" },
    choice_scores: { a: "E", b: "I" },
  },

  // ===== S/N — Sensing vs Intuition (8 questions) =====
  {
    number: 9,
    textRu: "Что важнее при выборе маршрута?",
    textEn: "What matters more when choosing a route?",
    dimension: "SN",
    optionA: { textRu: "Проверенная дорога — знаю, что доеду", textEn: "The proven road — I know I'll get there" },
    optionB: { textRu: "Новый путь — вдруг найду что-то классное", textEn: "A new path — maybe I'll discover something cool" },
    choice_scores: { a: "S", b: "N" },
  },
  {
    number: 10,
    textRu: "Когда вы читаете книгу, вам больше нравится...",
    textEn: "When reading a book, you prefer...",
    dimension: "SN",
    optionA: { textRu: "Реалистичные истории о повседневной жизни", textEn: "Realistic stories about everyday life" },
    optionB: { textRu: "Фантастические миры и необычные идеи", textEn: "Fantasy worlds and unusual ideas" },
    choice_scores: { a: "S", b: "N" },
  },
  {
    number: 11,
    textRu: "На что вы обращаете внимание при знакомстве?",
    textEn: "What do you notice when meeting someone?",
    dimension: "SN",
    optionA: { textRu: "Конкретные детали: одежда, голос, манеры", textEn: "Specific details: clothes, voice, manners" },
    optionB: { textRu: "Общее впечатление: энергетику, атмосферу", textEn: "Overall impression: vibe, energy" },
    choice_scores: { a: "S", b: "N" },
  },
  {
    number: 12,
    textRu: "Вам предлагают новый проект. Что спросите первым?",
    textEn: "You're offered a new project. What do you ask first?",
    dimension: "SN",
    optionA: { textRu: "Какие конкретные задачи и сроки?", textEn: "What are the specific tasks and deadlines?" },
    optionB: { textRu: "Какова общая идея и к чему это может привести?", textEn: "What's the big idea and where could it lead?" },
    choice_scores: { a: "S", b: "N" },
  },
  {
    number: 13,
    textRu: "Как вы учитесь новому?",
    textEn: "How do you learn new things?",
    dimension: "SN",
    optionA: { textRu: "Шаг за шагом, с примерами и практикой", textEn: "Step by step, with examples and practice" },
    optionB: { textRu: "Сначала понимаю общую картину, потом детали", textEn: "First grasp the big picture, then the details" },
    choice_scores: { a: "S", b: "N" },
  },
  {
    number: 14,
    textRu: "Что вас больше вдохновляет?",
    textEn: "What inspires you more?",
    dimension: "SN",
    optionA: { textRu: "Реальные достижения и проверенный опыт", textEn: "Real achievements and proven experience" },
    optionB: { textRu: "Новые возможности и нестандартные идеи", textEn: "New possibilities and unconventional ideas" },
    choice_scores: { a: "S", b: "N" },
  },
  {
    number: 15,
    textRu: "Ваш стиль описания событий:",
    textEn: "Your style of describing events:",
    dimension: "SN",
    optionA: { textRu: "Точно и подробно: кто, где, когда", textEn: "Precisely and in detail: who, where, when" },
    optionB: { textRu: "Образно и с метафорами, передавая суть", textEn: "With metaphors and imagery, conveying the essence" },
    choice_scores: { a: "S", b: "N" },
  },
  {
    number: 16,
    textRu: "Когда вы думаете о будущем, вы...",
    textEn: "When you think about the future, you...",
    dimension: "SN",
    optionA: { textRu: "Строю реалистичные планы на ближайшее время", textEn: "Make realistic plans for the near term" },
    optionB: { textRu: "Представляю разные варианты, даже маловероятные", textEn: "Imagine various scenarios, even unlikely ones" },
    choice_scores: { a: "S", b: "N" },
  },

  // ===== T/F — Thinking vs Feeling (7 questions) =====
  {
    number: 17,
    textRu: "Друг просит совет по сложной ситуации. Вы:",
    textEn: "A friend asks for advice on a tough situation. You:",
    dimension: "TF",
    optionA: { textRu: "Анализирую факты и предлагаю логичное решение", textEn: "Analyze the facts and suggest a logical solution" },
    optionB: { textRu: "Сначала выслушаю, пойму чувства, потом предложу", textEn: "Listen first, understand feelings, then suggest" },
    choice_scores: { a: "T", b: "F" },
  },
  {
    number: 18,
    textRu: "При выборе между двумя кандидатами на работу вы бы...",
    textEn: "When choosing between two job candidates you would...",
    dimension: "TF",
    optionA: { textRu: "Сравнил навыки и опыт по объективным критериям", textEn: "Compare skills and experience using objective criteria" },
    optionB: { textRu: "Учёл, кто лучше впишется в команду по духу", textEn: "Consider who would fit the team spirit better" },
    choice_scores: { a: "T", b: "F" },
  },
  {
    number: 19,
    textRu: "Что для вас важнее в споре?",
    textEn: "What matters more to you in a debate?",
    dimension: "TF",
    optionA: { textRu: "Найти истину, даже если это неприятно", textEn: "Find the truth, even if it's uncomfortable" },
    optionB: { textRu: "Сохранить хорошие отношения с оппонентом", textEn: "Maintain good relations with the opponent" },
    choice_scores: { a: "T", b: "F" },
  },
  {
    number: 20,
    textRu: "Вас больше расстраивает, когда вас считают...",
    textEn: "It upsets you more when people think you are...",
    dimension: "TF",
    optionA: { textRu: "Некомпетентным или нелогичным", textEn: "Incompetent or illogical" },
    optionB: { textRu: "Бесчувственным или равнодушным", textEn: "Insensitive or indifferent" },
    choice_scores: { a: "T", b: "F" },
  },
  {
    number: 21,
    textRu: "Как вы принимаете важные решения?",
    textEn: "How do you make important decisions?",
    dimension: "TF",
    optionA: { textRu: "Составляю список плюсов и минусов", textEn: "I make a pros and cons list" },
    optionB: { textRu: "Прислушиваюсь к своему внутреннему голосу", textEn: "I listen to my gut feeling" },
    choice_scores: { a: "T", b: "F" },
  },
  {
    number: 22,
    textRu: "В фильме вас больше цепляет...",
    textEn: "In a movie, what hooks you more...",
    dimension: "TF",
    optionA: { textRu: "Хитроумный сюжет и логичные повороты", textEn: "A clever plot with logical twists" },
    optionB: { textRu: "Глубокие эмоции и отношения персонажей", textEn: "Deep emotions and character relationships" },
    choice_scores: { a: "T", b: "F" },
  },
  {
    number: 23,
    textRu: "Комплимент, который для вас ценнее:",
    textEn: "A compliment you value more:",
    dimension: "TF",
    optionA: { textRu: "\"Ты всегда мыслишь ясно и объективно\"", textEn: "\"You always think clearly and objectively\"" },
    optionB: { textRu: "\"С тобой всегда тепло и комфортно\"", textEn: "\"It's always warm and comfortable around you\"" },
    choice_scores: { a: "T", b: "F" },
  },

  // ===== J/P — Judging vs Perceiving (7 questions) =====
  {
    number: 24,
    textRu: "Ваш подход к планированию выходных:",
    textEn: "Your approach to planning a weekend:",
    dimension: "JP",
    optionA: { textRu: "Заранее составляю план: куда, когда, с кем", textEn: "Plan ahead: where, when, with whom" },
    optionB: { textRu: "Решаю по ситуации — утром посмотрю", textEn: "Decide as I go — I'll see in the morning" },
    choice_scores: { a: "J", b: "P" },
  },
  {
    number: 25,
    textRu: "Дедлайн через неделю. Когда вы начинаете?",
    textEn: "Deadline in a week. When do you start?",
    dimension: "JP",
    optionA: { textRu: "Сразу — люблю закончить заранее", textEn: "Right away — I like to finish early" },
    optionB: { textRu: "Ближе к сроку — под давлением работаю лучше", textEn: "Closer to the deadline — I work better under pressure" },
    choice_scores: { a: "J", b: "P" },
  },
  {
    number: 26,
    textRu: "Ваш рабочий стол (реальный или компьютерный):",
    textEn: "Your desk (physical or digital):",
    dimension: "JP",
    optionA: { textRu: "Порядок, всё по папкам и местам", textEn: "Organized, everything in folders and places" },
    optionB: { textRu: "Творческий хаос — но я знаю, где что лежит", textEn: "Creative chaos — but I know where everything is" },
    choice_scores: { a: "J", b: "P" },
  },
  {
    number: 27,
    textRu: "Вы начали смотреть сериал. Ваш стиль:",
    textEn: "You started watching a series. Your style:",
    dimension: "JP",
    optionA: { textRu: "По серии в день, по расписанию", textEn: "One episode a day, on schedule" },
    optionB: { textRu: "Запоем — пока не досмотрю или не надоест", textEn: "Binge-watch until I finish or get bored" },
    choice_scores: { a: "J", b: "P" },
  },
  {
    number: 28,
    textRu: "Когда планы неожиданно меняются, вы...",
    textEn: "When plans suddenly change, you...",
    dimension: "JP",
    optionA: { textRu: "Слегка раздражаюсь — я же всё спланировал", textEn: "Get a bit annoyed — I had everything planned" },
    optionB: { textRu: "Легко адаптируюсь — может, так даже лучше", textEn: "Easily adapt — maybe it's even better this way" },
    choice_scores: { a: "J", b: "P" },
  },
  {
    number: 29,
    textRu: "Ваш подход к списку дел:",
    textEn: "Your approach to a to-do list:",
    dimension: "JP",
    optionA: { textRu: "Веду список и вычёркиваю с удовольствием", textEn: "I keep a list and love checking things off" },
    optionB: { textRu: "Список? Какой список? Я и так помню главное", textEn: "List? What list? I remember the important stuff" },
    choice_scores: { a: "J", b: "P" },
  },
  {
    number: 30,
    textRu: "Как вы готовитесь к поездке?",
    textEn: "How do you prepare for a trip?",
    dimension: "JP",
    optionA: { textRu: "Чемодан собран за день, маршрут расписан", textEn: "Bag packed a day early, route mapped out" },
    optionB: { textRu: "Кидаю вещи в последний момент, разберусь на месте", textEn: "Throw things in last minute, I'll figure it out there" },
    choice_scores: { a: "J", b: "P" },
  },
];

function makeOptions(qNum: number, item: MBTIItem): QuestionOption[] {
  return [
    {
      id: `mb-o-${qNum}-a`,
      question_id: `mb-q-${qNum}`,
      option_key: "a",
      text_ru: item.optionA.textRu,
      text_en: item.optionA.textEn,
      sort_order: 0,
    },
    {
      id: `mb-o-${qNum}-b`,
      question_id: `mb-q-${qNum}`,
      option_key: "b",
      text_ru: item.optionB.textRu,
      text_en: item.optionB.textEn,
      sort_order: 1,
    },
  ];
}

export function getMBTIQuestions(): (Question & { options: QuestionOption[] })[] {
  return items.map((item, idx) => ({
    id: `mb-q-${item.number}`,
    test_id: MBTI_TEST_ID,
    question_number: idx + 1,
    text_ru: item.textRu,
    text_en: item.textEn,
    type: "single_choice" as const,
    depth_level: 1,
    scale_min: null,
    scale_max: null,
    scale_min_label_ru: null,
    scale_min_label_en: null,
    scale_max_label_ru: null,
    scale_max_label_en: null,
    is_required: true,
    branch_logic: null,
    scoring_key: {
      dimension: item.dimension,
      choice_scores: item.choice_scores,
    },
    metadata: null,
    created_at: new Date().toISOString(),
    options: makeOptions(item.number, item),
  }));
}

export const mbtiDimensions = {
  EI: {
    nameRu: "Экстраверсия / Интроверсия",
    nameEn: "Extraversion / Introversion",
    poleA: { key: "E", nameRu: "Экстраверсия", nameEn: "Extraversion", descRu: "Вы черпаете энергию из общения. Любите быть среди людей, думаете вслух и быстро действуете.", descEn: "You gain energy from socializing. You enjoy being around people, think out loud, and act quickly." },
    poleB: { key: "I", nameRu: "Интроверсия", nameEn: "Introversion", descRu: "Вы черпаете энергию в уединении. Предпочитаете глубокие разговоры поверхностным и обдумываете перед действием.", descEn: "You recharge through solitude. You prefer deep conversations over small talk and think before acting." },
    color: "#8b5cf6",
  },
  SN: {
    nameRu: "Сенсорика / Интуиция",
    nameEn: "Sensing / Intuition",
    poleA: { key: "S", nameRu: "Сенсорика", nameEn: "Sensing", descRu: "Вы доверяете фактам, деталям и проверенному опыту. Живёте настоящим и цените конкретику.", descEn: "You trust facts, details, and proven experience. You live in the present and value specifics." },
    poleB: { key: "N", nameRu: "Интуиция", nameEn: "Intuition", descRu: "Вы видите общую картину, паттерны и скрытые связи. Вас вдохновляют идеи и возможности.", descEn: "You see the big picture, patterns, and hidden connections. You're inspired by ideas and possibilities." },
    color: "#06b6d4",
  },
  TF: {
    nameRu: "Мышление / Чувствование",
    nameEn: "Thinking / Feeling",
    poleA: { key: "T", nameRu: "Мышление", nameEn: "Thinking", descRu: "Вы принимаете решения на основе логики и объективного анализа. Цените справедливость и последовательность.", descEn: "You make decisions based on logic and objective analysis. You value fairness and consistency." },
    poleB: { key: "F", nameRu: "Чувствование", nameEn: "Feeling", descRu: "Вы принимаете решения, учитывая чувства и ценности людей. Стремитесь к гармонии и эмпатии.", descEn: "You make decisions considering people's feelings and values. You strive for harmony and empathy." },
    color: "#f59e0b",
  },
  JP: {
    nameRu: "Суждение / Восприятие",
    nameEn: "Judging / Perceiving",
    poleA: { key: "J", nameRu: "Суждение", nameEn: "Judging", descRu: "Вы любите структуру, план и определённость. Доводите дела до конца и цените порядок.", descEn: "You love structure, planning, and certainty. You follow through and value order." },
    poleB: { key: "P", nameRu: "Восприятие", nameEn: "Perceiving", descRu: "Вы гибки, спонтанны и открыты новому. Предпочитаете свободу и адаптируетесь на ходу.", descEn: "You are flexible, spontaneous, and open to new things. You prefer freedom and adapt on the go." },
    color: "#ec4899",
  },
};
