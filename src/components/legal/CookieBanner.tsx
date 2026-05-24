"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "cookie-consent";

export function CookieBanner() {
  const t = useTranslations("legal");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const accept = (level: "all" | "essential") => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ level, date: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-4xl">
        <div className="flex items-start gap-3">
          <Cookie className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-sm">
              {t("cookieBannerText")}{" "}
              <Link href="/cookies" className="text-primary hover:underline">
                {t("cookiesTitle")}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => accept("essential")}>
            {t("cookieEssential")}
          </Button>
          <Button size="sm" onClick={() => accept("all")}>
            {t("cookieAcceptAll")}
          </Button>
        </div>
      </div>
    </div>
  );
}
