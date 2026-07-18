"use client";

import { use, useEffect, useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { useTestSessionStore } from "@/stores/test-session";
import { getTestMeta, getTestQuestions } from "@/lib/test-engine/test-registry";
import { QuestionRenderer } from "@/components/test/QuestionRenderer";
import { TestProgress } from "@/components/test/TestProgress";
import { TestNavigation } from "@/components/test/TestNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnswerData } from "@/types/database";
import { Play, RotateCcw } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";

export default function TestPlayPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = use(params);
  const locale = useLocale() as "ru" | "en";
  const router = useRouter();
  const tc = useTranslations("common");

  const {
    status,
    questions,
    currentIndex,
    answers,
    totalQuestions,
    timeSpentSeconds,
    testName,
    testId: activeTestId,
    initTest,
    submitAnswer,
    goNext,
    goPrev,
    pause,
    resume,
    complete,
    reset,
    tick,
  } = useTestSessionStore();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status === "active") {
      timerRef.current = setInterval(tick, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, tick]);

  const handleStart = useCallback(() => {
    const meta = getTestMeta(testId);
    const qs = getTestQuestions(testId);
    if (meta && qs) {
      const name = locale === "ru" ? meta.nameRu : meta.nameEn;
      initTest(testId, name, qs);
    }
  }, [testId, locale, initTest]);

  // Auto-start only if different test (preserve progress for same test)
  useEffect(() => {
    if (activeTestId !== testId) {
      handleStart();
    }
  }, [activeTestId, testId, handleStart]);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (data: AnswerData) => {
    if (currentQuestion) {
      submitAnswer(currentQuestion.id, data);
    }
  };

  const handleFinish = () => {
    complete();
    router.push(`/test/${testId}/results`);
  };

  // Completed
  if (status === "completed") {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center space-y-4">
        <h1 className="text-2xl font-bold">
          {locale === "ru" ? "Тест завершён!" : "Test complete!"}
        </h1>
        <Button onClick={() => router.push(`/test/${testId}/results`)}>
          {locale === "ru" ? "Смотреть результаты" : "View results"}
        </Button>
      </div>
    );
  }

  // Paused
  if (status === "paused") {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center space-y-4">
        <h1 className="text-2xl font-bold">
          {locale === "ru" ? "Тест на паузе" : "Test paused"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "ru"
            ? `Отвечено ${answeredCount} из ${totalQuestions} вопросов`
            : `Answered ${answeredCount} of ${totalQuestions} questions`}
        </p>
        <div className="flex justify-center gap-3">
          <Button onClick={resume} className="gap-2">
            <Play className="h-4 w-4" />
            {tc("continue")}
          </Button>
          <Link href="/dashboard">
            <Button variant="outline">
              {locale === "ru" ? "К панели" : "To dashboard"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center">
        <p className="text-muted-foreground">{tc("loading")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">{testName}</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { reset(); handleStart(); }}
          className="gap-1 text-muted-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {locale === "ru" ? "Заново" : "Restart"}
        </Button>
      </div>

      <TestProgress
        current={currentIndex}
        total={totalQuestions}
        answeredCount={answeredCount}
        timeSpentSeconds={timeSpentSeconds}
      />

      <Card>
        <CardContent className="pt-6">
          <QuestionRenderer
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={totalQuestions}
            value={currentAnswer}
            onAnswer={handleAnswer}
          />
        </CardContent>
      </Card>

      <TestNavigation
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        hasAnswer={!!currentAnswer}
        isRequired={currentQuestion.is_required}
        onNext={goNext}
        onPrev={goPrev}
        onPause={pause}
        onFinish={handleFinish}
      />
    </div>
  );
}
