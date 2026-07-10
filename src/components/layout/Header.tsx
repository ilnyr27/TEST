"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Brain, Menu, X, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UserMenu } from "@/components/auth/UserMenu";
import { useUser } from "@/hooks/useUser";
import { useCredits } from "@/hooks/useCredits";

export function Header() {
  const t = useTranslations("common");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useUser();
  const { balance } = useCredits();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold">{t("appName")}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("dashboard")}
          </Link>
          <Link
            href="/coach"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("coach")}
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("pricing")}
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          {loading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <>
              {balance > 0 && (
                <Link href="/pricing" className="flex items-center gap-1 text-sm font-medium text-primary">
                  <Coins className="h-4 w-4" />
                  {balance}
                </Link>
              )}
              <UserMenu />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t("login")}
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">{t("signup")}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile: theme + lang + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          {user ? (
            <>
              {balance > 0 && (
                <span className="flex items-center gap-0.5 text-xs font-medium text-primary">
                  <Coins className="h-3.5 w-3.5" />
                  {balance}
                </span>
              )}
              <UserMenu />
            </>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/dashboard"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t("dashboard")}
            </Link>
            <Link
              href="/coach"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t("coach")}
            </Link>
            <Link
              href="/pricing"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t("pricing")}
            </Link>
            {!user && !loading && (
              <div className="flex gap-2 pt-2 border-t">
                <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">
                    {t("login")}
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">{t("signup")}</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
