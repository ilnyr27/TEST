"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Bot, Loader2 } from "lucide-react";
import { useUserSettings } from "@/hooks/useUserSettings";

export default function SettingsPage() {
  const t = useTranslations("ai");
  const tc = useTranslations("common");
  const { settings, loading, updateSetting } = useUserSettings();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
          <Select
            value={settings.ai_provider}
            onValueChange={(v) => updateSetting("ai_provider", v as "claude" | "deepseek")}
          >
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
      <Card className={settings.criticism_mode ? "border-orange-500/30" : "border-orange-500/20"}>
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
            <Switch
              id="criticism"
              checked={settings.criticism_mode}
              onCheckedChange={(v) => updateSetting("criticism_mode", v)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
