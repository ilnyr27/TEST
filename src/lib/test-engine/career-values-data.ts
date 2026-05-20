import { Question, QuestionOption } from "@/types/database";

// Career Values Test — Schwartz-adapted
// Dimensions: ACH=Achievement, SEC=Security, IND=Independence, HLP=Helping Others, CRE=Creativity/Innovation
// Scale 1-5: 1=Not important, 5=Extremely important
// No reverse-scored items

interface CareerValuesQuestion {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "ACH" | "SEC" | "IND" | "HLP" | "CRE";
  reverse: boolean;
}

const careerValuesItems: CareerValuesQuestion[] = [
  // Achievement (ACH) — 4 items
  { number: 1, textRu: "Возможность достигать высоких результатов и превосходить ожидания", textEn: "The opportunity to achieve outstanding results and exceed expectations", dimension: "ACH", reverse: false },
  { number: 2, textRu: "Карьерный рост и продвижение на руководящие позиции", textEn: "Career advancement and promotion to leadership positions", dimension: "ACH", reverse: false },
  { number: 3, textRu: "Признание моих профессиональных достижений коллегами и руководством", textEn: "Recognition of my professional accomplishments by colleagues and management", dimension: "ACH", reverse: false },
  { number: 4, textRu: "Постоянное развитие навыков и стремление стать лучшим в своей области", textEn: "Continuous skill development and striving to be the best in my field", dimension: "ACH", reverse: false },

  // Security (SEC) — 4 items
  { number: 5, textRu: "Стабильная зарплата и гарантия занятости на долгий срок", textEn: "A stable salary and long-term job security", dimension: "SEC", reverse: false },
  { number: 6, textRu: "Чёткие правила, понятные обязанности и предсказуемый рабочий процесс", textEn: "Clear rules, well-defined responsibilities, and a predictable workflow", dimension: "SEC", reverse: false },
  { number: 7, textRu: "Надёжный социальный пакет: медицинская страховка, пенсия, оплачиваемый отпуск", textEn: "Reliable benefits: health insurance, pension plan, and paid time off", dimension: "SEC", reverse: false },
  { number: 8, textRu: "Работа в устойчивой компании с хорошей репутацией на рынке", textEn: "Working for a financially stable company with a solid market reputation", dimension: "SEC", reverse: false },

  // Independence (IND) — 4 items
  { number: 9, textRu: "Свобода самостоятельно решать, как выполнять свою работу", textEn: "The freedom to decide how I do my work on my own", dimension: "IND", reverse: false },
  { number: 10, textRu: "Гибкий график и возможность работать удалённо", textEn: "A flexible schedule and the option to work remotely", dimension: "IND", reverse: false },
  { number: 11, textRu: "Минимальный контроль со стороны руководства за моими решениями", textEn: "Minimal oversight from management over my decisions", dimension: "IND", reverse: false },
  { number: 12, textRu: "Возможность вести собственные проекты и нести за них ответственность", textEn: "The opportunity to lead my own projects and take responsibility for them", dimension: "IND", reverse: false },

  // Helping Others (HLP) — 4 items
  { number: 13, textRu: "Работа, которая приносит реальную пользу людям и обществу", textEn: "Work that brings real benefit to people and society", dimension: "HLP", reverse: false },
  { number: 14, textRu: "Возможность помогать коллегам расти и развиваться профессионально", textEn: "The opportunity to help colleagues grow and develop professionally", dimension: "HLP", reverse: false },
  { number: 15, textRu: "Ощущение, что моя работа делает чью-то жизнь лучше", textEn: "The feeling that my work makes someone's life better", dimension: "HLP", reverse: false },
  { number: 16, textRu: "Участие в социально значимых проектах и благотворительных инициативах", textEn: "Involvement in socially meaningful projects and charitable initiatives", dimension: "HLP", reverse: false },

  // Creativity/Innovation (CRE) — 4 items
  { number: 17, textRu: "Возможность генерировать новые идеи и воплощать их в жизнь", textEn: "The opportunity to generate new ideas and bring them to life", dimension: "CRE", reverse: false },
  { number: 18, textRu: "Работа с нестандартными задачами, требующими творческого подхода", textEn: "Working on unconventional tasks that require a creative approach", dimension: "CRE", reverse: false },
  { number: 19, textRu: "Среда, поощряющая эксперименты и инновации, даже если они рискованны", textEn: "An environment that encourages experimentation and innovation, even if risky", dimension: "CRE", reverse: false },
  { number: 20, textRu: "Возможность создавать что-то принципиально новое в своей профессии", textEn: "The opportunity to create something fundamentally new in my profession", dimension: "CRE", reverse: false },
];

const sortedItems = [...careerValuesItems].sort((a, b) => a.number - b.number);

const scaleLabels = {
  ru: {
    min: "Не важно",
    max: "Крайне важно",
  },
  en: {
    min: "Not important",
    max: "Extremely important",
  },
};

export const CAREER_VALUES_TEST_ID = "career-values";

export const careerValuesTestMeta = {
  id: CAREER_VALUES_TEST_ID,
  slug: "career-values",
  nameRu: "Карьерные ценности",
  nameEn: "Career Values",
  descriptionRu:
    "Определите, что для вас важнее всего в карьере: достижения, стабильность, независимость, помощь другим или творчество. Адаптация модели ценностей Шварца.",
  descriptionEn:
    "Discover what matters most to you in your career: achievement, security, independence, helping others, or creativity. Based on the Schwartz values model.",
  methodology: "Schwartz adapted",
  estimatedMinutes: 5,
  questionCount: 20,
  category: "career",
};

export function getCareerValuesQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `cv-q-${item.number}`,
    test_id: CAREER_VALUES_TEST_ID,
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
      { id: `cv-o-${item.number}-1`, question_id: `cv-q-${item.number}`, option_key: "1", text_ru: "Не важно", text_en: "Not important", sort_order: 0 },
      { id: `cv-o-${item.number}-2`, question_id: `cv-q-${item.number}`, option_key: "2", text_ru: "Скорее не важно", text_en: "Slightly important", sort_order: 1 },
      { id: `cv-o-${item.number}-3`, question_id: `cv-q-${item.number}`, option_key: "3", text_ru: "Умеренно важно", text_en: "Moderately important", sort_order: 2 },
      { id: `cv-o-${item.number}-4`, question_id: `cv-q-${item.number}`, option_key: "4", text_ru: "Очень важно", text_en: "Very important", sort_order: 3 },
      { id: `cv-o-${item.number}-5`, question_id: `cv-q-${item.number}`, option_key: "5", text_ru: "Крайне важно", text_en: "Extremely important", sort_order: 4 },
    ],
  }));
}

// Dimension metadata for results display
export const careerValuesDimensions = {
  ACH: {
    nameRu: "Достижения",
    nameEn: "Achievement",
    descHighRu: "Вы стремитесь к высоким результатам, признанию и карьерному росту. Конкуренция и амбиции — ваше топливо.",
    descHighEn: "You strive for outstanding results, recognition, and career growth. Competition and ambition fuel you.",
    descLowRu: "Карьерные амбиции и статус для вас не на первом месте. Вы ищете смысл в работе за пределами формальных достижений.",
    descLowEn: "Career ambition and status are not your top priorities. You look for meaning in work beyond formal achievements.",
    color: "#8b5cf6",
  },
  SEC: {
    nameRu: "Безопасность",
    nameEn: "Security",
    descHighRu: "Стабильность и предсказуемость для вас критически важны. Вы цените надёжность и гарантии в работе.",
    descHighEn: "Stability and predictability are critical to you. You value reliability and guarantees in your work.",
    descLowRu: "Вы готовы рисковать ради новых возможностей. Стабильность не является вашим главным приоритетом.",
    descLowEn: "You are willing to take risks for new opportunities. Stability is not your top priority.",
    color: "#06b6d4",
  },
  IND: {
    nameRu: "Независимость",
    nameEn: "Independence",
    descHighRu: "Вам важна автономия и свобода принимать решения самостоятельно. Вы предпочитаете минимум контроля.",
    descHighEn: "Autonomy and the freedom to make your own decisions matter greatly to you. You prefer minimal oversight.",
    descLowRu: "Вы комфортно работаете в структурированной среде и цените чёткое руководство.",
    descLowEn: "You work comfortably in structured environments and value clear direction from leadership.",
    color: "#f59e0b",
  },
  HLP: {
    nameRu: "Помощь другим",
    nameEn: "Helping Others",
    descHighRu: "Вы хотите, чтобы ваша работа приносила пользу людям. Социальная значимость — ключевой мотиватор.",
    descHighEn: "You want your work to benefit people. Social impact is a key motivator for you.",
    descLowRu: "Социальная миссия не является главным фактором при выборе работы. Вы ориентируетесь на другие ценности.",
    descLowEn: "Social mission is not the main factor in your career choices. You are guided by other values.",
    color: "#ec4899",
  },
  CRE: {
    nameRu: "Творчество и инновации",
    nameEn: "Creativity & Innovation",
    descHighRu: "Вы стремитесь к новизне, эксперименту и созданию чего-то оригинального. Рутина вас демотивирует.",
    descHighEn: "You crave novelty, experimentation, and creating something original. Routine demotivates you.",
    descLowRu: "Вы предпочитаете проверенные методы и не стремитесь к постоянным инновациям.",
    descLowEn: "You prefer proven methods and do not seek constant innovation.",
    color: "#10b981",
  },
};
