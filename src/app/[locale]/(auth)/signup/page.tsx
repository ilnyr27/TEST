"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppLogo } from "@/components/ui/app-logo";

type Gender = "male" | "female" | "other";

export default function SignupPage() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const tl = useTranslations("legal");
  const locale = useLocale();
  const ru = locale === "ru";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("passwordsMismatch"));
      return;
    }

    if (!consentPrivacy || !consentTerms) {
      setError(tl("consentRequired"));
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName, gender: gender ?? "other" },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>{t("checkEmail")}</CardTitle>
            <CardDescription>
              {t("confirmationSent")} <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <AppLogo size={24} />
          </div>
          <CardTitle>{t("signupTitle")}</CardTitle>
          <CardDescription>{tc("appDescription")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">{t("displayName")}</Label>
              <Input
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            {/* Gender */}
            <div className="space-y-2">
              <Label>{ru ? "Кто вы?" : "Who are you?"}</Label>
              <div className="flex gap-2">
                {(["female", "male", "other"] as Gender[]).map((g) => {
                  const label = ru
                    ? g === "female" ? "Женщина" : g === "male" ? "Мужчина" : "Не указывать"
                    : g === "female" ? "Female" : g === "male" ? "Male" : "Prefer not to say";
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
                        gender === g
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-muted-foreground/40"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Consent checkboxes */}
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="consent-privacy"
                  checked={consentPrivacy}
                  onCheckedChange={(v) => setConsentPrivacy(v === true)}
                />
                <label htmlFor="consent-privacy" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                  {tl("consentPrivacy")}{" "}
                  <Link href="/privacy" className="text-primary hover:underline" target="_blank">
                    {tl("privacyTitle")}
                  </Link>
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="consent-terms"
                  checked={consentTerms}
                  onCheckedChange={(v) => setConsentTerms(v === true)}
                />
                <label htmlFor="consent-terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                  {tl("consentTerms")}{" "}
                  <Link href="/terms" className="text-primary hover:underline" target="_blank">
                    {tl("termsTitle")}
                  </Link>
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !consentPrivacy || !consentTerms}
            >
              {loading ? tc("loading") : tc("signup")}
            </Button>
            <p className="text-sm text-muted-foreground">
              {t("hasAccount")}{" "}
              <Link href="/login" className="text-primary hover:underline">
                {tc("login")}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
