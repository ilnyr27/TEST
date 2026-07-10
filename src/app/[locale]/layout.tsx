import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { routing } from "@/lib/i18n/routing";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieBanner } from "@/components/legal/CookieBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: {
        template: "%s | Know Yourself",
        default: "Know Yourself — Personality Tests & AI Analysis",
      },
      description:
        "300+ scientific questions across 7 areas: psychology, career, intelligence, habits, family, creativity. AI-powered analysis. Discover who you really are.",
      openGraph: {
        title: "Know Yourself — Personality Tests & AI Analysis",
        description: "300+ scientific questions. AI-powered analysis. Discover who you really are.",
        locale: "en_US",
        siteName: "Know Yourself",
      },
      twitter: {
        title: "Know Yourself — Personality Tests & AI Analysis",
        description: "300+ scientific questions. AI-powered analysis.",
      },
    };
  }

  return {};
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <div className="flex min-h-screen flex-col">{children}</div>
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
