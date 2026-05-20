"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Question, QuestionOption, AnswerData } from "@/types/database";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SingleChoiceQuestionProps {
  question: Question & { options: QuestionOption[] };
  value: AnswerData | undefined;
  onAnswer: (data: AnswerData) => void;
}

export function SingleChoiceQuestion({
  question,
  value,
  onAnswer,
}: SingleChoiceQuestionProps) {
  const locale = useLocale();
  const [selected, setSelected] = useState<string | null>(
    value?.selected ?? null
  );

  const options = question.options.sort((a, b) => a.sort_order - b.sort_order);

  const handleSelect = (key: string) => {
    setSelected(key);
    onAnswer({ selected: key });
  };

  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const isSelected = selected === opt.option_key;
        return (
          <button
            key={opt.option_key}
            onClick={() => handleSelect(opt.option_key)}
            className={cn(
              "w-full flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all hover:border-primary/50",
              isSelected
                ? "border-primary bg-primary/10"
                : "border-border hover:bg-muted/50"
            )}
          >
            <div
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30"
              )}
            >
              {isSelected && <Check className="h-3.5 w-3.5" />}
            </div>
            <span className={cn("text-sm", isSelected && "font-medium")}>
              {locale === "ru" ? opt.text_ru : opt.text_en}
            </span>
          </button>
        );
      })}
    </div>
  );
}
