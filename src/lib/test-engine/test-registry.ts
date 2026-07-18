import { Question, QuestionOption } from "@/types/database";
import { getBigFiveQuestions, bigFiveTestMeta } from "./big-five-data";
import { getRIASECQuestions, riasecTestMeta } from "./riasec-data";
import { getAttachmentQuestions, attachmentTestMeta } from "./attachment-data";
import { getEQQuestions, eqTestMeta } from "./eq-data";
import { getBurnoutQuestions, burnoutTestMeta } from "./burnout-data";
import { getCareerValuesQuestions, careerValuesTestMeta } from "./career-values-data";
import { getGardnerQuestions, gardnerTestMeta } from "./gardner-data";
import { getCreativeQuestions, creativeTestMeta } from "./creative-data";
import { getHabitsQuestions, habitsTestMeta } from "./habits-data";
import { getMBTIQuestions, mbtiTestMeta } from "./mbti-data";
import { getLoveLanguagesQuestions, loveLanguagesTestMeta } from "./love-languages-data";
import { getCareerAptitudeQuestions, careerAptitudeTestMeta } from "./career-aptitude-data";
import { getShadowQuestions, shadowTestMeta } from "./shadow-data";
import { getDeepBigFiveQuestions, deepBigFiveTestMeta } from "./deep-big-five-data";
import { getLocusQuestions, locusTestMeta } from "./locus-data";
import { getHardinessQuestions, hardinessTestMeta } from "./hardiness-data";
import { getCognitiveBiasQuestions, cognitiveBiasTestMeta } from "./cognitive-bias-data";
import { getThinkingStyleQuestions, thinkingStyleTestMeta } from "./thinking-style-data";
import { getViaStrengthsQuestions, viaStrengthsTestMeta } from "./via-strengths-data";
import { getWorkStyleQuestions, workStyleTestMeta } from "./work-style-data";
import { getEnergyManagementQuestions, energyManagementTestMeta } from "./energy-management-data";
import { getTimeManagementQuestions, timeManagementTestMeta } from "./time-management-data";

export interface TestMeta {
  id: string;
  slug: string;
  nameRu: string;
  nameEn: string;
  descriptionRu: string;
  descriptionEn: string;
  methodology: string;
  estimatedMinutes: number;
  questionCount: number;
  category: string;
  instructionRu?: string;
  instructionEn?: string;
}

interface TestDefinition {
  meta: TestMeta;
  getQuestions: () => (Question & { options: QuestionOption[] })[];
}

const tests: Record<string, TestDefinition> = {
  "big-five": {
    meta: {
      ...bigFiveTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 (совершенно не согласен) до 5 (полностью согласен). Отвечайте честно — здесь нет правильных или неправильных ответов.",
      instructionEn: "Rate each statement on a scale from 1 (strongly disagree) to 5 (strongly agree). Answer honestly — there are no right or wrong answers.",
    },
    getQuestions: getBigFiveQuestions,
  },
  riasec: {
    meta: {
      ...riasecTestMeta,
      instructionRu: "Для каждого утверждения выберите, насколько оно описывает вас: Да, Частично или Нет. Не думайте слишком долго — первый ответ обычно самый точный.",
      instructionEn: "For each statement, select how well it describes you: Yes, Somewhat, or No. Don't overthink — your first answer is usually the most accurate.",
    },
    getQuestions: getRIASECQuestions,
  },
  "attachment-style": {
    meta: {
      ...attachmentTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 7. Думайте о ваших отношениях в целом, не только о текущих.",
      instructionEn: "Rate each statement on a scale from 1 to 7. Think about your relationships in general, not just your current one.",
    },
    getQuestions: getAttachmentQuestions,
  },
  eq: {
    meta: {
      ...eqTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5. Отвечайте, исходя из того, как вы обычно себя ведёте, а не как хотели бы.",
      instructionEn: "Rate each statement from 1 to 5. Answer based on how you typically behave, not how you wish you would.",
    },
    getQuestions: getEQQuestions,
  },
  burnout: {
    meta: {
      ...burnoutTestMeta,
      instructionRu: "Оцените, как часто вы испытываете каждое из описанных состояний, по шкале от 1 (никогда) до 7 (каждый день).",
      instructionEn: "Rate how often you experience each described state, from 1 (never) to 7 (every day).",
    },
    getQuestions: getBurnoutQuestions,
  },
  "career-values": {
    meta: {
      ...careerValuesTestMeta,
      instructionRu: "Оцените важность каждого аспекта для вашей идеальной карьеры по шкале от 1 (не важно) до 5 (крайне важно).",
      instructionEn: "Rate the importance of each aspect for your ideal career from 1 (not important) to 5 (extremely important).",
    },
    getQuestions: getCareerValuesQuestions,
  },
  gardner: {
    meta: {
      ...gardnerTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5. Подумайте о своих реальных способностях и предпочтениях.",
      instructionEn: "Rate each statement from 1 to 5. Think about your actual abilities and preferences.",
    },
    getQuestions: getGardnerQuestions,
  },
  creative: {
    meta: {
      ...creativeTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5 — насколько оно описывает вас.",
      instructionEn: "Rate each statement from 1 to 5 — how well it describes you.",
    },
    getQuestions: getCreativeQuestions,
  },
  habits: {
    meta: {
      ...habitsTestMeta,
      instructionRu: "Оцените, как часто вы практикуете каждую привычку, по шкале от 1 (никогда) до 5 (всегда).",
      instructionEn: "Rate how often you practice each habit, from 1 (never) to 5 (always).",
    },
    getQuestions: getHabitsQuestions,
  },
  "mbti-light": {
    meta: {
      ...mbtiTestMeta,
      instructionRu: "В каждом вопросе выберите вариант, который ближе вам. Не думайте долго — первый порыв обычно самый точный.",
      instructionEn: "For each question, pick the option that feels more like you. Don't overthink — your first impulse is usually the most accurate.",
    },
    getQuestions: getMBTIQuestions,
  },
  "love-languages": {
    meta: {
      ...loveLanguagesTestMeta,
      instructionRu: "В каждом вопросе выберите один из двух вариантов — тот, который вам ближе. Нет правильных ответов.",
      instructionEn: "For each question, choose one of two options — the one that resonates more with you. There are no right answers.",
    },
    getQuestions: getLoveLanguagesQuestions,
  },
  "career-aptitude": {
    meta: {
      ...careerAptitudeTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5 — насколько оно описывает вас. Отвечайте честно, думая о том, что вам действительно нравится делать.",
      instructionEn: "Rate each statement from 1 to 5 — how well it describes you. Answer honestly, thinking about what you genuinely enjoy doing.",
    },
    getQuestions: getCareerAptitudeQuestions,
  },
  shadow: {
    meta: {
      ...shadowTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5 — насколько точно оно описывает вас. Здесь нет «правильных» ответов: честность важнее желаемого образа себя.",
      instructionEn: "Rate each statement from 1 to 5 — how accurately it describes you. There are no 'right' answers: honesty matters more than the image you want to project.",
    },
    getQuestions: getShadowQuestions,
  },
  "deep-big-five": {
    meta: {
      ...deepBigFiveTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5. Ориентируйтесь на то, как вы реально ведёте себя — а не как хотели бы. Чем честнее ответы, тем точнее ваш портрет.",
      instructionEn: "Rate each statement from 1 to 5. Focus on how you actually behave — not how you'd like to. The more honest the answers, the more accurate your portrait.",
    },
    getQuestions: getDeepBigFiveQuestions,
  },
  "locus-control": {
    meta: {
      ...locusTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5 — насколько оно описывает вашу реальную позицию. Здесь нет правильных ответов: интересен именно ваш взгляд.",
      instructionEn: "Rate each statement from 1 to 5 — how well it describes your actual stance. There are no right answers: your perspective is what matters.",
    },
    getQuestions: getLocusQuestions,
  },
  hardiness: {
    meta: {
      ...hardinessTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5. Думайте о том, как вы реально ведёте себя в трудных ситуациях — не о том, как хотели бы.",
      instructionEn: "Rate each statement from 1 to 5. Think about how you actually behave in difficult situations — not how you would like to.",
    },
    getQuestions: getHardinessQuestions,
  },
  "cognitive-bias": {
    meta: {
      ...cognitiveBiasTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5 — насколько точно оно описывает ваши мысли и реакции. Здесь нет правильных ответов: чем честнее — тем полезнее результат.",
      instructionEn: "Rate each statement from 1 to 5 — how accurately it describes your thoughts and reactions. There are no right answers: the more honest you are, the more useful the result.",
    },
    getQuestions: getCognitiveBiasQuestions,
  },
  "thinking-style": {
    meta: {
      ...thinkingStyleTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5. Ориентируйтесь на то, как вы реально мыслите и действуете — а не как хотели бы.",
      instructionEn: "Rate each statement from 1 to 5. Focus on how you actually think and act — not how you'd like to.",
    },
    getQuestions: getThinkingStyleQuestions,
  },
  "via-strengths": {
    meta: {
      ...viaStrengthsTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5 — насколько точно оно описывает вас. Думайте о своём реальном поведении, а не о том, каким хотите казаться.",
      instructionEn: "Rate each statement from 1 to 5 — how accurately it describes you. Think about your actual behavior, not how you want to appear.",
    },
    getQuestions: getViaStrengthsQuestions,
  },
  "work-style": {
    meta: {
      ...workStyleTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5 — насколько точно оно описывает вас в рабочем контексте. Нет правильных или неправильных ответов.",
      instructionEn: "Rate each statement from 1 to 5 — how accurately it describes you in a work context. There are no right or wrong answers.",
    },
    getQuestions: getWorkStyleQuestions,
  },
  "energy-management": {
    meta: {
      ...energyManagementTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5 — насколько оно описывает вашу реальную ситуацию прямо сейчас. Отвечайте честно, не «как должно быть».",
      instructionEn: "Rate each statement from 1 to 5 — how well it describes your actual situation right now. Answer honestly, not 'how it should be'.",
    },
    getQuestions: getEnergyManagementQuestions,
  },
  "time-management": {
    meta: {
      ...timeManagementTestMeta,
      instructionRu: "Оцените каждое утверждение по шкале от 1 до 5 — насколько оно описывает ваше реальное поведение, а не желаемое.",
      instructionEn: "Rate each statement from 1 to 5 — how well it describes your actual behavior, not the desired one.",
    },
    getQuestions: getTimeManagementQuestions,
  },
};

export function getTestMeta(slug: string): TestMeta | null {
  return tests[slug]?.meta ?? null;
}

export function getTestQuestions(slug: string): (Question & { options: QuestionOption[] })[] | null {
  return tests[slug]?.getQuestions() ?? null;
}

export function getAllTests(): TestMeta[] {
  return Object.values(tests).map((t) => t.meta);
}

export function getTestsByCategory(category: string): TestMeta[] {
  return Object.values(tests)
    .filter((t) => t.meta.category === category)
    .map((t) => t.meta);
}
