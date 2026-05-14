import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  /** Use Accept-Language + NEXT_LOCALE cookie (see next-intl middleware docs). */
  localeDetection: true,
});
