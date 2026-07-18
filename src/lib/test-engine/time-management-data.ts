import { Question, QuestionOption } from "@/types/database";

// Тайм-менеджмент — 28 вопросов, 4 измерения по 7 вопросов
// PLAN=Планирование, FOCUS=Фокус, ACTION=Исполнение, BOUND=Границы и баланс

interface TimeItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "PLAN" | "FOCUS" | "ACTION" | "BOUND";
}

const items: TimeItem[] = [
  // PLAN — Планирование и приоритеты
  { number: 1,  dimension: "PLAN", textRu: "У меня есть понятная система планирования — я знаю, что и когда нужно делать", textEn: "I have a clear planning system — I know what needs to be done and when" },
  { number: 2,  dimension: "PLAN", textRu: "Я умею отделять важное от срочного и не позволяю второму поглощать первое", textEn: "I can separate the important from the urgent and don't let the latter consume the former" },
  { number: 3,  dimension: "PLAN", textRu: "Я планирую день накануне вечером или с утра — и придерживаюсь плана", textEn: "I plan my day the evening before or in the morning — and stick to the plan" },
  { number: 4,  dimension: "PLAN", textRu: "Мои цели на неделю или месяц ясны и конкретны — не просто «в голове»", textEn: "My goals for the week or month are clear and specific — not just 'in my head'" },
  { number: 5,  dimension: "PLAN", textRu: "Я расставляю задачи по приоритету и начинаю с самого важного, а не самого простого", textEn: "I prioritize tasks and start with the most important, not the easiest" },
  { number: 6,  dimension: "PLAN", textRu: "Я реалистично оцениваю, сколько времени займут задачи — и не перегружаю список дел", textEn: "I realistically estimate how long tasks will take and don't overload my to-do list" },
  { number: 7,  dimension: "PLAN", textRu: "В конце недели я вижу, что сделал значимое, а не только «тушил пожары»", textEn: "At the end of the week I see that I accomplished something meaningful, not just 'put out fires'" },

  // FOCUS — Концентрация и глубокая работа
  { number: 8,  dimension: "FOCUS", textRu: "Я выделяю блоки времени для глубокой работы без прерываний", textEn: "I set aside time blocks for deep work without interruptions" },
  { number: 9,  dimension: "FOCUS", textRu: "Во время работы я отключаю уведомления и не отвлекаюсь на соцсети или мессенджеры", textEn: "During work I turn off notifications and don't get distracted by social media or messengers" },
  { number: 10, dimension: "FOCUS", textRu: "Я умею войти в состояние потока — когда работа идёт легко и продуктивно", textEn: "I can enter a flow state — when work goes smoothly and productively" },
  { number: 11, dimension: "FOCUS", textRu: "Я выполняю одну задачу за раз, а не переключаюсь между несколькими одновременно", textEn: "I complete one task at a time rather than switching between several simultaneously" },
  { number: 12, dimension: "FOCUS", textRu: "Мне легко вернуться к задаче после перерыва, не теряя нити", textEn: "I can easily return to a task after a break without losing my train of thought" },
  { number: 13, dimension: "FOCUS", textRu: "Я создаю условия для работы — рабочее место, время, окружение — чтобы ничто не мешало", textEn: "I create work conditions — space, time, environment — so nothing interferes" },
  { number: 14, dimension: "FOCUS", textRu: "Я замечаю, когда начинаю «буксовать», и умею перезапуститься", textEn: "I notice when I start to 'stall' and know how to restart" },

  // ACTION — Исполнение без прокрастинации
  { number: 15, dimension: "ACTION", textRu: "Я начинаю задачи своевременно — не откладываю до последнего момента", textEn: "I start tasks on time — I don't put them off until the last moment" },
  { number: 16, dimension: "ACTION", textRu: "Большие задачи не пугают меня — я разбиваю их на шаги и просто делаю", textEn: "Big tasks don't intimidate me — I break them into steps and just do it" },
  { number: 17, dimension: "ACTION", textRu: "Я не жду «идеального момента» — начинаю даже когда условия неидеальны", textEn: "I don't wait for the 'perfect moment' — I start even when conditions aren't ideal" },
  { number: 18, dimension: "ACTION", textRu: "Я закрываю задачи до конца, а не бросаю на 90%", textEn: "I close tasks completely rather than stopping at 90%" },
  { number: 19, dimension: "ACTION", textRu: "Когда теряю мотивацию, я умею «включиться» — через маленький шаг или ритуал", textEn: "When I lose motivation I can 're-engage' — through a small step or ritual" },
  { number: 20, dimension: "ACTION", textRu: "Я не трачу лишнее время на подготовку к задаче — просто приступаю", textEn: "I don't spend excess time preparing for a task — I just begin" },
  { number: 21, dimension: "ACTION", textRu: "Мои дела выполняются, а не копятся в списках неделями", textEn: "My tasks get done rather than piling up in lists for weeks" },

  // BOUND — Границы и баланс
  { number: 22, dimension: "BOUND", textRu: "Я умею говорить «нет» задачам и просьбам, которые не соответствуют моим приоритетам", textEn: "I can say 'no' to tasks and requests that don't align with my priorities" },
  { number: 23, dimension: "BOUND", textRu: "Мой рабочий день имеет чёткое окончание — я не работаю до упора каждый день", textEn: "My workday has a clear end — I don't work until I drop every day" },
  { number: 24, dimension: "BOUND", textRu: "Я защищаю время на восстановление так же, как защищаю время на работу", textEn: "I protect recovery time as fiercely as I protect work time" },
  { number: 25, dimension: "BOUND", textRu: "Я не беру на себя больше, чем могу выполнить качественно", textEn: "I don't take on more than I can do well" },
  { number: 26, dimension: "BOUND", textRu: "Другие люди редко нарушают мой рабочий ритм без моего согласия", textEn: "Other people rarely disrupt my work rhythm without my consent" },
  { number: 27, dimension: "BOUND", textRu: "Я делегирую задачи, когда это уместно — вместо того чтобы делать всё самому", textEn: "I delegate tasks when appropriate — instead of doing everything myself" },
  { number: 28, dimension: "BOUND", textRu: "Мой рабочий ритм устойчив: я не ухожу в спринты с последующим полным обвалом", textEn: "My work rhythm is sustainable: I don't sprint and then crash completely" },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const TIME_MANAGEMENT_TEST_ID = "time-management";

export const timeManagementTestMeta = {
  id: TIME_MANAGEMENT_TEST_ID,
  slug: "time-management",
  nameRu: "Тайм-менеджмент",
  nameEn: "Time Management",
  descriptionRu: "Насколько эффективно вы управляете временем? Тест оценивает четыре ключевых навыка: планирование, концентрацию, исполнение и умение держать границы.",
  descriptionEn: "How effectively do you manage time? The test assesses four key skills: planning, focus, execution, and the ability to maintain boundaries.",
  methodology: "Time Management Skills (GTD + Deep Work adapted)",
  estimatedMinutes: 7,
  questionCount: 28,
  category: "habits",
};

export const timeManagementDimensions = {
  PLAN: {
    nameRu: "Планирование",
    nameEn: "Planning",
    color: "#3B82F6",
    descHighRu: "Планирование — ваша сильная сторона. Вы умеете расставлять приоритеты, структурировать день и работать по системе. Это даёт ясность и снижает уровень стресса.",
    descHighEn: "Planning is your strength. You can set priorities, structure your day, and work systematically. This provides clarity and reduces stress levels.",
    descLowRu: "Планирование — зона роста. Без чёткой структуры легко потеряться в потоке задач. Даже простой список с тремя главными делами на день меняет ситуацию.",
    descLowEn: "Planning is a growth area. Without clear structure it's easy to get lost in the task flow. Even a simple list of three main things for the day changes the situation.",
  },
  FOCUS: {
    nameRu: "Концентрация",
    nameEn: "Focus",
    color: "#8B5CF6",
    descHighRu: "Концентрация у вас высокая — вы умеете входить в состояние глубокой работы и защищать его от отвлечений. Это редкий и ценный навык в эпоху постоянных уведомлений.",
    descHighEn: "Your focus is high — you can enter deep work states and protect them from distractions. This is a rare and valuable skill in the era of constant notifications.",
    descLowRu: "Концентрация — зона роста. Постоянные переключения убивают продуктивность сильнее всего. Даже один блок в 90 минут без телефона изменит качество вашей работы.",
    descLowEn: "Focus is a growth area. Constant switching kills productivity more than anything else. Even one 90-minute block without your phone will change the quality of your work.",
  },
  ACTION: {
    nameRu: "Исполнение",
    nameEn: "Execution",
    color: "#10B981",
    descHighRu: "Исполнение — ваш конёк. Вы умеете начинать, не ждёте идеальных условий и доводите дела до конца. Прокрастинация — не ваша история. Это мощный актив.",
    descHighEn: "Execution is your forte. You know how to start, don't wait for ideal conditions, and follow through. Procrastination is not your story. This is a powerful asset.",
    descLowRu: "Исполнение — зона роста. Прокрастинация чаще всего связана не с ленью, а с тревогой, перфекционизмом или размытой задачей. Попробуйте технику «двух минут» или «следующего маленького шага».",
    descLowEn: "Execution is a growth area. Procrastination is more often linked to anxiety, perfectionism, or an unclear task than laziness. Try the 'two-minute rule' or 'next small step' technique.",
  },
  BOUND: {
    nameRu: "Границы",
    nameEn: "Boundaries",
    color: "#F59E0B",
    descHighRu: "Границы у вас выстроены хорошо — вы умеете говорить «нет», защищать время и не брать больше, чем можете сделать качественно. Это ключ к устойчивой производительности без выгорания.",
    descHighEn: "Your boundaries are well-established — you can say 'no', protect your time, and not take on more than you can do well. This is the key to sustainable productivity without burnout.",
    descLowRu: "Границы — зона роста. Сложно отказывать, защищать рабочее время и делегировать? Это часто скрывает страх разочаровать других или ощущение незаменимости. Стоит разобраться.",
    descLowEn: "Boundaries are a growth area. Hard to say no, protect work time, and delegate? This often hides a fear of disappointing others or a sense of indispensability. Worth exploring.",
  },
};

export function getTimeManagementQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `tm-q-${item.number}`,
    test_id: TIME_MANAGEMENT_TEST_ID,
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
      { id: `tm-o-${item.number}-1`, question_id: `tm-q-${item.number}`, option_key: "1", text_ru: "Совсем не про меня", text_en: "Not me at all", sort_order: 0 },
      { id: `tm-o-${item.number}-2`, question_id: `tm-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `tm-o-${item.number}-3`, question_id: `tm-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `tm-o-${item.number}-4`, question_id: `tm-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `tm-o-${item.number}-5`, question_id: `tm-q-${item.number}`, option_key: "5", text_ru: "Очень точно", text_en: "Very accurate", sort_order: 4 },
    ],
  }));
}
