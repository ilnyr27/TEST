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
  title: "Know Yourself | Познай Себя",
  description:
    "Deep self-discovery platform through scientific tests and AI analysis. 300+ questions across psychology, career, intelligence, habits, family, creativity.",
  keywords: ["psychology tests", "self-discovery", "personality test", "Big Five", "MBTI", "emotional intelligence", "burnout test", "психологические тесты", "самопознание", "тест личности"],
  authors: [{ name: "Know Yourself" }],
  openGraph: {
    title: "Know Yourself | Познай Себя",
    description: "300+ scientific psychology questions. AI-powered analysis. Discover who you really are.",
    type: "website",
    locale: "ru_RU",
    alternateLocale: "en_US",
    siteName: "Know Yourself",
  },
  twitter: {
    card: "summary_large_image",
    title: "Know Yourself | Познай Себя",
    description: "300+ scientific psychology questions. AI-powered analysis.",
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
