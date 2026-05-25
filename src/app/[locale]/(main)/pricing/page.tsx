"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown, Loader2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { Link } from "@/lib/i18n/navigation";

export default function PricingPage() {
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("common");
  const { user } = useUser();
  const [loading, setLoading] = useState<string | null>(null);

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

  const plans = [
    {
      id: "free",
      icon: <Zap className="h-5 w-5" />,
      name: locale === "ru" ? "Бесплатно" : "Free",
      price: locale === "ru" ? "0 ₽" : "0 ₽",
      description: locale === "ru" ? "Навсегда" : "Forever",
      features: locale === "ru"
        ? ["Все 11 тестов", "DeepSeek ИИ-анализ", "Сохранение результатов", "ИИ-коуч (DeepSeek)"]
        : ["All 11 tests", "DeepSeek AI analysis", "Results storage", "AI Coach (DeepSeek)"],
      cta: null,
    },
    {
      id: "credits_3",
      icon: <Sparkles className="h-5 w-5" />,
      name: locale === "ru" ? "3 кредита" : "3 Credits",
      price: "149 ₽",
      description: locale === "ru" ? "Попробовать Claude" : "Try Claude",
      features: locale === "ru"
        ? ["3 анализа Claude", "Или 3 коуч-сессии Claude", "Глубокий персональный разбор", "Не сгорают"]
        : ["3 Claude analyses", "Or 3 Claude coaching sessions", "Deep personal analysis", "Never expire"],
      cta: "credits_3",
      popular: true,
    },
    {
      id: "credits_10",
      icon: <Sparkles className="h-5 w-5" />,
      name: locale === "ru" ? "10 кредитов" : "10 Credits",
      price: "399 ₽",
      description: locale === "ru" ? "Выгодный пакет" : "Best value",
      features: locale === "ru"
        ? ["10 анализов Claude", "Или 10 коуч-сессий", "Экономия 33%", "Не сгорают"]
        : ["10 Claude analyses", "Or 10 coaching sessions", "Save 33%", "Never expire"],
      cta: "credits_10",
    },
    {
      id: "full_report",
      icon: <Crown className="h-5 w-5" />,
      name: locale === "ru" ? "Полный отчёт" : "Full Report",
      price: "499 ₽",
      description: locale === "ru" ? "Кто вы на самом деле" : "Who you really are",
      features: locale === "ru"
        ? ["Claude анализирует ВСЕ тесты", "Комплексный профиль личности", "Связи между измерениями", "PDF-отчёт"]
        : ["Claude analyzes ALL tests", "Comprehensive personality profile", "Cross-dimension insights", "PDF report"],
      cta: "full_report",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          {locale === "ru" ? "Тарифы" : "Pricing"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "ru"
            ? "Тесты бесплатны. Claude — для тех, кто хочет глубже."
            : "Tests are free. Claude — for those who want to go deeper."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative flex flex-col ${
              plan.popular ? "border-primary shadow-md" : ""
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                {locale === "ru" ? "Популярный" : "Popular"}
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
                  onClick={() => handlePurchase(plan.cta!)}
                  disabled={loading !== null}
                >
                  {loading === plan.cta ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : locale === "ru" ? (
                    "Купить"
                  ) : (
                    "Buy"
                  )}
                </Button>
              ) : (
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    {t("start")}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
