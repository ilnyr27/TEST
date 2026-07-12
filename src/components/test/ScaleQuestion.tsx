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
  const minLabel = locale === "ru" ? question.scale_min_label_ru : question.scale_min_label_en;
  const maxLabel = locale === "ru" ? question.scale_max_label_ru : question.scale_max_label_en;

  const handleSelect = (val: number) => {
    setSelected(val);
    onAnswer({ value: val });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      <div className="flex gap-1.5 sm:gap-2 w-full">
        {options.map((opt) => {
          const numVal = parseInt(opt.option_key);
          const isSelected = selected === numVal;
          return (
            <button
              key={opt.option_key}
              onClick={() => handleSelect(numVal)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border-2 p-2 sm:p-4 transition-all hover:border-primary/50 flex-1",
                isSelected
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border hover:bg-muted/50"
              )}
            >
              <span className={cn(
                "text-xl sm:text-2xl font-bold",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {opt.option_key}
              </span>
              <span className="text-xs text-muted-foreground text-center leading-tight">
                {locale === "ru" ? opt.text_ru : opt.text_en}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
