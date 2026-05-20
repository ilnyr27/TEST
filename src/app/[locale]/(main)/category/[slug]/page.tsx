"use client";

import { use } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, HelpCircle } from "lucide-react";
import { getTestsByCategory } from "@/lib/test-engine/test-registry";

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
          {tests.map((test) => (
            <Link key={test.slug} href={`/test/${test.slug}`}>
              <Card className="group cursor-pointer transition-all hover:shadow-md h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {locale === "ru" ? test.nameRu : test.nameEn}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {locale === "ru" ? test.descriptionRu : test.descriptionEn}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{test.methodology}</Badge>
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
          ))}
        </div>
      )}
    </div>
  );
}
