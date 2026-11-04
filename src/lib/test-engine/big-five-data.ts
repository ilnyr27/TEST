import { Question, QuestionOption } from "@/types/database";

// Big Five — scenario-based adaptation of BFI-44
// Dimensions: O=Openness, C=Conscientiousness, E=Extraversion, A=Agreeableness, N=Neuroticism
// Scale 1-5: 1=Not me at all, 5=Definitely me
// Some items are reverse-scored (marked reverse: true)

interface BigFiveQuestion {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "O" | "C" | "E" | "A" | "N";
  reverse: boolean;
}

const bigFiveItems: BigFiveQuestion[] = [
  // Extraversion (E) — 8 items
  { number: 1,  textRu: "Когда в компании возникает тишина, я обычно нахожу что сказать первым", textEn: "When a conversation goes quiet, I usually find something to say first", dimension: "E", reverse: false },
  { number: 6,  textRu: "Мне нужно побыть одному, чтобы восстановить силы после насыщенного общения", textEn: "I need time alone to recharge after a lot of socializing", dimension: "E", reverse: true },
  { number: 11, textRu: "Даже к вечеру пятницы у меня остаётся энергия, чтобы чем-то заняться", textEn: "Even by Friday evening I still have energy to do something", dimension: "E", reverse: false },
  { number: 16, textRu: "Когда я рассказываю о чём-то, люди вокруг начинают заражаться моим интересом", textEn: "When I talk about something I love, people around me get caught up in my enthusiasm", dimension: "E", reverse: false },
  { number: 21, textRu: "На вечеринках я провожу больше времени в тихом разговоре с одним человеком, чем в центре шумной компании", textEn: "At parties I spend more time in a quiet conversation with one person than in the middle of a crowd", dimension: "E", reverse: true },
  { number: 26, textRu: "Я готов настаивать на своём, даже если это создаёт напряжение", textEn: "I am willing to push my point, even if it creates friction", dimension: "E", reverse: false },
  { number: 31, textRu: "Первые несколько минут в незнакомой компании мне непросто расслабиться", textEn: "The first few minutes in an unfamiliar group I find it hard to loosen up", dimension: "E", reverse: true },
  { number: 36, textRu: "Мне легко заводить разговор с незнакомыми людьми", textEn: "I find it easy to start a conversation with strangers", dimension: "E", reverse: false },

  // Agreeableness (A) — 9 items
  { number: 2,  textRu: "Когда кто-то рассказывает о своём плане, я замечаю его слабые стороны раньше, чем сильные", textEn: "When someone describes their plan, I notice its flaws before its strengths", dimension: "A", reverse: true },
  { number: 7,  textRu: "Мне несложно помочь кому-то, даже если это отнимает моё личное время", textEn: "I don't mind helping others even when it takes up my personal time", dimension: "A", reverse: false },
  { number: 12, textRu: "Я готов открыто поспорить, если убеждён, что прав", textEn: "I am willing to argue openly if I believe I am right", dimension: "A", reverse: true },
  { number: 17, textRu: "Я могу отпустить обиду, не держась за неё месяцами", textEn: "I can let go of a grudge rather than holding onto it for months", dimension: "A", reverse: false },
  { number: 22, textRu: "Мой первый порыв в отношении нового человека — доверие, а не осторожность", textEn: "My first instinct with a new person is to trust them, not be cautious", dimension: "A", reverse: false },
  { number: 27, textRu: "Когда я устал или расстроен, я могу быть отстранённым в общении", textEn: "When I am tired or upset, I can become distant and hard to reach", dimension: "A", reverse: true },
  { number: 32, textRu: "Я замечаю, когда кому-то рядом плохо, и стараюсь это исправить", textEn: "I notice when someone nearby is not OK and try to do something about it", dimension: "A", reverse: false },
  { number: 37, textRu: "В момент раздражения я могу сказать что-то резкое, не успев подумать", textEn: "When irritated, I can say something blunt before I have time to think", dimension: "A", reverse: true },
  { number: 42, textRu: "Мне больше нравится работать вместе с кем-то, чем в одиночку", textEn: "I enjoy working alongside someone more than working alone", dimension: "A", reverse: false },

  // Conscientiousness (C) — 9 items
  { number: 3,  textRu: "Перед тем как сдать работу, я обычно проверяю её ещё раз", textEn: "Before handing something in, I usually check it one more time", dimension: "C", reverse: false },
  { number: 8,  textRu: "Я могу отправить сообщение или документ, не перечитав его", textEn: "I can send a message or document without rereading it first", dimension: "C", reverse: true },
  { number: 13, textRu: "Если я обещал что-то сделать — это будет сделано", textEn: "If I said I would do something, it will get done", dimension: "C", reverse: false },
  { number: 18, textRu: "Мой рабочий стол и файлы нередко превращаются в хаос", textEn: "My desk and files often turn into a mess", dimension: "C", reverse: true },
  { number: 23, textRu: "Мне бывает сложно заставить себя начать дело, которое не интересно", textEn: "I sometimes struggle to make myself start a task that doesn't interest me", dimension: "C", reverse: true },
  { number: 28, textRu: "Я не успокоюсь, пока не доведу начатое до конца", textEn: "I won't rest until I have finished what I started", dimension: "C", reverse: false },
  { number: 33, textRu: "Я обычно нахожу самый короткий путь к нужному результату", textEn: "I usually find the most direct path to the result I need", dimension: "C", reverse: false },
  { number: 38, textRu: "Когда у меня есть план, я его придерживаюсь, а не меняю на ходу", textEn: "When I have a plan, I stick to it rather than change it along the way", dimension: "C", reverse: false },
  { number: 43, textRu: "Мне сложно долго сосредоточиться на одной задаче, не отвлекаясь", textEn: "I find it hard to focus on one task for long without getting distracted", dimension: "C", reverse: true },

  // Neuroticism (N) — 8 items
  { number: 4,  textRu: "Бывают периоды, когда всё кажется серым и хочется просто не двигаться", textEn: "There are periods when everything feels grey and I just want to stay still", dimension: "N", reverse: false },
  { number: 9,  textRu: "Когда всё идёт не по плану, я обычно нахожу способ не паниковать", textEn: "When things go off plan, I usually find a way not to panic", dimension: "N", reverse: true },
  { number: 14, textRu: "Я замечаю, что внутреннее напряжение накапливается во мне даже без видимой причины", textEn: "I notice inner tension building up even when there is no obvious reason", dimension: "N", reverse: false },
  { number: 19, textRu: "Я могу долго прокручивать в голове то, что уже нельзя изменить", textEn: "I can replay something in my head for a long time even when it can no longer be changed", dimension: "N", reverse: false },
  { number: 24, textRu: "Мои эмоции обычно ровные — меня сложно выбить из колеи", textEn: "My emotions are usually steady — it takes a lot to knock me off balance", dimension: "N", reverse: true },
  { number: 29, textRu: "Моё настроение может резко меняться без очевидной причины", textEn: "My mood can shift sharply without an obvious reason", dimension: "N", reverse: false },
  { number: 34, textRu: "В критический момент я обычно думаю трезво, а не теряюсь", textEn: "In a critical moment I usually think clearly rather than freeze", dimension: "N", reverse: true },
  { number: 39, textRu: "Мне достаточно небольшой неопределённости, чтобы начать беспокоиться", textEn: "A small amount of uncertainty is enough to make me start worrying", dimension: "N", reverse: false },

  // Openness (O) — 10 items
  { number: 5,  textRu: "У меня регулярно появляются идеи, которые я раньше нигде не слышал", textEn: "I regularly come up with ideas I haven't heard from anyone else", dimension: "O", reverse: false },
  { number: 10, textRu: "Я могу с одинаковым интересом читать про квантовую физику и средневековую историю", textEn: "I can read about quantum physics and medieval history with equal curiosity", dimension: "O", reverse: false },
  { number: 15, textRu: "Я люблю задаваться вопросом «а что, если всё устроить совсем иначе?»", textEn: "I enjoy asking 'what if everything was done completely differently?'", dimension: "O", reverse: false },
  { number: 20, textRu: "Я легко погружаюсь в воображаемые миры — книги, фильмы, собственные фантазии", textEn: "I easily get absorbed in imaginary worlds — books, films, my own daydreams", dimension: "O", reverse: false },
  { number: 25, textRu: "Когда стандартный путь не работает, я придумываю нестандартный", textEn: "When the standard approach doesn't work, I invent a non-standard one", dimension: "O", reverse: false },
  { number: 30, textRu: "Красиво сделанная вещь — музыка, кино, дизайн — способна по-настоящему тронуть меня", textEn: "A beautifully made thing — music, film, design — can genuinely move me", dimension: "O", reverse: false },
  { number: 35, textRu: "Мне комфортнее делать то, что я уже хорошо знаю, чем пробовать что-то новое", textEn: "I am more comfortable doing what I already know well than trying something new", dimension: "O", reverse: true },
  { number: 40, textRu: "Мне нравится брать одну идею и думать, куда она может привести", textEn: "I enjoy taking a single idea and exploring where it might lead", dimension: "O", reverse: false },
  { number: 41, textRu: "Искусство, музыка или литература — не моя стихия", textEn: "Art, music, or literature are not really my thing", dimension: "O", reverse: true },
  { number: 44, textRu: "Хороший разговор о сложных темах — это для меня удовольствие, а не утомление", textEn: "A good conversation about complex topics is a pleasure for me, not a chore", dimension: "O", reverse: false },
];

// Sort by question number for linear flow
const sortedItems = [...bigFiveItems].sort((a, b) => a.number - b.number);

const scaleLabels = {
  ru: {
    min: "Нет, не про меня",
    max: "Да, это точно про меня",
  },
  en: {
    min: "Not me at all",
    max: "Definitely me",
  },
};

export const BIG_FIVE_TEST_ID = "big-five";

export const bigFiveTestMeta = {
  id: BIG_FIVE_TEST_ID,
  slug: "big-five",
  nameRu: "Большая пятёрка (Big Five)",
  nameEn: "Big Five Personality Test",
  descriptionRu:
    "Определите ваши 5 ключевых черт личности: открытость, добросовестность, экстраверсия, дружелюбие, нейротизм. Тест основан на модели BFI-44.",
  descriptionEn:
    "Discover your 5 key personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism. Based on the BFI-44 model.",
  methodology: "BFI-44 (NEO-PI-R short)",
  estimatedMinutes: 15,
  questionCount: 44,
  category: "psychology",
};

export function getBigFiveQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `bf-q-${item.number}`,
    test_id: BIG_FIVE_TEST_ID,
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
      { id: `bf-o-${item.number}-1`, question_id: `bf-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `bf-o-${item.number}-2`, question_id: `bf-q-${item.number}`, option_key: "2", text_ru: "Скорее не про меня", text_en: "Not really me", sort_order: 1 },
      { id: `bf-o-${item.number}-3`, question_id: `bf-q-${item.number}`, option_key: "3", text_ru: "Трудно сказать", text_en: "Hard to say", sort_order: 2 },
      { id: `bf-o-${item.number}-4`, question_id: `bf-q-${item.number}`, option_key: "4", text_ru: "Скорее про меня", text_en: "Somewhat me", sort_order: 3 },
      { id: `bf-o-${item.number}-5`, question_id: `bf-q-${item.number}`, option_key: "5", text_ru: "Это точно про меня", text_en: "Definitely me", sort_order: 4 },
    ],
  }));
}

// Dimension metadata for results display
export const bigFiveDimensions = {
  O: {
    nameRu: "Открытость опыту",
    nameEn: "Openness to Experience",
    descHighRu: "Вы любопытны, креативны и открыты новому. Цените искусство и интеллектуальные переживания.",
    descHighEn: "You are curious, creative, and open to new experiences. You value art and intellectual stimulation.",
    descLowRu: "Вы практичны, предпочитаете привычное и проверенное. Цените стабильность и конкретику.",
    descLowEn: "You are practical and prefer familiar routines. You value stability and concrete thinking.",
    color: "#8B5CF6",
  },
  C: {
    nameRu: "Добросовестность",
    nameEn: "Conscientiousness",
    descHighRu: "Вы организованны, надёжны и дисциплинированны. Доводите дела до конца.",
    descHighEn: "You are organized, reliable, and disciplined. You follow through on commitments.",
    descLowRu: "Вы гибки и спонтанны, но можете испытывать трудности с организацией и планированием.",
    descLowEn: "You are flexible and spontaneous but may struggle with organization and planning.",
    color: "#3B82F6",
  },
  E: {
    nameRu: "Экстраверсия",
    nameEn: "Extraversion",
    descHighRu: "Вы энергичны, общительны и любите быть в центре внимания. Черпаете энергию от общения.",
    descHighEn: "You are energetic, sociable, and enjoy being the center of attention. You gain energy from social interaction.",
    descLowRu: "Вы интроверт — предпочитаете спокойствие и одиночество. Черпаете энергию в уединении.",
    descLowEn: "You are introverted — you prefer quiet and solitude. You recharge through alone time.",
    color: "#F59E0B",
  },
  A: {
    nameRu: "Дружелюбие",
    nameEn: "Agreeableness",
    descHighRu: "Вы добры, отзывчивы и готовы к сотрудничеству. Доверяете людям и избегаете конфликтов.",
    descHighEn: "You are kind, empathetic, and cooperative. You trust others and avoid conflict.",
    descLowRu: "Вы независимы, критичны и прямолинейны. Ставите свои интересы выше и не боитесь спорить.",
    descLowEn: "You are independent, critical, and direct. You prioritize your own interests and aren't afraid to argue.",
    color: "#10B981",
  },
  N: {
    nameRu: "Нейротизм",
    nameEn: "Neuroticism",
    descHighRu: "Вы эмоционально чувствительны, склонны к беспокойству и перепадам настроения.",
    descHighEn: "You are emotionally sensitive, prone to worry and mood swings.",
    descLowRu: "Вы эмоционально стабильны, спокойны и устойчивы к стрессу.",
    descLowEn: "You are emotionally stable, calm, and resilient to stress.",
    color: "#EF4444",
  },
};
