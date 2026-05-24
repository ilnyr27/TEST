"use client";

import { use } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, HelpCircle, Play, Info } from "lucide-react";
import { getTestMeta } from "@/lib/test-engine/test-registry";

export default function TestIntroPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = use(params);
  const locale = useLocale() as "ru" | "en";
  const t = useTranslations("test");
  const tc = useTranslations("common");
  const tl = useTranslations("legal");

  const meta = getTestMeta(testId);

  if (!meta) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="text-2xl font-bold">
          {locale === "ru" ? "Тест не найден" : "Test not found"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {locale === "ru" ? "Этот тест скоро будет доступен." : "This test will be available soon."}
        </p>
        <Link href="/dashboard">
          <Button variant="outline" className="mt-4">{tc("back")}</Button>
        </Link>
      </div>
    );
  }

  const name = locale === "ru" ? meta.nameRu : meta.nameEn;
  const description = locale === "ru" ? meta.descriptionRu : meta.descriptionEn;
  const instruction = locale === "ru" ? meta.instructionRu : meta.instructionEn;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href={`/category/${meta.category}`}>
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {tc("back")}
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{meta.methodology}</Badge>
          </div>
          <CardTitle className="text-2xl">{name}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4" />
              {meta.questionCount} {t("questions")}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              ~{meta.estimatedMinutes} {t("minutes")}
            </span>
          </div>

          {instruction && (
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
              <p>{instruction}</p>
            </div>
          )}

          <div className="flex items-start gap-2 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-3 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-blue-500" />
            <p>{tl("medicalDisclaimer")}</p>
          </div>

          <Link href={`/test/${testId}/play`}>
            <Button size="lg" className="w-full gap-2">
              <Play className="h-4 w-4" />
              {t("startTest")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
