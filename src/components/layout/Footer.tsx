"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Brain } from "lucide-react";

export function Footer() {
  const t = useTranslations("common");
  const tl = useTranslations("legal");

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>{t("appName")}</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              {tl("privacyTitle")}
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              {tl("termsTitle")}
            </Link>
            <Link href="/offer" className="hover:text-foreground transition-colors">
              {tl("offerTitle")}
            </Link>
            <Link href="/contacts" className="hover:text-foreground transition-colors">
              {tl("contactsTitle")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
