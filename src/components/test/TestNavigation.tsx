"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Pause } from "lucide-react";

interface TestNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  hasAnswer: boolean;
  isRequired: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPause: () => void;
  onFinish: () => void;
}

export function TestNavigation({
  currentIndex,
  totalQuestions,
  hasAnswer,
  isRequired,
  onNext,
  onPrev,
  onPause,
  onFinish,
}: TestNavigationProps) {
  const t = useTranslations("test");
  const tc = useTranslations("common");
  const isLast = currentIndex === totalQuestions - 1;
  const canProceed = hasAnswer || !isRequired;

  return (
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          {tc("back")}
        </Button>
        <Button variant="ghost" size="sm" onClick={onPause} className="gap-1">
          <Pause className="h-4 w-4" />
          {t("saveAndExit")}
        </Button>
      </div>

      {isLast ? (
        <Button onClick={onFinish} disabled={!canProceed} className="gap-1">
          <Check className="h-4 w-4" />
          {tc("finish")}
        </Button>
      ) : (
        <Button onClick={onNext} disabled={!canProceed} className="gap-1">
          {tc("next")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
