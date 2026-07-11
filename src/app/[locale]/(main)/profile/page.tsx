"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { RadarChart } from "@/components/results/RadarChart";
import { getResults, StoredResult } from "@/lib/test-engine/results-store";
import { getAllTests, getTestMeta } from "@/lib/test-engine/test-registry";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

const TEST_COLORS: Record<string, string> = {
  "big-five":        "#8B5CF6",
  "riasec":          "#3B82F6",
  "attachment-style":"#EC4899",
  "eq":              "#F59E0B",
  "burnout":         "#EF4444",
  "career-values":   "#10B981",
  "gardner":         "#6366F1",
  "creative":        "#F97316",
  "habits":          "#14B8A6",
  "mbti-light":      "#8B5CF6",
  "love-languages":  "#EF4444",
};

export default function ProfilePage() {
  const locale = useLocale() as "ru" | "en";
  const ru = locale === "ru";

  const [results, setResults] = useState<StoredResult[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResults(getResults());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const allTests = getAllTests();
  const totalCount = allTests.length;
  const doneCount = results.length;
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  const completedSlugs = new Set(results.map((r) => r.testSlug));
  const pending = allTests.filter((t) => !completedSlugs.has(t.slug));

  const radarResults = results.filter((r) => r.result.radarData.length >= 3);

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{ru ? "Мой профиль" : "My Profile"}</h1>
        <p className="text-muted-foreground mt-1">
          {ru
            ? "Результаты всех пройденных тестов"
            : "Results of all completed tests"}
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-5 pb-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {ru ? "Пройдено тестов" : "Tests completed"}
            </span>
            <span className="text-sm text-muted-foreground">
              {doneCount} / {totalCount}
            </span>
          </div>
          <Progress value={pct} className="h-2" />
          <div className="flex flex-wrap gap-2 pt-1">
            {allTests.map((t) => (
              <div key={t.slug} className="flex items-center gap-1 text-xs text-muted-foreground">
                {completedSlugs.has(t.slug)
                  ? <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0" />
                  : <Circle className="h-3 w-3 shrink-0" />}
                <span>{ru ? t.nameRu : t.nameEn}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Radar charts grid */}
      {radarResults.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <p className="text-muted-foreground">
              {ru
                ? "Пройдите хотя бы один тест, чтобы увидеть радар-чарт"
                : "Complete at least one test to see the radar chart"}
            </p>
            <Link href="/dashboard">
              <Button className="gap-2">
                {ru ? "К тестам" : "Go to tests"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {radarResults.map((r) => {
            const meta = getTestMeta(r.testSlug);
            const color = TEST_COLORS[r.testSlug] ?? "#8B5CF6";
            const completedDate = new Date(r.completedAt).toLocaleDateString(
              ru ? "ru-RU" : "en-US",
              { day: "numeric", month: "short" }
            );
            return (
              <Card key={r.testSlug} className="overflow-hidden">
                <CardHeader className="pb-0 pt-4 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm font-semibold leading-tight">
                      {meta ? (ru ? meta.nameRu : meta.nameEn) : r.testSlug}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {completedDate}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-2 pb-3">
                  <RadarChart data={r.result.radarData} color={color} />
                </CardContent>
                <div className="px-4 pb-4">
                  <Link href={`/test/${r.testSlug}/results`}>
                    <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs w-full">
                      {ru ? "Подробнее" : "Details"}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pending tests */}
      {pending.length > 0 && doneCount > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {ru ? "Ещё не пройдено" : "Not yet completed"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {pending.map((t) => (
              <Link key={t.slug} href={`/test/${t.slug}/play`}>
                <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-muted transition-colors">
                  <Circle className="h-2.5 w-2.5" />
                  {ru ? t.nameRu : t.nameEn}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
