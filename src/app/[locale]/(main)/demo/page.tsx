"use client";

import { useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { RadarChart } from "@/components/results/RadarChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Lock,
  Sparkles,
  Trophy,
} from "lucide-react";

// Pre-baked Big Five result for demo purposes
const DEMO_DATA = {
  ru: {
    testName: "Большая пятёрка (Big Five)",
    summary:
      "Ваш профиль: высокая открытость и доброжелательность — вы творческий, эмпатичный человек с сильной потребностью в смысле. Добросовестность развита хорошо, что даёт устойчивость. Умеренная экстраверсия означает: вы цените и общение, и одиночество.",
    dimensions: [
      {
        key: "O",
        name: "Открытость",
        score: 78,
        color: "#8B5CF6",
        description:
          "Высокая открытость опыту. Вы любопытны, творчески мыслите и легко принимаете новые идеи. Вас привлекают необычные концепции, искусство и нестандартные решения. Зона роста — иногда сложно завершать начатое.",
      },
      {
        key: "C",
        name: "Добросовестность",
        score: 63,
        color: "#3B82F6",
        description:
          "Умеренно высокая добросовестность. Вы достаточно организованы и надёжны, хотя не всегда педантичны. Умеете держать слово и доводить важное до конца, особенно когда задача вам интересна.",
      },
      {
        key: "E",
        name: "Экстраверсия",
        score: 47,
        color: "#10B981",
        description:
          "Средний уровень экстраверсии — вы амбиверт. Общение вас заряжает, но одиночество тоже необходимо для восстановления. Вы комфортно чувствуете себя как в компании, так и наедине с собой.",
      },
      {
        key: "A",
        name: "Доброжелательность",
        score: 71,
        color: "#F59E0B",
        description:
          "Высокая доброжелательность. Вы ориентированы на других, легко сочувствуете и стараетесь избегать конфликтов. Это делает вас хорошим другом и командным игроком. Зона внимания — умение отстаивать свои интересы.",
      },
      {
        key: "N",
        name: "Нейротизм",
        score: 34,
        color: "#EF4444",
        description:
          "Низкий нейротизм — хорошая эмоциональная устойчивость. Вы сохраняете спокойствие в стрессовых ситуациях и не склонны к тревожности. Трудности воспринимаете как вызов, а не угрозу.",
      },
    ],
    radarData: [
      { name: "Открытость", value: 78, fullMark: 100 },
      { name: "Добросовест-ность", value: 63, fullMark: 100 },
      { name: "Экстраверсия", value: 47, fullMark: 100 },
      { name: "Доброжелат-ность", value: 71, fullMark: 100 },
      { name: "Нейротизм", value: 34, fullMark: 100 },
    ],
    aiBlurText:
      "**Ваши главные активы:** Открытость и доброжелательность создают редкую комбинацию — творческого человека, который умеет работать с людьми. Это ценится в профессиях, требующих как генерации идей, так и командной работы.\n\n**Зона риска:** Умеренная экстраверсия в сочетании с высокой доброжелательностью может привести к тому, что вы соглашаетесь на чужие задачи в ущерб своим. Научиться говорить «нет» — ваша ключевая точка роста.\n\n**Рекомендация:** Ищите роли, где есть пространство для творчества и автономии, но с регулярным взаимодействием с командой. Управление проектами, UX-дизайн, консультирование — ваши зоны.",
    ctaTitle: "Это пример — пройдите настоящий тест",
    ctaDesc:
      "Это демо-отчёт. Ваши реальные результаты будут основаны на ваших ответах и могут сильно отличаться.",
    ctaTake: "Пройти Большую пятёрку",
    ctaSignup: "Зарегистрироваться бесплатно",
    demoLabel: "Пример отчёта",
    demoBanner:
      "Это демонстрационный отчёт с вымышленными данными — чтобы вы увидели, как выглядят ваши результаты.",
    aiTitle: "ИИ-анализ",
    aiLocked: "ИИ-анализ доступен после регистрации",
    aiLockedDesc:
      "Получите персональный разбор от ИИ-коуча — интерпретацию каждого измерения, зоны роста и конкретные рекомендации.",
    unlockBtn: "Зарегистрироваться и пройти тест",
  },
  en: {
    testName: "Big Five Personality",
    summary:
      "Your profile: high openness and agreeableness — you're a creative, empathetic person with a strong need for meaning. Conscientiousness is well developed, giving you stability. Moderate extraversion means: you value both social connection and solitude.",
    dimensions: [
      {
        key: "O",
        name: "Openness",
        score: 78,
        color: "#8B5CF6",
        description:
          "High openness to experience. You are curious, think creatively, and easily embrace new ideas. You're drawn to unusual concepts, art, and unconventional solutions. Growth area — sometimes difficult to complete what you start.",
      },
      {
        key: "C",
        name: "Conscientiousness",
        score: 63,
        color: "#3B82F6",
        description:
          "Moderately high conscientiousness. You are organized and reliable enough, though not always meticulous. You can keep your word and follow through on important things, especially when the task interests you.",
      },
      {
        key: "E",
        name: "Extraversion",
        score: 47,
        color: "#10B981",
        description:
          "Moderate extraversion — you're an ambivert. Social interaction energizes you, but solitude is also necessary for recovery. You feel comfortable both in company and alone.",
      },
      {
        key: "A",
        name: "Agreeableness",
        score: 71,
        color: "#F59E0B",
        description:
          "High agreeableness. You're oriented toward others, empathize easily, and try to avoid conflict. This makes you a good friend and team player. Growth area — learning to stand up for your own interests.",
      },
      {
        key: "N",
        name: "Neuroticism",
        score: 34,
        color: "#EF4444",
        description:
          "Low neuroticism — good emotional stability. You stay calm in stressful situations and aren't prone to anxiety. You see difficulties as challenges rather than threats.",
      },
    ],
    radarData: [
      { name: "Openness", value: 78, fullMark: 100 },
      { name: "Conscientious-ness", value: 63, fullMark: 100 },
      { name: "Extraversion", value: 47, fullMark: 100 },
      { name: "Agreeable-ness", value: 71, fullMark: 100 },
      { name: "Neuroticism", value: 34, fullMark: 100 },
    ],
    aiBlurText:
      "**Your main assets:** High openness combined with agreeableness creates a rare combination — a creative person who works well with people. This is valued in professions requiring both idea generation and teamwork.\n\n**Risk zone:** Moderate extraversion combined with high agreeableness can lead you to agree to others' tasks at the expense of your own. Learning to say 'no' is your key growth point.\n\n**Recommendation:** Look for roles that offer space for creativity and autonomy with regular team interaction. Project management, UX design, consulting — these are your zones.",
    ctaTitle: "This is a sample — take the real test",
    ctaDesc:
      "This is a demo report. Your real results will be based on your answers and may differ significantly.",
    ctaTake: "Take the Big Five",
    ctaSignup: "Sign up for free",
    demoLabel: "Sample report",
    demoBanner:
      "This is a demonstration report with fictional data — so you can see what your results look like.",
    aiTitle: "AI Analysis",
    aiLocked: "AI analysis is available after registration",
    aiLockedDesc:
      "Get a personal breakdown from an AI coach — interpretation of each dimension, growth zones, and specific recommendations.",
    unlockBtn: "Sign up and take the test",
  },
};

export default function DemoPage() {
  const locale = useLocale() as "ru" | "en";
  const d = DEMO_DATA[locale];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Demo banner */}
      <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
        <Sparkles className="h-5 w-5 shrink-0 text-amber-500" />
        <p className="text-sm text-amber-700 dark:text-amber-400">{d.demoBanner}</p>
        <Badge variant="outline" className="ml-auto shrink-0 border-amber-500/50 text-amber-600">
          {d.demoLabel}
        </Badge>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{d.testName}</h1>
        <p className="text-sm text-muted-foreground">
          {locale === "ru" ? "45 вопросов · 7 мин" : "45 questions · 7 min"}
        </p>
      </div>

      {/* Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex items-start gap-3 py-4">
          <Trophy className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm font-medium">{d.summary}</p>
        </CardContent>
      </Card>

      {/* Radar chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {locale === "ru" ? "Профиль измерений" : "Dimension Profile"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadarChart data={d.radarData} />
        </CardContent>
      </Card>

      {/* Dimensions */}
      <div className="grid gap-4 md:grid-cols-2">
        {d.dimensions.map((dim) => (
          <Card key={dim.key}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{dim.name}</CardTitle>
                <Badge variant="outline" style={{ borderColor: dim.color, color: dim.color }}>
                  {dim.score}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={dim.score} className="h-2" />
              <p className="text-sm text-muted-foreground">{dim.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Analysis — blurred with CTA */}
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {d.aiTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Blurred fake AI text */}
          <div className="relative">
            <div className="select-none blur-sm pointer-events-none space-y-2 text-sm leading-relaxed">
              {d.aiBlurText.split("\n\n").map((para, i) => (
                <p key={i}>{para.replace(/\*\*/g, "")}</p>
              ))}
            </div>
            {/* Lock overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/60 backdrop-blur-[2px] rounded-lg">
              <div className="flex flex-col items-center gap-2 text-center px-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <p className="font-semibold">{d.aiLocked}</p>
                <p className="text-sm text-muted-foreground max-w-xs">{d.aiLockedDesc}</p>
              </div>
              <Link href="/signup">
                <Button className="gap-2">
                  {d.unlockBtn}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-violet-500/5">
        <CardContent className="py-8 text-center space-y-4">
          <Sparkles className="h-10 w-10 text-primary mx-auto" />
          <div>
            <h2 className="text-xl font-bold">{d.ctaTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">{d.ctaDesc}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                {d.ctaSignup}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/test/big-five">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                {d.ctaTake}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
