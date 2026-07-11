"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check, Zap, Loader2, Bot, CheckCircle2, ArrowRight, Brain,
  MessageSquare, CreditCard, Crown,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { usePlan } from "@/hooks/usePlan";
import { Link } from "@/lib/i18n/navigation";
import {
  DS_SESSIONS, CL_SESSIONS,
  DS_MSG_LIMIT, CL_MSG_LIMIT,
  getSessionPrice, formatPrice, REPORT_PRICE_LABEL, Provider,
} from "@/lib/payment/plans";

export default function PricingPage() {
  const locale = useLocale() as "ru" | "en";
  const { user } = useUser();
  const { plan, loading: planLoading, refresh } = usePlan();
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment") === "success";

  const [provider, setProvider] = useState<Provider>("deepseek");
  const [dsSessions, setDsSessions] = useState<number>(5);
  const [clSessions, setClSessions] = useState<number>(5);

  useEffect(() => {
    if (paymentSuccess) refresh();
  }, [paymentSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  const ru = locale === "ru";
  const isLoaded = !planLoading;
  const isDs = provider === "deepseek";

  const currentDsSessions = plan?.deepseek_sessions ?? 0;
  const currentDsMsgLimit = plan?.deepseek_msg_limit ?? 20;
  const currentClSessions = plan?.claude_sessions ?? 0;
  const currentClMsgLimit = plan?.claude_msg_limit ?? 0;
  const hasReport = plan?.has_report ?? false;
  const freeSessionUsed = plan?.free_session_used ?? false;
  const freeAnalysisUsed = plan?.free_analysis_used ?? false;

  const sessions = isDs ? dsSessions : clSessions;
  const sessionsOpts = isDs ? DS_SESSIONS : CL_SESSIONS;
  const msgLimit = isDs ? DS_MSG_LIMIT : CL_MSG_LIMIT;

  const handleSessionChange = (s: number) => {
    if (isDs) setDsSessions(s); else setClSessions(s);
  };

  const priceKopecks = getSessionPrice(provider, sessions);

  const handlePurchase = async () => {
    if (!user) {
      window.location.href = `/${locale}/login?next=/${locale}/pricing`; // eslint-disable-line react-hooks/immutability
      return;
    }
    setPurchaseLoading("config");
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "config", provider, sessions }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // eslint-disable-line react-hooks/immutability
      } else {
        alert(data.error || "Payment error");
      }
    } catch {
      alert("Payment error");
    } finally {
      setPurchaseLoading(null);
    }
  };

  const handleReportPurchase = async () => {
    if (!user) {
      window.location.href = `/${locale}/login?next=/${locale}/pricing`; // eslint-disable-line react-hooks/immutability
      return;
    }
    setPurchaseLoading("report");
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "report" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // eslint-disable-line react-hooks/immutability
      } else {
        alert(data.error || "Payment error");
      }
    } catch {
      alert("Payment error");
    } finally {
      setPurchaseLoading(null);
    }
  };

  const accentClass = isDs
    ? "text-blue-600 dark:text-blue-400"
    : "text-orange-600 dark:text-orange-400";
  const borderActiveClass = isDs
    ? "border-2 border-blue-500 shadow-md shadow-blue-500/10"
    : "border-2 border-orange-500 shadow-md shadow-orange-500/10";
  const buyBtnClass = isDs
    ? "bg-blue-500 hover:bg-blue-600 text-white"
    : "bg-orange-500 hover:bg-orange-600 text-white";

  const stepBtn = (active: boolean) =>
    `h-10 px-5 rounded-lg border text-sm font-medium transition-all ${
      active
        ? isDs
          ? "bg-blue-500 text-white border-blue-500 shadow-sm"
          : "bg-orange-500 text-white border-orange-500 shadow-sm"
        : "border-border hover:border-muted-foreground/40 bg-background"
    }`;

  const hasCurrentSessions = isDs ? currentDsSessions > 0 : currentClSessions > 0;

  return (
    <div className={`mx-auto max-w-3xl space-y-10 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

      {/* Success banner */}
      {paymentSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">{ru ? "Оплата прошла!" : "Payment successful!"}</p>
            <p className="text-sm opacity-80">{ru ? "Сессии зачислены." : "Sessions added."}</p>
          </div>
          <Link href="/coach">
            <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white">
              <MessageSquare className="h-4 w-4" />
              {ru ? "Открыть коуч" : "Open coach"}
            </Button>
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{ru ? "Тарифы" : "Pricing"}</h1>
          <p className="text-muted-foreground mt-1 max-w-lg">
            {ru
              ? "Тесты и 1 бесплатный чат — навсегда бесплатно. Больше сессий — платно."
              : "Tests and 1 free chat — free forever. More sessions — paid."}
          </p>
        </div>

        {(currentDsSessions > 0 || currentClSessions > 0 || hasReport) && (
          <div className="shrink-0 rounded-lg border bg-card px-4 py-3 text-sm space-y-1.5">
            {currentDsSessions > 0 && (
              <div className="flex items-center gap-2">
                <Bot className="h-3.5 w-3.5 text-blue-500" />
                <span className="font-medium">{currentDsSessions}</span>
                <span className="text-muted-foreground">
                  DeepSeek {ru ? "сессий" : "sessions"} · {currentDsMsgLimit} {ru ? "сообщ/с" : "msg/s"}
                </span>
              </div>
            )}
            {currentClSessions > 0 && (
              <div className="flex items-center gap-2">
                <Brain className="h-3.5 w-3.5 text-orange-500" />
                <span className="font-medium">{currentClSessions}</span>
                <span className="text-muted-foreground">
                  Claude {ru ? "сессий" : "sessions"} · {currentClMsgLimit} {ru ? "сообщ/с" : "msg/s"}
                </span>
              </div>
            )}
            {hasReport && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                <span className="text-muted-foreground">{ru ? "Полный отчёт доступен" : "Full Report available"}</span>
              </div>
            )}
            <Link href="/coach">
              <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs px-2 w-full justify-start mt-1">
                <MessageSquare className="h-3 w-3" />
                {ru ? "Перейти в коуч" : "Go to coach"}
                <ArrowRight className="h-3 w-3 ml-auto" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Free tier */}
      <div className="rounded-xl border border-dashed bg-muted/20 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold">{ru ? "Бесплатно" : "Free"}</p>
                <span className="text-xl font-bold">0 ₽</span>
                <span className="text-xs text-muted-foreground">{ru ? "навсегда" : "forever"}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {ru
                  ? "Все тесты · 1 DeepSeek чат (20 сообщений) · 1 ИИ-анализ"
                  : "All tests · 1 DeepSeek chat (20 messages) · 1 AI analysis"}
              </p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            {freeSessionUsed ? (
              <p className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {ru ? "Бесплатный чат использован" : "Free chat used"}
              </p>
            ) : (
              <p className="text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {ru ? "Бесплатный чат доступен" : "Free chat available"}
              </p>
            )}
            {freeAnalysisUsed ? (
              <p className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {ru ? "Бесплатный анализ использован" : "Free analysis used"}
              </p>
            ) : (
              <p className="text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {ru ? "Бесплатный анализ доступен" : "Free analysis available"}
              </p>
            )}
          </div>
          {!user ? (
            <Link href="/signup">
              <Button variant="outline">{ru ? "Зарегистрироваться" : "Sign up"}</Button>
            </Link>
          ) : (
            <Link href="/coach">
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                {ru ? "Открыть коуч" : "Open coach"}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* ── CONFIGURATOR ─────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{ru ? "Коуч-сессии" : "Coaching Sessions"}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {ru
              ? "1 сессия = 1 разговор с ИИ-коучем на любую тему"
              : "1 session = 1 conversation with AI coach on any topic"}
          </p>
        </div>

        <Card className={`transition-all duration-200 ${borderActiveClass}`}>
          <CardContent className="p-6 space-y-6">

            {/* Model info */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <Bot className="h-5 w-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-400">DeepSeek</p>
                <p className="text-xs text-muted-foreground">
                  {ru ? "до 100 сообщений на сессию" : "up to 100 messages per session"}
                </p>
              </div>
            </div>

            {/* Sessions selector */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {ru ? "Количество сессий" : "Number of sessions"}
              </p>
              <div className="flex flex-wrap gap-2">
                {sessionsOpts.map(s => (
                  <button key={s} onClick={() => handleSessionChange(s)} className={stepBtn(sessions === s)}>
                    {s} {ru ? "сессий" : "sessions"}
                  </button>
                ))}
              </div>
            </div>

            {/* Price + Buy */}
            <div className="border-t pt-5 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-4xl font-bold ${accentClass}`}>
                    {priceKopecks ? formatPrice(priceKopecks) : "—"}
                  </span>
                  <span className="text-xs text-muted-foreground">{ru ? "разово" : "one-time"}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {sessions} {ru ? "сессий · до" : "sessions · up to"} {msgLimit} {ru ? "сообщ/сессию" : "msg/session"}
                </p>
              </div>
              <Button
                size="lg"
                className={`gap-2 min-w-[150px] ${buyBtnClass}`}
                onClick={handlePurchase}
                disabled={purchaseLoading !== null || !priceKopecks}
              >
                {purchaseLoading === "config" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {hasCurrentSessions ? (ru ? "Добавить ещё" : "Add more") : (ru ? "Купить" : "Buy")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Included */}
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" />
                {ru ? "ИИ видит результаты ваших тестов" : "AI sees your test results"}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" />
                {ru ? "История разговоров сохраняется" : "Chat history saved"}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" />
                {ru ? "Сессии не сгорают" : "Sessions never expire"}
              </span>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* ── FULL REPORT ──────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground px-1 whitespace-nowrap">
            {ru ? "Без подписки — отдельно" : "Without subscription — standalone"}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className={`rounded-xl border p-6 transition-all duration-200 ${
          hasReport
            ? "border-amber-500/60 bg-amber-500/5"
            : "border-amber-500/25 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent"
        }`}>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-700 dark:text-amber-400 mb-4">
            <CreditCard className="h-3 w-3" />
            {ru ? "Разовая оплата — не требует тарифа" : "One-time payment — no plan required"}
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-amber-600 shrink-0" />
                <h2 className="text-xl font-bold">{ru ? "Полный отчёт" : "Full Report"}</h2>
                {hasReport && (
                  <Badge className="bg-amber-500 hover:bg-amber-500 gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {ru ? "Доступен" : "Available"}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {ru
                  ? "ИИ анализирует все ваши тесты и создаёт комплексный профиль личности с рекомендациями"
                  : "AI analyzes all your tests and creates a comprehensive personality profile with recommendations"}
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {(ru
                  ? ["Анализ всех пройденных тестов", "Комплексный профиль личности", "Сильные стороны и зоны роста", "Практические рекомендации"]
                  : ["All completed tests analyzed", "Comprehensive personality profile", "Strengths and growth areas", "Practical recommendations"]
                ).map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-amber-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-3 shrink-0">
              <div className="sm:text-right">
                <div className="text-3xl font-bold">{REPORT_PRICE_LABEL}</div>
                <p className="text-xs text-muted-foreground">{ru ? "один раз" : "once"}</p>
              </div>
              {hasReport ? (
                <Link href="/full-report">
                  <Button
                    variant="outline"
                    className="gap-2 border-amber-500/50 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500"
                  >
                    {ru ? "Открыть отчёт" : "View report"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  className="gap-2 min-w-[120px]"
                  onClick={handleReportPurchase}
                  disabled={purchaseLoading !== null}
                >
                  {purchaseLoading === "report" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    ru ? "Купить отчёт" : "Buy report"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {ru
          ? "Сессии не сгорают — используй в своём темпе"
          : "Sessions never expire — use at your own pace"}
      </p>
    </div>
  );
}
