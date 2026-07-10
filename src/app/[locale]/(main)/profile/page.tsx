"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const t = useTranslations("profile");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t("aggregatedTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t("aggregatedDesc")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
