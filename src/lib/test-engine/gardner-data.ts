import { Question, QuestionOption } from "@/types/database";

// Gardner's Multiple Intelligences Test
// Dimensions: LI=Linguistic, LM=Logical-Mathematical, SP=Spatial, MU=Musical,
//             BK=Bodily-Kinesthetic, IE=Interpersonal, IA=Intrapersonal, NA=Naturalistic
// Scale 1-5: 1=Strongly Disagree, 5=Strongly Agree
// 24 questions, 3 per dimension

interface GardnerQuestion {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "LI" | "LM" | "SP" | "MU" | "BK" | "IE" | "IA" | "NA";
  reverse: boolean;
}

const gardnerItems: GardnerQuestion[] = [
  // Linguistic (LI) — 3 items
  { number: 1, textRu: "Мне легко выражать свои мысли словами — устно или письменно", textEn: "I find it easy to express my thoughts in words — spoken or written", dimension: "LI", reverse: false },
  { number: 2, textRu: "Я люблю читать книги, статьи и любые тексты", textEn: "I enjoy reading books, articles, and all kinds of texts", dimension: "LI", reverse: false },
  { number: 3, textRu: "Мне нравится играть в словесные игры, разгадывать кроссворды или писать тексты", textEn: "I enjoy word games, crosswords, or writing texts", dimension: "LI", reverse: false },

  // Logical-Mathematical (LM) — 3 items
  { number: 4, textRu: "Мне нравится решать логические задачи и головоломки", textEn: "I enjoy solving logical problems and puzzles", dimension: "LM", reverse: false },
  { number: 5, textRu: "Я легко замечаю закономерности и числовые паттерны", textEn: "I easily notice patterns and numerical regularities", dimension: "LM", reverse: false },
  { number: 6, textRu: "Я предпочитаю системный, пошаговый подход к решению проблем", textEn: "I prefer a systematic, step-by-step approach to solving problems", dimension: "LM", reverse: false },

  // Spatial (SP) — 3 items
  { number: 7, textRu: "Я хорошо ориентируюсь в пространстве и легко читаю карты", textEn: "I have a good sense of direction and can easily read maps", dimension: "SP", reverse: false },
  { number: 8, textRu: "Мне легко представлять объекты в трёхмерном пространстве", textEn: "I can easily visualize objects in three-dimensional space", dimension: "SP", reverse: false },
  { number: 9, textRu: "Я замечаю визуальные детали, которые другие часто упускают", textEn: "I notice visual details that others often miss", dimension: "SP", reverse: false },

  // Musical (MU) — 3 items
  { number: 10, textRu: "Я легко запоминаю мелодии и могу воспроизвести их", textEn: "I can easily remember melodies and reproduce them", dimension: "MU", reverse: false },
  { number: 11, textRu: "Я чувствую ритм и могу отбивать такт к музыке", textEn: "I have a sense of rhythm and can keep a beat to music", dimension: "MU", reverse: false },
  { number: 12, textRu: "Музыка сильно влияет на моё настроение и эмоциональное состояние", textEn: "Music strongly affects my mood and emotional state", dimension: "MU", reverse: false },

  // Bodily-Kinesthetic (BK) — 3 items
  { number: 13, textRu: "Мне легко даются физические навыки — спорт, танцы, работа руками", textEn: "I pick up physical skills easily — sports, dance, or hands-on work", dimension: "BK", reverse: false },
  { number: 14, textRu: "Я лучше всего учусь, когда могу потрогать или попробовать что-то на практике", textEn: "I learn best when I can touch or try things hands-on", dimension: "BK", reverse: false },
  { number: 15, textRu: "У меня хорошая координация и контроль над движениями тела", textEn: "I have good coordination and control over my body movements", dimension: "BK", reverse: false },

  // Interpersonal (IE) — 3 items
  { number: 16, textRu: "Я легко понимаю чувства и мотивы других людей", textEn: "I easily understand other people's feelings and motives", dimension: "IE", reverse: false },
  { number: 17, textRu: "Люди часто обращаются ко мне за советом или поддержкой", textEn: "People often come to me for advice or support", dimension: "IE", reverse: false },
  { number: 18, textRu: "Мне нравится работать в команде и организовывать совместную деятельность", textEn: "I enjoy working in a team and organizing group activities", dimension: "IE", reverse: false },

  // Intrapersonal (IA) — 3 items
  { number: 19, textRu: "Я хорошо понимаю свои собственные эмоции и причины своего поведения", textEn: "I understand my own emotions and the reasons behind my behavior well", dimension: "IA", reverse: false },
  { number: 20, textRu: "Мне важно регулярно проводить время наедине с собой для размышлений", textEn: "I value regularly spending time alone for reflection", dimension: "IA", reverse: false },
  { number: 21, textRu: "Я ставлю себе личные цели и осознанно работаю над саморазвитием", textEn: "I set personal goals and consciously work on self-improvement", dimension: "IA", reverse: false },

  // Naturalistic (NA) — 3 items
  { number: 22, textRu: "Я замечаю и различаю виды растений, животных или природных явлений", textEn: "I notice and distinguish species of plants, animals, or natural phenomena", dimension: "NA", reverse: false },
  { number: 23, textRu: "Я чувствую себя спокойнее и энергичнее на природе", textEn: "I feel calmer and more energized when I am in nature", dimension: "NA", reverse: false },
  { number: 24, textRu: "Мне нравится классифицировать и систематизировать объекты окружающего мира", textEn: "I enjoy classifying and systematizing objects in the world around me", dimension: "NA", reverse: false },
];

const sortedItems = [...gardnerItems].sort((a, b) => a.number - b.number);

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

export const GARDNER_TEST_ID = "gardner";

export const gardnerTestMeta = {
  id: GARDNER_TEST_ID,
  slug: "gardner",
  nameRu: "Множественный интеллект",
  nameEn: "Multiple Intelligences",
  descriptionRu:
    "Определите ваш профиль множественного интеллекта по 8 типам: лингвистический, логико-математический, пространственный, музыкальный, телесно-кинестетический, межличностный, внутриличностный, натуралистический.",
  descriptionEn:
    "Discover your multiple intelligences profile across 8 types: Linguistic, Logical-Mathematical, Spatial, Musical, Bodily-Kinesthetic, Interpersonal, Intrapersonal, and Naturalistic.",
  methodology: "Gardner's MI Theory",
  estimatedMinutes: 6,
  questionCount: 24,
  category: "intelligence",
};

export function getGardnerQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `gd-q-${item.number}`,
    test_id: GARDNER_TEST_ID,
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
      { id: `gd-o-${item.number}-1`, question_id: `gd-q-${item.number}`, option_key: "1", text_ru: "Совершенно не согласен", text_en: "Strongly disagree", sort_order: 0 },
      { id: `gd-o-${item.number}-2`, question_id: `gd-q-${item.number}`, option_key: "2", text_ru: "Скорее не согласен", text_en: "Disagree", sort_order: 1 },
      { id: `gd-o-${item.number}-3`, question_id: `gd-q-${item.number}`, option_key: "3", text_ru: "Нейтрально", text_en: "Neutral", sort_order: 2 },
      { id: `gd-o-${item.number}-4`, question_id: `gd-q-${item.number}`, option_key: "4", text_ru: "Скорее согласен", text_en: "Agree", sort_order: 3 },
      { id: `gd-o-${item.number}-5`, question_id: `gd-q-${item.number}`, option_key: "5", text_ru: "Полностью согласен", text_en: "Strongly agree", sort_order: 4 },
    ],
  }));
}

// Dimension metadata for results display
export const gardnerDimensions = {
  LI: {
    nameRu: "Лингвистический",
    nameEn: "Linguistic",
    descHighRu: "Вы мастер слова. Вам легко выражать мысли, вы любите читать, писать и общаться.",
    descHighEn: "You are a wordsmith. You find it easy to express ideas and enjoy reading, writing, and communicating.",
    descLowRu: "Вербальное выражение мыслей не является вашей сильной стороной. Вы предпочитаете другие способы коммуникации.",
    descLowEn: "Verbal expression is not your strongest suit. You prefer other ways of communicating.",
    color: "#8b5cf6",
  },
  LM: {
    nameRu: "Логико-математический",
    nameEn: "Logical-Mathematical",
    descHighRu: "У вас сильное логическое мышление. Вы отлично видите закономерности и решаете сложные задачи.",
    descHighEn: "You have strong logical thinking. You excel at spotting patterns and solving complex problems.",
    descLowRu: "Абстрактные вычисления и логические задачи даются вам не так легко. Вы мыслите более интуитивно.",
    descLowEn: "Abstract calculations and logical puzzles don't come as easily to you. You think more intuitively.",
    color: "#06b6d4",
  },
  SP: {
    nameRu: "Пространственный",
    nameEn: "Spatial",
    descHighRu: "Вы отлично мыслите образами. Пространственная ориентация, визуализация и дизайн — ваши сильные стороны.",
    descHighEn: "You think in images. Spatial orientation, visualization, and design are your strengths.",
    descLowRu: "Визуально-пространственные задачи не являются вашим коньком. Вы опираетесь на другие каналы восприятия.",
    descLowEn: "Visual-spatial tasks are not your forte. You rely on other channels of perception.",
    color: "#f59e0b",
  },
  MU: {
    nameRu: "Музыкальный",
    nameEn: "Musical",
    descHighRu: "Вы тонко чувствуете музыку, ритм и звуки. Музыка глубоко влияет на ваше состояние.",
    descHighEn: "You have a fine sense for music, rhythm, and sound. Music deeply affects your state of mind.",
    descLowRu: "Музыкальная сфера не занимает центрального места в вашей жизни. Вы менее чувствительны к ритмам и мелодиям.",
    descLowEn: "Music does not play a central role in your life. You are less sensitive to rhythms and melodies.",
    color: "#ec4899",
  },
  BK: {
    nameRu: "Телесно-кинестетический",
    nameEn: "Bodily-Kinesthetic",
    descHighRu: "Вы прекрасно управляете своим телом. Спорт, танцы и ручной труд — ваша стихия.",
    descHighEn: "You have excellent body control. Sports, dance, and hands-on work are your element.",
    descLowRu: "Физическая активность и работа руками не являются вашей основной зоной комфорта.",
    descLowEn: "Physical activity and hands-on work are not your primary comfort zone.",
    color: "#10b981",
  },
  IE: {
    nameRu: "Межличностный",
    nameEn: "Interpersonal",
    descHighRu: "Вы отлично понимаете людей и умеете строить отношения. Командная работа и лидерство вам близки.",
    descHighEn: "You understand people well and know how to build relationships. Teamwork and leadership come naturally.",
    descLowRu: "Вы предпочитаете индивидуальную работу. Чтение эмоций и мотивов других даётся вам сложнее.",
    descLowEn: "You prefer working alone. Reading others' emotions and motives is more challenging for you.",
    color: "#6366f1",
  },
  IA: {
    nameRu: "Внутриличностный",
    nameEn: "Intrapersonal",
    descHighRu: "Вы глубоко понимаете себя: свои эмоции, мотивы и цели. Самоанализ и рефлексия — ваши сильные стороны.",
    descHighEn: "You understand yourself deeply: your emotions, motives, and goals. Self-analysis and reflection are your strengths.",
    descLowRu: "Самоанализ пока не является вашей привычкой. Вы больше ориентированы на внешний мир.",
    descLowEn: "Self-analysis is not yet your habit. You are more focused on the external world.",
    color: "#f43f5e",
  },
  NA: {
    nameRu: "Натуралистический",
    nameEn: "Naturalistic",
    descHighRu: "Вы тонко чувствуете природу и умеете классифицировать окружающий мир. Экология и живая природа вам близки.",
    descHighEn: "You have a fine sense for nature and can classify the world around you. Ecology and wildlife resonate with you.",
    descLowRu: "Природный мир не является вашим основным фокусом. Вы менее склонны к наблюдению и классификации природных явлений.",
    descLowEn: "The natural world is not your primary focus. You are less inclined to observe and classify natural phenomena.",
    color: "#84cc16",
  },
};
