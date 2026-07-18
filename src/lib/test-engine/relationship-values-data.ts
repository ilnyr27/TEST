import { Question, QuestionOption } from "@/types/database";

// Ценности в отношениях — 30 вопросов, 6 измерений по 5 вопросов
// TRUST=Доверие, CARE=Забота, SPACE=Пространство, GROW=Рост, PASS=Страсть, STABLE=Стабильность

interface RelValueItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "TRUST" | "CARE" | "SPACE" | "GROW" | "PASS" | "STABLE";
}

const items: RelValueItem[] = [
  // TRUST — Доверие и честность
  { number: 1,  dimension: "TRUST", textRu: "Мне необходимо полностью доверять партнёру — иначе отношения теряют смысл", textEn: "I need to fully trust my partner — otherwise the relationship loses meaning" },
  { number: 2,  dimension: "TRUST", textRu: "Честность, даже неудобная, для меня ценнее удобной лжи", textEn: "Honesty, even uncomfortable, is more valuable to me than convenient lies" },
  { number: 3,  dimension: "TRUST", textRu: "Я хочу знать, что партнёр скажет мне правду, даже если это больно", textEn: "I want to know that my partner will tell me the truth even if it hurts" },
  { number: 4,  dimension: "TRUST", textRu: "Открытость и прозрачность в отношениях — один из моих главных приоритетов", textEn: "Openness and transparency in relationships is one of my top priorities" },
  { number: 5,  dimension: "TRUST", textRu: "Если доверие сломано — мне очень сложно вернуть его в полной мере", textEn: "If trust is broken — it's very hard for me to restore it fully" },

  // CARE — Забота и принятие
  { number: 6,  dimension: "CARE", textRu: "Мне важно чувствовать, что партнёр принимает меня таким, какой я есть — без условий", textEn: "It's important to me to feel that my partner accepts me as I am — without conditions" },
  { number: 7,  dimension: "CARE", textRu: "Забота и внимание со стороны партнёра — это то, без чего мне в отношениях некомфортно", textEn: "Care and attention from my partner is something I can't feel comfortable without in a relationship" },
  { number: 8,  dimension: "CARE", textRu: "Я ценю, когда партнёр замечает мои состояния и реагирует на них", textEn: "I value when my partner notices my states and responds to them" },
  { number: 9,  dimension: "CARE", textRu: "Взаимная поддержка в трудные моменты — основа крепких отношений для меня", textEn: "Mutual support in difficult moments is the foundation of a strong relationship for me" },
  { number: 10, dimension: "CARE", textRu: "Мне нужно чувствовать себя в безопасности рядом с партнёром — эмоционально и физически", textEn: "I need to feel safe with my partner — emotionally and physically" },

  // SPACE — Независимость и личное пространство
  { number: 11, dimension: "SPACE", textRu: "Мне важно сохранять личное пространство и собственные интересы в отношениях", textEn: "It's important to me to preserve personal space and my own interests in a relationship" },
  { number: 12, dimension: "SPACE", textRu: "Хорошие отношения для меня — это союз двух независимых людей, а не слияние", textEn: "A good relationship for me is a union of two independent people, not a merger" },
  { number: 13, dimension: "SPACE", textRu: "Я ценю, когда у каждого есть время и занятия отдельно друг от друга", textEn: "I value when each person has time and activities apart from each other" },
  { number: 14, dimension: "SPACE", textRu: "Мне некомфортно, когда отношения требуют отказаться от своих интересов ради другого", textEn: "I'm uncomfortable when a relationship requires giving up my interests for the other person" },
  { number: 15, dimension: "SPACE", textRu: "Автономия — важная часть моей идентичности, которую я хочу сохранять в паре", textEn: "Autonomy is an important part of my identity that I want to preserve as a couple" },

  // GROW — Рост вместе
  { number: 16, dimension: "GROW", textRu: "Мне важно, чтобы отношения помогали мне развиваться и становиться лучше", textEn: "It's important to me that the relationship helps me grow and become better" },
  { number: 17, dimension: "GROW", textRu: "Я хочу, чтобы мы с партнёром вдохновляли и стимулировали развитие друг друга", textEn: "I want my partner and me to inspire and stimulate each other's development" },
  { number: 18, dimension: "GROW", textRu: "Общие цели и движение вперёд — важная часть хороших отношений для меня", textEn: "Shared goals and moving forward is an important part of a good relationship for me" },
  { number: 19, dimension: "GROW", textRu: "Я ценю в партнёре стремление расти — как человека, профессионала, личность", textEn: "I value the desire to grow in a partner — as a person, professional, individual" },
  { number: 20, dimension: "GROW", textRu: "Отношения, которые тебя не развивают — это стагнация, а не стабильность", textEn: "A relationship that doesn't develop you is stagnation, not stability" },

  // PASS — Страсть и близость
  { number: 21, dimension: "PASS", textRu: "Физическая близость и влечение важны для меня в отношениях", textEn: "Physical intimacy and attraction are important to me in a relationship" },
  { number: 22, dimension: "PASS", textRu: "Мне нужно чувствовать «искру» — эмоциональное и физическое притяжение к партнёру", textEn: "I need to feel a 'spark' — emotional and physical attraction to my partner" },
  { number: 23, dimension: "PASS", textRu: "Если страсть угасает, это сигнал серьёзной проблемы в отношениях для меня", textEn: "If passion fades, it's a signal of a serious problem in the relationship for me" },
  { number: 24, dimension: "PASS", textRu: "Я ценю яркость и интенсивность — когда рядом с партнёром жизнь чувствуется острее", textEn: "I value brightness and intensity — when life feels more vivid next to my partner" },
  { number: 25, dimension: "PASS", textRu: "Глубокая эмоциональная и интимная связь — одна из главных ценностей для меня в паре", textEn: "A deep emotional and intimate connection is one of the core values for me in a couple" },

  // STABLE — Стабильность и надёжность
  { number: 26, dimension: "STABLE", textRu: "Мне важна предсказуемость и надёжность в отношениях — знать, что партнёр всегда рядом", textEn: "Predictability and reliability matter to me in relationships — knowing my partner is always there" },
  { number: 27, dimension: "STABLE", textRu: "Стабильная, спокойная жизнь рядом с партнёром ценнее для меня, чем яркие вспышки страсти", textEn: "A stable, calm life with my partner is more valuable to me than bright flashes of passion" },
  { number: 28, dimension: "STABLE", textRu: "Мне важно планировать будущее с партнёром — знать, куда движутся отношения", textEn: "It's important to me to plan a future with my partner — to know where the relationship is going" },
  { number: 29, dimension: "STABLE", textRu: "Я ценю ощущение «дома» рядом с партнёром — спокойствие, уют, постоянство", textEn: "I value the feeling of 'home' next to my partner — calm, comfort, constancy" },
  { number: 30, dimension: "STABLE", textRu: "Верность и постоянство для меня — фундаментальные условия хороших отношений", textEn: "Fidelity and constancy are fundamental conditions of a good relationship for me" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const RELATIONSHIP_VALUES_TEST_ID = "relationship-values";

export const relationshipValuesTestMeta = {
  id: RELATIONSHIP_VALUES_TEST_ID,
  slug: "relationship-values",
  nameRu: "Ценности в отношениях",
  nameEn: "Relationship Values",
  descriptionRu: "Что для вас по-настоящему важно в близких отношениях? Тест выявляет ваш уникальный профиль из шести ценностей: доверие, забота, пространство, рост, страсть и стабильность.",
  descriptionEn: "What truly matters to you in close relationships? The test reveals your unique profile across six values: trust, care, space, growth, passion, and stability.",
  methodology: "Relationship Values Inventory (original)",
  estimatedMinutes: 7,
  questionCount: 30,
  category: "family",
};

export const relationshipValuesDimensions = {
  TRUST: {
    nameRu: "Доверие",
    nameEn: "Trust",
    color: "#3B82F6",
    descHighRu: "Доверие — ваша ключевая ценность в отношениях. Вам необходима полная открытость и честность. Без этого фундамента близость невозможна. Партнёр должен быть человеком, которому можно доверять безоговорочно.",
    descHighEn: "Trust is your core relationship value. You need complete openness and honesty. Without this foundation, intimacy is impossible. Your partner must be someone you can trust unconditionally.",
    descLowRu: "Доверие менее выражено как доминирующая ценность — вы более гибки к несовершенной честности.",
    descLowEn: "Trust is less expressed as a dominant value — you're more flexible about imperfect honesty.",
  },
  CARE: {
    nameRu: "Забота",
    nameEn: "Care",
    color: "#EC4899",
    descHighRu: "Забота и принятие — ваши главные потребности в отношениях. Вы хотите чувствовать, что вас любят таким, какой вы есть, замечают и поддерживают. Безусловное принятие для вас важнее всего.",
    descHighEn: "Care and acceptance are your primary needs in relationships. You want to feel loved as you are, noticed and supported. Unconditional acceptance matters most to you.",
    descLowRu: "Забота менее выражена как приоритет — вы более самодостаточны и не ищете постоянного эмоционального внимания.",
    descLowEn: "Care is less expressed as a priority — you're more self-sufficient and don't seek constant emotional attention.",
  },
  SPACE: {
    nameRu: "Пространство",
    nameEn: "Space",
    color: "#10B981",
    descHighRu: "Личное пространство и независимость — важные условия ваших отношений. Вы цените союз двух самодостаточных людей. Слияние и созависимость вас угнетают. Партнёр должен уважать вашу автономию.",
    descHighEn: "Personal space and independence are important conditions for your relationships. You value a union of two self-sufficient people. Merger and codependency oppress you. Your partner must respect your autonomy.",
    descLowRu: "Личное пространство менее приоритетно — вам комфортно с высокой степенью близости и совместности.",
    descLowEn: "Personal space is less of a priority — you're comfortable with a high degree of closeness and togetherness.",
  },
  GROW: {
    nameRu: "Рост",
    nameEn: "Growth",
    color: "#F59E0B",
    descHighRu: "Рост вместе — ключевая ценность в ваших отношениях. Вы ищете партнёра-единомышленника, с которым движетесь вперёд. Стагнация в отношениях вас угнетает больше, чем трудности пути.",
    descHighEn: "Growing together is a key value in your relationships. You seek a like-minded partner to move forward with. Stagnation in relationships oppresses you more than the difficulties of the path.",
    descLowRu: "Совместный рост менее выражен как ценность — вам комфортно в отношениях без постоянного движения вперёд.",
    descLowEn: "Growing together is less expressed as a value — you're comfortable in relationships without constant forward movement.",
  },
  PASS: {
    nameRu: "Страсть",
    nameEn: "Passion",
    color: "#EF4444",
    descHighRu: "Страсть и близость — важная ценность в ваших отношениях. Вам нужна «искра» — эмоциональное и физическое притяжение. Без этого интенсивного измерения отношения ощущаются неполными.",
    descHighEn: "Passion and intimacy are an important value in your relationships. You need a 'spark' — emotional and physical attraction. Without this intense dimension, the relationship feels incomplete.",
    descLowRu: "Страсть менее выражена как приоритет — вы цените другие измерения отношений больше, чем интенсивность.",
    descLowEn: "Passion is less expressed as a priority — you value other dimensions of relationships more than intensity.",
  },
  STABLE: {
    nameRu: "Стабильность",
    nameEn: "Stability",
    color: "#6366F1",
    descHighRu: "Стабильность и надёжность — ваш фундамент в отношениях. Вы цените предсказуемость, постоянство и чувство «дома». Яркость менее важна, чем уверенность в партнёре и общем будущем.",
    descHighEn: "Stability and reliability are your relationship foundation. You value predictability, constancy, and the feeling of 'home'. Brightness matters less than confidence in your partner and shared future.",
    descLowRu: "Стабильность менее выражена как приоритет — вы комфортно себя чувствуете с неопределённостью и изменениями.",
    descLowEn: "Stability is less expressed as a priority — you feel comfortable with uncertainty and change.",
  },
};

export function getRelationshipValuesQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `rv-q-${item.number}`,
    test_id: RELATIONSHIP_VALUES_TEST_ID,
    question_number: idx + 1,
    text_ru: item.textRu,
    text_en: item.textEn,
    type: "scale" as const,
    depth_level: 1,
    scale_min: 1,
    scale_max: 5,
    scale_min_label_ru: "Совсем не важно",
    scale_min_label_en: "Not important at all",
    scale_max_label_ru: "Критически важно",
    scale_max_label_en: "Critically important",
    is_required: true,
    branch_logic: null,
    scoring_key: { dimension: item.dimension },
    metadata: null,
    created_at: new Date().toISOString(),
    options: [
      { id: `rv-o-${item.number}-1`, question_id: `rv-q-${item.number}`, option_key: "1", text_ru: "Совсем не важно", text_en: "Not important at all", sort_order: 0 },
      { id: `rv-o-${item.number}-2`, question_id: `rv-q-${item.number}`, option_key: "2", text_ru: "Мало важно", text_en: "Slightly important", sort_order: 1 },
      { id: `rv-o-${item.number}-3`, question_id: `rv-q-${item.number}`, option_key: "3", text_ru: "Важно", text_en: "Important", sort_order: 2 },
      { id: `rv-o-${item.number}-4`, question_id: `rv-q-${item.number}`, option_key: "4", text_ru: "Очень важно", text_en: "Very important", sort_order: 3 },
      { id: `rv-o-${item.number}-5`, question_id: `rv-q-${item.number}`, option_key: "5", text_ru: "Критически важно", text_en: "Critically important", sort_order: 4 },
    ],
  }));
}
