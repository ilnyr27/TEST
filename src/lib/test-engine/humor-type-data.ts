import { Question, QuestionOption } from "@/types/database";

// Тип юмора — 20 вопросов, 4 измерения по 5 вопросов
// По модели Мартина (Humor Styles Questionnaire)
// AFFIL=Аффилятивный, SELF_ENH=Самоподдерживающий, AGGR=Агрессивный, SELF_DEP=Самоуничижительный

interface HumorItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "AFFIL" | "SELF_ENH" | "AGGR" | "SELF_DEP";
}

const items: HumorItem[] = [
  // AFFIL — Аффилятивный (объединяет людей, добрый юмор)
  { number: 1,  dimension: "AFFIL", textRu: "Я люблю шутить с людьми — мой юмор помогает расслабиться и сближает", textEn: "I love joking with people — my humor helps everyone relax and brings us closer" },
  { number: 2,  dimension: "AFFIL", textRu: "Я часто замечаю смешное в обыденных ситуациях и делюсь этим с окружающими", textEn: "I often notice the funny in ordinary situations and share it with those around me" },
  { number: 3,  dimension: "AFFIL", textRu: "Мой юмор добрый — я не шучу так, чтобы кому-то было обидно", textEn: "My humor is kind — I don't joke in ways that would hurt someone" },
  { number: 4,  dimension: "AFFIL", textRu: "Я умею разрядить напряжённую атмосферу лёгкой шуткой", textEn: "I can diffuse a tense atmosphere with a light joke" },
  { number: 5,  dimension: "AFFIL", textRu: "Люди смеются вместе со мной — а не надо мной или из-за кого-то", textEn: "People laugh with me — not at me or because of someone else" },

  // SELF_ENH — Самоподдерживающий (внутренний юмор, защита от стресса)
  { number: 6,  dimension: "SELF_ENH", textRu: "Когда всё идёт не так, я нахожу в ситуации что-то абсурдное и это помогает мне держаться", textEn: "When everything goes wrong I find something absurd in the situation and it helps me hold on" },
  { number: 7,  dimension: "SELF_ENH", textRu: "Я могу посмеяться над трудностями в своей жизни — это помогает не принимать их трагически", textEn: "I can laugh at the difficulties in my life — it helps me not to treat them tragically" },
  { number: 8,  dimension: "SELF_ENH", textRu: "Юмор — один из моих главных способов справляться со стрессом", textEn: "Humor is one of my main ways of coping with stress" },
  { number: 9,  dimension: "SELF_ENH", textRu: "Даже наедине с собой я нахожу что-то забавное в происходящем", textEn: "Even alone I find something amusing in what's happening" },
  { number: 10, dimension: "SELF_ENH", textRu: "Мне удаётся сохранять лёгкость и иронию, когда другие начинают паниковать", textEn: "I manage to maintain lightness and irony when others start to panic" },

  // AGGR — Агрессивный (сарказм, насмешки, манипуляция юмором)
  { number: 11, dimension: "AGGR", textRu: "Мне нравится острый, саркастический юмор — даже если он задевает", textEn: "I enjoy sharp, sarcastic humor — even if it stings" },
  { number: 12, dimension: "AGGR", textRu: "Я иногда шучу над людьми и замечаю, что им не всегда смешно", textEn: "I sometimes joke about people and notice that they don't always find it funny" },
  { number: 13, dimension: "AGGR", textRu: "Я использую юмор, чтобы указать на чужие недостатки или глупость — это честнее, чем молчать", textEn: "I use humor to point out others' flaws or foolishness — it's more honest than staying silent" },
  { number: 14, dimension: "AGGR", textRu: "Мой юмор бывает колким — я замечаю, что некоторым он кажется резким", textEn: "My humor can be cutting — I notice that some people find it harsh" },
  { number: 15, dimension: "AGGR", textRu: "Я нахожу смешным то, что другие считают неудобным или неполиткорректным", textEn: "I find funny what others consider uncomfortable or politically incorrect" },

  // SELF_DEP — Самоуничижительный (шутит над собой в ущерб себе)
  { number: 16, dimension: "SELF_DEP", textRu: "Я часто шучу над собой, чтобы другим было комфортно или чтобы они смеялись", textEn: "I often joke about myself so others feel comfortable or can laugh" },
  { number: 17, dimension: "SELF_DEP", textRu: "Мне легче посмеяться над своими недостатками, чем защититься от чужих насмешек", textEn: "It's easier to laugh at my own flaws than to defend against others' mockery" },
  { number: 18, dimension: "SELF_DEP", textRu: "Иногда я использую самоиронию, чтобы избежать конфликта или критики", textEn: "Sometimes I use self-irony to avoid conflict or criticism" },
  { number: 19, dimension: "SELF_DEP", textRu: "Когда обо мне шутят, я часто подхватываю — даже если это немного обидно", textEn: "When people joke about me I often play along — even if it's a little hurtful" },
  { number: 20, dimension: "SELF_DEP", textRu: "Я замечаю, что моя самоирония иногда переходит в настоящее самоуничижение", textEn: "I notice that my self-irony sometimes crosses into genuine self-deprecation" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const HUMOR_TYPE_TEST_ID = "humor-type";

export const humorTypeTestMeta = {
  id: HUMOR_TYPE_TEST_ID,
  slug: "humor-type",
  nameRu: "Тип юмора",
  nameEn: "Humor Style",
  descriptionRu: "Какой у вас стиль юмора? По модели Мартина тест определяет ваш тип из четырёх: аффилятивный, самоподдерживающий, агрессивный или самоуничижительный.",
  descriptionEn: "What's your humor style? Based on Martin's model, the test identifies your type from four: affiliative, self-enhancing, aggressive, or self-deprecating.",
  methodology: "Humor Styles Questionnaire (Martin adapted)",
  estimatedMinutes: 5,
  questionCount: 20,
  category: "fun",
};

export const humorTypeDimensions = {
  AFFIL: {
    nameRu: "Аффилятивный",
    nameEn: "Affiliative",
    color: "#10B981",
    descHighRu: "Аффилятивный юмор — ваш главный стиль. Вы используете юмор для сближения: шутки добрые, объединяют людей, разряжают обстановку. Это самый здоровый и социально ценный стиль юмора.",
    descHighEn: "Affiliative humor is your main style. You use humor to connect: jokes are kind, bring people together, defuse tension. This is the healthiest and most socially valuable humor style.",
    descLowRu: "Аффилятивный юмор менее выражен — объединяющий, добрый юмор не ваш главный инструмент.",
    descLowEn: "Affiliative humor is less pronounced — connecting, kind humor is not your main tool.",
  },
  SELF_ENH: {
    nameRu: "Самоподдерживающий",
    nameEn: "Self-Enhancing",
    color: "#3B82F6",
    descHighRu: "Самоподдерживающий юмор — ваш ресурс. Вы находите абсурдное в трудных ситуациях и это помогает вам держаться. Юмор служит внутренней защитой от стресса — это признак эмоциональной зрелости.",
    descHighEn: "Self-enhancing humor is your resource. You find the absurd in difficult situations and it helps you hold on. Humor serves as an internal shield against stress — a sign of emotional maturity.",
    descLowRu: "Самоподдерживающий юмор менее выражен — вы реже используете его как инструмент совладания со стрессом.",
    descLowEn: "Self-enhancing humor is less pronounced — you less often use it as a stress-coping tool.",
  },
  AGGR: {
    nameRu: "Агрессивный",
    nameEn: "Aggressive",
    color: "#EF4444",
    descHighRu: "Агрессивный юмор выражен у вас. Сарказм и острые шутки вам близки, но они могут задевать других. Это не «плохой» стиль, но важно осознавать его влияние на отношения. Границы между остроумием и обидой бывают тонкими.",
    descHighEn: "Aggressive humor is pronounced in you. Sarcasm and sharp jokes appeal to you, but they can sting others. This isn't a 'bad' style, but it's worth being aware of its effect on relationships. The line between wit and offense can be thin.",
    descLowRu: "Агрессивный юмор не характерен — вы избегаете насмешек и сарказма.",
    descLowEn: "Aggressive humor is not typical — you avoid mockery and sarcasm.",
  },
  SELF_DEP: {
    nameRu: "Самоуничижительный",
    nameEn: "Self-Deprecating",
    color: "#F59E0B",
    descHighRu: "Самоуничижительный юмор у вас выражен. Вы часто шутите над собой — это может быть милой самоиронией или способом избежать конфликта. Стоит следить за тем, не переходит ли это в настоящее занижение самооценки.",
    descHighEn: "Self-deprecating humor is pronounced in you. You often joke about yourself — this can be charming self-irony or a way to avoid conflict. It's worth watching whether this crosses into genuine self-esteem lowering.",
    descLowRu: "Самоуничижительный юмор не характерен — вы не склонны подшучивать над собой за счёт самооценки.",
    descLowEn: "Self-deprecating humor is not typical — you don't tend to joke about yourself at the expense of your self-esteem.",
  },
};

export function getHumorTypeQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `ht-q-${item.number}`,
    test_id: HUMOR_TYPE_TEST_ID,
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
      { id: `ht-o-${item.number}-1`, question_id: `ht-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `ht-o-${item.number}-2`, question_id: `ht-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `ht-o-${item.number}-3`, question_id: `ht-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `ht-o-${item.number}-4`, question_id: `ht-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `ht-o-${item.number}-5`, question_id: `ht-q-${item.number}`, option_key: "5", text_ru: "Очень точно", text_en: "Very accurate", sort_order: 4 },
    ],
  }));
}
