import { Question, QuestionOption } from "@/types/database";

// Когнитивные искажения — 36 вопросов, 6 измерений по 6 вопросов
// CATAS=Катастрофизация, BWTHINK=Чёрно-белое мышление, FILTER=Ментальный фильтр,
// PERSON=Персонализация, SHOULD=Долженствование, JUMP=Поспешные выводы
// Высокий балл = искажение активно выражено

interface BiasItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "CATAS" | "BWTHINK" | "FILTER" | "PERSON" | "SHOULD" | "JUMP";
}

const items: BiasItem[] = [
  // CATAS — Катастрофизация
  { number: 1,  dimension: "CATAS", textRu: "Когда что-то идёт не так, я быстро начинаю думать о самом худшем исходе", textEn: "When something goes wrong, I quickly start thinking about the worst possible outcome" },
  { number: 2,  dimension: "CATAS", textRu: "Небольшая проблема нередко вырастает в моей голове в катастрофу", textEn: "A small problem often grows into a catastrophe in my mind" },
  { number: 3,  dimension: "CATAS", textRu: "Я часто думаю: «А вдруг всё рухнет?» — даже когда для этого нет серьёзных оснований", textEn: "I often think 'What if everything falls apart?' — even without serious grounds for it" },
  { number: 4,  dimension: "CATAS", textRu: "Когда я представляю будущее, мне легче увидеть плохой сценарий, чем хороший", textEn: "When I imagine the future, it's easier to see a bad scenario than a good one" },
  { number: 5,  dimension: "CATAS", textRu: "Мелкие неудачи кажутся мне сигналом чего-то более серьёзного", textEn: "Minor setbacks feel like a signal of something more serious" },
  { number: 6,  dimension: "CATAS", textRu: "Я нередко думаю: «Если это случится — я не справлюсь»", textEn: "I often think 'If this happens — I won't be able to cope'" },

  // BWTHINK — Чёрно-белое мышление
  { number: 7,  dimension: "BWTHINK", textRu: "Если я не справился на 100%, я воспринимаю это как полный провал", textEn: "If I didn't succeed 100%, I see it as a total failure" },
  { number: 8,  dimension: "BWTHINK", textRu: "Я склонен делить людей на хороших и плохих, без промежуточных вариантов", textEn: "I tend to divide people into good and bad, without middle ground" },
  { number: 9,  dimension: "BWTHINK", textRu: "В ситуациях я обычно вижу два варианта: всё или ничего", textEn: "In situations I usually see two options: all or nothing" },
  { number: 10, dimension: "BWTHINK", textRu: "Если что-то пошло не по плану — значит, всё испорчено", textEn: "If something didn't go to plan — it means everything is ruined" },
  { number: 11, dimension: "BWTHINK", textRu: "Мне трудно принять, что что-то может быть «нормальным» — хочется либо отлично, либо не имеет смысла", textEn: "It's hard for me to accept that something can be 'okay' — I want either excellent or it's not worth it" },
  { number: 12, dimension: "BWTHINK", textRu: "Я замечаю, что часто оцениваю себя в крайностях: либо молодец, либо полный неудачник", textEn: "I notice I often evaluate myself in extremes: either great or a complete failure" },

  // FILTER — Ментальный фильтр (фокус на негативе)
  { number: 13, dimension: "FILTER", textRu: "Даже если большинство отзывов положительные, один критический перекрывает всё остальное", textEn: "Even if most feedback is positive, one critical comment overshadows everything else" },
  { number: 14, dimension: "FILTER", textRu: "После события я чаще вспоминаю то, что пошло не так, чем то, что удалось", textEn: "After an event I more often remember what went wrong than what worked" },
  { number: 15, dimension: "FILTER", textRu: "Я замечаю, что мой взгляд «прилипает» к проблемам и недостаткам, не к сильным сторонам", textEn: "I notice my attention 'sticks' to problems and flaws rather than strengths" },
  { number: 16, dimension: "FILTER", textRu: "Хорошие события кажутся мне случайными, а плохие — закономерными", textEn: "Good events feel accidental to me, while bad ones feel natural" },
  { number: 17, dimension: "FILTER", textRu: "Когда мне говорят комплимент, я нахожу причину не верить ему", textEn: "When someone gives me a compliment, I find a reason not to believe it" },
  { number: 18, dimension: "FILTER", textRu: "В конце дня я чаще думаю о том, что не сделал, чем о том, что сделал", textEn: "At the end of the day I more often think about what I didn't do than what I did" },

  // PERSON — Персонализация
  { number: 19, dimension: "PERSON", textRu: "Когда кто-то расстроен рядом со мной, я первым делом думаю: «Это из-за меня»", textEn: "When someone near me is upset, my first thought is 'It's because of me'" },
  { number: 20, dimension: "PERSON", textRu: "Я склонен брать на себя ответственность за проблемы, которые меня не касаются", textEn: "I tend to take responsibility for problems that don't involve me" },
  { number: 21, dimension: "PERSON", textRu: "Если что-то пошло не так в группе — я ищу свою вину первым", textEn: "If something went wrong in a group — I'm the first to look for my own fault" },
  { number: 22, dimension: "PERSON", textRu: "Чужое плохое настроение я нередко воспринимаю как реакцию на меня", textEn: "I often take someone else's bad mood as a reaction to me" },
  { number: 23, dimension: "PERSON", textRu: "Я часто думаю: «Если бы я поступил иначе — этого не случилось бы», даже когда это не так", textEn: "I often think 'If I had acted differently this wouldn't have happened' even when that's not the case" },
  { number: 24, dimension: "PERSON", textRu: "Я чувствую себя виноватым за вещи, которые явно вне моего контроля", textEn: "I feel guilty about things that are clearly outside my control" },

  // SHOULD — Долженствование
  { number: 25, dimension: "SHOULD", textRu: "Я часто говорю себе: «Я должен был...» или «Мне следовало бы...»", textEn: "I often tell myself 'I should have...' or 'I ought to...'" },
  { number: 26, dimension: "SHOULD", textRu: "У меня есть жёсткие правила о том, как должны вести себя люди — и я расстраиваюсь, когда они их нарушают", textEn: "I have rigid rules about how people should behave — and I get upset when they violate them" },
  { number: 27, dimension: "SHOULD", textRu: "Я ставлю себе очень высокую планку и злюсь на себя, когда не достигаю её", textEn: "I set myself a very high bar and get angry at myself when I don't reach it" },
  { number: 28, dimension: "SHOULD", textRu: "Мне сложно принять, что кто-то ведёт себя «не так, как надо»", textEn: "I find it hard to accept that someone is behaving 'not as they should'" },
  { number: 29, dimension: "SHOULD", textRu: "Я чувствую вину, когда делаю что-то для себя — ведь «должен» сначала другим", textEn: "I feel guilty when I do something for myself — because I 'should' help others first" },
  { number: 30, dimension: "SHOULD", textRu: "Внутренний голос часто говорит мне, что я недостаточно стараюсь", textEn: "An inner voice often tells me I'm not trying hard enough" },

  // JUMP — Поспешные выводы / чтение мыслей
  { number: 31, dimension: "JUMP", textRu: "Мне кажется, я знаю, что думают обо мне другие — даже без доказательств", textEn: "I feel I know what others think of me — even without evidence" },
  { number: 32, dimension: "JUMP", textRu: "Когда человек молчит или смотрит иначе, я уже делаю вывод о его отношении ко мне", textEn: "When someone is silent or looks differently, I already conclude how they feel about me" },
  { number: 33, dimension: "JUMP", textRu: "Я часто предвижу, чем закончится ситуация, и действую исходя из этого — даже не проверив", textEn: "I often predict how a situation will end and act accordingly — without checking" },
  { number: 34, dimension: "JUMP", textRu: "Мне легко убедить себя, что я знаю мотивы чужих поступков", textEn: "It's easy for me to convince myself that I know the motives behind others' actions" },
  { number: 35, dimension: "JUMP", textRu: "Если кто-то не ответил мне — я уже придумал причину (и она обычно плохая)", textEn: "If someone hasn't responded to me — I've already invented a reason (and it's usually bad)" },
  { number: 36, dimension: "JUMP", textRu: "Я принимаю решения на основе своих предположений о будущем, а не реальных данных", textEn: "I make decisions based on my assumptions about the future rather than actual data" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const COGNITIVE_BIAS_TEST_ID = "cognitive-bias";

export const cognitiveBiasTestMeta = {
  id: COGNITIVE_BIAS_TEST_ID,
  slug: "cognitive-bias",
  nameRu: "Когнитивные искажения",
  nameEn: "Cognitive Distortions",
  descriptionRu: "Какие мыслительные ловушки влияют на ваше восприятие мира? Тест выявляет 6 классических когнитивных искажений — паттернов мышления, которые искажают реальность и питают тревогу.",
  descriptionEn: "Which thinking traps affect your perception of reality? The test identifies 6 classic cognitive distortions — thought patterns that distort reality and fuel anxiety.",
  methodology: "CBT Cognitive Distortions (Burns adapted)",
  estimatedMinutes: 8,
  questionCount: 36,
  category: "intelligence",
};

export const cognitiveBiasDimensions = {
  CATAS: {
    nameRu: "Катастрофизация",
    nameEn: "Catastrophizing",
    color: "#EF4444",
    descHighRu: "Вы склонны к катастрофизации — преувеличению вероятности и масштаба негативных событий. Мозг воспринимает небольшую угрозу как грандиозную опасность. Это истощает и лишает способности действовать. Хорошая новость: этот паттерн хорошо поддаётся работе через КПТ.",
    descHighEn: "You tend to catastrophize — exaggerating the likelihood and scale of negative events. Your brain perceives a small threat as a grand danger. This is exhausting and paralyzes action. Good news: this pattern responds well to CBT work.",
    descLowRu: "Катастрофизация не характерна для вас — вы трезво оцениваете риски и не преувеличиваете угрозы.",
    descLowEn: "Catastrophizing is not typical for you — you assess risks soberly and don't exaggerate threats.",
  },
  BWTHINK: {
    nameRu: "Чёрно-белое мышление",
    nameEn: "All-or-Nothing Thinking",
    color: "#6366F1",
    descHighRu: "Вы склонны видеть ситуации в крайностях: успех или провал, хороший или плохой, всё или ничего. Промежуточные варианты теряются. Это порождает высокую самокритику и трудности с принятием «достаточно хорошего».",
    descHighEn: "You tend to see situations in extremes: success or failure, good or bad, all or nothing. The middle ground disappears. This breeds high self-criticism and difficulty accepting 'good enough'.",
    descLowRu: "Чёрно-белое мышление выражено слабо — вы видите оттенки и промежуточные варианты.",
    descLowEn: "All-or-nothing thinking is weak — you see nuance and middle ground.",
  },
  FILTER: {
    nameRu: "Ментальный фильтр",
    nameEn: "Mental Filter",
    color: "#F59E0B",
    descHighRu: "Ваше внимание «фильтрует» реальность в пользу негативного: один критический отзыв перевешивает десять позитивных. Хорошее воспринимается как случайность, плохое — как закономерность. Это искажает самооценку и отнимает радость.",
    descHighEn: "Your attention 'filters' reality toward the negative: one critical comment outweighs ten positive ones. Good is perceived as accidental, bad as natural. This distorts self-esteem and steals joy.",
    descLowRu: "Ментальный фильтр слабо выражен — вы воспринимаете и хорошее, и плохое в достаточно равных долях.",
    descLowEn: "Mental filter is weak — you perceive both good and bad in reasonably equal proportions.",
  },
  PERSON: {
    nameRu: "Персонализация",
    nameEn: "Personalization",
    color: "#10B981",
    descHighRu: "Вы склонны принимать ответственность за то, что вас не касается, и считать себя причиной чужих негативных состояний. Это перегружает и порождает постоянную вину. За этим часто стоит высокая эмпатия — но без здоровых границ.",
    descHighEn: "You tend to take responsibility for things that don't concern you and see yourself as the cause of others' negative states. This is overwhelming and generates constant guilt. High empathy often underlies this — but without healthy boundaries.",
    descLowRu: "Персонализация выражена слабо — вы не склонны брать на себя чужую ответственность.",
    descLowEn: "Personalization is weak — you don't tend to take on others' responsibility.",
  },
  SHOULD: {
    nameRu: "Долженствование",
    nameEn: "Should Statements",
    color: "#8B5CF6",
    descHighRu: "У вас активен внутренний критик с жёсткими правилами о том, как «должно быть». Постоянные «должен», «обязан», «следует» создают давление и вину. Этот паттерн часто связан с высокими стандартами — но мешает наслаждаться реальностью.",
    descHighEn: "You have an active inner critic with rigid rules about how things 'should be'. Constant 'musts', 'oughts', and 'shoulds' create pressure and guilt. This pattern is often linked to high standards — but interferes with enjoying reality.",
    descLowRu: "Долженствование выражено слабо — вы принимаете несовершенство без жёстких внутренних правил.",
    descLowEn: "Should statements are weak — you accept imperfection without rigid inner rules.",
  },
  JUMP: {
    nameRu: "Поспешные выводы",
    nameEn: "Jumping to Conclusions",
    color: "#F97316",
    descHighRu: "Вы склонны делать выводы без достаточных доказательств — «читать мысли» других людей или предсказывать будущее. Это порождает тревогу и конфликты на пустом месте. Часто за этим стоит высокая интуиция, которая иногда сбивается.",
    descHighEn: "You tend to draw conclusions without sufficient evidence — 'mind-reading' others or predicting the future. This generates anxiety and conflicts out of nowhere. High intuition often underlies this, which sometimes misfires.",
    descLowRu: "Поспешные выводы не характерны — вы склонны проверять предположения, прежде чем им доверять.",
    descLowEn: "Jumping to conclusions is not typical — you tend to check assumptions before trusting them.",
  },
};

export function getCognitiveBiasQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `cb-q-${item.number}`,
    test_id: COGNITIVE_BIAS_TEST_ID,
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
      { id: `cb-o-${item.number}-1`, question_id: `cb-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `cb-o-${item.number}-2`, question_id: `cb-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `cb-o-${item.number}-3`, question_id: `cb-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `cb-o-${item.number}-4`, question_id: `cb-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `cb-o-${item.number}-5`, question_id: `cb-q-${item.number}`, option_key: "5", text_ru: "Очень точно", text_en: "Very accurate", sort_order: 4 },
    ],
  }));
}
