import { Question, QuestionOption } from "@/types/database";

// Shadow / Blind Spots Test — 6 dimensions, 7 questions each, scale 1-5
// PROC=Procrastination, ANXI=Anxiety&Control, CONF=Conflict Avoidance,
// PERF=Perfectionism, SELF=Self-Sabotage, IMPU=Impulsivity

export const SHADOW_TEST_ID = "shadow";

export const shadowTestMeta = {
  id: SHADOW_TEST_ID,
  slug: "shadow",
  nameRu: "Слабые стороны и слепые пятна",
  nameEn: "Blind Spots & Shadow Sides",
  descriptionRu: "Честный взгляд на то, что мешает вам. Без осуждения — только понимание. Высокий балл по измерению означает, что эта черта активно проявляется в вашей жизни.",
  descriptionEn: "An honest look at what holds you back. No judgment — just understanding. A high score on a dimension means this trait is actively present in your life.",
  methodology: "Shadow work & cognitive-behavioral self-assessment",
  estimatedMinutes: 9,
  questionCount: 42,
  category: "psychology",
};

export const shadowDimensions: Record<string, {
  nameRu: string; nameEn: string; color: string;
  descHighRu: string; descHighEn: string;
  descLowRu: string; descLowEn: string;
  tipRu: string; tipEn: string;
}> = {
  PROC: {
    nameRu: "Прокрастинация",
    nameEn: "Procrastination",
    color: "#f59e0b",
    descHighRu: "Вы склонны откладывать важные дела, особенно когда они вызывают тревогу или кажутся слишком большими. Это защитная реакция психики — не лень. Под прокрастинацией обычно скрывается страх неудачи или перфекционизм.",
    descHighEn: "You tend to postpone important tasks, especially when they feel overwhelming or anxiety-inducing. This is a psychological defense mechanism — not laziness. Procrastination usually hides fear of failure or perfectionism.",
    descLowRu: "Вы хорошо справляетесь с тем, чтобы приступать к делам вовремя. Откладывание — не ваша характерная черта.",
    descLowEn: "You handle starting tasks on time quite well. Procrastination is not a defining trait for you.",
    tipRu: "Попробуйте технику «2 минуты» — если дело занимает меньше 2 минут, сделайте сразу. Для крупных задач — разбивайте на шаги по 25 минут.",
    tipEn: "Try the '2-minute rule' — if something takes less than 2 minutes, do it immediately. For larger tasks, break them into 25-minute steps.",
  },
  ANXI: {
    nameRu: "Тревога и гиперконтроль",
    nameEn: "Anxiety & Hypercontrol",
    color: "#6366f1",
    descHighRu: "Вы часто беспокоитесь о будущем и стремитесь контролировать то, что не поддаётся контролю. Тревога — это сигнал, а не приговор. Она говорит о том, что вам важно то, о чём вы беспокоитесь.",
    descHighEn: "You frequently worry about the future and try to control what is beyond control. Anxiety is a signal, not a verdict. It tells you that what you worry about matters to you.",
    descLowRu: "Вы достаточно спокойно относитесь к неопределённости и не стремитесь всё держать под контролем.",
    descLowEn: "You handle uncertainty relatively calmly and don't feel compelled to control everything.",
    tipRu: "Спросите себя: «Это то, на что я могу повлиять?» Если нет — тренируйтесь отпускать. Практика осознанного дыхания снижает тревогу за 3–5 минут.",
    tipEn: "Ask yourself: 'Is this something I can influence?' If not — practice letting go. Mindful breathing reduces anxiety within 3–5 minutes.",
  },
  CONF: {
    nameRu: "Избегание конфликтов",
    nameEn: "Conflict Avoidance",
    color: "#10b981",
    descHighRu: "Вы предпочитаете молчать или соглашаться, лишь бы не возникало напряжения. Это происходит из стремления сохранить мир — хорошего в вас много. Но подавленные несогласия накапливаются и могут выходить неожиданными вспышками.",
    descHighEn: "You prefer to stay silent or agree rather than create tension. This comes from a desire to keep the peace — there's a lot of good in that. But suppressed disagreements accumulate and can erupt unexpectedly.",
    descLowRu: "Вы умеете отстаивать свою позицию, не уклоняясь от сложных разговоров.",
    descLowEn: "You're able to stand your ground without avoiding difficult conversations.",
    tipRu: "Начните с малого: выражайте своё мнение по незначительным поводам. Фраза «Мне важно сказать...» снижает ощущение агрессии.",
    tipEn: "Start small: express your opinion on minor matters. The phrase 'It's important for me to say...' reduces the feeling of aggression.",
  },
  PERF: {
    nameRu: "Перфекционизм",
    nameEn: "Perfectionism",
    color: "#8b5cf6",
    descHighRu: "Вы ставите себе высокую планку и болезненно реагируете на ошибки — свои и чужих. Перфекционизм — это замаскированный страх быть недостаточно хорошим. Он даёт высокие стандарты, но и сильно истощает.",
    descHighEn: "You set high standards and react painfully to mistakes — your own and others'. Perfectionism is disguised fear of being not good enough. It creates high standards but also deeply exhausts.",
    descLowRu: "Вы хорошо принимаете несовершенство — своё и чужих. «Хорошо сделано» для вас достаточно, без нужды довести всё до идеала.",
    descLowEn: "You handle imperfection — your own and others' — quite well. 'Done well' is enough for you without needing everything to be perfect.",
    tipRu: "Введите понятие «достаточно хорошо» для задач, которые не являются ключевыми. Спросите: «Если это будет на 80% — что изменится?»",
    tipEn: "Introduce the concept of 'good enough' for non-critical tasks. Ask: 'If this is 80% — what will actually change?'",
  },
  SELF: {
    nameRu: "Самосаботаж",
    nameEn: "Self-Sabotage",
    color: "#ef4444",
    descHighRu: "Вы замечаете, что иногда сами мешаете себе достигать целей — опаздываете, отказываетесь от возможностей или убеждаете себя, что «не готов». Самосаботаж — это защита от разочарования: лучше не пробовать, чем потерпеть неудачу.",
    descHighEn: "You notice that you sometimes undermine your own goals — arriving late, declining opportunities, or convincing yourself you're 'not ready'. Self-sabotage is protection from disappointment: better not to try than to fail.",
    descLowRu: "Вы, как правило, не мешаете себе. Когда появляется возможность — вы используете её, а не находите причины отступить.",
    descLowEn: "You generally don't undermine yourself. When an opportunity arises, you take it rather than finding reasons to retreat.",
    tipRu: "Задайте себе вопрос: «Что самое страшное могло бы случиться, если бы я попробовал?» Часто страх преувеличен.",
    tipEn: "Ask yourself: 'What is the worst thing that could happen if I tried?' Often the fear is exaggerated.",
  },
  IMPU: {
    nameRu: "Импульсивность",
    nameEn: "Impulsivity",
    color: "#f97316",
    descHighRu: "Вы склонны реагировать быстро — принимать решения под влиянием эмоций, перебивать, тратить деньги или говорить то, о чём потом жалеете. Импульсивность — это много энергии и живость. Но она нуждается в паузе.",
    descHighEn: "You tend to react quickly — making decisions under the influence of emotions, interrupting, spending money, or saying things you later regret. Impulsivity is a lot of energy and liveliness. But it needs a pause.",
    descLowRu: "Вы хорошо контролируете импульсы и, как правило, думаете прежде чем действовать или говорить.",
    descLowEn: "You manage your impulses well and generally think before acting or speaking.",
    tipRu: "Правило «10 секунд» — перед важным ответом или решением сделайте один глубокий вдох и мысленно досчитайте до 10.",
    tipEn: "The '10-second rule' — before an important response or decision, take one deep breath and count to 10 mentally.",
  },
};

interface ShadowItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "PROC" | "ANXI" | "CONF" | "PERF" | "SELF" | "IMPU";
}

const items: ShadowItem[] = [
  // PROC — Procrastination (7)
  { number: 1,  textRu: "Я откладываю важные дела до последнего момента", textEn: "I put off important tasks until the last moment", dimension: "PROC" },
  { number: 2,  textRu: "Когда задача кажется большой — я не знаю с чего начать и не начинаю вообще", textEn: "When a task feels big, I don't know where to start and end up not starting at all", dimension: "PROC" },
  { number: 3,  textRu: "Я часто нахожу «более важные» дела вместо того, что действительно нужно сделать", textEn: "I often find 'more important' things to do instead of what actually needs to get done", dimension: "PROC" },
  { number: 4,  textRu: "Я нередко тяну с ответами на письма, звонки или просьбы", textEn: "I often delay responding to messages, calls, or requests", dimension: "PROC" },
  { number: 5,  textRu: "Я начинаю готовиться к важным событиям позже, чем стоило бы", textEn: "I start preparing for important events later than I should", dimension: "PROC" },
  { number: 6,  textRu: "Дедлайн — главный стимул, без него я редко начинаю", textEn: "Deadlines are my main motivator — without them I rarely get started", dimension: "PROC" },
  { number: 7,  textRu: "Я откладываю дела, которые вызывают у меня дискомфорт или тревогу", textEn: "I postpone tasks that make me feel uncomfortable or anxious", dimension: "PROC" },

  // ANXI — Anxiety & Hypercontrol (7)
  { number: 8,  textRu: "Я часто беспокоюсь о вещах, которые ещё не произошли", textEn: "I frequently worry about things that haven't happened yet", dimension: "ANXI" },
  { number: 9,  textRu: "Мне трудно расслабиться, когда что-то идёт не по плану", textEn: "I find it hard to relax when something isn't going according to plan", dimension: "ANXI" },
  { number: 10, textRu: "Я стараюсь контролировать ситуацию даже там, где это невозможно", textEn: "I try to control situations even where it's impossible", dimension: "ANXI" },
  { number: 11, textRu: "Неопределённость вызывает у меня сильный дискомфорт", textEn: "Uncertainty causes me strong discomfort", dimension: "ANXI" },
  { number: 12, textRu: "Я часто прокручиваю в голове прошлые разговоры и ситуации", textEn: "I often replay past conversations and situations in my head", dimension: "ANXI" },
  { number: 13, textRu: "Перед важными событиями я испытываю сильное волнение", textEn: "Before important events I experience strong anxiety", dimension: "ANXI" },
  { number: 14, textRu: "Мне сложно делегировать задачи — проще сделать самому", textEn: "It's hard for me to delegate — it's easier to do things myself", dimension: "ANXI" },

  // CONF — Conflict Avoidance (7)
  { number: 15, textRu: "Я соглашаюсь с людьми, даже если думаю иначе", textEn: "I agree with people even when I think differently", dimension: "CONF" },
  { number: 16, textRu: "Мне трудно говорить «нет», когда меня о чём-то просят", textEn: "I find it hard to say 'no' when someone asks me for something", dimension: "CONF" },
  { number: 17, textRu: "Я избегаю разговоров, которые могут вызвать напряжение", textEn: "I avoid conversations that might create tension", dimension: "CONF" },
  { number: 18, textRu: "Когда кто-то нарушает мои границы, я предпочитаю промолчать", textEn: "When someone crosses my boundaries, I prefer to stay silent", dimension: "CONF" },
  { number: 19, textRu: "Я чувствую вину, когда расстраиваю других людей", textEn: "I feel guilty when I disappoint others", dimension: "CONF" },
  { number: 20, textRu: "Мне важнее сохранить мир, чем отстоять свою точку зрения", textEn: "Keeping the peace matters more to me than defending my point of view", dimension: "CONF" },
  { number: 21, textRu: "Я нередко беру на себя лишнее, потому что не хочу разочаровывать", textEn: "I often take on too much because I don't want to disappoint people", dimension: "CONF" },

  // PERF — Perfectionism (7)
  { number: 22, textRu: "Я откладываю результат, потому что он «ещё не готов»", textEn: "I delay sharing results because they're 'not ready yet'", dimension: "PERF" },
  { number: 23, textRu: "Ошибки — даже незначительные — выбивают меня из колеи", textEn: "Mistakes — even small ones — knock me off track", dimension: "PERF" },
  { number: 24, textRu: "Я критикую себя жёстче, чем любой другой человек мог бы", textEn: "I criticize myself more harshly than anyone else ever could", dimension: "PERF" },
  { number: 25, textRu: "Мне трудно радоваться результату — всегда вижу, что можно было лучше", textEn: "I struggle to enjoy results — I always see what could have been better", dimension: "PERF" },
  { number: 26, textRu: "Мне некомфортно отдавать работу, пока она не доведена до идеала", textEn: "I'm uncomfortable submitting work until it's brought to perfection", dimension: "PERF" },
  { number: 27, textRu: "Я раздражаюсь, когда другие делают что-то не так, как я считаю правильным", textEn: "I get irritated when others do things differently from what I consider correct", dimension: "PERF" },
  { number: 28, textRu: "Страх сделать что-то плохо иногда мешает мне вообще начать", textEn: "Fear of doing something poorly sometimes prevents me from starting at all", dimension: "PERF" },

  // SELF — Self-Sabotage (7)
  { number: 29, textRu: "Когда дела идут хорошо, я иногда начинаю их портить — сам не знаю почему", textEn: "When things are going well, I sometimes start undermining them — I don't know why", dimension: "SELF" },
  { number: 30, textRu: "Я часто убеждаю себя, что «ещё не готов» к новому шагу", textEn: "I often convince myself I'm 'not ready yet' for the next step", dimension: "SELF" },
  { number: 31, textRu: "Я отказываюсь от возможностей, не попробовав", textEn: "I decline opportunities without even trying", dimension: "SELF" },
  { number: 32, textRu: "У меня есть голос внутри, который говорит: «У тебя не получится»", textEn: "I have an inner voice that says: 'You won't be able to do this'", dimension: "SELF" },
  { number: 33, textRu: "Я замечаю, что сам создаю препятствия на пути к своим целям", textEn: "I notice that I create obstacles on the way to my own goals", dimension: "SELF" },
  { number: 34, textRu: "Мне сложно принимать похвалу — кажется, что не заслужил", textEn: "I struggle to accept praise — it feels undeserved", dimension: "SELF" },
  { number: 35, textRu: "Я боюсь успеха не меньше, чем провала", textEn: "I fear success as much as failure", dimension: "SELF" },

  // IMPU — Impulsivity (7)
  { number: 36, textRu: "Я говорю первое, что приходит в голову, и потом жалею", textEn: "I say the first thing that comes to mind and then regret it", dimension: "IMPU" },
  { number: 37, textRu: "Я принимаю решения под влиянием эмоций, а не рассудка", textEn: "I make decisions under the influence of emotions rather than reason", dimension: "IMPU" },
  { number: 38, textRu: "Я трачу деньги или время импульсивно, без раздумий", textEn: "I spend money or time impulsively, without thinking it through", dimension: "IMPU" },
  { number: 39, textRu: "Мне трудно ждать — я хочу результат сейчас", textEn: "I find it hard to wait — I want results now", dimension: "IMPU" },
  { number: 40, textRu: "Я перебиваю людей или заканчиваю их фразы", textEn: "I interrupt people or finish their sentences", dimension: "IMPU" },
  { number: 41, textRu: "Я легко отвлекаюсь и переключаюсь на новые идеи, не завершив старые", textEn: "I easily get distracted and switch to new ideas without finishing old ones", dimension: "IMPU" },
  { number: 42, textRu: "В конфликте я реагирую остро и быстро, а потом остываю", textEn: "In conflicts I react sharply and quickly, then cool down later", dimension: "IMPU" },
];

const SCALE_OPTIONS_RU = [
  { key: "1", text: "Совсем не про меня" },
  { key: "2", text: "Редко" },
  { key: "3", text: "Иногда" },
  { key: "4", text: "Часто" },
  { key: "5", text: "Очень точно" },
];
const SCALE_OPTIONS_EN = [
  { key: "1", text: "Not me at all" },
  { key: "2", text: "Rarely" },
  { key: "3", text: "Sometimes" },
  { key: "4", text: "Often" },
  { key: "5", text: "Very accurate" },
];

export function getShadowQuestions(): (Question & { options: QuestionOption[] })[] {
  return items.map((item, idx) => {
    const options: QuestionOption[] = SCALE_OPTIONS_RU.map((opt, i) => ({
      id: `sh-opt-${item.number}-${opt.key}`,
      question_id: `sh-q-${item.number}`,
      option_key: opt.key,
      text_ru: opt.text,
      text_en: SCALE_OPTIONS_EN[i].text,
      sort_order: parseInt(opt.key),
    }));

    return {
      id: `sh-q-${item.number}`,
      test_id: SHADOW_TEST_ID,
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
      options,
    };
  });
}
