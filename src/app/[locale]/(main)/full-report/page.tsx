"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Loader2, RotateCcw, ArrowLeft, Lock } from "lucide-react";
import { getResults } from "@/lib/test-engine/results-store";
import { Link } from "@/lib/i18n/navigation";
import { usePlan } from "@/hooks/usePlan";
import { useUser } from "@/hooks/useUser";

export default function FullReportPage() {
  const locale = useLocale() as "ru" | "en";
  const { user } = useUser();
  const { hasReport, loading: planLoading } = usePlan();
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ru = locale === "ru";
  const results = typeof window !== "undefined" ? getResults() : [];

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("/api/ai/full-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, results }),
      });
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || "API error");
      }
      const data = await resp.json();
      setReport(data.report);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  if (planLoading) {
    return (
      <div className="mx-auto max-w-3xl py-16 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-amber-600" />
          <h1 className="text-2xl font-bold">{ru ? "Полный отчёт" : "Full Report"}</h1>
        </div>
      </div>

      {/* No access */}
      {!user || !hasReport ? (
        <Card className="border-amber-500/25">
          <CardContent className="flex flex-col items-center text-center py-12 gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
              <Lock className="h-7 w-7 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {ru ? "Полный отчёт недоступен" : "Full Report not available"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                {!user
                  ? (ru
                    ? "Войдите в аккаунт, а затем приобретите доступ к полному отчёту"
                    : "Sign in to your account, then purchase access to the full report")
                  : (ru
                    ? "Купите пакет DeepSeek / Claude Продвинутый или Профи, или приобретите отчёт отдельно"
                    : "Purchase the Advanced or Pro DeepSeek/Claude pack, or buy the report separately")}
              </p>
            </div>
            {!user ? (
              <Link href={`/${locale}/login?next=/${locale}/full-report`}>
                <Button>{ru ? "Войти" : "Sign in"}</Button>
              </Link>
            ) : (
              <Link href="/pricing">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  {ru ? "Купить отчёт — 299 ₽" : "Buy report — 299 ₽"}
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : results.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center text-center py-12 gap-4">
            <p className="text-muted-foreground">
              {ru
                ? "Пройдите хотя бы один тест, чтобы сгенерировать отчёт"
                : "Complete at least one test to generate a report"}
            </p>
            <Link href="/dashboard">
              <Button variant="outline">
                {ru ? "К тестам" : "Go to tests"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : !report ? (
        <Card>
          <CardContent className="flex flex-col items-center text-center py-12 gap-4">
            <Crown className="h-12 w-12 text-amber-500/50" />
            <div>
              <h2 className="text-lg font-semibold">
                {ru ? "Готово к генерации" : "Ready to generate"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {ru
                  ? `ИИ проанализирует ${results.length} пройденных тестов и создаст ваш полный профиль`
                  : `AI will analyze ${results.length} completed tests and create your full profile`}
              </p>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="gap-2 bg-amber-600 hover:bg-amber-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {ru ? "Генерирую..." : "Generating..."}
                </>
              ) : (
                <>
                  <Crown className="h-4 w-4" />
                  {ru ? "Сгенерировать отчёт" : "Generate report"}
                </>
              )}
            </Button>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-600" />
                {ru ? "Ваш психологический профиль" : "Your Psychological Profile"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {report.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) {
                    return <h2 key={i} className="text-lg font-semibold mt-6 mb-2">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith("### ")) {
                    return <h3 key={i} className="text-base font-semibold mt-4 mb-1">{line.slice(4)}</h3>;
                  }
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return <p key={i} className="font-semibold">{line.slice(2, -2)}</p>;
                  }
                  if (line.startsWith("- ")) {
                    return <p key={i} className="flex gap-2 text-sm"><span className="text-muted-foreground">•</span>{line.slice(2)}</p>;
                  }
                  if (line === "") {
                    return <div key={i} className="h-2" />;
                  }
                  return <p key={i} className="text-sm leading-relaxed">{line}</p>;
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={handleGenerate}
              disabled={loading}
              className="gap-2 text-muted-foreground"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
              {ru ? "Обновить отчёт" : "Regenerate report"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
