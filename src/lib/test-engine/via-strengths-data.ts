import { Question, QuestionOption } from "@/types/database";

// VIA Сильные стороны — 40 вопросов, 8 измерений по 5 вопросов
// Адаптировано из VIA Classification of Character Strengths
// CREAT=Творчество, LEARN=Любовь к обучению, LEAD=Лидерство, PERS=Настойчивость
// TEAM=Командность, FAIR=Справедливость, SOCI=Социальный интеллект, PRUD=Благоразумие

interface VIAItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "CREAT" | "LEARN" | "LEAD" | "PERS" | "TEAM" | "FAIR" | "SOCI" | "PRUD";
}

const items: VIAItem[] = [
  // CREAT — Творчество
  { number: 1,  dimension: "CREAT", textRu: "Мне нравится придумывать оригинальные решения там, где другие идут стандартным путём", textEn: "I enjoy coming up with original solutions where others take the standard path" },
  { number: 2,  dimension: "CREAT", textRu: "Я часто нахожу неожиданные способы сделать что-то лучше или иначе", textEn: "I often find unexpected ways to do something better or differently" },
  { number: 3,  dimension: "CREAT", textRu: "Новые идеи приходят ко мне легко — даже когда никто другой их не видит", textEn: "New ideas come to me easily — even when no one else sees them" },
  { number: 4,  dimension: "CREAT", textRu: "Меня вдохновляет возможность создать что-то с нуля", textEn: "I'm inspired by the opportunity to create something from scratch" },
  { number: 5,  dimension: "CREAT", textRu: "Я нахожу творческие подходы даже в рутинных задачах", textEn: "I find creative approaches even in routine tasks" },

  // LEARN — Любовь к обучению
  { number: 6,  dimension: "LEARN", textRu: "Я с удовольствием погружаюсь в новую тему, даже если она не обязательна для работы", textEn: "I enjoy diving into a new topic even if it's not required for work" },
  { number: 7,  dimension: "LEARN", textRu: "Изучение нового — само по себе награда для меня", textEn: "Learning something new is a reward in itself for me" },
  { number: 8,  dimension: "LEARN", textRu: "Я стараюсь понять не только «как», но и «почему» работает то или иное", textEn: "I try to understand not just 'how' but also 'why' something works" },
  { number: 9,  dimension: "LEARN", textRu: "Мне нравится оставаться в курсе новых идей и открытий в интересных мне областях", textEn: "I enjoy staying current with new ideas and discoveries in areas that interest me" },
  { number: 10, dimension: "LEARN", textRu: "Я воспринимаю ошибки и трудности прежде всего как возможность научиться чему-то новому", textEn: "I view mistakes and difficulties primarily as opportunities to learn something new" },

  // LEAD — Лидерство
  { number: 11, dimension: "LEAD", textRu: "Мне комфортно брать ответственность за группу и направлять её к результату", textEn: "I'm comfortable taking responsibility for a group and directing it toward results" },
  { number: 12, dimension: "LEAD", textRu: "Я умею вдохновить других на действие даже в трудных обстоятельствах", textEn: "I can inspire others to take action even in difficult circumstances" },
  { number: 13, dimension: "LEAD", textRu: "Я склонен инициировать, когда нужно принять решение и никто не берёт инициативу", textEn: "I tend to step up when a decision needs to be made and no one is taking initiative" },
  { number: 14, dimension: "LEAD", textRu: "Я умею распределять задачи так, чтобы каждый работал на своём месте", textEn: "I know how to distribute tasks so everyone works where they're best suited" },
  { number: 15, dimension: "LEAD", textRu: "Мне нравится помогать команде двигаться к общей цели, объединяя усилия", textEn: "I enjoy helping a team move toward a shared goal by bringing efforts together" },

  // PERS — Настойчивость
  { number: 16, dimension: "PERS", textRu: "Я продолжаю работать над задачей, даже когда результат долго не приходит", textEn: "I keep working on a task even when results are slow to come" },
  { number: 17, dimension: "PERS", textRu: "Трудности и препятствия скорее мобилизуют меня, чем останавливают", textEn: "Difficulties and obstacles tend to mobilize me rather than stop me" },
  { number: 18, dimension: "PERS", textRu: "Я держу слово и выполняю то, что обещал, — даже когда это стоит усилий", textEn: "I keep my word and follow through on what I promised — even when it takes effort" },
  { number: 19, dimension: "PERS", textRu: "Я умею поддерживать фокус на долгосрочной цели, несмотря на краткосрочные отвлечения", textEn: "I can maintain focus on a long-term goal despite short-term distractions" },
  { number: 20, dimension: "PERS", textRu: "Я завершаю начатое — мне трудно бросить проект на полпути", textEn: "I finish what I start — it's hard for me to abandon a project halfway" },

  // TEAM — Командность
  { number: 21, dimension: "TEAM", textRu: "Я ощущаю себя частью чего-то большего, когда работаю в команде", textEn: "I feel part of something bigger when working in a team" },
  { number: 22, dimension: "TEAM", textRu: "Я охотно поддерживаю коллег, даже если это не входит в мои задачи", textEn: "I readily support colleagues even if it's not part of my responsibilities" },
  { number: 23, dimension: "TEAM", textRu: "Успех команды мне важнее личной славы", textEn: "The team's success matters more to me than personal recognition" },
  { number: 24, dimension: "TEAM", textRu: "Я хорошо адаптируюсь к разным ролям в команде — исполнителя, поддержки, генератора идей", textEn: "I adapt well to different team roles — executor, support, idea generator" },
  { number: 25, dimension: "TEAM", textRu: "Я стараюсь выстраивать доверие в коллективе и создавать атмосферу, где каждый может высказаться", textEn: "I try to build trust in the team and create an atmosphere where everyone can speak up" },

  // FAIR — Справедливость
  { number: 26, dimension: "FAIR", textRu: "Мне важно, чтобы все участники процесса были услышаны и учтены", textEn: "It matters to me that all participants in a process are heard and considered" },
  { number: 27, dimension: "FAIR", textRu: "Я стараюсь применять одни и те же стандарты ко всем — вне зависимости от симпатий", textEn: "I try to apply the same standards to everyone — regardless of personal feelings" },
  { number: 28, dimension: "FAIR", textRu: "Когда я вижу несправедливость, мне трудно промолчать", textEn: "When I see unfairness, it's hard for me to stay silent" },
  { number: 29, dimension: "FAIR", textRu: "Я принимаю решения, опираясь на принципы, а не только на удобство", textEn: "I make decisions based on principles, not just convenience" },
  { number: 30, dimension: "FAIR", textRu: "Мне важно, чтобы мои поступки соответствовали моим ценностям", textEn: "It matters to me that my actions align with my values" },

  // SOCI — Социальный интеллект
  { number: 31, dimension: "SOCI", textRu: "Я хорошо чувствую, в каком состоянии находится человек — даже без слов", textEn: "I can sense what state a person is in — even without words" },
  { number: 32, dimension: "SOCI", textRu: "Мне легко адаптировать свой стиль общения под конкретного человека", textEn: "I easily adapt my communication style to a specific person" },
  { number: 33, dimension: "SOCI", textRu: "Я умею разрядить напряжённую ситуацию и найти общий язык с разными людьми", textEn: "I can defuse tense situations and find common ground with different people" },
  { number: 34, dimension: "SOCI", textRu: "Окружающие часто приходят ко мне за советом или чтобы выговориться", textEn: "People often come to me for advice or to talk things through" },
  { number: 35, dimension: "SOCI", textRu: "Я замечаю подтексты и скрытые мотивы в общении — то, что люди не говорят прямо", textEn: "I notice subtext and hidden motives in communication — what people don't say directly" },

  // PRUD — Благоразумие
  { number: 36, dimension: "PRUD", textRu: "Я думаю о долгосрочных последствиях перед тем, как принять важное решение", textEn: "I think about long-term consequences before making an important decision" },
  { number: 37, dimension: "PRUD", textRu: "Я умею сдерживаться от импульсивных действий, даже когда эмоции сильны", textEn: "I can hold back from impulsive actions even when emotions are strong" },
  { number: 38, dimension: "PRUD", textRu: "Я взвешиваю риски и выгоды, а не действую наугад", textEn: "I weigh risks and benefits rather than act at random" },
  { number: 39, dimension: "PRUD", textRu: "Мне важно не жалеть о своих решениях — поэтому я стараюсь подходить к ним осознанно", textEn: "It matters to me not to regret my decisions — so I try to approach them consciously" },
  { number: 40, dimension: "PRUD", textRu: "Я берегу свои ресурсы — время, энергию, деньги — и не трачу их впустую", textEn: "I conserve my resources — time, energy, money — and don't waste them" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const VIA_STRENGTHS_TEST_ID = "via-strengths";

export const viaStrengthsTestMeta = {
  id: VIA_STRENGTHS_TEST_ID,
  slug: "via-strengths",
  nameRu: "Сильные стороны VIA",
  nameEn: "VIA Character Strengths",
  descriptionRu: "Какие сильные стороны характера помогают вам в работе и жизни? Тест на основе VIA Classification выявляет ваш уникальный профиль из 8 ключевых качеств.",
  descriptionEn: "Which character strengths help you at work and in life? Based on VIA Classification, this test reveals your unique profile across 8 key qualities.",
  methodology: "VIA Character Strengths (Peterson & Seligman adapted)",
  estimatedMinutes: 9,
  questionCount: 40,
  category: "career",
};

export const viaStrengthsDimensions = {
  CREAT: {
    nameRu: "Творчество",
    nameEn: "Creativity",
    color: "#F59E0B",
    descHighRu: "Творчество — одна из ваших ключевых сильных сторон. Вы генерируете оригинальные идеи и находите нестандартные решения там, где другие видят тупик. Это ценнейший ресурс в любой профессии, требующей инноваций.",
    descHighEn: "Creativity is one of your key strengths. You generate original ideas and find unconventional solutions where others see a dead end. This is an invaluable resource in any profession requiring innovation.",
    descLowRu: "Творчество менее выражено у вас как сильная сторона — вы предпочитаете проверенные подходы новым экспериментам.",
    descLowEn: "Creativity is less expressed as a strength for you — you prefer proven approaches over new experiments.",
  },
  LEARN: {
    nameRu: "Любовь к обучению",
    nameEn: "Love of Learning",
    color: "#3B82F6",
    descHighRu: "Любовь к обучению — сильная сторона, которая помогает вам расти быстрее других. Вы получаете искреннее удовольствие от освоения нового и не боитесь незнакомых областей.",
    descHighEn: "Love of learning is a strength that helps you grow faster than others. You genuinely enjoy mastering new things and aren't afraid of unfamiliar domains.",
    descLowRu: "Любовь к обучению менее характерна для вас — вы предпочитаете глубину в привычных областях широте.",
    descLowEn: "Love of learning is less typical for you — you prefer depth in familiar areas over breadth.",
  },
  LEAD: {
    nameRu: "Лидерство",
    nameEn: "Leadership",
    color: "#EF4444",
    descHighRu: "Лидерство — ваша значимая сильная сторона. Вы умеете вдохновлять, организовывать и направлять людей к цели. Это проявляется не только в формальных ролях руководителя, но и в повседневных ситуациях.",
    descHighEn: "Leadership is a significant strength of yours. You can inspire, organize, and direct people toward a goal. This shows not only in formal leadership roles but in everyday situations.",
    descLowRu: "Лидерство менее выражено — вы предпочитаете роль исполнителя или экспертного вклада над руководством.",
    descLowEn: "Leadership is less pronounced — you prefer the role of contributor or expert over directing others.",
  },
  PERS: {
    nameRu: "Настойчивость",
    nameEn: "Perseverance",
    color: "#10B981",
    descHighRu: "Настойчивость — мощная сильная сторона. Вы доводите дела до конца, держите фокус на долгосрочных целях и не сдаётесь перед трудностями. Это одно из самых ценных качеств в профессиональной жизни.",
    descHighEn: "Perseverance is a powerful strength. You see things through to completion, maintain focus on long-term goals, and don't give up when faced with difficulties. This is one of the most valuable qualities in professional life.",
    descLowRu: "Настойчивость выражена умеренно — вам лучше даются проекты с быстрой отдачей, чем долгосрочные марафоны.",
    descLowEn: "Perseverance is moderately expressed — you do better with projects that have quick payoff than long-term marathons.",
  },
  TEAM: {
    nameRu: "Командность",
    nameEn: "Teamwork",
    color: "#8B5CF6",
    descHighRu: "Командность — важная сильная сторона. Вы вносите реальный вклад в общий результат, поддерживаете коллег и создаёте атмосферу доверия. Такие люди делают команды сильнее.",
    descHighEn: "Teamwork is an important strength. You make a real contribution to shared results, support colleagues, and create an atmosphere of trust. Such people make teams stronger.",
    descLowRu: "Командность менее выражена — вы работаете наиболее эффективно самостоятельно или в небольшой автономной роли.",
    descLowEn: "Teamwork is less pronounced — you work most effectively independently or in a small autonomous role.",
  },
  FAIR: {
    nameRu: "Справедливость",
    nameEn: "Fairness",
    color: "#06B6D4",
    descHighRu: "Справедливость — глубокая ценностная сильная сторона. Вы принимаете решения, основываясь на принципах, а не на удобстве, и следите за тем, чтобы каждый был услышан. Это строит долгосрочное доверие.",
    descHighEn: "Fairness is a deep value-based strength. You make decisions based on principles rather than convenience and ensure everyone is heard. This builds long-term trust.",
    descLowRu: "Справедливость менее выражена как доминирующая сильная сторона — это не означает нечестности, просто не ваш главный мотив.",
    descLowEn: "Fairness is less expressed as a dominant strength — this doesn't mean dishonesty, it's simply not your primary driver.",
  },
  SOCI: {
    nameRu: "Социальный интеллект",
    nameEn: "Social Intelligence",
    color: "#F97316",
    descHighRu: "Социальный интеллект — ваш значимый актив. Вы тонко чувствуете людей, легко адаптируетесь в общении и умеете создавать связи. Это незаменимо в переговорах, управлении и командной работе.",
    descHighEn: "Social intelligence is a significant asset of yours. You have a keen sense of people, adapt easily in communication, and can build connections. This is invaluable in negotiations, management, and teamwork.",
    descLowRu: "Социальный интеллект менее выражен — вы предпочитаете работу с идеями и задачами, а не с людьми.",
    descLowEn: "Social intelligence is less expressed — you prefer working with ideas and tasks rather than with people.",
  },
  PRUD: {
    nameRu: "Благоразумие",
    nameEn: "Prudence",
    color: "#6366F1",
    descHighRu: "Благоразумие — надёжная сильная сторона. Вы думаете наперёд, взвешиваете риски и принимаете решения осознанно. Это делает вас ценным игроком там, где цена ошибки высока.",
    descHighEn: "Prudence is a reliable strength. You think ahead, weigh risks, and make decisions consciously. This makes you a valuable player where the cost of mistakes is high.",
    descLowRu: "Благоразумие менее выражено — вы больше склонны к быстрым решениям и действию, чем к длительному взвешиванию.",
    descLowEn: "Prudence is less expressed — you're more inclined toward quick decisions and action than prolonged deliberation.",
  },
};

export function getViaStrengthsQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `via-q-${item.number}`,
    test_id: VIA_STRENGTHS_TEST_ID,
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
      { id: `via-o-${item.number}-1`, question_id: `via-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `via-o-${item.number}-2`, question_id: `via-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `via-o-${item.number}-3`, question_id: `via-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `via-o-${item.number}-4`, question_id: `via-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `via-o-${item.number}-5`, question_id: `via-q-${item.number}`, option_key: "5", text_ru: "Очень точно", text_en: "Very accurate", sort_order: 4 },
    ],
  }));
}
