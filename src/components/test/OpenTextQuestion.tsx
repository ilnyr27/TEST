"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Question, AnswerData } from "@/types/database";
import { Textarea } from "@/components/ui/textarea";

interface OpenTextQuestionProps {
  question: Question;
  value: AnswerData | undefined;
  onAnswer: (data: AnswerData) => void;
}

export function OpenTextQuestion({
  value,
  onAnswer,
}: OpenTextQuestionProps) {
  const t = useTranslations("test");
  const [text, setText] = useState(value?.text ?? "");

  const handleChange = (val: string) => {
    setText(val);
    onAnswer({ text: val });
  };

  return (
    <div className="space-y-3">
      <Textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={t("skip")}
        className="min-h-[150px] resize-y text-base"
      />
      <p className="text-xs text-muted-foreground text-right">
        {text.length} / 2000
      </p>
    </div>
  );
}
