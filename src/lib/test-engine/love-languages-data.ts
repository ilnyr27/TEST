import { Question, QuestionOption } from "@/types/database";

// Chapman 5 Love Languages
// WA=Words of Affirmation, AS=Acts of Service, RG=Receiving Gifts, QT=Quality Time, PT=Physical Touch
// 20 forced-choice questions (A vs B), each option maps to a different dimension

export const LOVE_LANGUAGES_TEST_ID = "love-languages";

export const loveLanguagesTestMeta = {
  id: LOVE_LANGUAGES_TEST_ID,
  slug: "love-languages",
  nameRu: "Языки любви",
  nameEn: "Love Languages",
  descriptionRu: "Узнайте, как вы предпочитаете выражать и получать любовь. 5 языков: Слова одобрения, Помощь, Подарки, Время вместе, Прикосновения.",
  descriptionEn: "Discover how you prefer to give and receive love. 5 languages: Words of Affirmation, Acts of Service, Receiving Gifts, Quality Time, Physical Touch.",
  methodology: "Chapman 5 Love Languages",
  estimatedMinutes: 5,
  questionCount: 20,
  category: "family",
};

type Dimension = "WA" | "AS" | "RG" | "QT" | "PT";

interface LLQuestion {
  number: number;
  textRu: string;
  textEn: string;
  optionA: { textRu: string; textEn: string; dimension: Dimension };
  optionB: { textRu: string; textEn: string; dimension: Dimension };
}

// 20 questions: each dimension appears 8 times across all options (paired with each other dimension twice)
// Pairing plan: WA-AS, WA-RG, WA-QT, WA-PT (x2 each = 8 for WA), same logic for all
const llItems: LLQuestion[] = [
  // --- WA vs QT (1 of 2) ---
  { number: 1, textRu: "Что для вас важнее?", textEn: "Which matters more to you?",
    optionA: { textRu: "Услышать «Я тобой горжусь»", textEn: "Hearing \"I'm proud of you\"", dimension: "WA" },
    optionB: { textRu: "Провести вечер наедине с близким человеком", textEn: "Spending an evening alone with a loved one", dimension: "QT" },
  },
  // --- AS vs RG (1 of 2) ---
  { number: 2, textRu: "Что вам приятнее получить?", textEn: "What would you enjoy receiving more?",
    optionA: { textRu: "Помощь с делами, когда вы устали", textEn: "Help with chores when you're exhausted", dimension: "AS" },
    optionB: { textRu: "Неожиданный подарок без повода", textEn: "A surprise gift for no reason", dimension: "RG" },
  },
  // --- PT vs WA (1 of 2) ---
  { number: 3, textRu: "Что вы предпочитаете?", textEn: "Which do you prefer?",
    optionA: { textRu: "Крепкие объятия при встрече", textEn: "A big hug when you meet", dimension: "PT" },
    optionB: { textRu: "Искреннее «Ты для меня всё значишь»", textEn: "A heartfelt \"You mean everything to me\"", dimension: "WA" },
  },
  // --- QT vs AS (1 of 2) ---
  { number: 4, textRu: "Что для вас ценнее?", textEn: "What do you value more?",
    optionA: { textRu: "Совместная прогулка без телефонов", textEn: "A walk together without phones", dimension: "QT" },
    optionB: { textRu: "Партнёр приготовил ужин, пока вы заняты", textEn: "Your partner cooked dinner while you were busy", dimension: "AS" },
  },
  // --- RG vs PT (1 of 2) ---
  { number: 5, textRu: "Что значит для вас больше?", textEn: "Which means more to you?",
    optionA: { textRu: "Получить продуманный подарок", textEn: "Receiving a thoughtful gift", dimension: "RG" },
    optionB: { textRu: "Когда вас держат за руку на прогулке", textEn: "Having your hand held during a walk", dimension: "PT" },
  },
  // --- WA vs AS (1 of 2) ---
  { number: 6, textRu: "Что вам приятнее?", textEn: "What makes you feel more loved?",
    optionA: { textRu: "Получить записку с тёплыми словами", textEn: "Receiving a note with warm words", dimension: "WA" },
    optionB: { textRu: "Кто-то взял на себя ваши обязанности, чтобы вы отдохнули", textEn: "Someone taking over your tasks so you can rest", dimension: "AS" },
  },
  // --- QT vs RG (1 of 2) ---
  { number: 7, textRu: "Что вы выберете?", textEn: "Which would you choose?",
    optionA: { textRu: "Целый день вдвоём за любимым занятием", textEn: "A whole day together doing something you love", dimension: "QT" },
    optionB: { textRu: "Получить подарок, о котором давно мечтали", textEn: "Receiving a gift you've wanted for a long time", dimension: "RG" },
  },
  // --- PT vs AS (1 of 2) ---
  { number: 8, textRu: "Что для вас важнее?", textEn: "Which matters more to you?",
    optionA: { textRu: "Массаж после тяжёлого дня", textEn: "A massage after a hard day", dimension: "PT" },
    optionB: { textRu: "Партнёр починил то, что давно сломалось", textEn: "Your partner fixed something that was long broken", dimension: "AS" },
  },
  // --- WA vs RG (1 of 2) ---
  { number: 9, textRu: "Что трогает вас сильнее?", textEn: "What touches you more?",
    optionA: { textRu: "Услышать «Ты делаешь мою жизнь лучше»", textEn: "Hearing \"You make my life better\"", dimension: "WA" },
    optionB: { textRu: "Цветы или маленький сувенир «просто так»", textEn: "Flowers or a small souvenir \"just because\"", dimension: "RG" },
  },
  // --- QT vs PT (1 of 2) ---
  { number: 10, textRu: "Что вы предпочитаете?", textEn: "Which do you prefer?",
    optionA: { textRu: "Долгий разговор по душам", textEn: "A long heart-to-heart conversation", dimension: "QT" },
    optionB: { textRu: "Обниматься на диване перед фильмом", textEn: "Cuddling on the couch before a movie", dimension: "PT" },
  },
  // --- AS vs QT (2 of 2) ---
  { number: 11, textRu: "Что вам приятнее?", textEn: "What makes you happier?",
    optionA: { textRu: "Партнёр помыл посуду, не дожидаясь просьбы", textEn: "Your partner washed the dishes without being asked", dimension: "AS" },
    optionB: { textRu: "Партнёр отложил все дела ради времени с вами", textEn: "Your partner dropped everything to spend time with you", dimension: "QT" },
  },
  // --- RG vs WA (2 of 2) ---
  { number: 12, textRu: "Что значит для вас больше?", textEn: "Which means more to you?",
    optionA: { textRu: "Получить подарок, привезённый из поездки", textEn: "Receiving a gift brought back from a trip", dimension: "RG" },
    optionB: { textRu: "Длинное сообщение о том, как вас ценят", textEn: "A long message about how much you're valued", dimension: "WA" },
  },
  // --- PT vs QT (2 of 2) ---
  { number: 13, textRu: "Что вы выберете?", textEn: "Which would you choose?",
    optionA: { textRu: "Сидеть рядом, касаясь друг друга", textEn: "Sitting close, touching each other", dimension: "PT" },
    optionB: { textRu: "Вместе гулять и разговаривать часами", textEn: "Walking and talking together for hours", dimension: "QT" },
  },
  // --- AS vs WA (2 of 2) ---
  { number: 14, textRu: "Что для вас ценнее?", textEn: "What do you value more?",
    optionA: { textRu: "Партнёр заправил машину, чтобы вам не пришлось", textEn: "Your partner filled up your car so you wouldn't have to", dimension: "AS" },
    optionB: { textRu: "Партнёр сказал вам комплимент при друзьях", textEn: "Your partner complimented you in front of friends", dimension: "WA" },
  },
  // --- RG vs PT (2 of 2) ---
  { number: 15, textRu: "Что вам приятнее?", textEn: "What makes you feel more loved?",
    optionA: { textRu: "Получить украшение или аксессуар в подарок", textEn: "Receiving jewelry or an accessory as a gift", dimension: "RG" },
    optionB: { textRu: "Когда вас нежно обнимают перед сном", textEn: "Being gently held before falling asleep", dimension: "PT" },
  },
  // --- QT vs WA (2 of 2) ---
  { number: 16, textRu: "Что трогает вас сильнее?", textEn: "What touches you more?",
    optionA: { textRu: "Партнёр выключил телефон, чтобы побыть с вами", textEn: "Your partner turned off their phone to be with you", dimension: "QT" },
    optionB: { textRu: "Услышать «Я так рад(а), что ты рядом»", textEn: "Hearing \"I'm so glad you're here\"", dimension: "WA" },
  },
  // --- AS vs PT (2 of 2) ---
  { number: 17, textRu: "Что для вас важнее?", textEn: "Which matters more to you?",
    optionA: { textRu: "Партнёр организовал ваш переезд или ремонт", textEn: "Your partner organized your move or renovation", dimension: "AS" },
    optionB: { textRu: "Долгое объятие после долгой разлуки", textEn: "A long embrace after being apart", dimension: "PT" },
  },
  // --- RG vs QT (2 of 2) ---
  { number: 18, textRu: "Что вы предпочитаете?", textEn: "Which do you prefer?",
    optionA: { textRu: "Получить книгу, которую вам подобрали специально", textEn: "Receiving a book picked out just for you", dimension: "RG" },
    optionB: { textRu: "Провести выходные вместе, никуда не торопясь", textEn: "Spending the weekend together with no rush", dimension: "QT" },
  },
  // --- AS vs RG (2 of 2) ---
  { number: 19, textRu: "Что значит для вас больше?", textEn: "Which means more to you?",
    optionA: { textRu: "Партнёр привёз вас, когда вам было неудобно добираться", textEn: "Your partner drove you when getting there was inconvenient", dimension: "AS" },
    optionB: { textRu: "Получить то, на что вы давно намекали", textEn: "Receiving something you had been hinting at", dimension: "RG" },
  },
  // --- WA vs PT (2 of 2) ---
  { number: 20, textRu: "Что вам приятнее?", textEn: "What makes you feel more loved?",
    optionA: { textRu: "Услышать «Ты самый важный человек в моей жизни»", textEn: "Hearing \"You're the most important person in my life\"", dimension: "WA" },
    optionB: { textRu: "Когда вас нежно гладят по голове", textEn: "Having your hair gently stroked", dimension: "PT" },
  },
];

export const loveLanguagesDimensions: Record<string, {
  nameRu: string; nameEn: string;
  descHighRu: string; descHighEn: string;
  descLowRu: string; descLowEn: string;
  color: string;
}> = {
  WA: {
    nameRu: "Слова одобрения",
    nameEn: "Words of Affirmation",
    descHighRu: "Вы чувствуете любовь через слова — комплименты, благодарности, признания. Устное и письменное выражение чувств наполняет вас энергией и теплом.",
    descHighEn: "You feel loved through words — compliments, gratitude, affirmations. Verbal and written expressions of feeling fill your emotional tank.",
    descLowRu: "Слова для вас менее значимы, чем другие проявления заботы. Вы больше цените действия или присутствие.",
    descLowEn: "Words matter less to you than other expressions of care. You value actions or presence more.",
    color: "#8b5cf6",
  },
  AS: {
    nameRu: "Помощь и забота",
    nameEn: "Acts of Service",
    descHighRu: "Ваш язык любви — действия. Когда кто-то облегчает вашу жизнь реальной помощью и заботой, вы чувствуете себя по-настоящему любимым(ой).",
    descHighEn: "Your love language is action. When someone eases your life through real help and care, you feel truly loved.",
    descLowRu: "Помощь приятна, но не является для вас главным способом почувствовать любовь.",
    descLowEn: "Help is nice, but it's not the primary way you feel loved.",
    color: "#06b6d4",
  },
  RG: {
    nameRu: "Подарки",
    nameEn: "Receiving Gifts",
    descHighRu: "Для вас важен символизм подарка — то, что кто-то думал о вас и выбирал что-то специально. Это знак внимания и любви, а не вопрос цены.",
    descHighEn: "The symbolism of a gift matters to you — someone thought of you and chose something special. It's a sign of attention and love, not a matter of price.",
    descLowRu: "Подарки вас радуют, но другие проявления любви для вас важнее материальных знаков внимания.",
    descLowEn: "Gifts make you happy, but other expressions of love matter more than material tokens.",
    color: "#f59e0b",
  },
  QT: {
    nameRu: "Время вместе",
    nameEn: "Quality Time",
    descHighRu: "Безраздельное внимание — ваш главный язык любви. Совместное время, глубокие разговоры и общие занятия наполняют вас ощущением близости.",
    descHighEn: "Undivided attention is your primary love language. Shared time, deep conversations, and activities together fill you with a sense of closeness.",
    descLowRu: "Совместное время приятно, но вы не так сильно нуждаетесь в постоянном присутствии близкого человека.",
    descLowEn: "Shared time is pleasant, but you don't need your partner's constant presence as much.",
    color: "#ec4899",
  },
  PT: {
    nameRu: "Прикосновения",
    nameEn: "Physical Touch",
    descHighRu: "Физический контакт — объятия, поглаживания, близость — ваш главный способ чувствовать любовь и эмоциональную связь.",
    descHighEn: "Physical contact — hugs, caresses, closeness — is your primary way of feeling love and emotional connection.",
    descLowRu: "Физический контакт для вас менее значим, чем другие способы выражения любви.",
    descLowEn: "Physical touch is less significant to you than other ways of expressing love.",
    color: "#10b981",
  },
};

export function getLoveLanguagesQuestions(): (Question & { options: QuestionOption[] })[] {
  return llItems.map((item) => ({
    id: `ll-q-${item.number}`,
    test_id: LOVE_LANGUAGES_TEST_ID,
    question_number: item.number,
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
    scoring_key: {
      dimension: "love-lang",
      choices: {
        a: item.optionA.dimension,
        b: item.optionB.dimension,
      },
    },
    metadata: null,
    created_at: new Date().toISOString(),
    options: [
      {
        id: `ll-o-${item.number}-a`,
        question_id: `ll-q-${item.number}`,
        option_key: "a",
        text_ru: item.optionA.textRu,
        text_en: item.optionA.textEn,
        sort_order: 0,
      },
      {
        id: `ll-o-${item.number}-b`,
        question_id: `ll-q-${item.number}`,
        option_key: "b",
        text_ru: item.optionB.textRu,
        text_en: item.optionB.textEn,
        sort_order: 1,
      },
    ],
  }));
}
