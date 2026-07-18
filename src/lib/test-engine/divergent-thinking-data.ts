import { Question, QuestionOption } from "@/types/database";

// Дивергентное мышление — 28 вопросов, 4 измерения по 7 вопросов
// Адаптировано из Torrance Tests of Creative Thinking (TTCT)
// FLUID=Беглость, FLEX=Гибкость, ORIG=Оригинальность, ELAB=Разработанность

interface DivThinkItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "FLUID" | "FLEX" | "ORIG" | "ELAB";
}

const items: DivThinkItem[] = [
  // FLUID — Беглость (количество идей быстро)
  { number: 1,  dimension: "FLUID", textRu: "Когда нужно придумать идеи, я генерирую их быстро и в большом количестве", textEn: "When I need to come up with ideas, I generate them quickly and in large numbers" },
  { number: 2,  dimension: "FLUID", textRu: "Я могу назвать десятки вариантов использования обычного предмета за несколько минут", textEn: "I can name dozens of uses for an ordinary object in just a few minutes" },
  { number: 3,  dimension: "FLUID", textRu: "В мозговом штурме я один из тех, кто предлагает больше всего идей", textEn: "In brainstorming I'm one of those who proposes the most ideas" },
  { number: 4,  dimension: "FLUID", textRu: "Мысли и ассоциации текут у меня легко — я редко «зависаю» на пустом листе", textEn: "Thoughts and associations flow easily for me — I rarely 'get stuck' at a blank page" },
  { number: 5,  dimension: "FLUID", textRu: "Мне не нужно долго думать, чтобы предложить несколько вариантов решения задачи", textEn: "I don't need to think long to suggest several solutions to a problem" },
  { number: 6,  dimension: "FLUID", textRu: "Я замечаю, что у меня идей обычно больше, чем времени их реализовать", textEn: "I notice I usually have more ideas than time to implement them" },
  { number: 7,  dimension: "FLUID", textRu: "Даже в скучной ситуации я быстро нахожу несколько способов сделать её интереснее", textEn: "Even in a boring situation I quickly find several ways to make it more interesting" },

  // FLEX — Гибкость (разные категории, смена подходов)
  { number: 8,  dimension: "FLEX", textRu: "Я легко переключаюсь между совершенно разными подходами к одной задаче", textEn: "I easily switch between completely different approaches to the same problem" },
  { number: 9,  dimension: "FLEX", textRu: "Когда один подход не работает, я сразу думаю: «А какие ещё есть способы?»", textEn: "When one approach doesn't work, I immediately think: 'What other ways are there?'" },
  { number: 10, dimension: "FLEX", textRu: "Мои идеи, как правило, относятся к разным категориям — я не зацикливаюсь на одном направлении", textEn: "My ideas typically span different categories — I don't get stuck in one direction" },
  { number: 11, dimension: "FLEX", textRu: "Я могу посмотреть на проблему с точки зрения очень разных людей или дисциплин", textEn: "I can look at a problem from the perspective of very different people or disciplines" },
  { number: 12, dimension: "FLEX", textRu: "Мне не сложно отказаться от первой идеи и начать думать в совершенно другом направлении", textEn: "It's not difficult to abandon the first idea and start thinking in a completely different direction" },
  { number: 13, dimension: "FLEX", textRu: "Я нахожу нестандартные применения для привычных вещей или методов", textEn: "I find unconventional applications for familiar things or methods" },
  { number: 14, dimension: "FLEX", textRu: "В дискуссии я легко меняю позицию, если вижу более убедительный аргумент", textEn: "In discussions I easily shift my position when I see a more compelling argument" },

  // ORIG — Оригинальность (необычные, редкие идеи)
  { number: 15, dimension: "ORIG", textRu: "Мои идеи часто удивляют других — они не такие, как у большинства", textEn: "My ideas often surprise others — they're not like most people's" },
  { number: 16, dimension: "ORIG", textRu: "Мне интереснее придумать что-то уникальное, чем улучшить существующее", textEn: "I find it more interesting to invent something unique than to improve what already exists" },
  { number: 17, dimension: "ORIG", textRu: "Когда я ищу решение, я намеренно избегаю первого очевидного варианта", textEn: "When looking for a solution I deliberately avoid the first obvious option" },
  { number: 18, dimension: "ORIG", textRu: "Я часто нахожу связи между вещами, которые другие воспринимают как несвязанные", textEn: "I often find connections between things that others see as unrelated" },
  { number: 19, dimension: "ORIG", textRu: "Мои метафоры и сравнения нередко удивляют или озадачивают собеседников", textEn: "My metaphors and comparisons often surprise or puzzle the people I'm talking to" },
  { number: 20, dimension: "ORIG", textRu: "Я замечаю, что мой взгляд на вещи часто отличается от того, что думает большинство", textEn: "I notice that my view of things often differs from what most people think" },
  { number: 21, dimension: "ORIG", textRu: "Мне не нравится делать «как все» — я ищу свой, нестандартный путь", textEn: "I don't like doing things 'like everyone else' — I look for my own unconventional path" },

  // ELAB — Разработанность (детали, развитие идей)
  { number: 22, dimension: "ELAB", textRu: "Когда у меня появляется идея, я сразу вижу множество деталей и нюансов её реализации", textEn: "When I get an idea I immediately see many details and nuances of its implementation" },
  { number: 23, dimension: "ELAB", textRu: "Мне нравится доводить идею до конца — прорабатывать её в деталях", textEn: "I enjoy taking an idea all the way — working it out in detail" },
  { number: 24, dimension: "ELAB", textRu: "Я легко достраиваю чужую идею — добавляю слои, детали, уточнения", textEn: "I easily build on someone else's idea — adding layers, details, refinements" },
  { number: 25, dimension: "ELAB", textRu: "Я умею сделать простую идею богаче и интереснее, не меняя её сути", textEn: "I can make a simple idea richer and more interesting without changing its essence" },
  { number: 26, dimension: "ELAB", textRu: "Мои проекты и задумки обычно получаются детально проработанными, а не набросками", textEn: "My projects and ideas usually turn out thoroughly developed rather than rough sketches" },
  { number: 27, dimension: "ELAB", textRu: "Я замечаю детали, которые другие пропускают, и это обогащает мои решения", textEn: "I notice details that others miss, and this enriches my solutions" },
  { number: 28, dimension: "ELAB", textRu: "Мне приятно улучшать и шлифовать уже созданное — доводить до совершенства", textEn: "I enjoy improving and refining what's already been created — bringing it to perfection" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const DIVERGENT_THINKING_TEST_ID = "divergent-thinking";

export const divergentThinkingTestMeta = {
  id: DIVERGENT_THINKING_TEST_ID,
  slug: "divergent-thinking",
  nameRu: "Дивергентное мышление",
  nameEn: "Divergent Thinking",
  descriptionRu: "Насколько развито ваше творческое мышление? Тест по модели Торранса оценивает четыре компонента: беглость идей, гибкость, оригинальность и разработанность.",
  descriptionEn: "How developed is your creative thinking? Based on Torrance's model, the test assesses four components: idea fluency, flexibility, originality, and elaboration.",
  methodology: "Torrance Tests of Creative Thinking (TTCT adapted)",
  estimatedMinutes: 7,
  questionCount: 28,
  category: "creativity",
};

export const divergentThinkingDimensions = {
  FLUID: {
    nameRu: "Беглость",
    nameEn: "Fluency",
    color: "#3B82F6",
    descHighRu: "Беглость идей — ваша сильная сторона. Вы генерируете большое количество идей быстро и без усилий. Это основа продуктивного творческого процесса — чем больше идей, тем выше шанс найти отличную.",
    descHighEn: "Ideational fluency is your strength. You generate a large number of ideas quickly and effortlessly. This is the basis of a productive creative process — the more ideas, the greater the chance of finding an excellent one.",
    descLowRu: "Беглость менее выражена — вам требуется больше времени для генерации идей. Это не недостаток: часто качество важнее количества.",
    descLowEn: "Fluency is less pronounced — you need more time to generate ideas. This isn't a flaw: quality often matters more than quantity.",
  },
  FLEX: {
    nameRu: "Гибкость",
    nameEn: "Flexibility",
    color: "#10B981",
    descHighRu: "Гибкость мышления у вас высокая — вы легко переключаетесь между категориями и подходами. Вы не зацикливаетесь на одном направлении и смотрите на проблему с разных углов.",
    descHighEn: "Your thinking flexibility is high — you easily switch between categories and approaches. You don't get stuck in one direction and look at problems from different angles.",
    descLowRu: "Гибкость менее выражена — вы склонны разрабатывать одно направление глубоко, а не исследовать множество разных подходов.",
    descLowEn: "Flexibility is less pronounced — you tend to develop one direction deeply rather than explore many different approaches.",
  },
  ORIG: {
    nameRu: "Оригинальность",
    nameEn: "Originality",
    color: "#8B5CF6",
    descHighRu: "Оригинальность — ваш творческий конёк. Ваши идеи редкие и необычные. Вы видите неочевидные связи и намеренно избегаете шаблонных решений. Это самый редкий из четырёх компонентов.",
    descHighEn: "Originality is your creative forte. Your ideas are rare and unusual. You see non-obvious connections and deliberately avoid template solutions. This is the rarest of the four components.",
    descLowRu: "Оригинальность менее выражена — вы генерируете надёжные, проверенные идеи. Это ценно: не всем задачам нужна революционность.",
    descLowEn: "Originality is less pronounced — you generate reliable, proven ideas. This is valuable: not every task needs revolutionary thinking.",
  },
  ELAB: {
    nameRu: "Разработанность",
    nameEn: "Elaboration",
    color: "#F59E0B",
    descHighRu: "Разработанность — ваше творческое преимущество. Вы не останавливаетесь на наброске — вы детально прорабатываете идею, видите нюансы и доводите её до реализации. Это мост между идеей и результатом.",
    descHighEn: "Elaboration is your creative advantage. You don't stop at a sketch — you work out the idea in detail, see nuances, and bring it to implementation. This is the bridge between idea and result.",
    descLowRu: "Разработанность менее выражена — вам интереснее генерировать новые идеи, чем детально прорабатывать одну.",
    descLowEn: "Elaboration is less pronounced — you find it more interesting to generate new ideas than to work one out in detail.",
  },
};

export function getDivergentThinkingQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `dt-q-${item.number}`,
    test_id: DIVERGENT_THINKING_TEST_ID,
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
      { id: `dt-o-${item.number}-1`, question_id: `dt-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `dt-o-${item.number}-2`, question_id: `dt-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `dt-o-${item.number}-3`, question_id: `dt-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `dt-o-${item.number}-4`, question_id: `dt-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `dt-o-${item.number}-5`, question_id: `dt-q-${item.number}`, option_key: "5", text_ru: "Очень точно", text_en: "Very accurate", sort_order: 4 },
    ],
  }));
}
