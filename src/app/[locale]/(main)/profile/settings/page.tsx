"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Shield, Bot, Loader2, Trash2, AlertTriangle } from "lucide-react";
import { useUserSettings } from "@/hooks/useUserSettings";
import { createClient } from "@/lib/supabase/client";

const CONFIRM_WORD_RU = "УДАЛИТЬ";
const CONFIRM_WORD_EN = "DELETE";

export default function SettingsPage() {
  const t = useTranslations("ai");
  const tc = useTranslations("common");
  const locale = useLocale() as "ru" | "en";
  const ru = locale === "ru";
  const { settings, loading, updateSetting } = useUserSettings();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const confirmWord = ru ? CONFIRM_WORD_RU : CONFIRM_WORD_EN;
  const confirmed = confirmInput === confirmWord;

  const handleDelete = async () => {
    if (!confirmed) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch("/api/user/delete", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error");
      }
      // Sign out and redirect
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Error");
      setDeleting(false);
    }
  };

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

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            {ru ? "Опасная зона" : "Danger zone"}
          </CardTitle>
          <CardDescription>
            {ru
              ? "Необратимые действия с аккаунтом"
              : "Irreversible account actions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">
                {ru ? "Удалить аккаунт" : "Delete account"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {ru
                  ? "Удалит все данные: результаты тестов, отчёт, историю чатов. После удаления возврат средств невозможен — если нужен возврат, сначала напишите на ilray@mail.ru."
                  : "Deletes all data: test results, report, chat history. Refunds are not possible after deletion — if you need a refund, contact ilray@mail.ru first."}
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="shrink-0 gap-2"
              onClick={() => { setConfirmInput(""); setDeleteError(null); setShowDeleteDialog(true); }}
            >
              <Trash2 className="h-4 w-4" />
              {ru ? "Удалить" : "Delete"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              {ru ? "Удалить аккаунт?" : "Delete account?"}
            </DialogTitle>
            <DialogDescription>
              {ru
                ? "Это действие необратимо. Все данные и оплаченные сессии будут удалены без возможности восстановления или возврата средств."
                : "This action is irreversible. All data and paid sessions will be permanently deleted with no possibility of recovery or refund."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">
              {ru
                ? <>Введите <strong className="text-foreground">{confirmWord}</strong> для подтверждения:</>
                : <>Type <strong className="text-foreground">{confirmWord}</strong> to confirm:</>}
            </p>
            <Input
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder={confirmWord}
              className="font-mono"
            />
            {deleteError && (
              <p className="text-xs text-destructive">{deleteError}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deleting}
            >
              {ru ? "Отмена" : "Cancel"}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={!confirmed || deleting}
              className="gap-2"
            >
              {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
              {ru ? "Удалить навсегда" : "Delete forever"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
