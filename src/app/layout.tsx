import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Познай Себя",
    default: "Познай Себя — Тесты личности и ИИ-анализ",
  },
  description:
    "300+ научных вопросов по 7 направлениям: психология, карьера, интеллект, привычки, семья, творчество. ИИ-анализ. Узнайте себя по-настоящему.",
  keywords: ["психологические тесты", "самопознание", "тест личности", "Большая пятёрка", "MBTI", "эмоциональный интеллект", "тест на выгорание", "psychology tests", "self-discovery", "personality test"],
  authors: [{ name: "Познай Себя" }],
  openGraph: {
    title: "Познай Себя — Тесты личности и ИИ-анализ",
    description: "300+ научных вопросов по 7 направлениям. ИИ-анализ. Узнайте себя по-настоящему.",
    type: "website",
    locale: "ru_RU",
    alternateLocale: "en_US",
    siteName: "Познай Себя",
  },
  twitter: {
    card: "summary_large_image",
    title: "Познай Себя — Тесты личности и ИИ-анализ",
    description: "300+ научных вопросов по 7 направлениям. ИИ-анализ.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
