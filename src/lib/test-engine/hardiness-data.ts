import { Question, QuestionOption } from "@/types/database";

// Hardiness / Resilience — адаптация шкалы Кобасы + современные пункты
// 3 измерения: COMMIT (вовлечённость/смысл), CONTROL (контроль/влияние), CHALLENGE (вызов/рост)
// 30 вопросов, 10 на измерение, scale 1-5

interface HardinessItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "COMMIT" | "CONTROL" | "CHALLENGE";
  reverse: boolean;
}

const items: HardinessItem[] = [
  // COMMIT — вовлечённость, смысл, присутствие
  { number: 1,  textRu: "Даже в трудные времена я нахожу смысл в том, чем занимаюсь", textEn: "Even in tough times I find meaning in what I do", dimension: "COMMIT", reverse: false },
  { number: 2,  textRu: "Я редко испытываю скуку — почти всегда нахожу что-то интересное", textEn: "I rarely feel bored — I almost always find something interesting", dimension: "COMMIT", reverse: false },
  { number: 3,  textRu: "Я чувствую себя причастным к чему-то большему, чем просто повседневные дела", textEn: "I feel connected to something larger than just everyday tasks", dimension: "COMMIT", reverse: false },
  { number: 4,  textRu: "Я полностью присутствую в том, что делаю — не витаю мыслями где-то ещё", textEn: "I'm fully present in what I do — my mind doesn't wander elsewhere", dimension: "COMMIT", reverse: false },
  { number: 5,  textRu: "Мои отношения с близкими придают мне силу в трудных ситуациях", textEn: "My relationships with loved ones give me strength in difficult situations", dimension: "COMMIT", reverse: false },
  { number: 6,  textRu: "Я легко теряю интерес к делам — они кажутся бессмысленными", textEn: "I easily lose interest in things — they seem pointless", dimension: "COMMIT", reverse: true },
  { number: 7,  textRu: "У меня есть чёткое понимание того, ради чего я живу и работаю", textEn: "I have a clear understanding of what I live and work for", dimension: "COMMIT", reverse: false },
  { number: 8,  textRu: "Когда всё плохо, мне сложно найти что-то, что придаёт смысл происходящему", textEn: "When things are bad, I struggle to find anything that gives meaning to what's happening", dimension: "COMMIT", reverse: true },
  { number: 9,  textRu: "Я вовлекаюсь в дела с искренним интересом — не просто выполняю функцию", textEn: "I engage with things with genuine interest — not just performing a function", dimension: "COMMIT", reverse: false },
  { number: 10, textRu: "Ощущение пустоты и бесцельности — знакомое мне состояние", textEn: "A sense of emptiness and purposelessness is a familiar state for me", dimension: "COMMIT", reverse: true },

  // CONTROL — ощущение влияния, активная позиция
  { number: 11, textRu: "Я верю, что могу повлиять на исход большинства ситуаций", textEn: "I believe I can influence the outcome of most situations", dimension: "CONTROL", reverse: false },
  { number: 12, textRu: "Когда что-то идёт не так, я ищу, что именно я могу изменить", textEn: "When something goes wrong, I look for what exactly I can change", dimension: "CONTROL", reverse: false },
  { number: 13, textRu: "Я предпочитаю действовать, а не ждать, пока ситуация разрешится сама", textEn: "I prefer to act rather than wait for the situation to resolve itself", dimension: "CONTROL", reverse: false },
  { number: 14, textRu: "Даже в сложных обстоятельствах я нахожу пространство для манёвра", textEn: "Even in difficult circumstances I find room to maneuver", dimension: "CONTROL", reverse: false },
  { number: 15, textRu: "Когда я сталкиваюсь с проблемой, я чувствую себя беспомощным", textEn: "When I face a problem, I feel helpless", dimension: "CONTROL", reverse: true },
  { number: 16, textRu: "Я понимаю, что не всё в моей власти — но сосредотачиваюсь на том, что могу изменить", textEn: "I know not everything is within my power — but I focus on what I can change", dimension: "CONTROL", reverse: false },
  { number: 17, textRu: "В сложных ситуациях я жду, пока кто-то другой примет решение или что-то изменится", textEn: "In tough situations I wait for someone else to decide or something to change", dimension: "CONTROL", reverse: true },
  { number: 18, textRu: "Я доверяю своей способности справиться с большинством трудностей", textEn: "I trust my ability to handle most difficulties", dimension: "CONTROL", reverse: false },
  { number: 19, textRu: "Стресс меня парализует — я теряю способность действовать", textEn: "Stress paralyzes me — I lose the ability to act", dimension: "CONTROL", reverse: true },
  { number: 20, textRu: "Я активно ищу решения, а не пассивно жду улучшений", textEn: "I actively seek solutions rather than passively waiting for improvement", dimension: "CONTROL", reverse: false },

  // CHALLENGE — принятие изменений как роста
  { number: 21, textRu: "Трудности и перемены — это возможность узнать о себе что-то новое", textEn: "Difficulties and changes are an opportunity to learn something new about myself", dimension: "CHALLENGE", reverse: false },
  { number: 22, textRu: "Я воспринимаю стрессовые события как вызов, а не как угрозу", textEn: "I perceive stressful events as a challenge, not a threat", dimension: "CHALLENGE", reverse: false },
  { number: 23, textRu: "Я не боюсь перемен — они скорее интересны мне, чем пугают", textEn: "I'm not afraid of change — it's more interesting to me than scary", dimension: "CHALLENGE", reverse: false },
  { number: 24, textRu: "После трудного периода я чаще всего выхожу более сильным", textEn: "After a difficult period I most often come out stronger", dimension: "CHALLENGE", reverse: false },
  { number: 25, textRu: "Нестабильность и неопределённость меня тревожат и утомляют", textEn: "Instability and uncertainty make me anxious and tired", dimension: "CHALLENGE", reverse: true },
  { number: 26, textRu: "Я использую ошибки и провалы как источник информации для роста", textEn: "I use mistakes and failures as a source of information for growth", dimension: "CHALLENGE", reverse: false },
  { number: 27, textRu: "Когда привычный порядок нарушается, я теряюсь и не знаю, как двигаться дальше", textEn: "When the familiar order is disrupted, I get lost and don't know how to move forward", dimension: "CHALLENGE", reverse: true },
  { number: 28, textRu: "Я ищу уроки даже в самых тяжёлых ситуациях", textEn: "I look for lessons even in the most difficult situations", dimension: "CHALLENGE", reverse: false },
  { number: 29, textRu: "Перемены в жизни — это скорее потеря, чем возможность", textEn: "Changes in life are more of a loss than an opportunity", dimension: "CHALLENGE", reverse: true },
  { number: 30, textRu: "Трудный опыт делает меня более живым и глубоким — не только ранит", textEn: "Difficult experience makes me more alive and deeper — not just hurts", dimension: "CHALLENGE", reverse: false },
];

const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const HARDINESS_TEST_ID = "hardiness";

export const hardinessTestMeta = {
  id: HARDINESS_TEST_ID,
  slug: "hardiness",
  nameRu: "Жизнестойкость",
  nameEn: "Hardiness & Resilience",
  descriptionRu: "Насколько вы устойчивы к стрессу и трудностям? Тест измеряет три ключевых качества: смысл и вовлечённость, ощущение контроля и способность воспринимать трудности как рост.",
  descriptionEn: "How resilient are you to stress and adversity? The test measures three key qualities: meaning and commitment, sense of control, and ability to see difficulties as growth.",
  methodology: "Kobasa Hardiness Scale adapted",
  estimatedMinutes: 7,
  questionCount: 30,
  category: "psychology",
};

export const hardinessDimensions = {
  COMMIT: {
    nameRu: "Вовлечённость",
    nameEn: "Commitment",
    color: "#8B5CF6",
    descHighRu: "Вы умеете находить смысл и ценность в том, чем занимаетесь — даже в трудные периоды. Высокая вовлечённость защищает от апатии и выгорания: когда есть смысл, стресс переносится легче. Вы присутствуете в своей жизни, а не наблюдаете её со стороны.",
    descHighEn: "You find meaning and value in what you do — even in difficult periods. High commitment protects against apathy and burnout: when there's meaning, stress is easier to bear. You're present in your life, not observing it from the sidelines.",
    descLowRu: "Смысл и вовлечённость сейчас выражены слабее — возможно, вы переживаете период усталости или потери ориентиров. Это сигнал поискать то, что по-настоящему важно.",
    descLowEn: "Meaning and commitment are currently less pronounced — you may be going through a period of fatigue or lost direction. This is a signal to search for what truly matters.",
  },
  CONTROL: {
    nameRu: "Контроль",
    nameEn: "Control",
    color: "#3B82F6",
    descHighRu: "Вы активная позиция: в трудных ситуациях вы ищете, что можете изменить, а не ждёте пока «само пройдёт». Это мощный ресурс стрессоустойчивости. Важно сочетать это с принятием того, что действительно вне вашей власти.",
    descHighEn: "You take an active stance: in difficult situations you look for what you can change rather than waiting for things to resolve themselves. This is a powerful resilience resource. It's important to combine this with accepting what is truly beyond your power.",
    descLowRu: "Ощущение контроля выражено слабее — в трудных ситуациях вы склонны чувствовать себя беспомощным или пассивно ждать. Это зона, где можно существенно укрепить ресурс.",
    descLowEn: "Sense of control is less pronounced — in difficult situations you tend to feel helpless or passively wait. This is an area where you can significantly strengthen your resource.",
  },
  CHALLENGE: {
    nameRu: "Принятие вызова",
    nameEn: "Challenge",
    color: "#10B981",
    descHighRu: "Вы умеете видеть в трудностях и переменах возможность для роста, а не только угрозу. Это не значит, что вам не бывает больно — это значит, что боль не останавливает вас, а учит. Такой взгляд — один из главных факторов долгосрочной устойчивости.",
    descHighEn: "You're able to see in difficulties and changes an opportunity for growth, not just a threat. This doesn't mean you don't feel pain — it means pain doesn't stop you, it teaches you. This perspective is one of the main factors of long-term resilience.",
    descLowRu: "Принятие вызова выражено слабее — перемены и трудности скорее пугают, чем вдохновляют. Развитие этого качества значительно повышает стрессоустойчивость.",
    descLowEn: "Challenge orientation is less pronounced — changes and difficulties tend to frighten rather than inspire. Developing this quality significantly increases stress resilience.",
  },
};

export function getHardinessQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `hrd-q-${item.number}`,
    test_id: HARDINESS_TEST_ID,
    question_number: idx + 1,
    text_ru: item.textRu,
    text_en: item.textEn,
    type: "scale" as const,
    depth_level: 1,
    scale_min: 1,
    scale_max: 5,
    scale_min_label_ru: "Совершенно не согласен",
    scale_min_label_en: "Strongly disagree",
    scale_max_label_ru: "Полностью согласен",
    scale_max_label_en: "Strongly agree",
    is_required: true,
    branch_logic: null,
    scoring_key: { dimension: item.dimension, reverse: item.reverse },
    metadata: null,
    created_at: new Date().toISOString(),
    options: [
      { id: `hrd-o-${item.number}-1`, question_id: `hrd-q-${item.number}`, option_key: "1", text_ru: "Совершенно не согласен", text_en: "Strongly disagree", sort_order: 0 },
      { id: `hrd-o-${item.number}-2`, question_id: `hrd-q-${item.number}`, option_key: "2", text_ru: "Скорее не согласен", text_en: "Disagree", sort_order: 1 },
      { id: `hrd-o-${item.number}-3`, question_id: `hrd-q-${item.number}`, option_key: "3", text_ru: "Нейтрально", text_en: "Neutral", sort_order: 2 },
      { id: `hrd-o-${item.number}-4`, question_id: `hrd-q-${item.number}`, option_key: "4", text_ru: "Скорее согласен", text_en: "Agree", sort_order: 3 },
      { id: `hrd-o-${item.number}-5`, question_id: `hrd-q-${item.number}`, option_key: "5", text_ru: "Полностью согласен", text_en: "Strongly agree", sort_order: 4 },
    ],
  }));
}
