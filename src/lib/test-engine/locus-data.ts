import { Question, QuestionOption } from "@/types/database";

// Locus of Control — адаптация шкалы Роттера + современные пункты
// 2 измерения: INTERNAL (я управляю жизнью) / EXTERNAL (внешние силы управляют)
// 20 вопросов, scale 1-5

interface LocusItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "INTERNAL" | "EXTERNAL";
  reverse: boolean;
}

const items: LocusItem[] = [
  // INTERNAL — что я могу на это повлиять
  { number: 1,  textRu: "Мои успехи зависят прежде всего от моих усилий и решений", textEn: "My successes depend mainly on my own effort and decisions", dimension: "INTERNAL", reverse: false },
  { number: 2,  textRu: "Когда что-то идёт не так, я ищу способ это изменить", textEn: "When things go wrong, I look for ways to change them", dimension: "INTERNAL", reverse: false },
  { number: 3,  textRu: "Я верю, что могу влиять на большинство важных событий в своей жизни", textEn: "I believe I can influence most important events in my life", dimension: "INTERNAL", reverse: false },
  { number: 4,  textRu: "Мои отношения с людьми во многом определяются тем, как я себя веду", textEn: "My relationships with people largely depend on how I behave", dimension: "INTERNAL", reverse: false },
  { number: 5,  textRu: "Если я много работаю, то добиваюсь результата — это закономерность, а не удача", textEn: "If I work hard, I get results — that's a pattern, not luck", dimension: "INTERNAL", reverse: false },
  { number: 6,  textRu: "Своим здоровьем я в значительной степени управляю сам — выбором образа жизни", textEn: "I largely manage my own health through lifestyle choices", dimension: "INTERNAL", reverse: false },
  { number: 7,  textRu: "Когда я чувствую себя несчастным, я понимаю, что сам могу что-то изменить", textEn: "When I feel unhappy, I understand that I myself can change something", dimension: "INTERNAL", reverse: false },
  { number: 8,  textRu: "Я сам определяю, каким человеком быть — моё окружение лишь влияет, но не решает", textEn: "I define who I am — my environment influences but doesn't decide", dimension: "INTERNAL", reverse: false },
  { number: 9,  textRu: "Мои финансовые результаты зависят от моих решений, а не от экономики", textEn: "My financial results depend on my decisions, not the economy", dimension: "INTERNAL", reverse: false },
  { number: 10, textRu: "Я не жду, пока ситуация изменится сама — я её меняю", textEn: "I don't wait for the situation to change on its own — I change it", dimension: "INTERNAL", reverse: false },

  // EXTERNAL — внешние силы, удача, другие люди
  { number: 11, textRu: "Многое в жизни зависит от удачи и совпадений — как сложится", textEn: "Much in life depends on luck and coincidence — however it turns out", dimension: "EXTERNAL", reverse: false },
  { number: 12, textRu: "Планировать надолго бессмысленно — всё равно вмешаются обстоятельства", textEn: "Long-term planning is pointless — circumstances always interfere", dimension: "EXTERNAL", reverse: false },
  { number: 13, textRu: "Успех во многом определяется связями и нужными знакомствами", textEn: "Success is largely determined by connections and the right acquaintances", dimension: "EXTERNAL", reverse: false },
  { number: 14, textRu: "То, как сложилась моя жизнь, во многом зависело от других людей", textEn: "How my life has turned out depended greatly on other people", dimension: "EXTERNAL", reverse: false },
  { number: 15, textRu: "Я не могу существенно повлиять на происходящее — мир слишком непредсказуем", textEn: "I can't significantly influence what happens — the world is too unpredictable", dimension: "EXTERNAL", reverse: false },
  { number: 16, textRu: "Когда у меня что-то получается, я понимаю, что во многом это благодаря обстоятельствам", textEn: "When something works out for me, I realize that much of it is due to circumstances", dimension: "EXTERNAL", reverse: false },
  { number: 17, textRu: "Моё положение в жизни определено системой — индивидуальные усилия меняют мало", textEn: "My position in life is determined by the system — individual effort changes little", dimension: "EXTERNAL", reverse: false },
  { number: 18, textRu: "Большинство проблем в моей жизни вызваны внешними факторами, не мной", textEn: "Most problems in my life are caused by external factors, not me", dimension: "EXTERNAL", reverse: false },
  { number: 19, textRu: "Я редко могу предсказать, как обернётся ситуация — слишком многое вне моего контроля", textEn: "I rarely can predict how a situation will turn out — too much is out of my control", dimension: "EXTERNAL", reverse: false },
  { number: 20, textRu: "Мои достижения — во многом результат того, что мне повезло оказаться в нужное время в нужном месте", textEn: "My achievements are largely the result of being lucky enough to be in the right place at the right time", dimension: "EXTERNAL", reverse: false },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const LOCUS_TEST_ID = "locus-control";

export const locusTestMeta = {
  id: LOCUS_TEST_ID,
  slug: "locus-control",
  nameRu: "Локус контроля",
  nameEn: "Locus of Control",
  descriptionRu: "Верите ли вы, что управляете своей жизнью — или она управляется внешними силами? Тест раскрывает вашу базовую установку к ответственности и влиянию.",
  descriptionEn: "Do you believe you control your life — or is it controlled by external forces? The test reveals your core stance on responsibility and influence.",
  methodology: "Rotter's I-E Scale adapted",
  estimatedMinutes: 5,
  questionCount: 20,
  category: "psychology",
};

export const locusDimensions = {
  INTERNAL: {
    nameRu: "Внутренний локус",
    nameEn: "Internal Locus",
    color: "#3B82F6",
    descHighRu: "Вы убеждены, что ваша жизнь — в ваших руках. Успехи и неудачи вы связываете прежде всего со своими решениями и усилиями. Это мощная основа для действий и ответственности. Обратная сторона — риск брать на себя слишком много вины за то, что действительно вне вашего контроля.",
    descHighEn: "You believe your life is in your hands. You attribute successes and failures primarily to your own decisions and efforts. This is a powerful foundation for action and responsibility. The flip side is the risk of taking on too much blame for things genuinely outside your control.",
    descLowRu: "Внутренний контроль менее выражен — вы склонны замечать роль случая и других людей в своей жизни.",
    descLowEn: "Internal control is less pronounced — you tend to notice the role of chance and other people in your life.",
  },
  EXTERNAL: {
    nameRu: "Внешний локус",
    nameEn: "External Locus",
    color: "#F59E0B",
    descHighRu: "Вы склонны считать, что многое в жизни определяется внешними факторами — удачей, системой, другими людьми. Это не слабость: иногда обстоятельства действительно важнее усилий. Но если этот паттерн доминирует, он может снижать мотивацию к действию — ведь «всё равно ничего не изменишь».",
    descHighEn: "You tend to believe much in life is determined by external factors — luck, the system, other people. This isn't weakness: sometimes circumstances genuinely matter more than effort. But if this pattern dominates, it can reduce motivation to act — since 'nothing will change anyway'.",
    descLowRu: "Внешний локус менее выражен — вы не склонны объяснять всё удачей или обстоятельствами.",
    descLowEn: "External locus is less pronounced — you don't tend to explain everything through luck or circumstances.",
  },
};

export function getLocusQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `loc-q-${item.number}`,
    test_id: LOCUS_TEST_ID,
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
    scoring_key: { dimension: item.dimension, reverse: item.reverse },
    metadata: null,
    created_at: new Date().toISOString(),
    options: [
      { id: `loc-o-${item.number}-1`, question_id: `loc-q-${item.number}`, option_key: "1", text_ru: "Совершенно не согласен", text_en: "Strongly disagree", sort_order: 0 },
      { id: `loc-o-${item.number}-2`, question_id: `loc-q-${item.number}`, option_key: "2", text_ru: "Скорее не согласен", text_en: "Disagree", sort_order: 1 },
      { id: `loc-o-${item.number}-3`, question_id: `loc-q-${item.number}`, option_key: "3", text_ru: "Нейтрально", text_en: "Neutral", sort_order: 2 },
      { id: `loc-o-${item.number}-4`, question_id: `loc-q-${item.number}`, option_key: "4", text_ru: "Скорее согласен", text_en: "Agree", sort_order: 3 },
      { id: `loc-o-${item.number}-5`, question_id: `loc-q-${item.number}`, option_key: "5", text_ru: "Полностью согласен", text_en: "Strongly agree", sort_order: 4 },
    ],
  }));
}
