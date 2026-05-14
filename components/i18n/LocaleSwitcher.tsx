"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center rounded-sm border border-white/15 bg-black/25 p-0.5 font-mono text-[10px] uppercase tracking-widest"
      role="group"
      aria-label={t("aria")}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`rounded-sm px-2 py-1 transition-colors ${
            locale === loc
              ? "bg-primary text-background"
              : "text-white/55 hover:text-white"
          }`}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
