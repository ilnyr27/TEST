"use client";

import { useTranslations } from "next-intl";
import { Brain } from "lucide-react";

export function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Brain className="h-4 w-4" />
          <span>{t("appName")}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
