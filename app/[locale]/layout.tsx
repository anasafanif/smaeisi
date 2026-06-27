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

  const metaByLocale: Record<string, { title: string; description: string }> = {
    en: {
      title: "SMAESI — Digital Studio",
      description:
        "We build high-performance digital products for ambitious brands. Strategy, design, and engineering in one focused growth system.",
    },
    fr: {
      title: "SMAESI — Studio Digital",
      description:
        "Nous concevons des produits digitaux performants pour les marques ambitieuses. Stratégie, design et ingénierie en un seul système.",
    },
    ar: {
      title: "SMAESI — استوديو رقمي",
      description:
        "نبني منتجات رقمية عالية الأداء للعلامات الطموحة. استراتيجية، تصميم، وهندسة في نظام نمو واحد.",
    },
  };

  const meta = metaByLocale[locale] ?? metaByLocale.en;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: "SMAESI",
      description: meta.description,
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
