"use client";

import { use, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, HelpCircle, CheckCircle2 } from "lucide-react";
import { getTestsByCategory } from "@/lib/test-engine/test-registry";
import { getResults } from "@/lib/test-engine/results-store";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const locale = useLocale() as "ru" | "en";
  const tc = useTranslations("categories");
  const tt = useTranslations("test");
  const tCommon = useTranslations("common");

  const tests = getTestsByCategory(slug);
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    const results = getResults();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompletedSlugs(new Set(results.map((r) => r.testSlug)));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            {tc(slug as "psychology")}
          </h1>
          <p className="text-muted-foreground">
            {tc(`${slug}Desc` as "psychologyDesc")}
          </p>
        </div>
      </div>

      {tests.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-muted-foreground">
            {locale === "ru" ? "Тесты скоро появятся..." : "Tests coming soon..."}
          </p>
          <Link href="/dashboard">
            <Button variant="outline" className="mt-4">
              {tCommon("back")}
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tests.map((test) => {
            const done = completedSlugs.has(test.slug);
            return (
              <Link key={test.slug} href={`/test/${test.slug}`}>
                <Card
                  className={`group cursor-pointer transition-all hover:shadow-md h-full${done ? " border-green-500/60" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {locale === "ru" ? test.nameRu : test.nameEn}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {locale === "ru" ? test.descriptionRu : test.descriptionEn}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <Badge variant="secondary">{test.methodology}</Badge>
                        {done && (
                          <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {locale === "ru" ? "Пройден" : "Done"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <HelpCircle className="h-3.5 w-3.5" />
                        {test.questionCount} {tt("questions")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        ~{test.estimatedMinutes} {tt("minutes")}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
