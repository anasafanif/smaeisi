import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMAESI",
  description: "AI-powered digital agency for Moroccan businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${inter.variable} ${jetbrains.variable} ${notoArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-white antialiased overflow-x-hidden selection:bg-primary selection:text-background">
        {children}
      </body>
    </html>
  );
}
