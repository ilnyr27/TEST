import { Question, QuestionOption } from "@/types/database";

// Habit Audit — original habit assessment
// Dimensions: HH=Health Habits, PR=Productivity, MN=Mindfulness, SH=Social Habits, LR=Learning
// Scale 1-5: 1=Never, 5=Always
// Some items are reverse-scored (marked reverse: true)

interface HabitsQuestion {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "HH" | "PR" | "MN" | "SH" | "LR";
  reverse: boolean;
}

const habitsItems: HabitsQuestion[] = [
  // Health Habits (HH) — 5 items
  { number: 1, textRu: "Я двигаюсь хотя бы 20–30 минут в день — прогулка, зал, зарядка", textEn: "I move for at least 20–30 minutes a day — a walk, gym, or exercise", dimension: "HH", reverse: false },
  { number: 2, textRu: "Я пропускаю приёмы пищи, потому что забываю или не успеваю", textEn: "I skip meals because I forget or don't have time", dimension: "HH", reverse: true },
  { number: 3, textRu: "Я просыпаюсь более-менее отдохнувшим большинство дней", textEn: "I wake up feeling reasonably rested most mornings", dimension: "HH", reverse: false },
  { number: 4, textRu: "К середине дня у меня есть стакан воды рядом", textEn: "By midday I usually have water within reach", dimension: "HH", reverse: false },
  { number: 5, textRu: "Еда навынос или фастфуд — мой частый выбор в будни", textEn: "Takeout or fast food is my go-to on busy weekdays", dimension: "HH", reverse: true },

  // Productivity (PR) — 5 items
  { number: 6, textRu: "Начиная день, я примерно знаю, что именно сделаю сегодня", textEn: "When I start the day, I roughly know what I will actually do today", dimension: "PR", reverse: false },
  { number: 7, textRu: "Важное дело, которое не срочно, у меня часто откладывается до последнего", textEn: "An important but non-urgent task often sits on my list until the last moment", dimension: "PR", reverse: true },
  { number: 8, textRu: "В конце рабочего дня я могу назвать одно главное, что продвинул сегодня", textEn: "At the end of the workday I can name one main thing I actually moved forward", dimension: "PR", reverse: false },
  { number: 9, textRu: "Дедлайны — это ориентир, а не стресс: я обычно успеваю заранее", textEn: "Deadlines are a guide, not a stressor — I usually finish ahead of time", dimension: "PR", reverse: false },
  { number: 10, textRu: "Я открываю телефон «на минуту» и теряю полчаса", textEn: "I open my phone 'for a minute' and lose half an hour", dimension: "PR", reverse: true },

  // Mindfulness (MN) — 5 items
  { number: 11, textRu: "Я нахожу хотя бы несколько минут в день, чтобы побыть в тишине с собой", textEn: "I find at least a few minutes each day to be quiet with myself", dimension: "MN", reverse: false },
  { number: 12, textRu: "Когда что-то выбивает меня из колеи, я замечаю это раньше, чем срываюсь", textEn: "When something throws me off, I notice it before I snap", dimension: "MN", reverse: false },
  { number: 13, textRu: "Я добираюсь до работы или ложусь спать, почти не помня, что происходило последний час", textEn: "I often commute or fall asleep barely remembering what happened in the last hour", dimension: "MN", reverse: true },
  { number: 14, textRu: "У меня есть хоть какая-то практика благодарности, рефлексии или дневника", textEn: "I have some kind of gratitude, reflection, or journaling practice", dimension: "MN", reverse: false },
  { number: 15, textRu: "Тревожная мысль, которая появилась вечером, к утру уже не так давит", textEn: "An anxious thought that appeared in the evening usually feels lighter by morning", dimension: "MN", reverse: false },

  // Social Habits (SH) — 5 items
  { number: 16, textRu: "На прошлой неделе я пообщался с кем-то близким — не по делу, просто так", textEn: "Last week I talked with someone close — not for a reason, just to connect", dimension: "SH", reverse: false },
  { number: 17, textRu: "Когда я устал, я предпочитаю исчезнуть, чем быть с людьми", textEn: "When tired, I prefer to disappear rather than be around people", dimension: "SH", reverse: true },
  { number: 18, textRu: "Я помогаю кому-то, не считая это долгом и не ожидая ответного жеста", textEn: "I help people without tallying it up or expecting something back", dimension: "SH", reverse: false },
  { number: 19, textRu: "Когда человек говорит, я слушаю его — а не жду, пока смогу вставить своё", textEn: "When someone speaks, I listen to them — not just wait for my turn to talk", dimension: "SH", reverse: false },
  { number: 20, textRu: "После общения с конкретными людьми я обычно заряжаюсь, а не выматываюсь", textEn: "After spending time with certain people I usually feel charged, not drained", dimension: "SH", reverse: false },

  // Learning (LR) — 5 items
  { number: 21, textRu: "На прошлой неделе я что-то читал или смотрел, чтобы лучше разобраться в теме", textEn: "Last week I read or watched something to get better at something", dimension: "LR", reverse: false },
  { number: 22, textRu: "Я пробую что-то новое — навык, инструмент или тему — хотя бы раз в неделю", textEn: "I try something new — a skill, tool, or topic — at least once a week", dimension: "LR", reverse: false },
  { number: 23, textRu: "Обучение — это то, что я хочу делать, но до чего никак не доходят руки", textEn: "Learning is something I want to do but never quite get around to", dimension: "LR", reverse: true },
  { number: 24, textRu: "После провала или ошибки я обычно думаю, что именно пошло не так", textEn: "After a mistake or failure I usually think about what actually went wrong", dimension: "LR", reverse: false },
  { number: 25, textRu: "У меня есть конкретные цели роста, и я знаю, куда двигаюсь", textEn: "I have specific growth goals and I know the direction I am heading", dimension: "LR", reverse: false },
];

// Sort by question number for linear flow
const sortedItems = [...habitsItems].sort((a, b) => a.number - b.number);

const scaleLabels = {
  ru: {
    min: "Никогда",
    max: "Всегда",
  },
  en: {
    min: "Never",
    max: "Always",
  },
};

export const HABITS_TEST_ID = "habits";

export const habitsTestMeta = {
  id: HABITS_TEST_ID,
  slug: "habits",
  nameRu: "Аудит привычек",
  nameEn: "Habit Audit",
  descriptionRu:
    "Оцените качество ваших ежедневных привычек в 5 областях: здоровье, продуктивность, осознанность, общение, обучение.",
  descriptionEn:
    "Assess the quality of your daily habits across 5 areas: health, productivity, mindfulness, social life, and learning.",
  methodology: "Original habit assessment",
  estimatedMinutes: 6,
  questionCount: 25,
  category: "habits",
};

export function getHabitsQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `hab-q-${item.number}`,
    test_id: HABITS_TEST_ID,
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
      { id: `hab-o-${item.number}-1`, question_id: `hab-q-${item.number}`, option_key: "1", text_ru: "Никогда", text_en: "Never", sort_order: 0 },
      { id: `hab-o-${item.number}-2`, question_id: `hab-q-${item.number}`, option_key: "2", text_ru: "Редко", text_en: "Rarely", sort_order: 1 },
      { id: `hab-o-${item.number}-3`, question_id: `hab-q-${item.number}`, option_key: "3", text_ru: "Иногда", text_en: "Sometimes", sort_order: 2 },
      { id: `hab-o-${item.number}-4`, question_id: `hab-q-${item.number}`, option_key: "4", text_ru: "Часто", text_en: "Often", sort_order: 3 },
      { id: `hab-o-${item.number}-5`, question_id: `hab-q-${item.number}`, option_key: "5", text_ru: "Всегда", text_en: "Always", sort_order: 4 },
    ],
  }));
}

// Dimension metadata for results display
export const habitsDimensions = {
  HH: {
    nameRu: "Здоровые привычки",
    nameEn: "Health Habits",
    descHighRu: "Вы заботитесь о своём здоровье: регулярно двигаетесь, правильно питаетесь и высыпаетесь.",
    descHighEn: "You take good care of your health: you exercise regularly, eat well, and get enough sleep.",
    descLowRu: "Ваши привычки в области здоровья нуждаются в улучшении. Обратите внимание на питание, сон и физическую активность.",
    descLowEn: "Your health habits need improvement. Pay attention to nutrition, sleep, and physical activity.",
    color: "#22c55e",
  },
  PR: {
    nameRu: "Продуктивность",
    nameEn: "Productivity",
    descHighRu: "Вы хорошо организованы, умеете расставлять приоритеты и доводить дела до конца.",
    descHighEn: "You are well-organized, skilled at prioritizing, and finish what you start.",
    descLowRu: "Вам стоит поработать над управлением временем и борьбой с прокрастинацией.",
    descLowEn: "You should work on time management and overcoming procrastination.",
    color: "#8b5cf6",
  },
  MN: {
    nameRu: "Осознанность",
    nameEn: "Mindfulness",
    descHighRu: "Вы живёте осознанно, замечаете свои эмоции и регулярно практикуете рефлексию.",
    descHighEn: "You live mindfully, notice your emotions, and regularly practice self-reflection.",
    descLowRu: "Вам не хватает осознанности в повседневной жизни. Попробуйте практики медитации или ведения дневника.",
    descLowEn: "You lack mindfulness in daily life. Try meditation or journaling practices.",
    color: "#06b6d4",
  },
  SH: {
    nameRu: "Социальные привычки",
    nameEn: "Social Habits",
    descHighRu: "Вы поддерживаете крепкие связи с окружающими, умеете слушать и помогать.",
    descHighEn: "You maintain strong connections with others, listen well, and offer support.",
    descLowRu: "Ваши социальные привычки нуждаются во внимании. Старайтесь больше общаться и поддерживать близких.",
    descLowEn: "Your social habits need attention. Try to communicate more and stay connected with loved ones.",
    color: "#f59e0b",
  },
  LR: {
    nameRu: "Обучение",
    nameEn: "Learning",
    descHighRu: "Вы активно учитесь, читаете, ставите цели для развития и учитесь на ошибках.",
    descHighEn: "You actively learn, read, set development goals, and learn from your mistakes.",
    descLowRu: "Вам стоит уделять больше времени саморазвитию и обучению новому.",
    descLowEn: "You should dedicate more time to self-development and learning new things.",
    color: "#ec4899",
  },
};
