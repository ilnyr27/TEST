"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check, X, Sparkles, Zap, Crown, Loader2,
  Bot, CheckCircle2, ArrowRight, Brain, MessageSquare,
  CreditCard, Clock,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { usePlan } from "@/hooks/usePlan";
import { Link } from "@/lib/i18n/navigation";
import { PLANS } from "@/lib/payment/plans";

export default function PricingPage() {
  const locale = useLocale() as "ru" | "en";
  const { user } = useUser();
  const { plan, loading: planLoading, refresh } = usePlan();
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment") === "success";

  useEffect(() => {
    if (paymentSuccess) refresh();
  }, [paymentSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePurchase = async (planType: string) => {
    if (!user) {
      window.location.href = `/${locale}/login?next=/${locale}/pricing`; // eslint-disable-line react-hooks/immutability
      return;
    }
    setPurchaseLoading(planType);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType: planType }),
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

  const ru = locale === "ru";
  const isLoaded = !planLoading;

  const dsSessions = plan?.deepseek_sessions ?? 0;
  const dsMsgLimit = plan?.deepseek_msg_limit ?? 20;
  const clSessions = plan?.claude_sessions ?? 0;
  const clMsgLimit = plan?.claude_msg_limit ?? 0;
  const hasReport = plan?.has_report ?? false;
  const freeSessionUsed = plan?.free_session_used ?? false;
  const freeAnalysisUsed = plan?.free_analysis_used ?? false;

  // Determine which specific tier card is active for this user
  const activeDsPlan: string | null = (() => {
    if (dsSessions <= 0) return null;
    if (dsMsgLimit >= 1000) return "ds_3";
    if (dsMsgLimit >= 300) return "ds_2";
    return "ds_1";
  })();

  const activeClPlan: string | null = (() => {
    if (clSessions <= 0) return null;
    if (clMsgLimit >= 40) return "cl_3";
    if (clMsgLimit >= 30) return "cl_2";
    return "cl_1";
  })();

  const dsPacks = [
    {
      planType: "ds_1" as const,
      icon: <Zap className="h-5 w-5" />,
      name: ru ? "DeepSeek Старт" : "DeepSeek Starter",
      popular: !freeSessionUsed && dsSessions === 0,
      features: ru
        ? [
            "5 сессий с ИИ-коучем",
            `${PLANS.ds_1.msgLimit} сообщений / сессия`,
            "ИИ-анализ тестов",
          ]
        : [
            "5 AI coaching sessions",
            `${PLANS.ds_1.msgLimit} messages / session`,
            "AI test analysis",
          ],
      noFeatures: ru ? ["Полный отчёт"] : ["Full Report"],
    },
    {
      planType: "ds_2" as const,
      icon: <Sparkles className="h-5 w-5" />,
      name: ru ? "DeepSeek Продвинутый" : "DeepSeek Advanced",
      popular: freeSessionUsed && dsSessions === 0,
      features: ru
        ? [
            "15 сессий с ИИ-коучем",
            `${PLANS.ds_2.msgLimit} сообщений / сессия`,
            "ИИ-анализ тестов",
            "Полный отчёт",
          ]
        : [
            "15 AI coaching sessions",
            `${PLANS.ds_2.msgLimit} messages / session`,
            "AI test analysis",
            "Full Report",
          ],
      noFeatures: [],
    },
    {
      planType: "ds_3" as const,
      icon: <Crown className="h-5 w-5" />,
      name: ru ? "DeepSeek Профи" : "DeepSeek Pro",
      popular: false,
      features: ru
        ? [
            "50 сессий с ИИ-коучем",
            `${PLANS.ds_3.msgLimit} сообщений / сессия`,
            "ИИ-анализ тестов",
            "Полный отчёт",
          ]
        : [
            "50 AI coaching sessions",
            `${PLANS.ds_3.msgLimit} messages / session`,
            "AI test analysis",
            "Full Report",
          ],
      noFeatures: [],
    },
  ];

  const clPacks = [
    {
      planType: "cl_1" as const,
      icon: <Zap className="h-5 w-5" />,
      name: ru ? "Claude Старт" : "Claude Starter",
      popular: false,
      features: ru
        ? [
            "5 сессий с Claude",
            `${PLANS.cl_1.msgLimit} сообщений / сессия`,
            "ИИ-анализ тестов",
          ]
        : [
            "5 Claude sessions",
            `${PLANS.cl_1.msgLimit} messages / session`,
            "AI test analysis",
          ],
      noFeatures: ru ? ["Полный отчёт"] : ["Full Report"],
    },
    {
      planType: "cl_2" as const,
      icon: <Sparkles className="h-5 w-5" />,
      name: ru ? "Claude Продвинутый" : "Claude Advanced",
      popular: clSessions === 0,
      features: ru
        ? [
            "15 сессий с Claude",
            `${PLANS.cl_2.msgLimit} сообщений / сессия`,
            "ИИ-анализ тестов",
            "Полный отчёт",
          ]
        : [
            "15 Claude sessions",
            `${PLANS.cl_2.msgLimit} messages / session`,
            "AI test analysis",
            "Full Report",
          ],
      noFeatures: [],
    },
    {
      planType: "cl_3" as const,
      icon: <Crown className="h-5 w-5" />,
      name: ru ? "Claude Профи" : "Claude Pro",
      popular: false,
      features: ru
        ? [
            "30 сессий с Claude",
            `${PLANS.cl_3.msgLimit} сообщений / сессия`,
            "ИИ-анализ тестов",
            "Полный отчёт",
          ]
        : [
            "30 Claude sessions",
            `${PLANS.cl_3.msgLimit} messages / session`,
            "AI test analysis",
            "Full Report",
          ],
      noFeatures: [],
    },
  ];

  return (
    <div className={`mx-auto max-w-5xl space-y-10 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

      {/* Success banner */}
      {paymentSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          <div>
            <p className="font-semibold">{ru ? "Оплата прошла успешно!" : "Payment successful!"}</p>
            <p className="text-sm opacity-80">
              {ru ? "Сессии зачислены — открой коуч и начни." : "Sessions added — open the coach and start."}
            </p>
          </div>
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

        {/* Balance widget */}
        {(dsSessions > 0 || clSessions > 0 || hasReport) && (
          <div className="shrink-0 rounded-lg border bg-card px-4 py-3 text-sm space-y-1.5">
            {dsSessions > 0 && (
              <div className="flex items-center gap-2">
                <Bot className="h-3.5 w-3.5 text-blue-500" />
                <span className="font-medium">{dsSessions}</span>
                <span className="text-muted-foreground">DeepSeek {ru ? "сессий" : "sessions"}</span>
              </div>
            )}
            {clSessions > 0 && (
              <div className="flex items-center gap-2">
                <Brain className="h-3.5 w-3.5 text-orange-500" />
                <span className="font-medium">{clSessions}</span>
                <span className="text-muted-foreground">Claude {ru ? "сессий" : "sessions"}</span>
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

      {/* ── FREE TIER ──────────────────────────────────────────────────────── */}
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
                  ? "Все 11 тестов · 1 DeepSeek чат (20 сообщений) · 1 ИИ-анализ тестов"
                  : "All 11 tests · 1 DeepSeek chat (20 messages) · 1 AI test analysis"}
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
            <Link href={`/${locale}/login`}>
              <Button variant="outline">
                {ru ? "Зарегистрироваться" : "Sign up"}
              </Button>
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

      {/* ── DEEPSEEK SECTION ───────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              {ru ? "DeepSeek — Быстро и доступно" : "DeepSeek — Fast & Affordable"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {ru ? "Умный китайский ИИ, пишет по-русски" : "Smart AI, writes in your language"}
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {dsPacks.map((p) => {
            const planData = PLANS[p.planType];
            const isActive = activeDsPlan === p.planType;
            return (
              <div key={p.planType} className="relative pt-5">
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <Badge className="bg-blue-500 hover:bg-blue-500 shadow-sm whitespace-nowrap text-xs">
                      {ru ? "Ваш план" : "Your plan"}
                    </Badge>
                  </div>
                )}
                <Card className={`flex flex-col overflow-hidden transition-all duration-200 h-full ${
                  isActive
                    ? "border-2 border-blue-500 shadow-md shadow-blue-500/10"
                    : p.popular
                    ? "border-primary shadow-md shadow-primary/10"
                    : ""
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-center min-h-[28px] items-center mb-1">
                      {!isActive && p.popular ? (
                        <Badge className="whitespace-nowrap">
                          {ru ? "Популярный" : "Popular"}
                        </Badge>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                      {p.icon}
                      <CardTitle className="text-base">{p.name}</CardTitle>
                    </div>
                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="text-3xl font-bold">{planData.priceLabel}</span>
                      <span className="text-xs text-muted-foreground">{ru ? "разово" : "one-time"}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-2 flex-1 mb-4">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 shrink-0 mt-0.5 text-green-500" />
                          {f}
                        </li>
                      ))}
                      {p.noFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <X className="h-4 w-4 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {isActive && (
                      <div className="flex justify-between text-xs mb-3">
                        <span className="text-muted-foreground">{planData.sessions} {ru ? "сессий в пакете" : "in pack"}</span>
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{dsSessions} {ru ? "осталось" : "left"}</span>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      variant={isActive || dsSessions > 0 ? "outline" : "default"}
                      onClick={() => handlePurchase(p.planType)}
                      disabled={purchaseLoading !== null}
                    >
                      {purchaseLoading === p.planType ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : isActive || dsSessions > 0 ? (
                        ru ? "Добавить ещё" : "Add more"
                      ) : (
                        ru ? "Купить" : "Buy"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CLAUDE SECTION ─────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-orange-500" />
              {ru ? "Claude — Глубже и точнее" : "Claude — Deeper & More Precise"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {ru ? "Передовой ИИ от Anthropic (США)" : "Frontier AI from Anthropic (USA)"}
            </p>
          </div>

        </div>

        {/* Coming soon note */}
        <div className="flex items-center gap-2 rounded-lg border bg-amber-500/5 border-amber-500/20 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          {ru
            ? "Анализ результатов тестов от Claude — в разработке. Коуч-сессии с Claude работают уже сейчас."
            : "Claude test result analysis — coming soon. Claude coaching sessions work right now."}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {clPacks.map((p) => {
            const planData = PLANS[p.planType];
            const isActive = activeClPlan === p.planType;
            return (
              <div key={p.planType} className="relative pt-5">
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <Badge className="bg-orange-500 hover:bg-orange-500 shadow-sm whitespace-nowrap text-xs">
                      {ru ? "Ваш план" : "Your plan"}
                    </Badge>
                  </div>
                )}
                <Card className={`flex flex-col overflow-hidden transition-all duration-200 h-full ${
                  isActive
                    ? "border-2 border-orange-500 shadow-md shadow-orange-500/10"
                    : p.popular
                    ? "border-orange-500 shadow-md shadow-orange-500/10"
                    : ""
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-center min-h-[28px] items-center mb-1">
                      {!isActive && p.popular ? (
                        <Badge variant="outline" className="whitespace-nowrap border-orange-500 text-orange-600">
                          {ru ? "Популярный" : "Popular"}
                        </Badge>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                      {p.icon}
                      <CardTitle className="text-base">{p.name}</CardTitle>
                    </div>
                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="text-3xl font-bold">{planData.priceLabel}</span>
                      <span className="text-xs text-muted-foreground">{ru ? "разово" : "one-time"}</span>
                    </div>
                    <CardDescription className="text-xs text-orange-600/70 dark:text-orange-400/70">
                      {ru ? "Точнее чем DeepSeek" : "More precise than DeepSeek"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-2 flex-1 mb-4">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 shrink-0 mt-0.5 text-orange-500" />
                          {f}
                        </li>
                      ))}
                      {p.noFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <X className="h-4 w-4 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {isActive && (
                      <div className="flex justify-between text-xs mb-3">
                        <span className="text-muted-foreground">{planData.sessions} {ru ? "сессий в пакете" : "in pack"}</span>
                        <span className="text-orange-600 dark:text-orange-400 font-medium">{clSessions} {ru ? "осталось" : "left"}</span>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      variant={isActive || clSessions > 0 ? "outline" : "default"}
                      onClick={() => handlePurchase(p.planType)}
                      disabled={purchaseLoading !== null}
                    >
                      {purchaseLoading === p.planType ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : isActive || clSessions > 0 ? (
                        ru ? "Добавить ещё" : "Add more"
                      ) : (
                        ru ? "Купить" : "Buy"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FULL REPORT ────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
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
                <div className="text-3xl font-bold">{PLANS.report_addon.priceLabel}</div>
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
                  onClick={() => handlePurchase("report_addon")}
                  disabled={purchaseLoading !== null}
                >
                  {purchaseLoading === "report_addon" ? (
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

      {/* Session expiry note */}
      <p className="text-center text-xs text-muted-foreground">
        {ru
          ? "Сессии не сгорают — используй в своём темпе"
          : "Sessions never expire — use at your own pace"}
      </p>
    </div>
  );
}
