"use client";

import { use, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { useTestSessionStore } from "@/stores/test-session";
import { getScorer } from "@/lib/scoring/scorer-registry";
import { saveResult } from "@/lib/test-engine/results-store";
import { RadarChart } from "@/components/results/RadarChart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BarChart3, RotateCcw, Bot, Trophy, Loader2, MessageSquare } from "lucide-react";
import { getResults } from "@/lib/test-engine/results-store";

export default function TestResultsPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = use(params);
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("results");
  const { questions, answers, timeSpentSeconds, testName, reset } =
    useTestSessionStore();

  const answeredCount = Object.keys(answers).length;
  const scorer = getScorer(testId);
  const savedRef = useRef(false);

  // Save result to localStorage on first render
  useEffect(() => {
    if (scorer && !savedRef.current && answeredCount > 0) {
      savedRef.current = true;
      const r = scorer.calculate(questions, answers, locale);
      saveResult({
        testSlug: testId,
        result: r,
        completedAt: new Date().toISOString(),
        answeredCount,
        totalQuestions: questions.length,
        timeSpentSeconds,
      });
    }
  }, [scorer, testId, questions, answers, locale, answeredCount, timeSpentSeconds]);

  if (questions.length === 0 || answeredCount === 0) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center space-y-4">
        <h1 className="text-2xl font-bold">
          {locale === "ru" ? "Нет данных" : "No data"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "ru"
            ? "Сначала пройдите тест, чтобы увидеть результаты."
            : "Please complete the test first to see results."}
        </p>
        <Link href={`/test/${testId}`}>
          <Button>{locale === "ru" ? "Перейти к тесту" : "Go to test"}</Button>
        </Link>
      </div>
    );
  }

  if (!scorer) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center">
        <p className="text-muted-foreground">
          {locale === "ru" ? `Тест не найден: ${testId}` : `Scorer not found: ${testId}`}
        </p>
      </div>
    );
  }

  const result = scorer.calculate(questions, answers, locale);
  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{t("title")}</h1>
            <p className="text-sm text-muted-foreground">
              {testName} &middot; {answeredCount}/{questions.length}{" "}
              {locale === "ru" ? "вопросов" : "questions"} &middot;{" "}
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          </div>
        </div>
        <Link href={`/test/${testId}/play`}>
          <Button variant="outline" size="sm" className="gap-1" onClick={() => reset()}>
            <RotateCcw className="h-3.5 w-3.5" />
            {locale === "ru" ? "Заново" : "Retake"}
          </Button>
        </Link>
      </div>

      {/* Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex items-start gap-3 py-4">
          <Trophy className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm font-medium">
            {locale === "ru" ? result.summary.ru : result.summary.en}
          </p>
        </CardContent>
      </Card>

      {/* Radar chart */}
      {result.radarData.length >= 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {t("dimensions")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChart data={result.radarData} />
          </CardContent>
        </Card>
      )}

      {/* Dimension details */}
      <div className="grid gap-4 md:grid-cols-2">
        {result.dimensions.map((dim) => (
          <Card key={dim.key}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{dim.name}</CardTitle>
                {dim.key !== "style" && (
                  <Badge
                    variant="outline"
                    style={{ borderColor: dim.color, color: dim.color }}
                  >
                    {dim.score}%
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {dim.key !== "style" && (
                <Progress value={dim.score} className="h-2" />
              )}
              <p className="text-sm text-muted-foreground">{dim.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Analysis */}
      <AIAnalysisSection locale={locale} t={t} testId={testId} />

      {/* Go to coach */}
      <div className="text-center">
        <Link href="/coach">
          <Button variant="ghost" className="gap-2 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            {locale === "ru" ? "Обсудить с ИИ-коучем" : "Discuss with AI Coach"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function AIAnalysisSection({
  locale,
  t,
  testId,
}: {
  locale: "ru" | "en";
  t: ReturnType<typeof useTranslations>;
  testId: string;
}) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = getResults();
      const resp = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, criticismMode: false, results }),
      });
      if (resp.status === 401) {
        window.location.href = `/${locale}/login?next=/${locale}/test/${testId}/results`; // eslint-disable-line react-hooks/immutability
        return;
      }
      if (resp.status === 402) {
        window.location.href = `/${locale}/pricing`; // eslint-disable-line react-hooks/immutability
        return;
      }
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || "API error");
      }
      const data = await resp.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  if (analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {t("aiAnalysis")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{analysis}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dashed">
      <CardContent className="flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="font-medium">{t("aiAnalysis")}</p>
            <p className="text-sm text-muted-foreground">
              {locale === "ru"
                ? "ИИ проанализирует ваши результаты и даст рекомендации"
                : "AI will analyze your results and give recommendations"}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
          {loading ? t("aiAnalyzing") : t("aiAnalysis")}
        </Button>
        {error && (
          <p className="text-xs text-destructive ml-2">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
