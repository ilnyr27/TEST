import { Question, QuestionOption } from "@/types/database";

const LL_TEST_ID = "love-languages-test";

interface LLQuestion {
  number: number;
  textRu: string;
  textEn: string;
  optionA: { textRu: string; textEn: string; dimension: string };
  optionB: { textRu: string; textEn: string; dimension: string };
}

const llItems: LLQuestion[] = [
  { number: 1, textRu: "Что для вас важнее?", textEn: "What matters more to you?",
    optionA: { textRu: "Когда мне говорят, как я важен(а) для них", textEn: "Being told how important I am to someone", dimension: "WA" },
    optionB: { textRu: "Когда мне помогают с делами без просьб", textEn: "Having someone help me without being asked", dimension: "AS" },
  },
  { number: 2, textRu: "Что вас больше радует?", textEn: "What makes you happier?",
    optionA: { textRu: "Получить продуманный подарок", textEn: "Receiving a thoughtful gift", dimension: "RG" },
    optionB: { textRu: "Провести вечер вдвоём без отвлечений", textEn: "Spending an evening together without distractions", dimension: "QT" },
  },
  { number: 3, textRu: "Что вам приятнее?", textEn: "What feels better?",
    optionA: { textRu: "Объятие или прикосновение", textEn: "A hug or a touch", dimension: "PT" },
    optionB: { textRu: "Услышать «Я тобой горжусь»", textEn: "Hearing 'I'm proud of you'", dimension: "WA" },
  },
  { number: 4, textRu: "Что важнее в отношениях?", textEn: "What's more important in a relationship?",
    optionA: { textRu: "Совместные прогулки и поездки", textEn: "Going on walks and trips together", dimension: "QT" },
    optionB: { textRu: "Когда партнёр берёт на себя домашние дела", textEn: "Partner taking care of household chores", dimension: "AS" },
  },
  { number: 5, textRu: "Что вы цените больше?", textEn: "What do you value more?",
    optionA: { textRu: "Получить подарок-сюрприз", textEn: "Getting a surprise gift", dimension: "RG" },
    optionB: { textRu: "Держаться за руки", textEn: "Holding hands", dimension: "PT" },
  },
  { number: 6, textRu: "Что для вас значимее?", textEn: "What is more meaningful?",
    optionA: { textRu: "Комплименты и слова поддержки", textEn: "Compliments and words of encouragement", dimension: "WA" },
    optionB: { textRu: "Полное внимание во время разговора", textEn: "Full attention during a conversation", dimension: "QT" },
  },
  { number: 7, textRu: "Что вас больше трогает?", textEn: "What touches you more?",
    optionA: { textRu: "Когда готовят мою любимую еду", textEn: "Having my favorite meal prepared for me", dimension: "AS" },
    optionB: { textRu: "Когда дарят цветы или маленький подарок", textEn: "Receiving flowers or a small gift", dimension: "RG" },
  },
  { number: 8, textRu: "Что вам ближе?", textEn: "What feels closer to you?",
    optionA: { textRu: "Сидеть рядом, касаясь друг друга", textEn: "Sitting close, touching each other", dimension: "PT" },
    optionB: { textRu: "Когда мне говорят «Я тебя люблю»", textEn: "Being told 'I love you'", dimension: "WA" },
  },
  { number: 9, textRu: "Что важнее для вас?", textEn: "What's more important to you?",
    optionA: { textRu: "Проводить выходные вместе", textEn: "Spending weekends together", dimension: "QT" },
    optionB: { textRu: "Получить подарок, о котором давно мечтал(а)", textEn: "Receiving a gift I've wanted for a long time", dimension: "RG" },
  },
  { number: 10, textRu: "Что для вас ценнее?", textEn: "What's more valuable?",
    optionA: { textRu: "Когда партнёр помогает, не дожидаясь просьбы", textEn: "Partner helping without waiting to be asked", dimension: "AS" },
    optionB: { textRu: "Массаж после тяжёлого дня", textEn: "A massage after a tough day", dimension: "PT" },
  },
  { number: 11, textRu: "Что вам приятнее?", textEn: "What's more pleasant?",
    optionA: { textRu: "Записка с тёплыми словами", textEn: "A note with warm words", dimension: "WA" },
    optionB: { textRu: "Когда чинят что-то в доме для меня", textEn: "Having something fixed around the house for me", dimension: "AS" },
  },
  { number: 12, textRu: "Что вас больше радует?", textEn: "What brings more joy?",
    optionA: { textRu: "Объятие при встрече", textEn: "A hug when meeting", dimension: "PT" },
    optionB: { textRu: "Совместный ужин без телефонов", textEn: "Dinner together without phones", dimension: "QT" },
  },
  { number: 13, textRu: "Что для вас важнее?", textEn: "What matters more?",
    optionA: { textRu: "Памятный подарок на годовщину", textEn: "A memorable anniversary gift", dimension: "RG" },
    optionB: { textRu: "Услышать, что я значу для партнёра", textEn: "Hearing what I mean to my partner", dimension: "WA" },
  },
  { number: 14, textRu: "Что вы предпочтёте?", textEn: "What would you prefer?",
    optionA: { textRu: "Совместное хобби или занятие", textEn: "A shared hobby or activity", dimension: "QT" },
    optionB: { textRu: "Когда партнёр выполняет мои поручения", textEn: "Partner running errands for me", dimension: "AS" },
  },
  { number: 15, textRu: "Что вам ближе?", textEn: "What feels closer?",
    optionA: { textRu: "Когда дарят что-то, увидев, что мне понравилось", textEn: "Getting something they noticed I liked", dimension: "RG" },
    optionB: { textRu: "Рука на плече, когда мне грустно", textEn: "A hand on my shoulder when I'm sad", dimension: "PT" },
  },
  { number: 16, textRu: "Что больше греет душу?", textEn: "What warms your heart more?",
    optionA: { textRu: "Когда мне говорят, как хорошо я справляюсь", textEn: "Being told how well I'm doing", dimension: "WA" },
    optionB: { textRu: "Совместная поездка на выходные", textEn: "A weekend trip together", dimension: "QT" },
  },
  { number: 17, textRu: "Что для вас значимее?", textEn: "What is more meaningful?",
    optionA: { textRu: "Когда партнёр готовит мне завтрак", textEn: "Partner making me breakfast", dimension: "AS" },
    optionB: { textRu: "Получить подарок «просто так»", textEn: "Getting a 'just because' gift", dimension: "RG" },
  },
  { number: 18, textRu: "Что вас больше трогает?", textEn: "What touches you more?",
    optionA: { textRu: "Поцелуй при прощании", textEn: "A kiss goodbye", dimension: "PT" },
    optionB: { textRu: "Когда партнёр берёт на себя мою задачу", textEn: "Partner taking on my task", dimension: "AS" },
  },
  { number: 19, textRu: "Что для вас важнее?", textEn: "What matters more?",
    optionA: { textRu: "Долгий разговор по душам", textEn: "A long heart-to-heart conversation", dimension: "QT" },
    optionB: { textRu: "Крепкое объятие", textEn: "A tight hug", dimension: "PT" },
  },
  { number: 20, textRu: "Что вы цените больше?", textEn: "What do you value more?",
    optionA: { textRu: "Подарок ручной работы", textEn: "A handmade gift", dimension: "RG" },
    optionB: { textRu: "Прогулка вдвоём без спешки", textEn: "A leisurely walk together", dimension: "QT" },
  },
];

export const loveLanguagesDimensions: Record<string, {
  nameRu: string; nameEn: string;
  descHighRu: string; descHighEn: string;
  descLowRu: string; descLowEn: string;
  color: string;
}> = {
  WA: {
    nameRu: "Слова поддержки", nameEn: "Words of Affirmation",
    descHighRu: "Вам важны комплименты, благодарности и слова любви. Вы чувствуете себя любимым(ой), когда вам говорят о своих чувствах.",
    descHighEn: "Compliments, gratitude, and words of love matter most to you. You feel loved when people express their feelings verbally.",
    descLowRu: "Слова для вас менее значимы, чем другие формы выражения чувств.",
    descLowEn: "Words are less important to you than other forms of expressing feelings.",
    color: "#8b5cf6",
  },
  AS: {
    nameRu: "Помощь и забота", nameEn: "Acts of Service",
    descHighRu: "Для вас дела значат больше слов. Вы чувствуете любовь, когда близкие помогают вам и облегчают вашу жизнь.",
    descHighEn: "Actions speak louder than words for you. You feel loved when others help and make your life easier.",
    descLowRu: "Помощь в делах для вас не главный показатель заботы.",
    descLowEn: "Acts of service are not your primary indicator of care.",
    color: "#06b6d4",
  },
  RG: {
    nameRu: "Подарки", nameEn: "Receiving Gifts",
    descHighRu: "Вы цените продуманные подарки как символы внимания. Дело не в цене, а в мысли, стоящей за подарком.",
    descHighEn: "You value thoughtful gifts as symbols of attention. It's not about the price, but the thought behind the gift.",
    descLowRu: "Подарки для вас — приятный, но не основной способ выражения любви.",
    descLowEn: "Gifts are pleasant but not your primary love language.",
    color: "#f59e0b",
  },
  QT: {
    nameRu: "Время вместе", nameEn: "Quality Time",
    descHighRu: "Для вас самое важное — безраздельное внимание. Совместные занятия и разговоры — ваш главный язык любви.",
    descHighEn: "Undivided attention matters most to you. Shared activities and conversations are your primary love language.",
    descLowRu: "Совместное времяпрепровождение для вас важно, но не является главным.",
    descLowEn: "Quality time is nice but not your top priority.",
    color: "#ec4899",
  },
  PT: {
    nameRu: "Прикосновения", nameEn: "Physical Touch",
    descHighRu: "Вы чувствуете связь через физический контакт — объятия, прикосновения, близость.",
    descHighEn: "You feel connected through physical contact — hugs, touches, closeness.",
    descLowRu: "Физический контакт важен, но вы больше цените другие способы выражения любви.",
    descLowEn: "Physical contact matters, but you value other ways of showing love more.",
    color: "#10b981",
  },
};

export const loveLanguagesTestMeta = {
  id: LL_TEST_ID,
  slug: "love-languages",
  nameRu: "Языки любви",
  nameEn: "Love Languages",
  descriptionRu: "Узнайте, как вы лучше всего чувствуете и выражаете любовь. Определите ваш основной язык любви из 5 типов.",
  descriptionEn: "Discover how you best feel and express love. Identify your primary love language from 5 types.",
  methodology: "Chapman 5 Love Languages",
  estimatedMinutes: 5,
  questionCount: 20,
  category: "family",
};

export function getLoveLanguagesQuestions(): (Question & { options: QuestionOption[] })[] {
  return llItems.map((item) => ({
    id: `ll-q-${item.number}`,
    test_id: LL_TEST_ID,
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
