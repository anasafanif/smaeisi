import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-background/90 py-10 backdrop-blur-xl">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-start">
        <p className="font-mono text-xs tracking-widest text-white/35">
          {t("copyright", { year })}
        </p>
        <p className="max-w-md text-sm text-white/45">{t("tagline")}</p>
      </div>
    </footer>
  );
}
