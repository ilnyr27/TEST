"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Briefcase,
  Lightbulb,
  Repeat,
  Heart,
  Palette,
  Gamepad2,
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Shield,
  Info,
  Crown,
} from "lucide-react";
import { usePlan } from "@/hooks/usePlan";
import { getResults, StoredResult } from "@/lib/test-engine/results-store";
import { getAllTests } from "@/lib/test-engine/test-registry";
import { detectFlags, Flag } from "@/lib/scoring/flag-detector";

const categoryIcons: Record<string, React.ReactNode> = {
  psychology: <Brain className="h-5 w-5" />,
  career: <Briefcase className="h-5 w-5" />,
  intelligence: <Lightbulb className="h-5 w-5" />,
  habits: <Repeat className="h-5 w-5" />,
  family: <Heart className="h-5 w-5" />,
  creativity: <Palette className="h-5 w-5" />,
  fun: <Gamepad2 className="h-5 w-5" />,
};

const categoryColors: Record<string, string> = {
  psychology: "text-violet-500",
  career: "text-blue-500",
  intelligence: "text-amber-500",
  habits: "text-emerald-500",
  family: "text-red-500",
  creativity: "text-pink-500",
  fun: "text-orange-500",
};

const categories = [
  "psychology", "career", "intelligence", "habits", "family", "creativity", "fun",
];

export default function DashboardPage() {
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("dashboard");
  const tc = useTranslations("categories");

  const [results, setResults] = useState<StoredResult[]>([]);
  const [flags, setFlags] = useState<Flag[]>([]);
  const { hasReport } = usePlan();

  useEffect(() => {
    const r = getResults();
    // Reading from localStorage on mount — legitimate one-time init
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResults(r);
    setFlags(detectFlags(r));
  }, []);

  const allTests = getAllTests();
  const totalAvailableTests = allTests.length;
  const completedSlugs = new Set(results.map((r) => r.testSlug));
  const testsCompleted = completedSlugs.size;
  const totalAnswered = results.reduce((s, r) => s + r.answeredCount, 0);
  const profilePercent = totalAvailableTests > 0
    ? Math.round((testsCompleted / totalAvailableTests) * 100)
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t("welcome")}</h1>
        <p className="mt-1 text-muted-foreground">{t("overview")}</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("testsCompleted")}</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{testsCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === "ru" ? `из ${totalAvailableTests} доступных` : `of ${totalAvailableTests} available`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("totalQuestions")}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAnswered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("profileComplete")}</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{profilePercent}%</div>
            <Progress value={profilePercent} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Flags / Warnings */}
      {flags.length > 0 && (
        <div className="space-y-3">
          {flags.map((flag) => {
            const severityStyles = {
              critical: "border-red-500/30 bg-red-500/5",
              warning: "border-orange-500/30 bg-orange-500/5",
              info: "border-blue-500/30 bg-blue-500/5",
            };
            const SeverityIcon = flag.severity === "critical" ? AlertTriangle
              : flag.severity === "warning" ? Shield : Info;
            const iconColor = flag.severity === "critical" ? "text-red-500"
              : flag.severity === "warning" ? "text-orange-500" : "text-blue-500";
            return (
              <Card key={flag.key} className={severityStyles[flag.severity]}>
                <CardContent className="flex items-start gap-3 py-4">
                  <SeverityIcon className={`h-5 w-5 mt-0.5 shrink-0 ${iconColor}`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {locale === "ru" ? flag.titleRu : flag.titleEn}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {locale === "ru" ? flag.messageRu : flag.messageEn}
                    </p>
                    {flag.linkTo && (
                      <Link href={flag.linkTo}>
                        <Button variant="outline" size="sm" className="mt-2 gap-1 text-xs h-7">
                          <ArrowRight className="h-3 w-3" />
                          {locale === "ru" ? flag.linkLabelRu : flag.linkLabelEn}
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Aggregated Profile */}
      {results.length >= 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              {locale === "ru" ? "Агрегированный профиль" : "Aggregated Profile"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.flatMap((r) =>
                r.result.dimensions
                  .filter((d) => d.key !== "style")
                  .slice(0, 2)
                  .map((d) => (
                    <div key={`${r.testSlug}-${d.key}`} className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="text-xs truncate">{d.name}</span>
                      <Progress value={d.score} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground w-8 text-right">{d.score}%</span>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent results */}
      {results.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">{t("recentResults")}</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {results.map((r) => {
              const testMeta = allTests.find((t) => t.slug === r.testSlug);
              if (!testMeta) return null;
              const topDim = r.result.dimensions.length > 0
                ? [...r.result.dimensions].sort((a, b) => b.score - a.score)[0]
                : null;
              return (
                <Link key={r.testSlug} href={`/test/${r.testSlug}/results`}>
                  <Card className="group cursor-pointer transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {locale === "ru" ? testMeta.nameRu : testMeta.nameEn}
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <CardDescription>
                        <Badge variant="secondary" className="text-xs">
                          {testMeta.methodology}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {topDim && (
                        <p className="text-sm">
                          <span className="font-medium" style={{ color: topDim.color }}>
                            {topDim.name}
                          </span>
                          {" — "}
                          <span className="text-muted-foreground">{topDim.score}%</span>
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {locale === "ru" ? r.result.summary.ru : r.result.summary.en}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/coach">
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            {locale === "ru" ? "ИИ-Коуч" : "AI Coach"}
          </Button>
        </Link>
        {hasReport ? (
          <Link href="/full-report">
            <Button variant="outline" className="gap-2 border-amber-500/50 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10">
              <Crown className="h-4 w-4" />
              {locale === "ru" ? "Полный отчёт" : "Full Report"}
            </Button>
          </Link>
        ) : (
          <Link href="/pricing">
            <Button variant="ghost" className="gap-2 text-muted-foreground text-xs">
              <Crown className="h-4 w-4" />
              {locale === "ru" ? "Полный отчёт — 299 ₽" : "Full Report — 299 ₽"}
            </Button>
          </Link>
        )}
      </div>

      {/* Categories */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">{t("exploreCategories")}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => (
            <Link key={cat} href={`/category/${cat}`}>
              <Card className="group cursor-pointer transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className={categoryColors[cat]}>
                      {categoryIcons[cat]}
                    </span>
                    <div className="flex-1">
                      <CardTitle className="text-base">{tc(cat)}</CardTitle>
                      <CardDescription className="text-xs">
                        {tc(`${cat}Desc`)}
                      </CardDescription>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
