import { Question, QuestionOption } from "@/types/database";

// Тип путешественника — 20 вопросов, 4 измерения по 5 вопросов
// EXPLOR=Исследователь, RELAXER=Отдыхающий, CULTUR=Культурный, ADVENT=Авантюрист

interface TravelerItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "EXPLOR" | "RELAXER" | "CULTUR" | "ADVENT";
}

const items: TravelerItem[] = [
  // EXPLOR — Исследователь (новые места, нетуристические маршруты, местный уклад)
  { number: 1,  dimension: "EXPLOR", textRu: "В путешествии меня больше всего привлекают места, куда туристы обычно не добираются", textEn: "In travel what attracts me most are places tourists don't usually reach" },
  { number: 2,  dimension: "EXPLOR", textRu: "Я люблю общаться с местными жителями и понимать, как они живут по-настоящему", textEn: "I love talking to locals and understanding how they actually live" },
  { number: 3,  dimension: "EXPLOR", textRu: "Отсутствие чёткого плана в путешествии меня не пугает — это часть приключения", textEn: "Not having a clear plan in travel doesn't scare me — it's part of the adventure" },
  { number: 4,  dimension: "EXPLOR", textRu: "Мне важно «почувствовать» город или страну изнутри, а не только увидеть достопримечательности", textEn: "It's important to me to 'feel' a city or country from the inside, not just see the sights" },
  { number: 5,  dimension: "EXPLOR", textRu: "Я предпочитаю открыть для себя новое место, а не возвращаться в уже известное", textEn: "I prefer discovering a new place over returning to one I already know" },

  // RELAXER — Отдыхающий (пляж, комфорт, восстановление)
  { number: 6,  dimension: "RELAXER", textRu: "Для меня идеальный отпуск — это когда можно полностью расслабиться и ни о чём не думать", textEn: "The ideal vacation for me is when I can fully relax and not think about anything" },
  { number: 7,  dimension: "RELAXER", textRu: "Я люблю путешествия, где комфорт и сервис на высоком уровне — хороший отель, хорошая еда", textEn: "I love trips where comfort and service are top-notch — a good hotel, good food" },
  { number: 8,  dimension: "RELAXER", textRu: "Пляж, бассейн или спа — моё любимое место в путешествии", textEn: "A beach, pool, or spa is my favorite place on a trip" },
  { number: 9,  dimension: "RELAXER", textRu: "В отпуске мне не нужен насыщенный план — главное выспаться и восстановиться", textEn: "I don't need a packed schedule on vacation — the main thing is to sleep well and recharge" },
  { number: 10, dimension: "RELAXER", textRu: "Я готов вернуться в полюбившееся место, потому что там хорошо и предсказуемо", textEn: "I'm willing to return to a favorite place because it's comfortable and predictable there" },

  // CULTUR — Культурный турист (история, архитектура, музеи, искусство)
  { number: 11, dimension: "CULTUR", textRu: "Музеи, галереи и исторические памятники — обязательная часть моих путешествий", textEn: "Museums, galleries, and historic monuments are a mandatory part of my travels" },
  { number: 12, dimension: "CULTUR", textRu: "Мне интересно узнать историю места, прежде чем его посетить", textEn: "I'm interested in learning the history of a place before visiting it" },
  { number: 13, dimension: "CULTUR", textRu: "Архитектура, искусство и культурные традиции страны захватывают меня не меньше природы", textEn: "Architecture, art, and cultural traditions of a country captivate me no less than nature" },
  { number: 14, dimension: "CULTUR", textRu: "Я возвращаюсь домой из путешествия с новыми знаниями об истории и культуре", textEn: "I return home from travel with new knowledge about history and culture" },
  { number: 15, dimension: "CULTUR", textRu: "Посетить местные рынки, театры или концерты для меня важнее, чем пляж", textEn: "Visiting local markets, theaters, or concerts matters more to me than a beach" },

  // ADVENT — Авантюрист (активность, экстрим, природа, риск)
  { number: 16, dimension: "ADVENT", textRu: "В путешествии меня тянет к активному отдыху: походы, сёрфинг, скалолазание, дайвинг", textEn: "In travel I'm drawn to active recreation: hiking, surfing, rock climbing, diving" },
  { number: 17, dimension: "ADVENT", textRu: "Я ищу адреналин и яркие ощущения — путешествие без этого кажется пресным", textEn: "I seek adrenaline and vivid sensations — travel without this feels bland" },
  { number: 18, dimension: "ADVENT", textRu: "Природа — горы, джунгли, пустыни, океан — притягивает меня сильнее любого города", textEn: "Nature — mountains, jungles, deserts, ocean — draws me more strongly than any city" },
  { number: 19, dimension: "ADVENT", textRu: "Я готов мириться с неудобствами ради незабываемого опыта", textEn: "I'm willing to put up with discomfort for an unforgettable experience" },
  { number: 20, dimension: "ADVENT", textRu: "Мне нравится испытывать себя в путешествии — физически или психологически", textEn: "I enjoy testing myself in travel — physically or psychologically" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const TRAVELER_TYPE_TEST_ID = "traveler-type";

export const travelerTypeTestMeta = {
  id: TRAVELER_TYPE_TEST_ID,
  slug: "traveler-type",
  nameRu: "Тип путешественника",
  nameEn: "Traveler Type",
  descriptionRu: "Какой вы путешественник? Тест определяет ваш тип из четырёх: Исследователь, Отдыхающий, Культурный турист или Авантюрист.",
  descriptionEn: "What kind of traveler are you? The test identifies your type from four: Explorer, Relaxer, Cultural Tourist, or Adventurer.",
  methodology: "Travel Style Inventory (original)",
  estimatedMinutes: 4,
  questionCount: 20,
  category: "fun",
};

export const travelerTypeDimensions = {
  EXPLOR: {
    nameRu: "Исследователь",
    nameEn: "Explorer",
    color: "#3B82F6",
    descHighRu: "Вы — Исследователь. Вас влечёт аутентичность и открытие: нетуристические маршруты, местный быт, разговоры с жителями. Туристические толпы и предсказуемость — не для вас. Каждое путешествие — шанс увидеть мир изнутри.",
    descHighEn: "You're an Explorer. You're drawn to authenticity and discovery: off-the-beaten-path routes, local life, conversations with residents. Tourist crowds and predictability aren't for you. Every trip is a chance to see the world from the inside.",
    descLowRu: "Исследовательский стиль менее выражен — вы предпочитаете более комфортный или структурированный отдых.",
    descLowEn: "Explorer style is less pronounced — you prefer more comfortable or structured travel.",
  },
  RELAXER: {
    nameRu: "Отдыхающий",
    nameEn: "Relaxer",
    color: "#10B981",
    descHighRu: "Вы — Отдыхающий. Для вас путешествие — это восстановление: комфорт, покой, хорошая еда и сон без будильника. Это не «лень» — это осознанное умение восстанавливаться. Лучший отпуск для вас — тот, после которого вы действительно отдохнули.",
    descHighEn: "You're a Relaxer. For you travel is restoration: comfort, peace, good food, and sleep without an alarm. This isn't 'laziness' — it's a conscious ability to recharge. The best vacation for you is one after which you're truly rested.",
    descLowRu: "Стиль отдыха менее выражен — вам нужно движение и новые впечатления, а не пассивный отдых.",
    descLowEn: "Relaxer style is less pronounced — you need movement and new impressions rather than passive rest.",
  },
  CULTUR: {
    nameRu: "Культурный турист",
    nameEn: "Cultural Tourist",
    color: "#8B5CF6",
    descHighRu: "Вы — Культурный турист. Музеи, история, архитектура и местные традиции — ваша главная программа. Вы возвращаетесь домой обогащённым знаниями и впечатлениями. Путешествие для вас — это всегда образование.",
    descHighEn: "You're a Cultural Tourist. Museums, history, architecture, and local traditions are your main program. You return home enriched with knowledge and impressions. Travel is always education for you.",
    descLowRu: "Культурный стиль менее выражен — история и музеи не главный приоритет в вашем путешествии.",
    descLowEn: "Cultural style is less pronounced — history and museums aren't the top priority in your travels.",
  },
  ADVENT: {
    nameRu: "Авантюрист",
    nameEn: "Adventurer",
    color: "#EF4444",
    descHighRu: "Вы — Авантюрист. Адреналин, активность и природа — ваша стихия. Горы, серфинг, походы, дайвинг — это не «дополнение» к отдыху, а сам смысл поездки. Дискомфорт не пугает, если впереди незабываемый опыт.",
    descHighEn: "You're an Adventurer. Adrenaline, activity, and nature are your element. Mountains, surfing, hiking, diving — these aren't 'additions' to a vacation but the very point of the trip. Discomfort doesn't scare you if an unforgettable experience lies ahead.",
    descLowRu: "Авантюрный стиль менее выражен — экстрим и физические испытания не главный мотив ваших поездок.",
    descLowEn: "Adventurer style is less pronounced — extreme experiences and physical challenges aren't the main draw of your trips.",
  },
};

export function getTravelerTypeQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `tt-q-${item.number}`,
    test_id: TRAVELER_TYPE_TEST_ID,
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
      { id: `tt-o-${item.number}-1`, question_id: `tt-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `tt-o-${item.number}-2`, question_id: `tt-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `tt-o-${item.number}-3`, question_id: `tt-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `tt-o-${item.number}-4`, question_id: `tt-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `tt-o-${item.number}-5`, question_id: `tt-q-${item.number}`, option_key: "5", text_ru: "Очень точно", text_en: "Very accurate", sort_order: 4 },
    ],
  }));
}
