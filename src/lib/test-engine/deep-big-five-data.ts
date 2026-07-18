import { Question, QuestionOption } from "@/types/database";

// Deep Big Five — 80 questions, 5 dimensions × 16 items each
// Facet-level items based on IPIP-NEO adapted for Russian
// Dimensions: O=Openness, C=Conscientiousness, E=Extraversion, A=Agreeableness, N=Neuroticism
// Facets per dimension:
//   N: Anxiety, Hostility, Depression, Self-consciousness, Impulsivity, Vulnerability
//   E: Warmth, Gregariousness, Assertiveness, Activity, Excitement-seeking, Positive emotions
//   O: Fantasy, Aesthetics, Feelings, Actions, Ideas, Values
//   A: Trust, Straightforwardness, Altruism, Compliance, Modesty, Tender-mindedness
//   C: Competence, Order, Dutifulness, Achievement-striving, Self-discipline, Deliberation

interface DeepBigFiveItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "O" | "C" | "E" | "A" | "N";
  facet: string;
  reverse: boolean;
}

const items: DeepBigFiveItem[] = [
  // ─── NEUROTICISM (N) ─── 16 items
  // Anxiety (1-3)
  { number: 1,  textRu: "Я часто прокручиваю в голове тревожные мысли о будущем", textEn: "I often replay anxious thoughts about the future in my mind", dimension: "N", facet: "anxiety", reverse: false },
  { number: 2,  textRu: "Даже небольшие неопределённости вызывают у меня беспокойство", textEn: "Even minor uncertainties make me feel worried", dimension: "N", facet: "anxiety", reverse: false },
  { number: 3,  textRu: "Я редко переживаю из-за того, что может пойти не так", textEn: "I rarely worry about what might go wrong", dimension: "N", facet: "anxiety", reverse: true },
  // Hostile affect (4-6)
  { number: 4,  textRu: "Когда что-то идёт не по плану, меня охватывает раздражение", textEn: "When things don't go as planned, I get irritated", dimension: "N", facet: "hostility", reverse: false },
  { number: 5,  textRu: "Я легко вспыхиваю, когда кто-то нарушает мои ожидания", textEn: "I flare up easily when someone doesn't meet my expectations", dimension: "N", facet: "hostility", reverse: false },
  { number: 6,  textRu: "Даже когда я злюсь, мне удаётся сохранять внешнее спокойствие", textEn: "Even when angry, I manage to keep my composure outwardly", dimension: "N", facet: "hostility", reverse: true },
  // Depression (7-9)
  { number: 7,  textRu: "Временами я чувствую, что ничто не имеет смысла", textEn: "At times I feel that nothing has any meaning", dimension: "N", facet: "depression", reverse: false },
  { number: 8,  textRu: "Я склонен видеть стакан наполовину пустым, а не полным", textEn: "I tend to see the glass as half empty rather than half full", dimension: "N", facet: "depression", reverse: false },
  { number: 9,  textRu: "Я редко испытываю затяжные периоды уныния", textEn: "I rarely experience prolonged periods of gloom", dimension: "N", facet: "depression", reverse: true },
  // Self-consciousness (10-11)
  { number: 10, textRu: "Критика в мой адрес ранит меня сильнее, чем я показываю", textEn: "Criticism aimed at me hurts more than I let on", dimension: "N", facet: "self_consciousness", reverse: false },
  { number: 11, textRu: "В социальных ситуациях я нередко думаю, как меня воспринимают другие", textEn: "In social situations I often think about how others perceive me", dimension: "N", facet: "self_consciousness", reverse: false },
  // Impulsivity (12-13)
  { number: 12, textRu: "Иногда я делаю что-то импульсивно — и потом жалею об этом", textEn: "Sometimes I act impulsively and then regret it", dimension: "N", facet: "impulsivity", reverse: false },
  { number: 13, textRu: "Когда хочется удовольствия прямо сейчас, мне сложно его отложить", textEn: "When I want something pleasurable right now, it's hard for me to delay it", dimension: "N", facet: "impulsivity", reverse: false },
  // Vulnerability (14-16)
  { number: 14, textRu: "Когда всё навалилось сразу, я чувствую себя потерянным", textEn: "When everything piles up at once, I feel lost", dimension: "N", facet: "vulnerability", reverse: false },
  { number: 15, textRu: "Под давлением я легко теряю концентрацию и самообладание", textEn: "Under pressure I easily lose focus and composure", dimension: "N", facet: "vulnerability", reverse: false },
  { number: 16, textRu: "Я хорошо справляюсь даже в напряжённых и непредсказуемых ситуациях", textEn: "I cope well even in tense and unpredictable situations", dimension: "N", facet: "vulnerability", reverse: true },

  // ─── EXTRAVERSION (E) ─── 16 items
  // Warmth (17-18)
  { number: 17, textRu: "Мне искренне интересны жизни других людей — их истории, мечты, переживания", textEn: "I'm genuinely interested in others' lives — their stories, dreams, and feelings", dimension: "E", facet: "warmth", reverse: false },
  { number: 18, textRu: "Мне легко разговаривать с незнакомыми людьми — я быстро чувствую контакт", textEn: "I find it easy to talk to strangers — I quickly feel a connection", dimension: "E", facet: "warmth", reverse: false },
  // Gregariousness (19-20)
  { number: 19, textRu: "Я чувствую себя живым и в своей тарелке в большой компании", textEn: "I feel alive and in my element in a large group", dimension: "E", facet: "gregariousness", reverse: false },
  { number: 20, textRu: "Мне нужно значительно меньше общения, чем большинству людей", textEn: "I need considerably less social interaction than most people", dimension: "E", facet: "gregariousness", reverse: true },
  // Assertiveness (21-22)
  { number: 21, textRu: "Когда в группе нет лидера, я обычно беру инициативу на себя", textEn: "When a group lacks a leader, I usually step up", dimension: "E", facet: "assertiveness", reverse: false },
  { number: 22, textRu: "Я уверенно отстаиваю свою позицию, даже если она непопулярна", textEn: "I confidently stand my ground even when my view is unpopular", dimension: "E", facet: "assertiveness", reverse: false },
  // Activity (23-24)
  { number: 23, textRu: "Я предпочитаю быстрый темп жизни — мне нравится, когда всё кипит", textEn: "I prefer a fast pace of life — I like when things are buzzing", dimension: "E", facet: "activity", reverse: false },
  { number: 24, textRu: "Я нахожу спокойный, неспешный ритм жизни более комфортным", textEn: "I find a slow, unhurried rhythm of life more comfortable", dimension: "E", facet: "activity", reverse: true },
  // Excitement seeking (25-26)
  { number: 25, textRu: "Мне нравятся виды деятельности с элементом риска или остроты ощущений", textEn: "I enjoy activities with an element of risk or thrill", dimension: "E", facet: "excitement_seeking", reverse: false },
  { number: 26, textRu: "Рутина и предсказуемость быстро начинают меня угнетать", textEn: "Routine and predictability quickly start to oppress me", dimension: "E", facet: "excitement_seeking", reverse: false },
  // Positive emotions (27-30)
  { number: 27, textRu: "Я часто испытываю подъём и воодушевление без особого повода", textEn: "I often feel uplifted and enthusiastic without a particular reason", dimension: "E", facet: "positive_emotions", reverse: false },
  { number: 28, textRu: "Мне легко смеяться — я нахожу юмор почти во всём", textEn: "I find it easy to laugh — I see humor in almost everything", dimension: "E", facet: "positive_emotions", reverse: false },
  { number: 29, textRu: "После долгого общения мне нужно побыть одному, чтобы восстановиться", textEn: "After long social interaction I need alone time to recover", dimension: "E", facet: "positive_emotions", reverse: true },
  { number: 30, textRu: "Я предпочитаю провести выходные в тишине, а не среди людей", textEn: "I prefer spending the weekend in quiet solitude rather than among people", dimension: "E", facet: "positive_emotions", reverse: true },
  { number: 31, textRu: "Я чувствую себя «заряженным» после насыщенного дня в обществе других людей", textEn: "I feel energised after a full day spent with others", dimension: "E", facet: "warmth", reverse: false },
  { number: 32, textRu: "Я предпочитаю наблюдать за происходящим, а не быть в центре событий", textEn: "I prefer observing events rather than being at the center of them", dimension: "E", facet: "gregariousness", reverse: true },

  // ─── OPENNESS (O) ─── 16 items
  // Fantasy (33-34)
  { number: 33, textRu: "У меня богатое воображение — я легко создаю целые миры в уме", textEn: "I have a rich imagination — I easily create entire worlds in my mind", dimension: "O", facet: "fantasy", reverse: false },
  { number: 34, textRu: "Мечты и фантазии занимают значительное место в моей жизни", textEn: "Daydreams and fantasies occupy a significant place in my life", dimension: "O", facet: "fantasy", reverse: false },
  // Aesthetics (35-36)
  { number: 35, textRu: "Меня трогает красота — будь то закат, музыка или строчка стихов", textEn: "I am moved by beauty — whether a sunset, music, or a line of poetry", dimension: "O", facet: "aesthetics", reverse: false },
  { number: 36, textRu: "Я замечаю эстетику в повседневных вещах — форме, цвете, звуке", textEn: "I notice aesthetics in everyday things — shapes, colors, sounds", dimension: "O", facet: "aesthetics", reverse: false },
  // Feelings (37-38)
  { number: 37, textRu: "Я глубоко переживаю эмоции — мои или персонажей книг и фильмов", textEn: "I experience emotions deeply — my own or those of characters in books and films", dimension: "O", facet: "feelings", reverse: false },
  { number: 38, textRu: "Мне интересно разбираться в собственных эмоциях и их источниках", textEn: "I'm interested in understanding my own emotions and their sources", dimension: "O", facet: "feelings", reverse: false },
  // Actions (39-40)
  { number: 39, textRu: "Я охотно пробую новые вещи — блюда, места, занятия, пути", textEn: "I readily try new things — food, places, activities, routes", dimension: "O", facet: "actions", reverse: false },
  { number: 40, textRu: "Предсказуемость и привычный распорядок мне ближе, чем перемены", textEn: "Predictability and familiar routines suit me more than change", dimension: "O", facet: "actions", reverse: true },
  // Ideas (41-43)
  { number: 41, textRu: "Мне нравятся сложные философские или научные вопросы — даже без ответа", textEn: "I enjoy complex philosophical or scientific questions — even without answers", dimension: "O", facet: "ideas", reverse: false },
  { number: 42, textRu: "Я читаю и изучаю темы, которые никак не связаны с моей работой", textEn: "I read and explore topics entirely unrelated to my work", dimension: "O", facet: "ideas", reverse: false },
  { number: 43, textRu: "Меня больше интересуют конкретные факты, чем теоретические концепции", textEn: "I'm more interested in concrete facts than theoretical concepts", dimension: "O", facet: "ideas", reverse: true },
  // Values (44-48)
  { number: 44, textRu: "Я не боюсь пересматривать свои убеждения, если нахожу более точные", textEn: "I'm not afraid to revise my beliefs when I find more accurate ones", dimension: "O", facet: "values", reverse: false },
  { number: 45, textRu: "Я уважаю право людей иметь ценности, отличные от моих", textEn: "I respect people's right to hold values different from mine", dimension: "O", facet: "values", reverse: false },
  { number: 46, textRu: "Мне неинтересны абстрактные и умозрительные рассуждения", textEn: "I'm not interested in abstract or speculative reasoning", dimension: "O", facet: "ideas", reverse: true },
  { number: 47, textRu: "Искусство, поэзия и музыка вызывают у меня слабый отклик", textEn: "Art, poetry, and music evoke little response in me", dimension: "O", facet: "aesthetics", reverse: true },
  { number: 48, textRu: "Я редко задумываюсь над большими жизненными вопросами", textEn: "I rarely reflect on life's big questions", dimension: "O", facet: "values", reverse: true },

  // ─── AGREEABLENESS (A) ─── 16 items
  // Trust (49-50)
  { number: 49, textRu: "Я склонен считать людей добросовестными, пока не доказано обратное", textEn: "I tend to consider people trustworthy until proven otherwise", dimension: "A", facet: "trust", reverse: false },
  { number: 50, textRu: "Я редко подозреваю людей в скрытых мотивах", textEn: "I rarely suspect people of hidden motives", dimension: "A", facet: "trust", reverse: false },
  // Straightforwardness (51-52)
  { number: 51, textRu: "Я говорю прямо, что думаю, не юля и не уходя в сторону", textEn: "I say directly what I think without beating around the bush", dimension: "A", facet: "straightforwardness", reverse: false },
  { number: 52, textRu: "Я не стану говорить одно, думая совсем другое", textEn: "I won't say one thing while thinking something entirely different", dimension: "A", facet: "straightforwardness", reverse: false },
  // Altruism (53-54)
  { number: 53, textRu: "Мне доставляет искреннее удовольствие помогать другим — без ожидания чего-то взамен", textEn: "I take genuine pleasure in helping others — without expecting anything in return", dimension: "A", facet: "altruism", reverse: false },
  { number: 54, textRu: "Я думаю о потребностях окружающих так же, как о своих собственных", textEn: "I think about others' needs as much as my own", dimension: "A", facet: "altruism", reverse: false },
  // Compliance (55-56)
  { number: 55, textRu: "Я предпочту уступить, чем затевать долгий спор", textEn: "I'd rather give in than start a long argument", dimension: "A", facet: "compliance", reverse: false },
  { number: 56, textRu: "Когда кто-то меня обижает, я стараюсь не отвечать тем же", textEn: "When someone offends me, I try not to respond in kind", dimension: "A", facet: "compliance", reverse: false },
  // Modesty (57-58)
  { number: 57, textRu: "Мне некомфортно выставлять напоказ свои достижения", textEn: "I feel uncomfortable showing off my achievements", dimension: "A", facet: "modesty", reverse: false },
  { number: 58, textRu: "Я признаю свои ошибки открыто, не ища оправданий", textEn: "I openly acknowledge my mistakes without making excuses", dimension: "A", facet: "modesty", reverse: false },
  // Tender-mindedness (59-64)
  { number: 59, textRu: "Страдания других людей меня глубоко трогают", textEn: "The suffering of others affects me deeply", dimension: "A", facet: "tender_mindedness", reverse: false },
  { number: 60, textRu: "Мне жаль тех, кто оказался в тяжёлой ситуации, даже если это их вина", textEn: "I feel sorry for those in a tough situation even if it's their own fault", dimension: "A", facet: "tender_mindedness", reverse: false },
  { number: 61, textRu: "Я ставлю свои интересы выше интересов других людей", textEn: "I put my own interests above those of others", dimension: "A", facet: "altruism", reverse: true },
  { number: 62, textRu: "Мне проще критиковать людей, чем находить в них хорошее", textEn: "I find it easier to criticize people than to see the good in them", dimension: "A", facet: "trust", reverse: true },
  { number: 63, textRu: "Просьбы о помощи в неудобное время меня раздражают", textEn: "Requests for help at inconvenient times irritate me", dimension: "A", facet: "tender_mindedness", reverse: true },
  { number: 64, textRu: "Я считаю, что большинство людей думают прежде всего о себе", textEn: "I believe most people are primarily looking out for themselves", dimension: "A", facet: "trust", reverse: true },

  // ─── CONSCIENTIOUSNESS (C) ─── 16 items
  // Competence (65-66)
  { number: 65, textRu: "Я уверен в своей способности справляться со сложными задачами", textEn: "I'm confident in my ability to handle difficult tasks", dimension: "C", facet: "competence", reverse: false },
  { number: 66, textRu: "Как правило, я доделываю то, за что берусь", textEn: "I generally follow through on what I take on", dimension: "C", facet: "competence", reverse: false },
  // Order (67-68)
  { number: 67, textRu: "Мои вещи и рабочее место обычно в порядке — всё лежит на своём месте", textEn: "My belongings and workspace are usually tidy — everything has its place", dimension: "C", facet: "order", reverse: false },
  { number: 68, textRu: "Беспорядок вокруг меня снижает мою эффективность и раздражает", textEn: "Disorder around me reduces my efficiency and irritates me", dimension: "C", facet: "order", reverse: false },
  // Dutifulness (69-70)
  { number: 69, textRu: "Я выполняю обязательства, даже когда это стоит мне усилий", textEn: "I fulfil my commitments even when it costs me effort", dimension: "C", facet: "dutifulness", reverse: false },
  { number: 70, textRu: "Я считаю важным быть надёжным — чтобы на меня можно было рассчитывать", textEn: "I think it's important to be dependable — someone others can count on", dimension: "C", facet: "dutifulness", reverse: false },
  // Achievement striving (71-72)
  { number: 71, textRu: "У меня есть конкретные цели, к которым я систематически иду", textEn: "I have specific goals I'm working toward systematically", dimension: "C", facet: "achievement_striving", reverse: false },
  { number: 72, textRu: "Мне важно совершенствоваться в том, что я делаю", textEn: "It matters to me to keep improving at what I do", dimension: "C", facet: "achievement_striving", reverse: false },
  // Self-discipline (73-74)
  { number: 73, textRu: "Я способен заставить себя работать без внешнего давления или дедлайна", textEn: "I can make myself work without external pressure or deadlines", dimension: "C", facet: "self_discipline", reverse: false },
  { number: 74, textRu: "Я не откладываю дела надолго — предпочитаю закрывать их вовремя", textEn: "I don't put things off long — I prefer to close them on time", dimension: "C", facet: "self_discipline", reverse: false },
  // Deliberation (75-80)
  { number: 75, textRu: "Я обдумываю важные решения, прежде чем действовать", textEn: "I think through important decisions before acting", dimension: "C", facet: "deliberation", reverse: false },
  { number: 76, textRu: "Я редко говорю что-то такое, о чём потом сожалею", textEn: "I rarely say something I later regret", dimension: "C", facet: "deliberation", reverse: false },
  { number: 77, textRu: "Мне сложно придерживаться расписания — я часто отступаю от плана", textEn: "I find it hard to stick to a schedule — I often deviate from the plan", dimension: "C", facet: "self_discipline", reverse: true },
  { number: 78, textRu: "Я часто начинаю новые проекты, не завершив предыдущие", textEn: "I often start new projects without finishing previous ones", dimension: "C", facet: "achievement_striving", reverse: true },
  { number: 79, textRu: "Я выполняю работу кое-как, лишь бы сдать", textEn: "I do work haphazardly, just to get it done", dimension: "C", facet: "competence", reverse: true },
  { number: 80, textRu: "Беспорядок в делах и вещах — моё обычное состояние", textEn: "Disorder in my affairs and belongings is my usual state", dimension: "C", facet: "order", reverse: true },
];

// Sort by question number for linear flow
const sortedItems = [...items].sort((a, b) => a.number - b.number);

export const DEEP_BIG_FIVE_TEST_ID = "deep-big-five";

export const deepBigFiveTestMeta = {
  id: DEEP_BIG_FIVE_TEST_ID,
  slug: "deep-big-five",
  nameRu: "Глубокий Big Five (80 вопросов)",
  nameEn: "Deep Big Five (80 questions)",
  descriptionRu:
    "Расширенная версия теста личности: 80 поведенческих вопросов, охватывающих 6 граней каждой из пяти черт. Глубже обычного — точнее результат.",
  descriptionEn:
    "Extended personality test: 80 behavioral questions covering 6 facets of each of the five traits. More thorough than the standard — more accurate result.",
  methodology: "IPIP-NEO adapted (80 items, facet-level)",
  estimatedMinutes: 20,
  questionCount: 80,
  category: "psychology",
};

export const deepBigFiveDimensions = {
  O: {
    nameRu: "Открытость опыту",
    nameEn: "Openness to Experience",
    descHighRu: "Вы любопытны, обладаете богатым воображением и открыты новому. Цените красоту, глубоко переживаете эмоции и охотно пересматриваете убеждения. Вам комфортно с неопределённостью и абстракцией.",
    descHighEn: "You are curious, imaginative, and open to new experiences. You appreciate beauty, feel emotions deeply, and willingly revise your beliefs. You're comfortable with uncertainty and abstraction.",
    descLowRu: "Вы практичны и предпочитаете конкретное абстрактному. Привычное и проверенное дают вам надёжность. Вы цените стабильность и прямолинейность.",
    descLowEn: "You are practical and prefer the concrete over the abstract. The familiar and proven give you reliability. You value stability and straightforwardness.",
    color: "#8B5CF6",
    facets: {
      fantasy: { nameRu: "Фантазия", nameEn: "Fantasy" },
      aesthetics: { nameRu: "Эстетика", nameEn: "Aesthetics" },
      feelings: { nameRu: "Чувства", nameEn: "Feelings" },
      actions: { nameRu: "Открытость действиям", nameEn: "Openness to Actions" },
      ideas: { nameRu: "Интеллектуальное любопытство", nameEn: "Intellectual Curiosity" },
      values: { nameRu: "Гибкость убеждений", nameEn: "Openness to Values" },
    },
  },
  C: {
    nameRu: "Добросовестность",
    nameEn: "Conscientiousness",
    descHighRu: "Вы организованны, надёжны и целеустремлённы. Доводите дела до конца, умеете планировать и действуете обдуманно. Окружающие могут на вас рассчитывать.",
    descHighEn: "You are organized, dependable, and goal-oriented. You see things through, plan well, and act deliberately. Others can count on you.",
    descLowRu: "Вы спонтанны и гибки, но можете испытывать трудности с организацией, планированием и выполнением долгосрочных обязательств.",
    descLowEn: "You are spontaneous and flexible but may struggle with organization, planning, and following through on long-term commitments.",
    color: "#3B82F6",
    facets: {
      competence: { nameRu: "Компетентность", nameEn: "Competence" },
      order: { nameRu: "Порядок", nameEn: "Order" },
      dutifulness: { nameRu: "Обязательность", nameEn: "Dutifulness" },
      achievement_striving: { nameRu: "Целеустремлённость", nameEn: "Achievement Striving" },
      self_discipline: { nameRu: "Самодисциплина", nameEn: "Self-Discipline" },
      deliberation: { nameRu: "Обдуманность", nameEn: "Deliberation" },
    },
  },
  E: {
    nameRu: "Экстраверсия",
    nameEn: "Extraversion",
    descHighRu: "Вы энергичны, общительны и оптимистичны. Черпаете энергию из общения, любите быть среди людей и легко зажигаете других своим энтузиазмом.",
    descHighEn: "You are energetic, sociable, and optimistic. You draw energy from interaction, enjoy being around people, and easily ignite enthusiasm in others.",
    descLowRu: "Вы интроверт — предпочитаете глубину общению ширину. Черпаете энергию в одиночестве, ценить уединение и тишину.",
    descLowEn: "You are introverted — you prefer depth over breadth in social life. You recharge alone, and value solitude and quiet.",
    color: "#F59E0B",
    facets: {
      warmth: { nameRu: "Теплота", nameEn: "Warmth" },
      gregariousness: { nameRu: "Общительность", nameEn: "Gregariousness" },
      assertiveness: { nameRu: "Напористость", nameEn: "Assertiveness" },
      activity: { nameRu: "Активность", nameEn: "Activity" },
      excitement_seeking: { nameRu: "Поиск острых ощущений", nameEn: "Excitement Seeking" },
      positive_emotions: { nameRu: "Позитивные эмоции", nameEn: "Positive Emotions" },
    },
  },
  A: {
    nameRu: "Дружелюбие",
    nameEn: "Agreeableness",
    descHighRu: "Вы добры, отзывчивы и готовы к сотрудничеству. Доверяете людям, склонны уступать ради мира и искренне заботитесь о других. Сочувствие — одна из ваших сильных сторон.",
    descHighEn: "You are kind, empathetic, and cooperative. You trust people, tend to yield for the sake of harmony, and genuinely care about others. Compassion is one of your strengths.",
    descLowRu: "Вы независимы, критичны и прямолинейны. Ставите свои интересы выше, не боитесь спорить и скептически относитесь к чужим мотивам.",
    descLowEn: "You are independent, critical, and direct. You prioritize your own interests, don't shy away from disagreement, and are skeptical of others' motives.",
    color: "#10B981",
    facets: {
      trust: { nameRu: "Доверие", nameEn: "Trust" },
      straightforwardness: { nameRu: "Прямота", nameEn: "Straightforwardness" },
      altruism: { nameRu: "Альтруизм", nameEn: "Altruism" },
      compliance: { nameRu: "Мягкость в конфликтах", nameEn: "Compliance" },
      modesty: { nameRu: "Скромность", nameEn: "Modesty" },
      tender_mindedness: { nameRu: "Сочувствие", nameEn: "Tender-mindedness" },
    },
  },
  N: {
    nameRu: "Нейротизм",
    nameEn: "Neuroticism",
    descHighRu: "Вы эмоционально чувствительны — ярко реагируете на стресс, тревогу и негативные переживания. Это делает вас тонким и восприимчивым, но требует осознанной работы с эмоциями.",
    descHighEn: "You are emotionally sensitive — you react strongly to stress, anxiety, and negative experiences. This makes you perceptive and empathetic, but requires conscious emotional management.",
    descLowRu: "Вы эмоционально стабильны — стрессоустойчивы, редко тревожитесь и быстро восстанавливаетесь. Это ценная основа для уверенного движения вперёд.",
    descLowEn: "You are emotionally stable — resilient to stress, rarely anxious, and quick to recover. This is a valuable foundation for confident forward movement.",
    color: "#EF4444",
    facets: {
      anxiety: { nameRu: "Тревожность", nameEn: "Anxiety" },
      hostility: { nameRu: "Вспыльчивость", nameEn: "Angry Hostility" },
      depression: { nameRu: "Склонность к унынию", nameEn: "Depression" },
      self_consciousness: { nameRu: "Застенчивость", nameEn: "Self-Consciousness" },
      impulsivity: { nameRu: "Импульсивность", nameEn: "Impulsivity" },
      vulnerability: { nameRu: "Уязвимость", nameEn: "Vulnerability" },
    },
  },
};

export function getDeepBigFiveQuestions(): (Question & { options: QuestionOption[] })[] {
  return sortedItems.map((item, idx) => ({
    id: `dbf-q-${item.number}`,
    test_id: DEEP_BIG_FIVE_TEST_ID,
    question_number: idx + 1,
    text_ru: item.textRu,
    text_en: item.textEn,
    type: "scale" as const,
    depth_level: 2,
    scale_min: 1,
    scale_max: 5,
    scale_min_label_ru: "Совершенно не согласен",
    scale_min_label_en: "Strongly disagree",
    scale_max_label_ru: "Полностью согласен",
    scale_max_label_en: "Strongly agree",
    is_required: true,
    branch_logic: null,
    scoring_key: {
      dimension: item.dimension,
      facet: item.facet,
      reverse: item.reverse,
    },
    metadata: null,
    created_at: new Date().toISOString(),
    options: [
      { id: `dbf-o-${item.number}-1`, question_id: `dbf-q-${item.number}`, option_key: "1", text_ru: "Совершенно не согласен", text_en: "Strongly disagree", sort_order: 0 },
      { id: `dbf-o-${item.number}-2`, question_id: `dbf-q-${item.number}`, option_key: "2", text_ru: "Скорее не согласен", text_en: "Disagree", sort_order: 1 },
      { id: `dbf-o-${item.number}-3`, question_id: `dbf-q-${item.number}`, option_key: "3", text_ru: "Нейтрально", text_en: "Neutral", sort_order: 2 },
      { id: `dbf-o-${item.number}-4`, question_id: `dbf-q-${item.number}`, option_key: "4", text_ru: "Скорее согласен", text_en: "Agree", sort_order: 3 },
      { id: `dbf-o-${item.number}-5`, question_id: `dbf-q-${item.number}`, option_key: "5", text_ru: "Полностью согласен", text_en: "Strongly agree", sort_order: 4 },
    ],
  }));
}
