import { Question, QuestionOption } from "@/types/database";

// Holland RIASEC Career Interest Inventory
// R=Realistic, I=Investigative, A=Artistic, S=Social, E=Enterprising, C=Conventional
// 60 questions: 10 per dimension, single_choice (Yes/No = like/dislike activity)

export const RIASEC_TEST_ID = "riasec";

export const riasecTestMeta = {
  id: RIASEC_TEST_ID,
  slug: "riasec",
  nameRu: "Профориентация RIASEC",
  nameEn: "Career Orientation RIASEC",
  descriptionRu: "Определите ваш профессиональный тип по модели Холланда. 6 типов: Реалистичный, Исследовательский, Артистичный, Социальный, Предприимчивый, Конвенциональный.",
  descriptionEn: "Discover your professional type using Holland's model. 6 types: Realistic, Investigative, Artistic, Social, Enterprising, Conventional.",
  methodology: "Holland RIASEC",
  estimatedMinutes: 15,
  questionCount: 60,
  category: "career",
};

interface RiasecItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "R" | "I" | "A" | "S" | "E" | "C";
}

const items: RiasecItem[] = [
  // Realistic (R) — hands-on, practical
  { number: 1, textRu: "Мне нравится работать руками, ремонтировать вещи", textEn: "I enjoy working with my hands, fixing things", dimension: "R" },
  { number: 2, textRu: "Я предпочитаю работу на свежем воздухе", textEn: "I prefer outdoor work", dimension: "R" },
  { number: 3, textRu: "Мне нравится работать с инструментами и оборудованием", textEn: "I like working with tools and equipment", dimension: "R" },
  { number: 4, textRu: "Я предпочитаю конкретные задачи, а не абстрактные", textEn: "I prefer concrete tasks over abstract ones", dimension: "R" },
  { number: 5, textRu: "Мне нравится физическая работа", textEn: "I enjoy physical work", dimension: "R" },
  { number: 6, textRu: "Я хорошо разбираюсь в технике", textEn: "I'm good with technology and machines", dimension: "R" },
  { number: 7, textRu: "Мне нравится строить и конструировать", textEn: "I enjoy building and constructing things", dimension: "R" },
  { number: 8, textRu: "Я предпочитаю действовать, а не обсуждать", textEn: "I prefer doing over discussing", dimension: "R" },
  { number: 9, textRu: "Мне нравится работать с животными или растениями", textEn: "I enjoy working with animals or plants", dimension: "R" },
  { number: 10, textRu: "Я люблю спорт и физическую активность", textEn: "I love sports and physical activity", dimension: "R" },

  // Investigative (I) — analytical, intellectual
  { number: 11, textRu: "Мне нравится решать сложные задачи и головоломки", textEn: "I enjoy solving complex problems and puzzles", dimension: "I" },
  { number: 12, textRu: "Я люблю читать научные статьи и книги", textEn: "I love reading scientific articles and books", dimension: "I" },
  { number: 13, textRu: "Мне нравится анализировать данные", textEn: "I enjoy analyzing data", dimension: "I" },
  { number: 14, textRu: "Я задаю много вопросов о том, как вещи работают", textEn: "I ask many questions about how things work", dimension: "I" },
  { number: 15, textRu: "Мне нравится проводить исследования", textEn: "I enjoy conducting research", dimension: "I" },
  { number: 16, textRu: "Я предпочитаю работать самостоятельно над интеллектуальными задачами", textEn: "I prefer working independently on intellectual tasks", dimension: "I" },
  { number: 17, textRu: "Мне интересна математика и статистика", textEn: "I'm interested in mathematics and statistics", dimension: "I" },
  { number: 18, textRu: "Я люблю экспериментировать", textEn: "I love experimenting", dimension: "I" },
  { number: 19, textRu: "Мне нравится разбираться в причинах явлений", textEn: "I enjoy understanding causes of phenomena", dimension: "I" },
  { number: 20, textRu: "Я предпочитаю логику и факты эмоциям", textEn: "I prefer logic and facts over emotions", dimension: "I" },

  // Artistic (A) — creative, expressive
  { number: 21, textRu: "Мне нравится рисовать, лепить или делать фото", textEn: "I enjoy drawing, sculpting, or photography", dimension: "A" },
  { number: 22, textRu: "Я люблю музыку и/или играю на инструменте", textEn: "I love music and/or play an instrument", dimension: "A" },
  { number: 23, textRu: "Мне нравится писать рассказы, стихи или сценарии", textEn: "I enjoy writing stories, poems, or scripts", dimension: "A" },
  { number: 24, textRu: "Я ценю оригинальность и самовыражение", textEn: "I value originality and self-expression", dimension: "A" },
  { number: 25, textRu: "Мне нравится дизайн — интерьеров, одежды, графики", textEn: "I enjoy design — interiors, fashion, graphics", dimension: "A" },
  { number: 26, textRu: "Я часто мечтаю и фантазирую", textEn: "I often daydream and fantasize", dimension: "A" },
  { number: 27, textRu: "Мне нравится ходить в музеи, театры, на выставки", textEn: "I enjoy visiting museums, theaters, exhibitions", dimension: "A" },
  { number: 28, textRu: "Я не люблю жёсткие правила и рутину", textEn: "I dislike rigid rules and routine", dimension: "A" },
  { number: 29, textRu: "Мне нравится импровизировать", textEn: "I enjoy improvising", dimension: "A" },
  { number: 30, textRu: "Я выражаю себя через творчество", textEn: "I express myself through creativity", dimension: "A" },

  // Social (S) — helping, teaching
  { number: 31, textRu: "Мне нравится помогать другим людям", textEn: "I enjoy helping other people", dimension: "S" },
  { number: 32, textRu: "Я хороший слушатель", textEn: "I'm a good listener", dimension: "S" },
  { number: 33, textRu: "Мне нравится обучать и объяснять", textEn: "I enjoy teaching and explaining", dimension: "S" },
  { number: 34, textRu: "Я легко нахожу общий язык с разными людьми", textEn: "I easily connect with different people", dimension: "S" },
  { number: 35, textRu: "Мне важна атмосфера в коллективе", textEn: "Team atmosphere is important to me", dimension: "S" },
  { number: 36, textRu: "Я часто выступаю посредником в конфликтах", textEn: "I often mediate in conflicts", dimension: "S" },
  { number: 37, textRu: "Мне нравится волонтёрство", textEn: "I enjoy volunteering", dimension: "S" },
  { number: 38, textRu: "Я предпочитаю командную работу индивидуальной", textEn: "I prefer teamwork over individual work", dimension: "S" },
  { number: 39, textRu: "Мне нравится заботиться о других", textEn: "I enjoy caring for others", dimension: "S" },
  { number: 40, textRu: "Я мечтаю сделать мир лучше", textEn: "I dream of making the world a better place", dimension: "S" },

  // Enterprising (E) — leadership, persuasion
  { number: 41, textRu: "Мне нравится руководить проектами", textEn: "I enjoy leading projects", dimension: "E" },
  { number: 42, textRu: "Я умею убеждать людей", textEn: "I'm good at persuading people", dimension: "E" },
  { number: 43, textRu: "Мне нравится продавать идеи или продукты", textEn: "I enjoy selling ideas or products", dimension: "E" },
  { number: 44, textRu: "Я люблю конкуренцию и соревнования", textEn: "I love competition", dimension: "E" },
  { number: 45, textRu: "Мне нравится принимать рискованные решения", textEn: "I enjoy making risky decisions", dimension: "E" },
  { number: 46, textRu: "Я предпочитаю быть лидером, а не подчинённым", textEn: "I prefer being a leader rather than a follower", dimension: "E" },
  { number: 47, textRu: "Мне нравится вести переговоры", textEn: "I enjoy negotiating", dimension: "E" },
  { number: 48, textRu: "Я амбициозен и ставлю высокие цели", textEn: "I'm ambitious and set high goals", dimension: "E" },
  { number: 49, textRu: "Мне нравится публичные выступления", textEn: "I enjoy public speaking", dimension: "E" },
  { number: 50, textRu: "Я мечтаю о собственном бизнесе", textEn: "I dream of having my own business", dimension: "E" },

  // Conventional (C) — organized, detail-oriented
  { number: 51, textRu: "Мне нравится работать с числами и таблицами", textEn: "I enjoy working with numbers and spreadsheets", dimension: "C" },
  { number: 52, textRu: "Я люблю порядок и систематизацию", textEn: "I love order and organization", dimension: "C" },
  { number: 53, textRu: "Мне нравится следовать чётким инструкциям", textEn: "I enjoy following clear instructions", dimension: "C" },
  { number: 54, textRu: "Я внимателен к деталям", textEn: "I'm detail-oriented", dimension: "C" },
  { number: 55, textRu: "Мне нравится вести учёт и документацию", textEn: "I enjoy keeping records and documentation", dimension: "C" },
  { number: 56, textRu: "Я предпочитаю стабильную и предсказуемую работу", textEn: "I prefer stable and predictable work", dimension: "C" },
  { number: 57, textRu: "Мне нравится планировать бюджеты", textEn: "I enjoy planning budgets", dimension: "C" },
  { number: 58, textRu: "Я хорош в работе с базами данных и файлами", textEn: "I'm good at working with databases and files", dimension: "C" },
  { number: 59, textRu: "Мне нравится проверять работу на ошибки", textEn: "I enjoy checking work for errors", dimension: "C" },
  { number: 60, textRu: "Я предпочитаю чёткую структуру свободному графику", textEn: "I prefer a clear structure over a free schedule", dimension: "C" },
];

const yesNoOptions = (qNum: number): QuestionOption[] => [
  { id: `ri-o-${qNum}-y`, question_id: `ri-q-${qNum}`, option_key: "yes", text_ru: "Да, это про меня", text_en: "Yes, that's me", sort_order: 0 },
  { id: `ri-o-${qNum}-s`, question_id: `ri-q-${qNum}`, option_key: "somewhat", text_ru: "Частично", text_en: "Somewhat", sort_order: 1 },
  { id: `ri-o-${qNum}-n`, question_id: `ri-q-${qNum}`, option_key: "no", text_ru: "Нет, не про меня", text_en: "No, not me", sort_order: 2 },
];

export function getRIASECQuestions(): (Question & { options: QuestionOption[] })[] {
  return items.map((item, idx) => ({
    id: `ri-q-${item.number}`,
    test_id: RIASEC_TEST_ID,
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
    scoring_key: { dimension: item.dimension },
    metadata: null,
    created_at: new Date().toISOString(),
    options: yesNoOptions(item.number),
  }));
}

export const riasecDimensions = {
  R: {
    nameRu: "Реалистичный",
    nameEn: "Realistic",
    descRu: "Практичный, технический, работа руками. Профессии: инженер, механик, фермер, электрик, хирург.",
    descEn: "Practical, technical, hands-on. Careers: engineer, mechanic, farmer, electrician, surgeon.",
    color: "#3B82F6",
  },
  I: {
    nameRu: "Исследовательский",
    nameEn: "Investigative",
    descRu: "Аналитический, интеллектуальный, научный. Профессии: учёный, программист, аналитик, врач, исследователь.",
    descEn: "Analytical, intellectual, scientific. Careers: scientist, programmer, analyst, doctor, researcher.",
    color: "#8B5CF6",
  },
  A: {
    nameRu: "Артистичный",
    nameEn: "Artistic",
    descRu: "Креативный, выразительный, независимый. Профессии: дизайнер, писатель, музыкант, режиссёр, архитектор.",
    descEn: "Creative, expressive, independent. Careers: designer, writer, musician, director, architect.",
    color: "#EC4899",
  },
  S: {
    nameRu: "Социальный",
    nameEn: "Social",
    descRu: "Помогающий, обучающий, коммуникативный. Профессии: учитель, психолог, врач, социальный работник, HR.",
    descEn: "Helping, teaching, communicative. Careers: teacher, psychologist, doctor, social worker, HR.",
    color: "#10B981",
  },
  E: {
    nameRu: "Предприимчивый",
    nameEn: "Enterprising",
    descRu: "Лидерский, амбициозный, убедительный. Профессии: менеджер, предприниматель, юрист, маркетолог, политик.",
    descEn: "Leading, ambitious, persuasive. Careers: manager, entrepreneur, lawyer, marketer, politician.",
    color: "#F59E0B",
  },
  C: {
    nameRu: "Конвенциональный",
    nameEn: "Conventional",
    descRu: "Организованный, точный, систематичный. Профессии: бухгалтер, аудитор, администратор, банкир, логист.",
    descEn: "Organized, precise, systematic. Careers: accountant, auditor, administrator, banker, logistician.",
    color: "#6B7280",
  },
};
