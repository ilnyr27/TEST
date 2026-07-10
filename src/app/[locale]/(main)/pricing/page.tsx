"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown, Loader2, Coins, Bot, CheckCircle2, ArrowRight } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useCredits } from "@/hooks/useCredits";
import { Link } from "@/lib/i18n/navigation";

export default function PricingPage() {
  const locale = useLocale() as "ru" | "en";
  const { user } = useUser();
  const { balance, loading: balanceLoading, refresh } = useCredits();
  const [loading, setLoading] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment") === "success";

  // Refresh balance when returning from successful payment
  useEffect(() => {
    if (paymentSuccess) {
      refresh();
    }
  }, [paymentSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const plans = [
    {
      id: "free",
      icon: <Zap className="h-5 w-5" />,
      name: ru ? "Бесплатно" : "Free",
      price: "0 ₽",
      description: ru ? "Навсегда" : "Forever",
      features: ru
        ? ["Все 11 тестов", "DeepSeek ИИ-анализ", "Сохранение результатов", "ИИ-коуч (DeepSeek)"]
        : ["All 11 tests", "DeepSeek AI analysis", "Results storage", "AI Coach (DeepSeek)"],
      cta: null,
    },
    {
      id: "credits_3",
      icon: <Sparkles className="h-5 w-5" />,
      name: ru ? "3 кредита" : "3 Credits",
      price: "149 ₽",
      description: ru ? "Попробовать Claude" : "Try Claude",
      features: ru
        ? ["3 анализа Claude", "Или 3 коуч-сессии Claude", "Глубокий персональный разбор", "Не сгорают"]
        : ["3 Claude analyses", "Or 3 coaching sessions", "Deep personal analysis", "Never expire"],
      cta: "credits_3",
      popular: true,
    },
    {
      id: "credits_10",
      icon: <Sparkles className="h-5 w-5" />,
      name: ru ? "10 кредитов" : "10 Credits",
      price: "399 ₽",
      description: ru ? "Выгодный пакет" : "Best value",
      features: ru
        ? ["10 анализов Claude", "Или 10 коуч-сессий", "Экономия 33%", "Не сгорают"]
        : ["10 Claude analyses", "Or 10 coaching sessions", "Save 33%", "Never expire"],
      cta: "credits_10",
    },
    {
      id: "full_report",
      icon: <Crown className="h-5 w-5" />,
      name: ru ? "Полный отчёт" : "Full Report",
      price: "499 ₽",
      description: ru ? "Кто вы на самом деле" : "Who you really are",
      features: ru
        ? ["Claude анализирует ВСЕ тесты", "Комплексный профиль личности", "Связи между измерениями", "PDF-отчёт"]
        : ["Claude analyzes ALL tests", "Comprehensive personality profile", "Cross-dimension insights", "PDF report"],
      cta: "full_report",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Success banner after payment */}
      {paymentSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          <div>
            <p className="font-semibold">{ru ? "Оплата прошла успешно!" : "Payment successful!"}</p>
            <p className="text-sm opacity-80">
              {ru ? "Кредиты зачислены на ваш счёт." : "Credits have been added to your account."}
            </p>
          </div>
        </div>
      )}

      {/* Balance card — shown when user has credits */}
      {user && !balanceLoading && balance > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {ru ? "Ваш баланс" : "Your balance"}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {balance} {ru ? (balance === 1 ? "кредит" : balance < 5 ? "кредита" : "кредитов") : balance === 1 ? "credit" : "credits"}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Link href="/coach">
                <Button className="w-full sm:w-auto gap-2">
                  <Bot className="h-4 w-4" />
                  {ru ? "Использовать в коуче" : "Use in AI Coach"}
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  {ru ? "К результатам" : "My results"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          {ru ? "Тарифы" : "Pricing"}
        </h1>
        <p className="text-muted-foreground">
          {balance > 0
            ? (ru ? "Докупить кредиты — они не сгорают." : "Top up credits — they never expire.")
            : (ru ? "Тесты бесплатны. Claude — для тех, кто хочет глубже." : "Tests are free. Claude — for those who want to go deeper.")}
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative flex flex-col ${plan.popular ? "border-primary shadow-md" : ""}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                {ru ? "Популярный" : "Popular"}
              </Badge>
            )}
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-primary">
                {plan.icon}
                <CardTitle className="text-lg">{plan.name}</CardTitle>
              </div>
              <div className="pt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ul className="space-y-2 flex-1 mb-4">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.cta ? (
                <Button
                  className="w-full"
                  variant={balance > 0 ? "outline" : "default"}
                  onClick={() => handlePurchase(plan.cta!)}
                  disabled={loading !== null}
                >
                  {loading === plan.cta ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : balance > 0 ? (
                    ru ? "Докупить" : "Add more"
                  ) : (
                    ru ? "Купить" : "Buy"
                  )}
                </Button>
              ) : (
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    {ru ? "Начать" : "Start"}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How to spend credits */}
      {balance > 0 && (
        <Card className="bg-muted/40">
          <CardContent className="py-5">
            <p className="font-medium mb-3">
              {ru ? "Как потратить кредиты:" : "How to use credits:"}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/coach">
                <div className="flex items-center gap-3 rounded-lg border bg-background p-3 hover:border-primary/50 transition-colors cursor-pointer">
                  <Bot className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{ru ? "ИИ-Коуч" : "AI Coach"}</p>
                    <p className="text-xs text-muted-foreground">{ru ? "1 кредит = 1 сессия с Claude" : "1 credit = 1 Claude session"}</p>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard">
                <div className="flex items-center gap-3 rounded-lg border bg-background p-3 hover:border-primary/50 transition-colors cursor-pointer">
                  <Sparkles className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{ru ? "ИИ-анализ результатов" : "AI test analysis"}</p>
                    <p className="text-xs text-muted-foreground">{ru ? "1 кредит = глубокий разбор теста" : "1 credit = deep test analysis"}</p>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
