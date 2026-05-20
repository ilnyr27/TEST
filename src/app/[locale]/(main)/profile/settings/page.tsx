"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Bot } from "lucide-react";

export default function SettingsPage() {
  const t = useTranslations("ai");
  const tc = useTranslations("common");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">{tc("settings")}</h1>

      {/* AI Provider */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {t("provider")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select defaultValue="deepseek">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claude">{t("claude")}</SelectItem>
              <SelectItem value="deepseek">{t("deepseek")}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Criticism Mode */}
      <Card className="border-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-500" />
            {t("criticismMode")}
          </CardTitle>
          <CardDescription>{t("criticismDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="criticism">{t("criticismMode")}</Label>
              <p className="text-xs text-muted-foreground mt-1">
                {t("criticismWarning")}
              </p>
            </div>
            <Switch id="criticism" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
