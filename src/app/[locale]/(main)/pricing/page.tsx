"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check, Sparkles, Zap, Crown, Loader2, Coins,
  Bot, CheckCircle2, ArrowRight, Brain, HelpCircle, CreditCard,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useCredits } from "@/hooks/useCredits";
import { createClient } from "@/lib/supabase/client";
import { Link } from "@/lib/i18n/navigation";

export default function PricingPage() {
  const locale = useLocale() as "ru" | "en";
  const { user } = useUser();
  const { balance, loading: balanceLoading, refresh } = useCredits();
  const [loading, setLoading] = useState<string | null>(null);
  const [purchasedProducts, setPurchasedProducts] = useState<string[] | null>(null);
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment") === "success";

  useEffect(() => {
    if (paymentSuccess) refresh();
  }, [paymentSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPurchasedProducts([]);
      return;
    }
    const supabase = createClient();
    supabase
      .from("payments")
      .select("product_type")
      .eq("user_id", user.id)
      .eq("status", "succeeded")
      .then(({ data }) => {
        setPurchasedProducts(data ? [...new Set(data.map((p) => p.product_type))] : []);
      });
  }, [user]);

  const handlePurchase = async (productType: string) => {
    if (!user) {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = `/${locale}/login?next=/${locale}/pricing`;
      return;
    }
    setLoading(productType);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType }),
      });
      const data = await res.json();
      if (data.url) {
        // eslint-disable-next-line react-hooks/immutability
        window.location.href = data.url;
      } else {
        alert(data.error || "Payment error");
      }
    } catch {
      alert("Payment error");
    } finally {
      setLoading(null);
    }
  };

  const ru = locale === "ru";
  const hasBalance = !balanceLoading && balance > 0;
  const isLoaded = purchasedProducts !== null && !balanceLoading;
  const purchased = (id: string) => (purchasedProducts ?? []).includes(id);

  const creditsWord = (n: number) => {
    if (!ru) return n === 1 ? "credit" : "credits";
    const abs = Math.abs(n) % 100;
    const mod = abs % 10;
    if (abs >= 11 && abs <= 14) return "кредитов";
    if (mod === 1) return "кредит";
    if (mod >= 2 && mod <= 4) return "кредита";
    return "кредитов";
  };

  // Show "Popular" only to brand-new users with no history
  const showPopular = !hasBalance && purchasedProducts !== null && purchasedProducts.length === 0;

  const creditPlans = [
    {
      id: "free",
      icon: <Zap className="h-5 w-5" />,
      name: ru ? "Бесплатно" : "Free",
      price: "0 ₽",
      priceNote: ru ? "навсегда" : "forever",
      description: ru ? "Тесты и базовый ИИ без ограничений" : "Tests and basic AI with no limits",
      features: ru
        ? ["Все 11 психологических тестов", "ИИ-анализ от DeepSeek (бесплатно)", "Результаты сохраняются в профиле", "ИИ-коуч на DeepSeek бесплатно"]
        : ["All 11 psychological tests", "DeepSeek AI analysis (free)", "Results saved to your profile", "AI Coach on DeepSeek for free"],
      cta: null as string | null,
      popular: false,
    },
    {
      id: "credits_3",
      icon: <Sparkles className="h-5 w-5" />,
      name: ru ? "3 кредита" : "3 Credits",
      price: "149 ₽",
      priceNote: ru ? "разово" : "one-time",
      description: ru ? "Попробовать Claude" : "Try Claude",
      features: ru
        ? ["3 анализа тестов от Claude", "или 3 коуч-сессии с Claude", "Глубокий персональный разбор", "Кредиты не сгорают"]
        : ["3 Claude test analyses", "or 3 coaching sessions with Claude", "Deep personal analysis", "Credits never expire"],
      cta: "credits_3" as string | null,
      popular: true,
    },
    {
      id: "credits_10",
      icon: <Sparkles className="h-5 w-5" />,
      name: ru ? "10 кредитов" : "10 Credits",
      price: "399 ₽",
      priceNote: ru ? "разово" : "one-time",
      description: ru ? "Выгоднее на 33%" : "Save 33%",
      features: ru
        ? ["10 анализов тестов от Claude", "или 10 коуч-сессий с Claude", "Экономия по сравнению с мини-пакетом", "Кредиты не сгорают"]
        : ["10 Claude test analyses", "or 10 coaching sessions with Claude", "Cheaper vs smaller pack", "Credits never expire"],
      cta: "credits_10" as string | null,
      popular: false,
    },
  ];

  const fullReportFeatures = ru
    ? ["Claude анализирует все ваши тесты", "Комплексный профиль личности", "Связи между разными чертами", "Отчёт сохраняется в профиле"]
    : ["Claude analyzes all your tests", "Comprehensive personality profile", "Cross-trait connections & patterns", "Report saved to your profile"];

  const isPurchasedFullReport = purchased("full_report");

  return (
    <div className="mx-auto max-w-5xl space-y-10">

      {/* Success banner */}
      {paymentSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          <div>
            <p className="font-semibold">{ru ? "Оплата прошла успешно!" : "Payment successful!"}</p>
            <p className="text-sm opacity-80">
              {ru ? "Кредиты зачислены — тратьте в коуче или на анализ тестов." : "Credits added — use them in the coach or for test analysis."}
            </p>
          </div>
        </div>
      )}

      {/* Page header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{ru ? "Тарифы" : "Pricing"}</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {ru
            ? "Тесты и DeepSeek — бесплатно. Claude — глубже, точнее, персональнее."
            : "Tests and DeepSeek are free. Claude goes deeper and more personal."}
        </p>
      </div>

      {/* ── SECTION 1: CREDITS ──────────────────────────────────────────── */}
      <div className={`space-y-4 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

        {/* Section header + balance widget */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              {ru ? "Кредиты Claude" : "Claude Credits"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {ru ? "1 кредит = 1 коуч-сессия или 1 анализ теста" : "1 credit = 1 coaching session or 1 test analysis"}
            </p>
          </div>

          {/* Balance widget — only when user has credits */}
          {hasBalance && (
            <div className="flex items-center gap-3 rounded-lg border bg-primary/5 border-primary/20 px-4 py-2.5">
              <div>
                <p className="text-xs text-muted-foreground">{ru ? "Ваш баланс" : "Your balance"}</p>
                <p className="text-xl font-bold text-primary leading-none mt-0.5">
                  {balance} {creditsWord(balance)}
                </p>
              </div>
              <div className="flex flex-col gap-1 border-l border-border pl-3">
                <Link href="/coach">
                  <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs px-2 w-full justify-start">
                    <Bot className="h-3 w-3" />
                    {ru ? "Коуч" : "Coach"}
                    <ArrowRight className="h-3 w-3 ml-auto" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs px-2 w-full justify-start">
                    <Sparkles className="h-3 w-3" />
                    {ru ? "Анализ" : "Analysis"}
                    <ArrowRight className="h-3 w-3 ml-auto" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 3-column cards: Free | 3 credits | 10 credits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {creditPlans.map((plan) => {
            const isPurchased = plan.cta ? purchased(plan.cta) : false;
            const isPopular = plan.popular && showPopular;

            return (
              <Card
                key={plan.id}
                className={`flex flex-col transition-all duration-200 ${
                  isPurchased
                    ? "border-green-500 shadow-lg shadow-green-500/10"
                    : isPopular
                    ? "border-primary shadow-md shadow-primary/10"
                    : ""
                }`}
              >
                <CardHeader className="pb-3">
                  {/* Reserved badge slot — min-h keeps all titles at same Y */}
                  <div className="flex justify-center min-h-[28px] items-center mb-1">
                    {isPurchased ? (
                      <Badge className="bg-green-500 hover:bg-green-500 gap-1 whitespace-nowrap">
                        <CheckCircle2 className="h-3 w-3" />
                        {ru ? "Куплено" : "Purchased"}
                      </Badge>
                    ) : isPopular ? (
                      <Badge className="whitespace-nowrap">{ru ? "Популярный" : "Popular"}</Badge>
                    ) : null}
                  </div>
                  <div className={`flex items-center gap-2 ${isPurchased ? "text-green-600 dark:text-green-400" : "text-primary"}`}>
                    {plan.icon}
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                  </div>
                  <div className="flex items-baseline gap-1.5 pt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">{plan.priceNote}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 flex-1 mb-4">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${isPurchased ? "text-green-500" : "text-muted-foreground"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {plan.cta ? (
                    <Button
                      className="w-full"
                      variant={hasBalance ? "outline" : "default"}
                      onClick={() => handlePurchase(plan.cta!)}
                      disabled={loading !== null}
                    >
                      {loading === plan.cta ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : hasBalance || isPurchased ? (
                        ru ? "Докупить ещё" : "Add more"
                      ) : (
                        ru ? "Купить" : "Buy"
                      )}
                    </Button>
                  ) : (
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full">
                        {ru ? "Открыть тесты" : "Open tests"}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Compact "how credits work" */}
        <div className="rounded-lg border bg-muted/20 px-4 py-3">
          <div className="flex items-center gap-2 mb-2.5">
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground">
              {ru ? "Как работают кредиты" : "How credits work"}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                icon: <Brain className="h-3.5 w-3.5 text-primary" />,
                title: ru ? "Купил → потратил" : "Buy → spend",
                desc: ru ? "1 кредит = 1 анализ теста или 1 коуч-сессия с Claude" : "1 credit = 1 test analysis or 1 Claude session",
              },
              {
                icon: <CheckCircle2 className="h-3.5 w-3.5 text-primary" />,
                title: ru ? "История сохраняется" : "History saved",
                desc: ru ? "Все анализы и сессии записываются в ваш профиль" : "All analyses and sessions saved to your profile",
              },
              {
                icon: <Coins className="h-3.5 w-3.5 text-primary" />,
                title: ru ? "Не сгорают" : "Never expire",
                desc: ru ? "Накапливаются, тратьте в любое время" : "Accumulate and never expire",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="mt-0.5 shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs font-medium">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 2: FULL REPORT ──────────────────────────────────────── */}
      <div className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

        {/* Separator with label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground px-1 whitespace-nowrap">
            {ru ? "Или одним разом — без кредитов" : "Or all at once — no credits needed"}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Full Report wide card */}
        <div className={`rounded-xl border p-6 transition-all duration-200 ${
          isPurchasedFullReport
            ? "border-amber-500/60 bg-amber-500/5"
            : "border-amber-500/25 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent"
        }`}>

          {/* Type label */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-700 dark:text-amber-400 mb-4">
            <CreditCard className="h-3 w-3" />
            {ru ? "Разовая оплата картой — не требует кредитов" : "One-time card payment — no credits needed"}
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Left: title + description + features */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-amber-600 shrink-0" />
                <h2 className="text-xl font-bold">{ru ? "Полный отчёт" : "Full Report"}</h2>
                {isPurchasedFullReport && (
                  <Badge className="bg-amber-500 hover:bg-amber-500 gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {ru ? "Получен" : "Received"}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {ru
                  ? "Claude анализирует все ваши тесты сразу и составляет единый комплексный профиль личности"
                  : "Claude analyzes all your tests at once and creates a comprehensive unified personality profile"}
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {fullReportFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-amber-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: price + CTA */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-3 shrink-0">
              <div className="sm:text-right">
                <div className="text-3xl font-bold">499 ₽</div>
                <p className="text-xs text-muted-foreground">{ru ? "один раз" : "once"}</p>
              </div>
              {isPurchasedFullReport ? (
                <Link href="/dashboard">
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
                  onClick={() => handlePurchase("full_report")}
                  disabled={loading !== null}
                >
                  {loading === "full_report" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    ru ? "Купить" : "Buy"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
