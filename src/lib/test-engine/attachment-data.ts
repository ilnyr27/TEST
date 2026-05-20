import { Question, QuestionOption } from "@/types/database";

// ECR-R adapted — Attachment Style
// 2 dimensions: Anxiety (fear of abandonment) and Avoidance (discomfort with closeness)
// 4 quadrants: Secure (low/low), Anxious-preoccupied (high anx/low av),
//              Dismissive-avoidant (low anx/high av), Fearful-avoidant (high/high)

export const ATTACHMENT_TEST_ID = "attachment-style";

export const attachmentTestMeta = {
  id: ATTACHMENT_TEST_ID,
  slug: "attachment-style",
  nameRu: "Стиль привязанности",
  nameEn: "Attachment Style",
  descriptionRu: "Определите ваш тип привязанности в отношениях. Основано на модели ECR-R: тревожность и избегание.",
  descriptionEn: "Discover your attachment style in relationships. Based on the ECR-R model: anxiety and avoidance.",
  methodology: "ECR-R",
  estimatedMinutes: 8,
  questionCount: 20,
  category: "family",
};

interface AttachmentItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "anxiety" | "avoidance";
  reverse: boolean;
}

const items: AttachmentItem[] = [
  // Anxiety (10 items) — fear of abandonment, need for reassurance
  { number: 1, textRu: "Я беспокоюсь о том, что партнёр на самом деле меня не любит", textEn: "I worry that my partner doesn't really love me", dimension: "anxiety", reverse: false },
  { number: 2, textRu: "Я боюсь, что партнёр бросит меня", textEn: "I'm afraid my partner will leave me", dimension: "anxiety", reverse: false },
  { number: 3, textRu: "Мне нужно постоянное подтверждение чувств партнёра", textEn: "I need constant reassurance of my partner's feelings", dimension: "anxiety", reverse: false },
  { number: 4, textRu: "Когда партнёр не рядом, я чувствую тревогу", textEn: "I feel anxious when my partner is away", dimension: "anxiety", reverse: false },
  { number: 5, textRu: "Я часто сомневаюсь в своей ценности для партнёра", textEn: "I often doubt my worth to my partner", dimension: "anxiety", reverse: false },
  { number: 6, textRu: "Меня раздражает, когда партнёр не отвечает сразу", textEn: "It bothers me when my partner doesn't respond right away", dimension: "anxiety", reverse: false },
  { number: 7, textRu: "Я чувствую себя уверенно в отношениях", textEn: "I feel confident in my relationships", dimension: "anxiety", reverse: true },
  { number: 8, textRu: "Мне легко доверять партнёру", textEn: "I find it easy to trust my partner", dimension: "anxiety", reverse: true },
  { number: 9, textRu: "Я часто ревную", textEn: "I often feel jealous", dimension: "anxiety", reverse: false },
  { number: 10, textRu: "Я переживаю, что могу остаться один/одна", textEn: "I worry about being alone", dimension: "anxiety", reverse: false },

  // Avoidance (10 items) — discomfort with intimacy, independence
  { number: 11, textRu: "Мне некомфортно, когда партнёр хочет быть слишком близко", textEn: "I'm uncomfortable when my partner wants to be very close", dimension: "avoidance", reverse: false },
  { number: 12, textRu: "Я предпочитаю не показывать свои чувства", textEn: "I prefer not to show my feelings", dimension: "avoidance", reverse: false },
  { number: 13, textRu: "Мне сложно полностью довериться партнёру", textEn: "I find it hard to fully trust my partner", dimension: "avoidance", reverse: false },
  { number: 14, textRu: "Я ценю свою независимость больше, чем близость", textEn: "I value my independence more than closeness", dimension: "avoidance", reverse: false },
  { number: 15, textRu: "Мне легко открываться перед близкими", textEn: "I find it easy to open up to close ones", dimension: "avoidance", reverse: true },
  { number: 16, textRu: "Я избегаю серьёзных разговоров о чувствах", textEn: "I avoid serious conversations about feelings", dimension: "avoidance", reverse: false },
  { number: 17, textRu: "Мне нравится, когда партнёр зависит от меня эмоционально", textEn: "I like when my partner depends on me emotionally", dimension: "avoidance", reverse: true },
  { number: 18, textRu: "Я чувствую себя в ловушке, когда отношения становятся серьёзными", textEn: "I feel trapped when relationships get serious", dimension: "avoidance", reverse: false },
  { number: 19, textRu: "Мне комфортно просить помощи у партнёра", textEn: "I'm comfortable asking my partner for help", dimension: "avoidance", reverse: true },
  { number: 20, textRu: "Я предпочитаю справляться с проблемами в одиночку", textEn: "I prefer dealing with problems alone", dimension: "avoidance", reverse: false },
];

const scaleOptions = (qNum: number): QuestionOption[] => [
  { id: `at-o-${qNum}-1`, question_id: `at-q-${qNum}`, option_key: "1", text_ru: "Совершенно не согласен", text_en: "Strongly disagree", sort_order: 0 },
  { id: `at-o-${qNum}-2`, question_id: `at-q-${qNum}`, option_key: "2", text_ru: "Не согласен", text_en: "Disagree", sort_order: 1 },
  { id: `at-o-${qNum}-3`, question_id: `at-q-${qNum}`, option_key: "3", text_ru: "Скорее не согласен", text_en: "Slightly disagree", sort_order: 2 },
  { id: `at-o-${qNum}-4`, question_id: `at-q-${qNum}`, option_key: "4", text_ru: "Нейтрально", text_en: "Neutral", sort_order: 3 },
  { id: `at-o-${qNum}-5`, question_id: `at-q-${qNum}`, option_key: "5", text_ru: "Скорее согласен", text_en: "Slightly agree", sort_order: 4 },
  { id: `at-o-${qNum}-6`, question_id: `at-q-${qNum}`, option_key: "6", text_ru: "Согласен", text_en: "Agree", sort_order: 5 },
  { id: `at-o-${qNum}-7`, question_id: `at-q-${qNum}`, option_key: "7", text_ru: "Полностью согласен", text_en: "Strongly agree", sort_order: 6 },
];

export function getAttachmentQuestions(): (Question & { options: QuestionOption[] })[] {
  return items.map((item, idx) => ({
    id: `at-q-${item.number}`,
    test_id: ATTACHMENT_TEST_ID,
    question_number: idx + 1,
    text_ru: item.textRu,
    text_en: item.textEn,
    type: "scale" as const,
    depth_level: 1,
    scale_min: 1,
    scale_max: 7,
    scale_min_label_ru: "Совершенно не согласен",
    scale_min_label_en: "Strongly disagree",
    scale_max_label_ru: "Полностью согласен",
    scale_max_label_en: "Strongly agree",
    is_required: true,
    branch_logic: null,
    scoring_key: { dimension: item.dimension, reverse: item.reverse },
    metadata: null,
    created_at: new Date().toISOString(),
    options: scaleOptions(item.number),
  }));
}

export const attachmentStyles = {
  secure: {
    nameRu: "Надёжный",
    nameEn: "Secure",
    descRu: "Вы комфортно чувствуете себя в близких отношениях. Легко доверяете и позволяете другим полагаться на вас. Не боитесь одиночества, но цените близость.",
    descEn: "You're comfortable with intimacy and closeness. You trust easily and let others depend on you. You don't fear being alone but value connection.",
    color: "#10B981",
  },
  anxious: {
    nameRu: "Тревожный",
    nameEn: "Anxious-Preoccupied",
    descRu: "Вы сильно нуждаетесь в подтверждении чувств и близости. Можете быть ревнивы и беспокоиться об отвержении. Хотите полного слияния с партнёром.",
    descEn: "You crave closeness and reassurance. You may be jealous and worry about rejection. You desire complete emotional merger with your partner.",
    color: "#EF4444",
  },
  avoidant: {
    nameRu: "Избегающий",
    nameEn: "Dismissive-Avoidant",
    descRu: "Вы цените независимость и самодостаточность. Дискомфорт при слишком большой близости. Предпочитаете эмоциональную дистанцию.",
    descEn: "You value independence and self-sufficiency. You're uncomfortable with too much closeness and prefer emotional distance.",
    color: "#3B82F6",
  },
  fearful: {
    nameRu: "Тревожно-избегающий",
    nameEn: "Fearful-Avoidant",
    descRu: "Вы хотите близости, но боитесь её. Внутренний конфликт между желанием связи и страхом быть раненным. Самый сложный тип для отношений.",
    descEn: "You want closeness but fear it. An inner conflict between desire for connection and fear of being hurt. The most complex attachment type.",
    color: "#F59E0B",
  },
};
