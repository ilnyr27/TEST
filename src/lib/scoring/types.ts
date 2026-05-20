import { AnswerData } from "@/types/database";

export interface DimensionResult {
  key: string;
  name: string;
  score: number; // 0-100
  description: string;
  color: string;
}

export interface ScoringResult {
  testSlug: string;
  dimensions: DimensionResult[];
  radarData: { name: string; value: number; fullMark: number }[];
  summary: {
    ru: string;
    en: string;
  };
  flags?: Record<string, boolean>;
}

export interface Scorer {
  calculate(
    questions: { id: string; scoring_key: unknown }[],
    answers: Record<string, AnswerData>,
    locale: "ru" | "en"
  ): ScoringResult;
}
