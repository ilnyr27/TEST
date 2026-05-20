import { Question, QuestionOption } from "@/types/database";

// Maslach Burnout Inventory (MBI) — adapted
// Dimensions: EE=Emotional Exhaustion, DP=Depersonalization, PA=Personal Accomplishment
// Scale 1-7: 1=Never, 7=Every day
// PA items are reverse-scored (high PA = low burnout)

interface BurnoutQuestion {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "EE" | "DP" | "PA";
  reverse: boolean;
}

const burnoutItems: BurnoutQuestion[] = [
  // Emotional Exhaustion (EE) — 9 items
  { number: 1, textRu: "Я чувствую себя эмоционально опустошённым из-за работы", textEn: "I feel emotionally drained from my work", dimension: "EE", reverse: false },
  { number: 2, textRu: "К концу рабочего дня я чувствую себя полностью измотанным", textEn: "I feel used up at the end of the workday", dimension: "EE", reverse: false },
  { number: 3, textRu: "Я чувствую усталость, когда просыпаюсь утром и предстоит ещё один рабочий день", textEn: "I feel fatigued when I get up in the morning and have to face another day on the job", dimension: "EE", reverse: false },
  { number: 4, textRu: "Работа с людьми весь день — это для меня настоящее напряжение", textEn: "Working with people all day is really a strain for me", dimension: "EE", reverse: false },
  { number: 5, textRu: "Я чувствую, что выгораю из-за работы", textEn: "I feel burned out from my work", dimension: "EE", reverse: false },
  { number: 6, textRu: "Я чувствую разочарование из-за своей работы", textEn: "I feel frustrated by my job", dimension: "EE", reverse: false },
  { number: 7, textRu: "Я чувствую, что слишком много работаю", textEn: "I feel I am working too hard on my job", dimension: "EE", reverse: false },
  { number: 8, textRu: "Прямая работа с людьми вызывает у меня слишком много стресса", textEn: "Working with people directly puts too much stress on me", dimension: "EE", reverse: false },
  { number: 9, textRu: "Я чувствую, что нахожусь на пределе своих возможностей", textEn: "I feel like I am at the end of my rope", dimension: "EE", reverse: false },

  // Depersonalization (DP) — 5 items
  { number: 10, textRu: "Я чувствую, что стал относиться к некоторым людям как к безличным объектам", textEn: "I feel I treat some people as if they were impersonal objects", dimension: "DP", reverse: false },
  { number: 11, textRu: "Я стал более чёрствым по отношению к людям с тех пор, как начал эту работу", textEn: "I have become more callous toward people since I took this job", dimension: "DP", reverse: false },
  { number: 12, textRu: "Я беспокоюсь, что эта работа делает меня эмоционально жёстким", textEn: "I worry that this job is hardening me emotionally", dimension: "DP", reverse: false },
  { number: 13, textRu: "Мне безразлично, что происходит с некоторыми людьми на работе", textEn: "I don't really care what happens to some of my colleagues or clients", dimension: "DP", reverse: false },
  { number: 14, textRu: "Я чувствую, что коллеги и клиенты винят меня в своих проблемах", textEn: "I feel people I work with blame me for some of their problems", dimension: "DP", reverse: false },

  // Personal Accomplishment (PA) — 8 items (reverse-scored: high PA = low burnout)
  { number: 15, textRu: "Я легко понимаю, что чувствуют другие люди", textEn: "I can easily understand how the people around me feel", dimension: "PA", reverse: true },
  { number: 16, textRu: "Я эффективно решаю проблемы людей, с которыми работаю", textEn: "I deal very effectively with the problems of people I work with", dimension: "PA", reverse: true },
  { number: 17, textRu: "Я чувствую, что положительно влияю на жизнь других людей своей работой", textEn: "I feel I am positively influencing other people's lives through my work", dimension: "PA", reverse: true },
  { number: 18, textRu: "Я чувствую себя энергичным и полным сил", textEn: "I feel very energetic", dimension: "PA", reverse: true },
  { number: 19, textRu: "Я легко создаю непринуждённую атмосферу в общении", textEn: "I can easily create a relaxed atmosphere with the people I work with", dimension: "PA", reverse: true },
  { number: 20, textRu: "Я чувствую воодушевление после работы с людьми", textEn: "I feel exhilarated after working closely with people", dimension: "PA", reverse: true },
  { number: 21, textRu: "Я достиг многого значимого на этой работе", textEn: "I have accomplished many worthwhile things in this job", dimension: "PA", reverse: true },
  { number: 22, textRu: "На работе я спокойно справляюсь с эмоциональными ситуациями", textEn: "In my work I deal with emotional problems very calmly", dimension: "PA", reverse: true },
];

const sortedItems = [...burnoutItems].sort((a, b) => a.number - b.number);

const scaleLabels = {
  ru: {
    min: "Никогда",
    max: "Каждый день",
  },
  en: {
    min: "Never",
    max: "Every day",
  },
};

export const BURNOUT_TEST_ID = "burnout";

export const burnoutTestMeta = {
  id: BURNOUT_TEST_ID,
  slug: "burnout",
  nameRu: "Стресс и выгорание",
  nameEn: "Stress & Burnout",
  descriptionRu:
    "Оцените уровень профессионального выгорания по трём шкалам: эмоциональное истощение, деперсонализация и профессиональная эффективность. Адаптация методики Маслач.",
  descriptionEn:
    "Assess your professional burnout level across three scales: Emotional Exhaustion, Depersonalization, and Personal Accomplishment. Adapted from the Maslach Burnout Inventory.",
  methodology: "Maslach Burnout Inventory adapted",
  estimatedMinutes: 6,
  questionCount: 22,
  category: "psychology",
};

export function getBurnoutQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `bo-q-${item.number}`,
    test_id: BURNOUT_TEST_ID,
    question_number: idx + 1,
    text_ru: item.textRu,
    text_en: item.textEn,
    type: "scale" as const,
    depth_level: 1,
    scale_min: 1,
    scale_max: 7,
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
      { id: `bo-o-${item.number}-1`, question_id: `bo-q-${item.number}`, option_key: "1", text_ru: "Никогда", text_en: "Never", sort_order: 0 },
      { id: `bo-o-${item.number}-2`, question_id: `bo-q-${item.number}`, option_key: "2", text_ru: "Несколько раз в год", text_en: "A few times a year", sort_order: 1 },
      { id: `bo-o-${item.number}-3`, question_id: `bo-q-${item.number}`, option_key: "3", text_ru: "Раз в месяц", text_en: "Once a month", sort_order: 2 },
      { id: `bo-o-${item.number}-4`, question_id: `bo-q-${item.number}`, option_key: "4", text_ru: "Несколько раз в месяц", text_en: "A few times a month", sort_order: 3 },
      { id: `bo-o-${item.number}-5`, question_id: `bo-q-${item.number}`, option_key: "5", text_ru: "Раз в неделю", text_en: "Once a week", sort_order: 4 },
      { id: `bo-o-${item.number}-6`, question_id: `bo-q-${item.number}`, option_key: "6", text_ru: "Несколько раз в неделю", text_en: "A few times a week", sort_order: 5 },
      { id: `bo-o-${item.number}-7`, question_id: `bo-q-${item.number}`, option_key: "7", text_ru: "Каждый день", text_en: "Every day", sort_order: 6 },
    ],
  }));
}

// Dimension metadata for results display
export const burnoutDimensions = {
  EE: {
    nameRu: "Эмоциональное истощение",
    nameEn: "Emotional Exhaustion",
    descHighRu: "Вы испытываете сильное эмоциональное истощение. Работа отнимает слишком много энергии, и вы чувствуете себя опустошённым.",
    descHighEn: "You are experiencing significant emotional exhaustion. Work drains too much energy and you feel depleted.",
    descLowRu: "Вы эмоционально устойчивы и хорошо справляетесь с рабочими нагрузками. Работа не истощает вас.",
    descLowEn: "You are emotionally resilient and handle workloads well. Work does not deplete you.",
    color: "#ef4444",
  },
  DP: {
    nameRu: "Деперсонализация",
    nameEn: "Depersonalization",
    descHighRu: "Вы склонны к отстранённости и цинизму в отношении окружающих. Это защитная реакция на перегрузку.",
    descHighEn: "You tend toward detachment and cynicism regarding the people around you. This is a defensive response to overload.",
    descLowRu: "Вы сохраняете эмпатию и человечность в общении. Люди для вас не обезличены.",
    descLowEn: "You maintain empathy and humanity in your interactions. People remain individuals to you.",
    color: "#f97316",
  },
  PA: {
    nameRu: "Редукция профессиональных достижений",
    nameEn: "Reduced Personal Accomplishment",
    descHighRu: "Вы ощущаете снижение профессиональной эффективности и неудовлетворённость своими достижениями.",
    descHighEn: "You feel a decline in professional effectiveness and dissatisfaction with your accomplishments.",
    descLowRu: "Вы чувствуете себя компетентным и продуктивным. Ваша работа приносит вам удовлетворение.",
    descLowEn: "You feel competent and productive. Your work brings you satisfaction.",
    color: "#22c55e",
  },
};
