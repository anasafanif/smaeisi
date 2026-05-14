"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const COOKIE = "NEXT_LOCALE";
const SESSION_KEY = "smaesi_locale_probe_v1";

type AppLocale = (typeof routing.locales)[number];

function preferredFromNavigator(): AppLocale {
  if (typeof navigator === "undefined") return routing.defaultLocale;
  const candidates = [...(navigator.languages ?? []), navigator.language].filter(Boolean);
  for (const tag of candidates) {
    const base = String(tag).toLowerCase().split("-")[0];
    if ((routing.locales as readonly string[]).includes(base)) {
      return base as AppLocale;
    }
  }
  return routing.defaultLocale;
}

/**
 * Aligns locale with the browser when no NEXT_LOCALE cookie is set yet.
 * Middleware already uses Accept-Language; this covers stripped headers or static edge cases.
 */
export function ClientLocaleNegotiator() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined" || typeof sessionStorage === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    try {
      if (locale !== routing.defaultLocale) return;

      const hasLocaleCookie = document.cookie
        .split(";")
        .some((c) => c.trim().startsWith(`${COOKIE}=`));

      if (hasLocaleCookie) return;

      const preferred = preferredFromNavigator();
      if (preferred !== locale) {
        router.replace(pathname, { locale: preferred });
      }
    } finally {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, [locale, pathname, router]);

  return null;
}
