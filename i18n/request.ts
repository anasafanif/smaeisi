import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import ar from "../messages/ar.json";
import en from "../messages/en.json";
import fr from "../messages/fr.json";

type AppLocale = (typeof routing.locales)[number];

const messagesByLocale: Record<AppLocale, AbstractIntlMessages> = {
  en: en as unknown as AbstractIntlMessages,
  fr: fr as unknown as AbstractIntlMessages,
  ar: ar as unknown as AbstractIntlMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as AppLocale)) {
    locale = routing.defaultLocale;
  }
  const safeLocale = locale as AppLocale;
  return {
    locale: safeLocale,
    messages: messagesByLocale[safeLocale],
  };
});
