"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LocaleSwitcherProps = {
  variant?: "default" | "glass";
};

export function LocaleSwitcher({ variant = "default" }: LocaleSwitcherProps) {
  const t = useTranslations("locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  if (variant === "glass") {
    return (
      <div
        className="flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.035] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
        role="group"
        aria-label={t("aria")}
      >
        {routing.locales.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`rounded-full px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-3 sm:text-xs ${
              locale === loc
                ? "border border-violet-300/25 bg-violet-500/15 text-white shadow-[0_0_1rem_rgba(139,92,246,0.18)]"
                : "border border-transparent text-slate-400 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            {t(loc)}
          </button>
        ))}
      </div>
    );
  }

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
