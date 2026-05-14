import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
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
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: "SMAESI",
      description: t("description"),
      locale: locale === "fr" ? "fr_MA" : locale === "ar" ? "ar_MA" : "en_MA",
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
