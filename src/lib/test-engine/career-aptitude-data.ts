import { Question, QuestionOption } from "@/types/database";

// Career Aptitude Test — 6 dimensions, 8 questions each, scale 1-5
// LEAD=Leadership, ANAL=Analytical, CREA=Creative, TECH=Technical, PEOP=People, ENTR=Entrepreneurial

export const CAREER_APTITUDE_TEST_ID = "career-aptitude";

export const careerAptitudeTestMeta = {
  id: CAREER_APTITUDE_TEST_ID,
  slug: "career-aptitude",
  nameRu: "Карьерная предрасположенность",
  nameEn: "Career Aptitude",
  descriptionRu: "Узнайте, к какой профессиональной роли вы предрасположены. 6 ключевых направлений: лидерство, аналитика, творчество, технологии, работа с людьми, предпринимательство.",
  descriptionEn: "Discover which professional role suits you best. 6 key directions: leadership, analytics, creativity, technology, people work, entrepreneurship.",
  methodology: "Multi-dimensional career aptitude assessment",
  estimatedMinutes: 10,
  questionCount: 48,
  category: "career",
};

export const careerAptitudeDimensions: Record<string, {
  nameRu: string; nameEn: string; color: string;
  descHighRu: string; descHighEn: string;
  descLowRu: string; descLowEn: string;
  rolesRu: string[]; rolesEn: string[];
}> = {
  LEAD: {
    nameRu: "Лидерство",
    nameEn: "Leadership",
    color: "#f59e0b",
    descHighRu: "Вы прирождённый лидер — умеете вдохновлять, принимать решения и брать ответственность за команду. Вам подойдут роли, где нужно направлять людей и строить системы.",
    descHighEn: "You are a natural leader — you inspire, make decisions, and take responsibility for your team. Roles that direct people and build systems suit you well.",
    descLowRu: "Вы предпочитаете работать самостоятельно или в составе команды, не беря на себя управленческих функций. Это нормально и даёт свободу фокусироваться на деле.",
    descLowEn: "You prefer to work independently or as part of a team without management responsibilities. This is perfectly fine and gives you freedom to focus on the work itself.",
    rolesRu: ["Руководитель отдела", "Проект-менеджер", "Предприниматель", "Тимлид", "Директор"],
    rolesEn: ["Department Manager", "Project Manager", "Entrepreneur", "Team Lead", "Director"],
  },
  ANAL: {
    nameRu: "Аналитика",
    nameEn: "Analytics",
    color: "#3b82f6",
    descHighRu: "Ваш конёк — работа с данными, поиск закономерностей и системное мышление. Вы принимаете решения на основе фактов и глубоко погружаетесь в детали.",
    descHighEn: "Your strength is working with data, finding patterns, and systems thinking. You make fact-based decisions and dive deep into the details.",
    descLowRu: "Скрупулёзная работа с цифрами — не ваша стихия. Вы больше ориентированы на людей, идеи или действие, чем на анализ данных.",
    descLowEn: "Meticulous work with numbers isn't your forte. You're more oriented toward people, ideas, or action than data analysis.",
    rolesRu: ["Аналитик данных", "Финансист", "Исследователь", "Экономист", "Стратег", "Аудитор"],
    rolesEn: ["Data Analyst", "Financial Analyst", "Researcher", "Economist", "Strategist", "Auditor"],
  },
  CREA: {
    nameRu: "Творчество",
    nameEn: "Creativity",
    color: "#8b5cf6",
    descHighRu: "Вы мыслите нестандартно и создаёте новое — будь то визуальные образы, тексты, идеи или концепции. Вам важна самовыражение и эстетика результата.",
    descHighEn: "You think outside the box and create new things — visual images, texts, ideas, or concepts. Self-expression and the aesthetics of the result matter to you.",
    descLowRu: "Вы предпочитаете чёткие задачи с конкретным результатом, а не открытый творческий процесс. Это даёт стабильность и предсказуемость в работе.",
    descLowEn: "You prefer clear tasks with concrete outcomes over open-ended creative processes. This provides stability and predictability in your work.",
    rolesRu: ["Дизайнер", "Копирайтер", "Маркетолог", "Контент-мейкер", "Режиссёр", "Архитектор"],
    rolesEn: ["Designer", "Copywriter", "Marketer", "Content Creator", "Director", "Architect"],
  },
  TECH: {
    nameRu: "Технологии",
    nameEn: "Technology",
    color: "#10b981",
    descHighRu: "Вы мыслите системами и любите разбираться в том, как работают сложные механизмы. Вам нравится строить, оптимизировать и решать технические задачи.",
    descHighEn: "You think in systems and love understanding how complex mechanisms work. You enjoy building, optimizing, and solving technical problems.",
    descLowRu: "Глубокое погружение в технические системы не вызывает у вас особого интереса. Вы более ориентированы на людей, смысл или творчество.",
    descLowEn: "Deep immersion in technical systems doesn't particularly interest you. You're more oriented toward people, meaning, or creativity.",
    rolesRu: ["Разработчик", "Инженер", "DevOps", "Тестировщик", "Системный архитектор", "Робототехник"],
    rolesEn: ["Developer", "Engineer", "DevOps", "QA Engineer", "Systems Architect", "Robotics Engineer"],
  },
  PEOP: {
    nameRu: "Работа с людьми",
    nameEn: "People Skills",
    color: "#f97316",
    descHighRu: "Ваш ресурс — люди. Вы умеете слушать, понимать мотивы других и строить доверительные отношения. Работа, где важен человеческий контакт, даёт вам энергию.",
    descHighEn: "Your strength is people. You can listen, understand others' motivations, and build trust. Work that involves meaningful human contact energizes you.",
    descLowRu: "Интенсивное общение с людьми скорее утомляет вас, чем заряжает. Вы работаете лучше в одиночестве или в стабильной небольшой команде.",
    descLowEn: "Intense interaction with many people tends to drain rather than energize you. You work best alone or in a stable small team.",
    rolesRu: ["HR-специалист", "Психолог", "Педагог", "Врач", "Тренер", "Менеджер по продажам"],
    rolesEn: ["HR Specialist", "Psychologist", "Teacher", "Doctor", "Coach", "Sales Manager"],
  },
  ENTR: {
    nameRu: "Предпринимательство",
    nameEn: "Entrepreneurship",
    color: "#ef4444",
    descHighRu: "Вы видите возможности там, где другие видят риски. Вас мотивирует результат, вы готовы брать ответственность и двигаться в неопределённости.",
    descHighEn: "You see opportunities where others see risks. Results motivate you, you're ready to take responsibility and move through uncertainty.",
    descLowRu: "Высокая неопределённость и финансовые риски предпринимательства вам некомфортны. Вы предпочитаете стабильность и чёткие правила.",
    descLowEn: "The high uncertainty and financial risks of entrepreneurship are uncomfortable for you. You prefer stability and clear rules.",
    rolesRu: ["Предприниматель", "Бизнес-девелопер", "Продакт-менеджер", "Консультант", "Инвестор"],
    rolesEn: ["Entrepreneur", "Business Developer", "Product Manager", "Consultant", "Investor"],
  },
};

interface CareerAptitudeItem {
  number: number;
  textRu: string;
  textEn: string;
  dimension: "LEAD" | "ANAL" | "CREA" | "TECH" | "PEOP" | "ENTR";
}

const items: CareerAptitudeItem[] = [
  // LEAD — Leadership (8 questions)
  { number: 1,  textRu: "Мне нравится организовывать других людей и распределять задачи", textEn: "I enjoy organizing people and distributing tasks", dimension: "LEAD" },
  { number: 2,  textRu: "Я готов принимать сложные решения, даже если они непопулярны", textEn: "I'm willing to make tough decisions even if they're unpopular", dimension: "LEAD" },
  { number: 3,  textRu: "Мне комфортно брать на себя ответственность за результат всей команды", textEn: "I'm comfortable taking responsibility for the entire team's outcome", dimension: "LEAD" },
  { number: 4,  textRu: "Я умею мотивировать людей и вдохновлять их на работу", textEn: "I can motivate people and inspire them to do their best work", dimension: "LEAD" },
  { number: 5,  textRu: "Когда группа не знает куда идти, я естественно беру инициативу", textEn: "When a group is lost, I naturally step up and take the lead", dimension: "LEAD" },
  { number: 6,  textRu: "Мне интересно понимать, что движет людьми, и использовать это", textEn: "I find it interesting to understand what drives people and use that", dimension: "LEAD" },
  { number: 7,  textRu: "Я вижу стратегическую картину там, где другие видят только детали", textEn: "I see the strategic big picture where others only see details", dimension: "LEAD" },
  { number: 8,  textRu: "Я думаю о том, как выстроить систему, а не просто выполнить задачу", textEn: "I think about how to build a system, not just complete a task", dimension: "LEAD" },

  // ANAL — Analytics (8 questions)
  { number: 9,  textRu: "Мне нравится работать с цифрами, таблицами и статистикой", textEn: "I enjoy working with numbers, spreadsheets, and statistics", dimension: "ANAL" },
  { number: 10, textRu: "Прежде чем принять решение, я стараюсь собрать максимум данных", textEn: "Before making a decision, I try to gather as much data as possible", dimension: "ANAL" },
  { number: 11, textRu: "Мне нравится искать скрытые закономерности и причинно-следственные связи", textEn: "I enjoy finding hidden patterns and cause-and-effect relationships", dimension: "ANAL" },
  { number: 12, textRu: "Я получаю удовольствие от точной и детальной работы", textEn: "I get satisfaction from precise and detailed work", dimension: "ANAL" },
  { number: 13, textRu: "Я предпочитаю факты и доказательства интуиции и догадкам", textEn: "I prefer facts and evidence over intuition and guesses", dimension: "ANAL" },
  { number: 14, textRu: "Мне нравится разбираться в сложных системах и понимать, как они работают", textEn: "I enjoy understanding complex systems and how they work", dimension: "ANAL" },
  { number: 15, textRu: "Я легко замечаю ошибки и неточности в данных или текстах", textEn: "I easily spot errors and inaccuracies in data or texts", dimension: "ANAL" },
  { number: 16, textRu: "Мне нравится строить модели, прогнозы и сценарии развития", textEn: "I enjoy building models, forecasts, and development scenarios", dimension: "ANAL" },

  // CREA — Creativity (8 questions)
  { number: 17, textRu: "Мне нравится генерировать нестандартные идеи и решения", textEn: "I enjoy generating unconventional ideas and solutions", dimension: "CREA" },
  { number: 18, textRu: "Я часто замечаю красоту в обычных вещах и хочу это передать", textEn: "I often notice beauty in ordinary things and want to convey it", dimension: "CREA" },
  { number: 19, textRu: "Мне легко даётся создание текстов, историй или визуального контента", textEn: "I find it easy to create texts, stories, or visual content", dimension: "CREA" },
  { number: 20, textRu: "Я чувствую ограничение, когда работа слишком шаблонна и повторяема", textEn: "I feel constrained when work is too templated and repetitive", dimension: "CREA" },
  { number: 21, textRu: "Мне важно, чтобы результат моей работы был красивым или оригинальным", textEn: "It matters to me that the result of my work is beautiful or original", dimension: "CREA" },
  { number: 22, textRu: "Я вижу неожиданные связи между несвязанными на первый взгляд вещами", textEn: "I see unexpected connections between seemingly unrelated things", dimension: "CREA" },
  { number: 23, textRu: "Мне нравится разрабатывать концепции и образы с нуля", textEn: "I enjoy developing concepts and images from scratch", dimension: "CREA" },
  { number: 24, textRu: "Самовыражение через работу важно для меня", textEn: "Self-expression through work is important to me", dimension: "CREA" },

  // TECH — Technology (8 questions)
  { number: 25, textRu: "Мне нравится разбирать вещи на части, чтобы понять как они устроены", textEn: "I enjoy taking things apart to understand how they work", dimension: "TECH" },
  { number: 26, textRu: "Мне интересно программирование, автоматизация или работа с техникой", textEn: "I'm interested in programming, automation, or working with technology", dimension: "TECH" },
  { number: 27, textRu: "Я получаю удовольствие от решения технических задач и алгоритмов", textEn: "I enjoy solving technical problems and algorithms", dimension: "TECH" },
  { number: 28, textRu: "Я склонен улучшать и оптимизировать процессы вокруг себя", textEn: "I tend to improve and optimize processes around me", dimension: "TECH" },
  { number: 29, textRu: "Мне нравится создавать что-то, что работает точно и надёжно", textEn: "I enjoy creating things that work precisely and reliably", dimension: "TECH" },
  { number: 30, textRu: "Логические задачи и головоломки меня увлекают", textEn: "Logical puzzles and problems fascinate me", dimension: "TECH" },
  { number: 31, textRu: "Я слежу за новыми технологиями и стараюсь их понять", textEn: "I follow new technologies and try to understand them", dimension: "TECH" },
  { number: 32, textRu: "Я предпочитаю строить системы, а не работать с людьми", textEn: "I prefer building systems over working with people", dimension: "TECH" },

  // PEOP — People Skills (8 questions)
  { number: 33, textRu: "Мне важно помогать людям решать их проблемы", textEn: "It's important to me to help people solve their problems", dimension: "PEOP" },
  { number: 34, textRu: "Я умею слушать и понимать других людей на глубоком уровне", textEn: "I can listen and understand others on a deep level", dimension: "PEOP" },
  { number: 35, textRu: "Общение с новыми людьми меня заряжает, а не утомляет", textEn: "Meeting new people energizes me rather than draining me", dimension: "PEOP" },
  { number: 36, textRu: "Я хорошо чувствую эмоциональный климат в группе", textEn: "I'm attuned to the emotional climate within a group", dimension: "PEOP" },
  { number: 37, textRu: "Мне нравится обучать других и делиться знаниями", textEn: "I enjoy teaching others and sharing knowledge", dimension: "PEOP" },
  { number: 38, textRu: "Я умею разрешать конфликты и находить компромисс", textEn: "I'm good at resolving conflicts and finding compromises", dimension: "PEOP" },
  { number: 39, textRu: "Мне важно знать, что моя работа помогает конкретным людям", textEn: "It matters to me that my work directly helps specific people", dimension: "PEOP" },
  { number: 40, textRu: "Я легко устанавливаю контакт и доверие с незнакомыми людьми", textEn: "I easily establish rapport and trust with strangers", dimension: "PEOP" },

  // ENTR — Entrepreneurship (8 questions)
  { number: 41, textRu: "Мне нравится видеть возможности там, где другие не замечают", textEn: "I enjoy spotting opportunities others overlook", dimension: "ENTR" },
  { number: 42, textRu: "Я готов рисковать ради большой цели", textEn: "I'm willing to take risks for a big goal", dimension: "ENTR" },
  { number: 43, textRu: "Меня больше мотивирует результат, чем процесс", textEn: "I'm more motivated by results than the process", dimension: "ENTR" },
  { number: 44, textRu: "Я часто думаю о том, как монетизировать идею или улучшить продукт", textEn: "I often think about how to monetize an idea or improve a product", dimension: "ENTR" },
  { number: 45, textRu: "Неопределённость меня скорее возбуждает, чем пугает", textEn: "Uncertainty excites me more than it scares me", dimension: "ENTR" },
  { number: 46, textRu: "Мне нравится продавать, убеждать и договариваться", textEn: "I enjoy selling, persuading, and negotiating", dimension: "ENTR" },
  { number: 47, textRu: "Я думаю о создании собственного дела или продукта", textEn: "I think about creating my own business or product", dimension: "ENTR" },
  { number: 48, textRu: "Успех для меня — это конкретный измеримый результат", textEn: "For me, success means a concrete measurable outcome", dimension: "ENTR" },
];

const SCALE_OPTIONS_RU = [
  { key: "1", text: "Совсем не про меня" },
  { key: "2", text: "Скорее нет" },
  { key: "3", text: "Нейтрально" },
  { key: "4", text: "Скорее да" },
  { key: "5", text: "Точно про меня" },
];
const SCALE_OPTIONS_EN = [
  { key: "1", text: "Not me at all" },
  { key: "2", text: "Mostly no" },
  { key: "3", text: "Neutral" },
  { key: "4", text: "Mostly yes" },
  { key: "5", text: "Definitely me" },
];

export function getCareerAptitudeQuestions(): (Question & { options: QuestionOption[] })[] {
  return items.map((item) => {
    const options: QuestionOption[] = SCALE_OPTIONS_RU.map((opt, i) => ({
      id: `ca-opt-${item.number}-${opt.key}`,
      question_id: `ca-q-${item.number}`,
      option_key: opt.key,
      text_ru: opt.text,
      text_en: SCALE_OPTIONS_EN[i].text,
      sort_order: parseInt(opt.key),
    }));

    return {
      id: `ca-q-${item.number}`,
      test_id: CAREER_APTITUDE_TEST_ID,
      text_ru: item.textRu,
      text_en: item.textEn,
      question_type: "scale" as const,
      sort_order: item.number,
      is_required: true,
      scoring_key: { dimension: item.dimension },
      options,
    };
  });
}
