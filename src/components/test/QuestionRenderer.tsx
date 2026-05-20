"use client";

import { useLocale } from "next-intl";
import { Question, QuestionOption, AnswerData } from "@/types/database";
import { ScaleQuestion } from "./ScaleQuestion";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { OpenTextQuestion } from "./OpenTextQuestion";
import { Badge } from "@/components/ui/badge";

interface QuestionRendererProps {
  question: Question & { options: QuestionOption[] };
  questionNumber: number;
  totalQuestions: number;
  value: AnswerData | undefined;
  onAnswer: (data: AnswerData) => void;
}

export function QuestionRenderer({
  question,
  questionNumber,
  totalQuestions,
  value,
  onAnswer,
}: QuestionRendererProps) {
  const locale = useLocale();
  const questionText = locale === "ru" ? question.text_ru : question.text_en;

  return (
    <div className="space-y-6">
      {/* Question header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {questionNumber} / {totalQuestions}
          </Badge>
          {question.is_required && (
            <span className="text-xs text-destructive">*</span>
          )}
        </div>
        <h2 className="text-xl font-semibold leading-relaxed">
          {questionText}
        </h2>
      </div>

      {/* Question body — delegates to type-specific component */}
      {question.type === "scale" && (
        <ScaleQuestion question={question} value={value} onAnswer={onAnswer} />
      )}
      {question.type === "single_choice" && (
        <SingleChoiceQuestion
          question={question}
          value={value}
          onAnswer={onAnswer}
        />
      )}
      {question.type === "multiple_choice" && (
        <MultipleChoiceQuestion
          question={question}
          value={value}
          onAnswer={onAnswer}
        />
      )}
      {question.type === "open_text" && (
        <OpenTextQuestion
          question={question}
          value={value}
          onAnswer={onAnswer}
        />
      )}
    </div>
  );
}
