import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LangDirSetter } from "@/components/i18n/LangDirSetter";
import { ClientLocaleNegotiator } from "@/components/i18n/ClientLocaleNegotiator";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "SMAESI — Digital Studio",
    description:
      "We build high-performance digital products for ambitious brands. Strategy, design, and engineering in one focused growth system.",
    openGraph: {
      title: "SMAESI",
      description:
        "Digital products. Real impact. Strategy, design, engineering, and optimization in one focused growth system.",
      locale: locale === "fr" ? "fr_FR" : locale === "ar" ? "ar_MA" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "fr" | "ar")) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      <LangDirSetter locale={locale} />
      <NextIntlClientProvider messages={messages}>
        <ClientLocaleNegotiator />
        <div className={locale === "ar" ? "font-arabic" : ""}>{children}</div>
      </NextIntlClientProvider>
    </>
  );
}
