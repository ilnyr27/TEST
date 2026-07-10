"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Check, Sparkles, Zap, Crown, Loader2, Coins,
  Bot, CheckCircle2, ArrowRight, Brain, HelpCircle,
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
  const [purchasedProducts, setPurchasedProducts] = useState<string[] | null>(null); // null = still loading
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
  const creditsWord = (n: number) => {
    if (!ru) return n === 1 ? "credit" : "credits";
    const abs = Math.abs(n) % 100;
    const mod = abs % 10;
    if (abs >= 11 && abs <= 14) return "кредитов";
    if (mod === 1) return "кредит";
    if (mod >= 2 && mod <= 4) return "кредита";
    return "кредитов";
  };

  // Stable "is popular" logic: show only when user has no balance at all
  const showPopular = !hasBalance && purchasedProducts !== null && purchasedProducts.length === 0;
  const isLoaded = purchasedProducts !== null && !balanceLoading;

  const plans = [
    {
      id: "free",
      icon: <Zap className="h-5 w-5" />,
      name: ru ? "Бесплатно" : "Free",
      price: "0 ₽",
      priceNote: ru ? "навсегда" : "forever",
      description: ru
        ? "Тесты и базовый ИИ без ограничений"
        : "Tests and basic AI with no limits",
      features: ru
        ? [
            "Все 11 психологических тестов",
            "ИИ-анализ от DeepSeek (бесплатно)",
            "Результаты сохраняются в профиле",
            "ИИ-коуч на DeepSeek бесплатно",
          ]
        : [
            "All 11 psychological tests",
            "DeepSeek AI analysis (free)",
            "Results saved to your profile",
            "AI Coach on DeepSeek for free",
          ],
      cta: null,
      ctaLabel: ru ? "Открыть тесты" : "Open tests",
      ctaHref: "/dashboard",
    },
    {
      id: "credits_3",
      icon: <Sparkles className="h-5 w-5" />,
      name: ru ? "3 кредита" : "3 Credits",
      price: "149 ₽",
      priceNote: ru ? "разово" : "one-time",
      description: ru ? "Попробовать Claude" : "Try Claude",
      features: ru
        ? [
            "3 анализа тестов от Claude",
            "или 3 коуч-сессии с Claude",
            "Глубокий персональный разбор",
            "Кредиты не сгорают",
          ]
        : [
            "3 Claude test analyses",
            "or 3 coaching sessions with Claude",
            "Deep personal analysis",
            "Credits never expire",
          ],
      cta: "credits_3",
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
        ? [
            "10 анализов тестов от Claude",
            "или 10 коуч-сессий с Claude",
            "Экономия по сравнению с мини-пакетом",
            "Кредиты не сгорают",
          ]
        : [
            "10 Claude test analyses",
            "or 10 coaching sessions with Claude",
            "Cheaper vs smaller pack",
            "Credits never expire",
          ],
      cta: "credits_10",
    },
    {
      id: "full_report",
      icon: <Crown className="h-5 w-5" />,
      name: ru ? "Полный отчёт" : "Full Report",
      price: "499 ₽",
      priceNote: ru ? "один раз" : "once",
      description: ru ? "Кто вы на самом деле" : "Who you really are",
      features: ru
        ? [
            "Claude анализирует все ваши тесты",
            "Комплексный профиль личности",
            "Связи между разными чертами",
            "Отчёт сохраняется в профиле",
          ]
        : [
            "Claude analyzes all your tests",
            "Comprehensive personality profile",
            "Cross-trait connections & patterns",
            "Report saved to your profile",
          ],
      cta: "full_report",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">

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

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{ru ? "Тарифы" : "Pricing"}</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {ru
            ? "Тесты и DeepSeek — бесплатно. Claude — глубже, точнее, персональнее."
            : "Tests and DeepSeek are free. Claude goes deeper and more personal."}
        </p>
      </div>

      {/* "How credits work" explainer */}
      <div className="rounded-xl border bg-muted/30 px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">{ru ? "Как работают кредиты" : "How credits work"}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Brain className="h-4 w-4 text-primary" />,
              title: ru ? "Купил → потратил" : "Buy → spend",
              desc: ru ? "1 кредит = 1 анализ теста или 1 коуч-сессия с Claude" : "1 credit = 1 test analysis or 1 Claude coaching session",
            },
            {
              icon: <CheckCircle2 className="h-4 w-4 text-primary" />,
              title: ru ? "Сохраняются в профиле" : "Saved to profile",
              desc: ru ? "Все анализы и коуч-сессии автоматически записываются в ваш профиль" : "All analyses and sessions are automatically saved to your profile",
            },
            {
              icon: <Coins className="h-4 w-4 text-primary" />,
              title: ru ? "Не сгорают" : "Never expire",
              desc: ru ? "Кредиты накапливаются и не пропадают — тратьте в любое время" : "Credits accumulate and never expire — spend whenever you like",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="mt-0.5 shrink-0">{item.icon}</div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {plans.map((plan) => {
          const isPurchased = plan.cta
            ? (purchasedProducts ?? []).includes(plan.cta)
            : false;
          const isCreditsProduct = plan.cta === "credits_3" || plan.cta === "credits_10";

          return (
            <Card
              key={plan.id}
              className={`flex flex-col transition-all duration-200 ${
                isPurchased
                  ? "border-green-500 shadow-lg shadow-green-500/10"
                  : plan.popular && showPopular
                  ? "border-primary shadow-md shadow-primary/10"
                  : ""
              }`}
            >
              <CardHeader className="pb-3">
                {/* Status badge inside header — no overflow clipping */}
                {(isPurchased || (plan.popular && showPopular)) && (
                  <div className="flex justify-center mb-1">
                    {isPurchased ? (
                      <Badge className="bg-green-500 hover:bg-green-500 gap-1 whitespace-nowrap">
                        <CheckCircle2 className="h-3 w-3" />
                        {ru ? "Куплено" : "Purchased"}
                      </Badge>
                    ) : (
                      <Badge className="whitespace-nowrap">
                        {ru ? "Популярный" : "Popular"}
                      </Badge>
                    )}
                  </div>
                )}
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
                {/* Purchased credits card: show usage CTAs */}
                {isPurchased && isCreditsProduct ? (
                  <div className="flex-1 flex flex-col gap-3">
                    {/* Balance display */}
                    <div className="rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2.5">
                      <p className="text-xs text-muted-foreground">{ru ? "Ваш баланс" : "Your balance"}</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        {hasBalance ? `${balance} ${creditsWord(balance)}` : "—"}
                      </p>
                    </div>

                    <p className="text-xs font-medium text-muted-foreground">{ru ? "Куда потратить:" : "How to use:"}</p>

                    <div className="space-y-2 flex-1">
                      <Link href="/coach" className="block">
                        <div className="flex items-center gap-2 rounded-md border p-2.5 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                          <Bot className="h-3.5 w-3.5 text-primary shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate">{ru ? "ИИ-коуч с Claude" : "AI Coach (Claude)"}</p>
                            <p className="text-[10px] text-muted-foreground">{ru ? "1 кредит = 1 сессия" : "1 credit = 1 session"}</p>
                          </div>
                          <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />
                        </div>
                      </Link>
                      <Link href="/dashboard" className="block">
                        <div className="flex items-center gap-2 rounded-md border p-2.5 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                          <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate">{ru ? "Анализ теста от Claude" : "Test analysis (Claude)"}</p>
                            <p className="text-[10px] text-muted-foreground">{ru ? "1 кредит = 1 анализ" : "1 credit = 1 analysis"}</p>
                          </div>
                          <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />
                        </div>
                      </Link>
                    </div>

                    <Separator />

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs text-muted-foreground"
                      onClick={() => handlePurchase(plan.cta!)}
                      disabled={loading !== null}
                    >
                      {loading === plan.cta ? <Loader2 className="h-3 w-3 animate-spin" /> : ru ? "Докупить ещё" : "Buy more"}
                    </Button>
                  </div>
                ) : (
                  /* Default: feature list + buy button */
                  <>
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
                        variant={isPurchased ? "outline" : hasBalance && plan.cta !== "full_report" ? "outline" : "default"}
                        onClick={() => handlePurchase(plan.cta!)}
                        disabled={loading !== null}
                      >
                        {loading === plan.cta ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isPurchased ? (
                          ru ? "Докупить ещё" : "Buy more"
                        ) : (
                          ru ? "Купить" : "Buy"
                        )}
                      </Button>
                    ) : (
                      <Link href={plan.ctaHref ?? "/dashboard"}>
                        <Button variant="outline" className="w-full">{plan.ctaLabel ?? (ru ? "Начать" : "Start")}</Button>
                      </Link>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom CTA when logged out or no credits */}
      {!hasBalance && (
        <p className="text-center text-sm text-muted-foreground">
          {ru
            ? "Кредиты накапливаются — купите сейчас, потратьте когда будут готовы результаты."
            : "Credits stack — buy now, spend when your results are ready."}
        </p>
      )}
    </div>
  );
}
