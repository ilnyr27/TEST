"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Question, QuestionOption, AnswerData } from "@/types/database";
import { cn } from "@/lib/utils";

interface ScaleQuestionProps {
  question: Question & { options: QuestionOption[] };
  value: AnswerData | undefined;
  onAnswer: (data: AnswerData) => void;
}

export function ScaleQuestion({ question, value, onAnswer }: ScaleQuestionProps) {
  const locale = useLocale();
  const [selected, setSelected] = useState<number | null>(
    value?.value ?? null
  );

  const options = question.options.sort((a, b) => a.sort_order - b.sort_order);

  const handleSelect = (val: number) => {
    setSelected(val);
    onAnswer({ value: val });
  };

  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const numVal = parseInt(opt.option_key);
        const isSelected = selected === numVal;
        const label = locale === "ru" ? opt.text_ru : opt.text_en;

        return (
          <button
            key={opt.option_key}
            onClick={() => handleSelect(numVal)}
            className={cn(
              "w-full flex items-center gap-4 rounded-xl border-2 px-4 py-3 text-left transition-all hover:border-primary/50",
              isSelected
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border hover:bg-muted/50"
            )}
          >
            {/* Radio circle */}
            <span className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
              isSelected ? "border-primary" : "border-muted-foreground/40"
            )}>
              {isSelected && (
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              )}
            </span>

            {/* Number badge */}
            <span className={cn(
              "text-sm font-bold w-5 shrink-0 text-center",
              isSelected ? "text-primary" : "text-muted-foreground"
            )}>
              {opt.option_key}
            </span>

            {/* Label */}
            <span className={cn(
              "text-sm leading-snug",
              isSelected ? "font-medium text-foreground" : "text-muted-foreground"
            )}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
