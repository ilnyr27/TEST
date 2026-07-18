import { Question, QuestionOption } from "@/types/database";

// Энергетический менеджмент — 30 вопросов, 5 измерений по 6 вопросов
// Адаптировано из модели Тони Шварца "The Power of Full Engagement"
// PHYS=Физическая, EMOT=Эмоциональная, MENT=Ментальная, PURP=Смысл, RECOV=Восстановление

interface EnergyItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "PHYS" | "EMOT" | "MENT" | "PURP" | "RECOV";
}

const items: EnergyItem[] = [
  // PHYS — Физическая энергия
  { number: 1,  dimension: "PHYS", textRu: "Я просыпаюсь с ощущением отдыха и готовности к дню", textEn: "I wake up feeling rested and ready for the day" },
  { number: 2,  dimension: "PHYS", textRu: "Я регулярно двигаюсь — занимаюсь спортом, хожу пешком, делаю зарядку", textEn: "I move regularly — exercise, walk, or do physical activity" },
  { number: 3,  dimension: "PHYS", textRu: "Моё питание даёт мне стабильную энергию в течение дня (без резких провалов)", textEn: "My diet gives me stable energy throughout the day (without sharp crashes)" },
  { number: 4,  dimension: "PHYS", textRu: "Я сплю достаточно — и качество моего сна меня устраивает", textEn: "I get enough sleep — and I'm satisfied with its quality" },
  { number: 5,  dimension: "PHYS", textRu: "Моё тело редко сигнализирует усталостью или болью из-за образа жизни", textEn: "My body rarely signals fatigue or pain due to my lifestyle" },
  { number: 6,  dimension: "PHYS", textRu: "Я чувствую физическую бодрость и силу большую часть дня", textEn: "I feel physically energized and strong for most of the day" },

  // EMOT — Эмоциональная энергия
  { number: 7,  dimension: "EMOT", textRu: "Я умею оставаться спокойным и стабильным в стрессовых ситуациях", textEn: "I can remain calm and stable in stressful situations" },
  { number: 8,  dimension: "EMOT", textRu: "Отрицательные эмоции (тревога, раздражение) не захватывают меня надолго", textEn: "Negative emotions (anxiety, irritation) don't hold me for long" },
  { number: 9,  dimension: "EMOT", textRu: "Я умею находить позитивное в сложных обстоятельствах, не закрывая глаза на реальность", textEn: "I can find positives in difficult circumstances without ignoring reality" },
  { number: 10, dimension: "EMOT", textRu: "Мои отношения с близкими и коллегами дают мне энергию, а не забирают её", textEn: "My relationships with loved ones and colleagues give me energy rather than drain it" },
  { number: 11, dimension: "EMOT", textRu: "Я замечаю и называю свои эмоции, а не просто реагирую на них", textEn: "I notice and name my emotions rather than just react to them" },
  { number: 12, dimension: "EMOT", textRu: "В конце рабочего дня я чувствую эмоциональную удовлетворённость, а не опустошённость", textEn: "At the end of a workday I feel emotionally satisfied rather than drained" },

  // MENT — Ментальная энергия
  { number: 13, dimension: "MENT", textRu: "Мне легко сосредоточиться на задаче и удерживать внимание нужное время", textEn: "I can easily focus on a task and sustain attention for the needed time" },
  { number: 14, dimension: "MENT", textRu: "Я принимаю чёткие и взвешенные решения даже в конце насыщенного дня", textEn: "I make clear and balanced decisions even at the end of a busy day" },
  { number: 15, dimension: "MENT", textRu: "Я умею работать с несколькими задачами без ощущения хаоса в голове", textEn: "I can manage multiple tasks without feeling mental chaos" },
  { number: 16, dimension: "MENT", textRu: "Моя способность думать и соображать остаётся высокой на протяжении рабочего дня", textEn: "My thinking capacity stays high throughout the workday" },
  { number: 17, dimension: "MENT", textRu: "Я не чувствую «туман в голове» после нескольких часов работы", textEn: "I don't experience 'brain fog' after a few hours of work" },
  { number: 18, dimension: "MENT", textRu: "Мне легко переключаться между разными типами задач, сохраняя ясность", textEn: "I can switch between different types of tasks while maintaining clarity" },

  // PURP — Энергия смысла и цели
  { number: 19, dimension: "PURP", textRu: "Я знаю, ради чего работаю — у меня есть ясная цель или миссия", textEn: "I know what I work for — I have a clear goal or mission" },
  { number: 20, dimension: "PURP", textRu: "Моя работа совпадает с моими ценностями — мне не приходится «изменять себе»", textEn: "My work aligns with my values — I don't have to 'betray myself'" },
  { number: 21, dimension: "PURP", textRu: "Даже рутинные задачи кажутся мне частью чего-то важного", textEn: "Even routine tasks feel like part of something important to me" },
  { number: 22, dimension: "PURP", textRu: "Утром я встаю с желанием — меня мотивирует то, что ждёт впереди", textEn: "I get up in the morning with desire — I'm motivated by what lies ahead" },
  { number: 23, dimension: "PURP", textRu: "Мои долгосрочные цели вдохновляют и тянут меня вперёд", textEn: "My long-term goals inspire and pull me forward" },
  { number: 24, dimension: "PURP", textRu: "Я чувствую, что трачу время на что-то действительно значимое для меня", textEn: "I feel I'm spending time on something truly meaningful to me" },

  // RECOV — Восстановление
  { number: 25, dimension: "RECOV", textRu: "Я умею по-настоящему отдыхать — после отдыха чувствую реальное восполнение сил", textEn: "I know how to truly rest — after rest I feel genuinely restored" },
  { number: 26, dimension: "RECOV", textRu: "Я регулярно делаю короткие паузы в работе для восстановления", textEn: "I regularly take short breaks during work to recover" },
  { number: 27, dimension: "RECOV", textRu: "Мои выходные дни дают мне перезагрузку, а не накапливают усталость", textEn: "My days off give me recharge rather than accumulate fatigue" },
  { number: 28, dimension: "RECOV", textRu: "Я умею «выключаться» от работы в нерабочее время", textEn: "I can 'switch off' from work during non-work time" },
  { number: 29, dimension: "RECOV", textRu: "У меня есть ритуалы или практики, которые помогают мне восполнять энергию", textEn: "I have rituals or practices that help me replenish energy" },
  { number: 30, dimension: "RECOV", textRu: "Я не дохожу до состояния полного истощения — замечаю сигналы усталости заранее", textEn: "I don't reach complete exhaustion — I notice fatigue signals in advance" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const ENERGY_MANAGEMENT_TEST_ID = "energy-management";

export const energyManagementTestMeta = {
  id: ENERGY_MANAGEMENT_TEST_ID,
  slug: "energy-management",
  nameRu: "Энергетический менеджмент",
  nameEn: "Energy Management",
  descriptionRu: "Как вы управляете своей энергией? Тест по модели Тони Шварца оценивает 5 источников вашей энергии: физический, эмоциональный, ментальный, смысловой и восстановительный.",
  descriptionEn: "How do you manage your energy? Based on Tony Schwartz's model, the test assesses 5 energy sources: physical, emotional, mental, purpose-driven, and recovery.",
  methodology: "Energy Management (Schwartz & Loehr adapted)",
  estimatedMinutes: 7,
  questionCount: 30,
  category: "habits",
};

export const energyManagementDimensions = {
  PHYS: {
    nameRu: "Физическая энергия",
    nameEn: "Physical Energy",
    color: "#10B981",
    descHighRu: "Физическая энергия — ваш надёжный фундамент. Вы поддерживаете тело через сон, движение и питание. Это база, на которой держится всё остальное — ментальная производительность, эмоциональная устойчивость, мотивация.",
    descHighEn: "Physical energy is your solid foundation. You support your body through sleep, movement, and nutrition. This is the base that holds everything else — mental performance, emotional resilience, motivation.",
    descLowRu: "Физическая энергия — зона роста. Усталость тела напрямую ограничивает мышление, эмоции и мотивацию. Небольшие изменения в режиме сна, движения или питания дадут быстрый эффект.",
    descLowEn: "Physical energy is a growth area. Body fatigue directly limits thinking, emotions, and motivation. Small changes in sleep, movement, or nutrition will produce quick results.",
  },
  EMOT: {
    nameRu: "Эмоциональная энергия",
    nameEn: "Emotional Energy",
    color: "#F59E0B",
    descHighRu: "Эмоциональная энергия у вас высокая — вы умеете регулировать своё состояние и не дать стрессу истощить вас. Отношения заряжают, а не забирают силы. Это ценный ресурс в долгосрочной перспективе.",
    descHighEn: "Your emotional energy is high — you manage your state well and don't let stress exhaust you. Relationships energize rather than drain you. This is a valuable long-term resource.",
    descLowRu: "Эмоциональная энергия требует внимания. Постоянный стресс, напряжённые отношения или подавленные чувства — серьёзный источник утечки сил. Эмоциональная регуляция — навык, который можно развить.",
    descLowEn: "Emotional energy needs attention. Chronic stress, strained relationships, or suppressed feelings are a serious energy drain. Emotional regulation is a skill that can be developed.",
  },
  MENT: {
    nameRu: "Ментальная энергия",
    nameEn: "Mental Energy",
    color: "#3B82F6",
    descHighRu: "Ментальная энергия у вас высокая — вы сохраняете ясность мышления и концентрацию даже в насыщенные дни. Это позволяет принимать качественные решения и работать продуктивно дольше других.",
    descHighEn: "Your mental energy is high — you maintain mental clarity and focus even on busy days. This allows you to make quality decisions and work productively longer than others.",
    descLowRu: "Ментальная энергия — зона роста. Туман в голове, рассеянность и быстрое умственное истощение сигнализируют о перегрузке. Режим работы, паузы и управление потоком задач имеют большое значение.",
    descLowEn: "Mental energy is a growth area. Brain fog, distraction, and quick mental exhaustion signal overload. Work rhythm, breaks, and task flow management make a big difference.",
  },
  PURP: {
    nameRu: "Энергия смысла",
    nameEn: "Purpose Energy",
    color: "#8B5CF6",
    descHighRu: "Энергия смысла у вас сильная — вы знаете, ради чего работаете, и ваша деятельность совпадает с ценностями. Это мощнейший источник устойчивой мотивации, который не истощается со временем.",
    descHighEn: "Your purpose energy is strong — you know what you work for and your activity aligns with your values. This is the most powerful source of sustainable motivation that doesn't deplete over time.",
    descLowRu: "Энергия смысла требует внимания. Работа без ощущения цели или в противоречии с ценностями — один из главных источников выгорания. Стоит задаться вопросом: что для вас действительно важно?",
    descLowEn: "Purpose energy needs attention. Working without a sense of purpose or in conflict with values is one of the main sources of burnout. It's worth asking: what truly matters to you?",
  },
  RECOV: {
    nameRu: "Восстановление",
    nameEn: "Recovery",
    color: "#EF4444",
    descHighRu: "Восстановление у вас выстроено хорошо — вы умеете заряжаться, делать паузы и выключаться от работы. Это ключевой навык для долгосрочной производительности и защиты от выгорания.",
    descHighEn: "Your recovery is well-managed — you know how to recharge, take breaks, and switch off from work. This is a key skill for long-term productivity and burnout protection.",
    descLowRu: "Восстановление — критическая зона. Без полноценного отдыха организм работает в режиме хронического дефицита. Даже короткие регулярные паузы и ритуалы отключения кардинально меняют самочувствие.",
    descLowEn: "Recovery is a critical zone. Without proper rest, the body operates in chronic deficit mode. Even short regular breaks and switch-off rituals dramatically change how you feel.",
  },
};

export function getEnergyManagementQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `em-q-${item.number}`,
    test_id: ENERGY_MANAGEMENT_TEST_ID,
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
      { id: `em-o-${item.number}-1`, question_id: `em-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `em-o-${item.number}-2`, question_id: `em-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `em-o-${item.number}-3`, question_id: `em-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `em-o-${item.number}-4`, question_id: `em-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `em-o-${item.number}-5`, question_id: `em-q-${item.number}`, option_key: "5", text_ru: "Очень точно", text_en: "Very accurate", sort_order: 4 },
    ],
  }));
}
