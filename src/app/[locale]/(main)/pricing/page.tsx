"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check, Zap, Loader2, Bot, CheckCircle2, ArrowRight,
  MessageSquare, CreditCard, Crown, Sparkles, Infinity, X,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { usePlan } from "@/hooks/usePlan";
import { Link } from "@/lib/i18n/navigation";
import {
  DS_SESSIONS, CL_SESSIONS,
  DS_MSG_LIMIT, CL_MSG_LIMIT, FREE_MSG_LIMIT,
  getSessionPrice, formatPrice, REPORT_PRICE_LABEL, Provider,
  SUB_PLANS, SubPlan,
} from "@/lib/payment/plans";

export default function PricingPage() {
  const locale = useLocale() as "ru" | "en";
  const { user } = useUser();
  const { plan, loading: planLoading, refresh, subscriptionPlan, subscriptionExpiresAt, subscriptionCancelled, isSubActive } = usePlan();
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment") === "success";
  const paymentType = searchParams.get("type");

  const [dsSessions, setDsSessions] = useState<number>(3);
  const [clSessions, setClSessions] = useState<number>(5);

  useEffect(() => {
    if (paymentSuccess) refresh();
  }, [paymentSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  const ru = locale === "ru";
  const isLoaded = !planLoading;

  const currentDsSessions = plan?.deepseek_sessions ?? 0;
  const hasReport = plan?.has_report ?? false;
  const freeSessionUsed = plan?.free_session_used ?? false;
  const freeAnalysisUsed = plan?.free_analysis_used ?? false;

  const sessionsOpts = DS_SESSIONS;
  const msgLimit = DS_MSG_LIMIT;
  const priceKopecks = getSessionPrice("deepseek", dsSessions);

  const handlePurchase = async () => {
    if (!user) { window.location.href = `/${locale}/login?next=/${locale}/pricing`; return; } // eslint-disable-line react-hooks/immutability
    setPurchaseLoading("config");
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "config", provider: "deepseek" as Provider, sessions: dsSessions }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url; // eslint-disable-line react-hooks/immutability
      else alert(data.error || "Payment error");
    } catch { alert("Payment error"); }
    finally { setPurchaseLoading(null); }
  };

  const handleReportPurchase = async () => {
    if (!user) { window.location.href = `/${locale}/login?next=/${locale}/pricing`; return; } // eslint-disable-line react-hooks/immutability
    setPurchaseLoading("report");
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "report" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url; // eslint-disable-line react-hooks/immutability
      else alert(data.error || "Payment error");
    } catch { alert("Payment error"); }
    finally { setPurchaseLoading(null); }
  };

  const handleSubPurchase = async (planId: SubPlan) => {
    if (!user) { window.location.href = `/${locale}/login?next=/${locale}/pricing`; return; } // eslint-disable-line react-hooks/immutability
    setPurchaseLoading(`sub_${planId}`);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "subscription", plan: planId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url; // eslint-disable-line react-hooks/immutability
      else alert(data.error || "Payment error");
    } catch { alert("Payment error"); }
    finally { setPurchaseLoading(null); }
  };

  const handleCancelSubscription = async () => {
    if (!confirm(ru ? "Отменить подписку? Доступ сохранится до конца оплаченного периода." : "Cancel subscription? Access continues until the end of the paid period.")) return;
    setCancelLoading(true);
    try {
      const res = await fetch("/api/subscription/cancel", { method: "POST" });
      const data = await res.json();
      if (data.ok) { await refresh(); }
      else alert(data.error || "Error");
    } catch { alert("Error"); }
    finally { setCancelLoading(false); }
  };

  const stepBtn = (active: boolean) =>
    `h-10 px-5 rounded-lg border text-sm font-medium transition-all ${
      active
        ? "bg-blue-500 text-white border-blue-500 shadow-sm"
        : "border-border hover:border-muted-foreground/40 bg-background"
    }`;

  const formatExpiry = (iso: string) =>
    new Date(iso).toLocaleDateString(ru ? "ru-RU" : "en-US", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className={`mx-auto max-w-3xl space-y-10 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

      {/* Success banner */}
      {paymentSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">
              {paymentType === "subscription"
                ? (ru ? "Подписка активирована!" : "Subscription activated!")
                : (ru ? "Оплата прошла!" : "Payment successful!")}
            </p>
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
      <div>
        <h1 className="text-3xl font-bold">{ru ? "Тарифы" : "Pricing"}</h1>
        <p className="text-muted-foreground mt-1">
          {ru
            ? "Все тесты бесплатно. Коуч и отчёт — по подписке или разово."
            : "All tests free. Coach and report — by subscription or one-time."}
        </p>
      </div>

      {/* ── SUBSCRIPTION PLANS ──────────────────────────────────────────────── */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{ru ? "Подписка" : "Subscription"}</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {(["pro", "max"] as SubPlan[]).map((planId) => {
            const sp = SUB_PLANS[planId];
            const isCurrentPlan = isSubActive && subscriptionPlan === planId;
            const isMax = planId === "max";
            const features = ru ? sp.featuresRu : sp.featuresEn;

            return (
              <Card
                key={planId}
                className={`relative transition-all duration-200 ${
                  isMax
                    ? "border-2 border-violet-500 shadow-lg shadow-violet-500/10"
                    : isCurrentPlan
                      ? "border-2 border-blue-500 shadow-md shadow-blue-500/10"
                      : "border"
                }`}
              >
                {isMax && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-violet-600 hover:bg-violet-600 text-white gap-1 px-3">
                      <Sparkles className="h-3 w-3" />
                      {ru ? "Лучший выбор" : "Best value"}
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold">{ru ? sp.nameRu : sp.nameEn}</span>
                      {isCurrentPlan && (
                        <Badge variant="outline" className="text-green-600 border-green-500 text-xs">
                          {subscriptionCancelled
                            ? (ru ? "Отменена" : "Cancelled")
                            : (ru ? "Активна" : "Active")}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-bold ${isMax ? "text-violet-600 dark:text-violet-400" : "text-blue-600 dark:text-blue-400"}`}>
                        {sp.priceLabel}
                      </span>
                      <span className="text-sm text-muted-foreground">{ru ? "/мес" : "/mo"}</span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        {planId === "max" && i === 0
                          ? <Infinity className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
                          : <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        }
                        {f}
                      </li>
                    ))}
                  </ul>

                  {isCurrentPlan ? (
                    <div className="space-y-2">
                      {subscriptionExpiresAt && (
                        <p className="text-xs text-muted-foreground">
                          {subscriptionCancelled
                            ? (ru ? `Доступ до ${formatExpiry(subscriptionExpiresAt)}` : `Access until ${formatExpiry(subscriptionExpiresAt)}`)
                            : (ru ? `Следующее списание ${formatExpiry(subscriptionExpiresAt)}` : `Next charge ${formatExpiry(subscriptionExpiresAt)}`)}
                        </p>
                      )}
                      {!subscriptionCancelled && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full gap-1.5 text-muted-foreground hover:text-destructive text-xs"
                          onClick={handleCancelSubscription}
                          disabled={cancelLoading}
                        >
                          {cancelLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3" />}
                          {ru ? "Отменить подписку" : "Cancel subscription"}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button
                      className={`w-full gap-2 ${isMax ? "bg-violet-600 hover:bg-violet-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                      onClick={() => handleSubPurchase(planId)}
                      disabled={purchaseLoading !== null}
                    >
                      {purchaseLoading === `sub_${planId}` ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          {ru ? "Оформить" : "Subscribe"}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          {ru
            ? "Отмена в любой момент — доступ сохраняется до конца периода. Автопродление через ЮКассу."
            : "Cancel anytime — access continues until end of period. Auto-renewal via YuKassa."}
        </p>
      </div>

      {/* ── FREE TIER ───────────────────────────────────────────────────────── */}
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
                  ? `Все тесты · 1 бесплатный чат (${FREE_MSG_LIMIT} сообщений) · 1 ИИ-анализ`
                  : `All tests · 1 free chat (${FREE_MSG_LIMIT} messages) · 1 AI analysis`}
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

      {/* ── SESSION BUNDLES (one-time) ───────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground px-1 whitespace-nowrap">
            {ru ? "Или разовая покупка сессий" : "Or buy sessions one-time"}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            {ru
              ? "Сессии не сгорают — используй в своём темпе"
              : "Sessions never expire — use at your own pace"}
          </p>
        </div>

        {(currentDsSessions > 0 || hasReport) && (
          <div className="shrink-0 rounded-lg border bg-card px-4 py-3 text-sm space-y-1.5">
            {currentDsSessions > 0 && (
              <div className="flex items-center gap-2">
                <Bot className="h-3.5 w-3.5 text-blue-500" />
                <span className="font-medium">{currentDsSessions}</span>
                <span className="text-muted-foreground">
                  {ru ? "сессий" : "sessions"} · {DS_MSG_LIMIT} {ru ? "сообщ/с" : "msg/s"}
                </span>
              </div>
            )}
            {hasReport && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                <span className="text-muted-foreground">{ru ? "Полный отчёт доступен" : "Full Report available"}</span>
              </div>
            )}
          </div>
        )}

        <Card className="border-2 border-blue-500/30 transition-all duration-200">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/15">
              <Bot className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">
                {ru ? `ИИ-коуч · до ${DS_MSG_LIMIT} сообщений на сессию` : `AI coach · up to ${DS_MSG_LIMIT} messages per session`}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {ru ? "Количество сессий" : "Number of sessions"}
              </p>
              <div className="flex flex-wrap gap-2">
                {sessionsOpts.map(s => (
                  <button key={s} onClick={() => setDsSessions(s)} className={stepBtn(dsSessions === s)}>
                    {s} {ru ? "сессий" : "sessions"}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-5 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {priceKopecks ? formatPrice(priceKopecks) : "—"}
                  </span>
                  <span className="text-xs text-muted-foreground">{ru ? "разово" : "one-time"}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {dsSessions} {ru ? "сессий · до" : "sessions · up to"} {msgLimit} {ru ? "сообщ/сессию" : "msg/session"}
                </p>
              </div>
              <Button
                size="lg"
                className="gap-2 min-w-[150px] bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handlePurchase}
                disabled={purchaseLoading !== null || !priceKopecks}
              >
                {purchaseLoading === "config" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {currentDsSessions > 0 ? (ru ? "Добавить ещё" : "Add more") : (ru ? "Купить" : "Buy")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              {(ru
                ? ["ИИ видит результаты ваших тестов", "История разговоров сохраняется", "Сессии не сгорают"]
                : ["AI sees your test results", "Chat history saved", "Sessions never expire"]
              ).map((f, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-green-500" />
                  {f}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── FULL REPORT ──────────────────────────────────────────────────────── */}
      {!hasReport && !isSubActive && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground px-1 whitespace-nowrap">
              {ru ? "Разовый доступ к отчёту" : "One-time report access"}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="rounded-xl border border-amber-500/25 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent p-6">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-700 dark:text-amber-400 mb-4">
              <CreditCard className="h-3 w-3" />
              {ru ? "Разовая оплата — не требует подписки" : "One-time payment — no subscription required"}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Crown className="h-5 w-5 text-amber-600 shrink-0" />
                  <h2 className="text-xl font-bold">{ru ? "Полный отчёт" : "Full Report"}</h2>
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* If subscribed, show report as included */}
      {isSubActive && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
          <p className="text-sm text-green-700 dark:text-green-400">
            {ru ? "Полный отчёт включён в вашу подписку." : "Full report is included in your subscription."}
            {" "}
            <Link href="/full-report" className="underline underline-offset-2">{ru ? "Открыть" : "Open"}</Link>
          </p>
        </div>
      )}
    </div>
  );
}
