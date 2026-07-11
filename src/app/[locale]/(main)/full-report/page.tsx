"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Loader2, RotateCcw, ArrowLeft, Lock, Sparkles, Printer } from "lucide-react";
import { getResults, StoredResult } from "@/lib/test-engine/results-store";
import { getTestMeta } from "@/lib/test-engine/test-registry";
import { Link } from "@/lib/i18n/navigation";
import { usePlan } from "@/hooks/usePlan";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { MarkdownText } from "@/components/ui/markdown-text";

const LOCKED_SECTIONS_RU = [
  {
    title: "Сильные стороны",
    excerpt:
      "Ваши результаты указывают на развитые аналитические способности и высокую концентрацию. Вы способны удерживать внимание на задаче длительное время и находить нестандартные решения в сложных ситуациях...",
  },
  {
    title: "Зоны роста",
    excerpt:
      "Анализ показывает несколько направлений для развития. Прежде всего, это навык принятия решений в условиях неопределённости — ваш профиль говорит о склонности к излишней осторожности...",
  },
  {
    title: "Взаимосвязи черт личности",
    excerpt:
      "Ваши показатели по шкале открытости опыту тесно связаны с результатами теста на эмоциональный интеллект. Это создаёт интересный паттерн: высокая восприимчивость к новому в сочетании с...",
  },
  {
    title: "Карьера и призвание",
    excerpt:
      "Психологический профиль говорит об особой предрасположенности к деятельности, где важны системное мышление и работа с информацией. Среди рекомендуемых направлений — сферы, связанные с...",
  },
  {
    title: "Отношения и коммуникация",
    excerpt:
      "В межличностных взаимодействиях вы тяготеете к глубоким и значимым связям. Ваш стиль общения предполагает вдумчивость и избирательность — вы предпочитаете небольшой круг близких людей...",
  },
  {
    title: "Эмоциональный интеллект",
    excerpt:
      "Ваши результаты в этой области выше среднего. Вы хорошо распознаёте эмоции других людей, что делает вас чутким собеседником. Вместе с тем анализ показывает определённую сложность...",
  },
  {
    title: "Практические рекомендации",
    excerpt:
      "На основе всего анализа составлены конкретные рекомендации. Первый приоритет — ежедневная практика, укрепляющая ваши сильные стороны. Особое внимание рекомендуется уделить навыку...",
  },
];

const LOCKED_SECTIONS_EN = [
  {
    title: "Strengths",
    excerpt:
      "Your results indicate strong analytical abilities and high concentration. You can stay focused on a task for extended periods and find non-standard solutions in complex situations...",
  },
  {
    title: "Growth Areas",
    excerpt:
      "The analysis identifies several development directions. Primarily, this is the skill of decision-making under uncertainty — your profile suggests a tendency toward excessive caution...",
  },
  {
    title: "Personality Trait Connections",
    excerpt:
      "Your scores on the openness-to-experience scale are closely linked to emotional intelligence test results. This creates an interesting pattern: high receptivity to new experiences combined with...",
  },
  {
    title: "Career & Purpose",
    excerpt:
      "Your psychological profile indicates a special predisposition for activities where systematic thinking and information work are important. Recommended fields include areas related to...",
  },
  {
    title: "Relationships & Communication",
    excerpt:
      "In interpersonal interactions, you gravitate toward deep and meaningful connections. Your communication style involves thoughtfulness and selectivity — you prefer a small circle of close people...",
  },
  {
    title: "Emotional Intelligence",
    excerpt:
      "Your results in this area are above average. You are good at recognizing other people's emotions, which makes you an attentive conversationalist. At the same time, the analysis shows a certain complexity...",
  },
  {
    title: "Practical Recommendations",
    excerpt:
      "Based on the full analysis, specific recommendations have been compiled. The first priority is daily practice that strengthens your strengths. Special attention is recommended for the skill of...",
  },
];

const SECTIONS_RU = [
  "Общий портрет",
  "Сильные стороны",
  "Зоны роста",
  "Взаимосвязи черт",
  "Карьера и призвание",
  "Отношения",
  "Эмоциональный интеллект",
  "Рекомендации",
];

const SECTIONS_EN = [
  "General Portrait",
  "Strengths",
  "Growth Areas",
  "Trait Connections",
  "Career & Purpose",
  "Relationships",
  "Emotional Intelligence",
  "Recommendations",
];

function formatDate(iso: string, loc: string) {
  return new Date(iso).toLocaleDateString(loc === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function FullReportPage() {
  const locale = useLocale() as "ru" | "en";
  const { user } = useUser();
  const { hasReport, loading: planLoading } = usePlan();
  const [results, setResults] = useState<StoredResult[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  // undefined = not yet fetched from DB; null = fetched, no report; string = report content
  const [fullReport, setFullReport] = useState<string | null | undefined>(undefined);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingFull, setLoadingFull] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [fullError, setFullError] = useState<string | null>(null);
  const autoGeneratedRef = useRef(false);

  const ru = locale === "ru";
  const lockedSections = ru ? LOCKED_SECTIONS_RU : LOCKED_SECTIONS_EN;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResults(getResults());
  }, []);

  // Load saved report from DB for paid users
  useEffect(() => {
    if (!user || !hasReport || planLoading) return;
    const supabase = createClient();
    supabase
      .from("user_reports")
      .select("content, updated_at")
      .eq("user_id", user.id)
      .eq("locale", locale)
      .single()
      .then(({ data }) => {
        setFullReport(data?.content ?? null);
        if (data?.updated_at) setSavedAt(data.updated_at);
      });
  }, [user, hasReport, planLoading, locale]);

  useEffect(() => {
    if (
      !planLoading &&
      user &&
      !hasReport &&
      results.length > 0 &&
      !autoGeneratedRef.current
    ) {
      autoGeneratedRef.current = true;
      setLoadingPreview(true);
      fetch("/api/ai/report/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, results }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.preview) setPreview(data.preview);
          else setPreviewError(data.error || "Error");
        })
        .catch((e) => setPreviewError(e.message))
        .finally(() => setLoadingPreview(false));
    }
  }, [planLoading, user, hasReport, results, locale]);

  const handleGenerateFull = async () => {
    setLoadingFull(true);
    setFullError(null);
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
      setFullReport(data.report);
      setSavedAt(data.savedAt ?? null);
    } catch (err) {
      setFullError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoadingFull(false);
    }
  };

  if (planLoading || (hasReport && fullReport === undefined)) {
    return (
      <div className="mx-auto max-w-3xl py-16 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="print:hidden">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-amber-600" />
          <h1 className="text-2xl font-bold">
            {ru ? "Психологический отчёт" : "Psychological Report"}
          </h1>
        </div>
      </div>

      {/* Not logged in */}
      {!user ? (
        <Card className="border-amber-500/25">
          <CardContent className="flex flex-col items-center text-center py-12 gap-4">
            <Crown className="h-12 w-12 text-amber-500/40" />
            <p className="text-sm text-muted-foreground">
              {ru
                ? "Войдите в аккаунт для доступа к отчёту"
                : "Sign in to access your report"}
            </p>
            <Link href={`/${locale}/login?next=/${locale}/full-report`}>
              <Button>{ru ? "Войти" : "Sign in"}</Button>
            </Link>
          </CardContent>
        </Card>
      ) : results.length === 0 ? (
        /* No tests */
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
      ) : hasReport ? (
        /* Paid user — show full report */
        <>
          {fullReport === null ? (
            <Card>
              <CardContent className="py-8 space-y-6">
                {/* Title */}
                <div className="text-center space-y-2">
                  <Crown className="h-10 w-10 text-amber-500/50 mx-auto" />
                  <h2 className="text-lg font-semibold">
                    {ru ? "Полный психологический отчёт" : "Full Psychological Report"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {ru
                      ? `${results.length} тест${results.length === 1 ? "" : results.length < 5 ? "а" : "ов"} → 8 разделов · ~30–40 секунд`
                      : `${results.length} test${results.length > 1 ? "s" : ""} → 8 sections · ~30–40 seconds`}
                  </p>
                </div>

                {/* Tests included */}
                <div className="border rounded-lg p-4 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {ru ? "Входят данные из тестов:" : "Based on your tests:"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {results.map((r) => {
                      const meta = getTestMeta(r.testSlug);
                      return (
                        <span
                          key={r.testSlug}
                          className="text-xs bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5"
                        >
                          {ru ? (meta?.nameRu ?? r.testSlug) : (meta?.nameEn ?? r.testSlug)}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* 8 sections */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {(ru ? SECTIONS_RU : SECTIONS_EN).map((name, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-xs text-amber-600 font-semibold w-4 shrink-0">{i + 1}.</span>
                      {name}
                    </div>
                  ))}
                </div>

                {/* Persistence note */}
                <p className="text-xs text-center text-muted-foreground">
                  {ru
                    ? "Отчёт сохраняется — можно открыть с любого устройства в любое время"
                    : "Report is saved — accessible from any device at any time"}
                </p>

                {/* Generate button */}
                <div className="flex flex-col items-center gap-2">
                  <Button
                    onClick={handleGenerateFull}
                    disabled={loadingFull}
                    className="gap-2 bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    {loadingFull ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {ru ? "Генерирую отчёт..." : "Generating report..."}
                      </>
                    ) : (
                      <>
                        <Crown className="h-4 w-4" />
                        {ru ? "Сгенерировать отчёт" : "Generate report"}
                      </>
                    )}
                  </Button>
                  {fullError && (
                    <p className="text-sm text-destructive">{fullError}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-amber-600" />
                      {ru ? "Ваш психологический профиль" : "Your Psychological Profile"}
                    </CardTitle>
                    {savedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {ru ? "Создан" : "Created"} {formatDate(savedAt, locale)}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    className="print:hidden shrink-0 gap-1.5 text-xs"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    {ru ? "PDF" : "PDF"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <MarkdownText text={fullReport ?? ""} />
                <div className="flex justify-center mt-6 print:hidden">
                  <Button
                    variant="ghost"
                    onClick={handleGenerateFull}
                    disabled={loadingFull}
                    className="gap-2 text-muted-foreground text-xs"
                  >
                    {loadingFull ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <RotateCcw className="h-3 w-3" />
                    )}
                    {ru ? "Обновить отчёт" : "Regenerate report"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        /* Free user — preview section 1 + locked sections */
        <>
          {/* Section 1: free */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>{ru ? "Раздел 1 — Общий портрет" : "Section 1 — General Portrait"}</span>
                <span className="ml-auto text-xs font-normal text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {ru ? "Бесплатно" : "Free"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingPreview ? (
                <div className="flex items-center gap-3 py-8 justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {ru
                      ? "ИИ анализирует ваши результаты..."
                      : "AI is analyzing your results..."}
                  </span>
                </div>
              ) : preview ? (
                <MarkdownText text={preview} />
              ) : (
                <div className="flex flex-col items-center py-8 gap-3">
                  {previewError && (
                    <p className="text-sm text-destructive">{previewError}</p>
                  )}
                  <Button
                    onClick={() => {
                      autoGeneratedRef.current = false;
                      setPreviewError(null);
                      setLoadingPreview(true);
                      fetch("/api/ai/report/preview", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ locale, results }),
                      })
                        .then((r) => r.json())
                        .then((data) => {
                          if (data.preview) setPreview(data.preview);
                          else setPreviewError(data.error || "Error");
                        })
                        .catch((e) => setPreviewError(e.message))
                        .finally(() => setLoadingPreview(false));
                    }}
                    variant="outline"
                    className="gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    {ru ? "Получить превью" : "Get preview"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Locked sections */}
          <div className="space-y-2">
            {lockedSections.map((section, i) => (
              <div
                key={i}
                className="relative rounded-xl border border-border overflow-hidden"
              >
                <div className="p-5 blur-sm select-none pointer-events-none opacity-40">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {ru ? `Раздел ${i + 2}` : `Section ${i + 2}`}
                  </p>
                  <h3 className="font-semibold text-sm mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.excerpt}
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                    <span className="font-medium">{section.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buy CTA */}
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="flex flex-col items-center text-center py-8 gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
                <Crown className="h-7 w-7 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  {ru ? "Полный отчёт — ещё 7 разделов" : "Full Report — 7 more sections"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                  {ru
                    ? "Сильные стороны, зоны роста, карьера, отношения, эмоциональный интеллект и конкретный план развития"
                    : "Strengths, growth areas, career, relationships, emotional intelligence and a concrete development plan"}
                </p>
              </div>
              <Link href={`/${locale}/pricing`}>
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
                >
                  <Crown className="h-4 w-4" />
                  {ru ? "Получить полный отчёт — 299 ₽" : "Get full report — 299 ₽"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
