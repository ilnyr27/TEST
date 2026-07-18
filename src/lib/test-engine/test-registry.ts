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
