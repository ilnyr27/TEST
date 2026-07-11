import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AppLogo } from "@/components/ui/app-logo";
import {
  Briefcase,
  Lightbulb,
  Repeat,
  Heart,
  Palette,
  Gamepad2,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  Crown,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categoryIcons: Record<string, React.ReactNode> = {
  psychology: <AppLogo size={32} />,
  career: <Briefcase className="h-8 w-8" />,
  intelligence: <Lightbulb className="h-8 w-8" />,
  habits: <Repeat className="h-8 w-8" />,
  family: <Heart className="h-8 w-8" />,
  creativity: <Palette className="h-8 w-8" />,
  fun: <Gamepad2 className="h-8 w-8" />,
};

const categoryColors: Record<string, string> = {
  psychology: "text-violet-500 bg-violet-500/10",
  career: "text-blue-500 bg-blue-500/10",
  intelligence: "text-amber-500 bg-amber-500/10",
  habits: "text-emerald-500 bg-emerald-500/10",
  family: "text-red-500 bg-red-500/10",
  creativity: "text-pink-500 bg-pink-500/10",
  fun: "text-orange-500 bg-orange-500/10",
};

const categories = [
  "psychology",
  "career",
  "intelligence",
  "habits",
  "family",
  "creativity",
  "fun",
] as const;

const questionCounts: Record<string, number> = {
  psychology: 86,
  career: 80,
  intelligence: 24,
  habits: 25,
  family: 40,
  creativity: 20,
  fun: 30,
};

export default function LandingPage() {
  const t = useTranslations("landing");
  const tc = useTranslations("categories");

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 py-24 text-center">
            <div className="mx-auto mb-4">
              <AppLogo size={64} className="rounded-2xl" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t("heroSub")}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  {t("startFree")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="mb-12 text-center text-3xl font-bold">
            {t("categories")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat) => (
              <Link key={cat} href={`/category/${cat}`}>
                <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div
                      className={`mb-3 flex h-14 w-14 items-center justify-center rounded-xl ${categoryColors[cat]}`}
                    >
                      {categoryIcons[cat]}
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      {tc(cat)}
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </CardTitle>
                    <CardDescription>{tc(`${cat}Desc`)}</CardDescription>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {questionCounts[cat]} {t("questionsCount")}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-20">
            <h2 className="mb-12 text-center text-3xl font-bold">
              {t("howItWorks")}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {t("step1Title")}
                </h3>
                <p className="text-muted-foreground">{t("step1Desc")}</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <CheckCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {t("step2Title")}
                </h3>
                <p className="text-muted-foreground">{t("step2Desc")}</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {t("step3Title")}
                </h3>
                <p className="text-muted-foreground">{t("step3Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Report Preview */}
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold">{t("reportPreviewTitle")}</h2>
              <p className="mt-3 text-muted-foreground">{t("reportPreviewSub")}</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">
              {/* Report header */}
              <div className="flex items-center gap-3 border-b bg-amber-500/5 px-6 py-4">
                <Crown className="h-5 w-5 text-amber-500" />
                <span className="font-semibold">
                  {t("reportPreviewBadge")}
                </span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  11 {t("step2Title").toLowerCase()}
                </Badge>
              </div>

              {/* Visible section */}
              <div className="border-b px-6 py-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">1</span>
                  <h3 className="font-semibold">{t("reportPreviewSection1")}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t("reportPreviewText1")}
                </p>
              </div>

              {/* Blurred sections */}
              <div className="relative">
                {[
                  { num: 2, title: t("reportPreviewBlur1"), text: t("reportPreviewBlur1Text") },
                  { num: 3, title: t("reportPreviewBlur2"), text: t("reportPreviewBlur2Text") },
                  { num: 4, title: t("reportPreviewBlur3"), text: t("reportPreviewBlur3Text") },
                ].map(({ num, title, text }) => (
                  <div key={num} className="select-none border-b px-6 py-4 blur-[3px]">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{num}</span>
                      <h3 className="font-semibold">{title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}

                {/* Gradient overlay + CTA */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-background/70 to-background/95">
                  <div className="mt-auto pb-6 text-center">
                    <div className="mb-3 flex items-center justify-center gap-2 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span className="text-sm">{t("reportPreviewCtaSub")}</span>
                    </div>
                    <Link href="/signup">
                      <Button size="lg" className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
                        <Crown className="h-4 w-4" />
                        {t("reportPreviewCta")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
