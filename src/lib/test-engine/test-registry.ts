import { Question, QuestionOption } from "@/types/database";
import { getBigFiveQuestions, bigFiveTestMeta } from "./big-five-data";
import { getRIASECQuestions, riasecTestMeta } from "./riasec-data";
import { getAttachmentQuestions, attachmentTestMeta } from "./attachment-data";

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
