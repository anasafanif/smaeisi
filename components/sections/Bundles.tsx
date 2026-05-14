import { getTranslations } from "next-intl/server";

type BundleItem = {
  title: string;
  price: string;
  emoji: string;
  perfect: string;
  points: string[];
};

export async function Bundles() {
  const t = await getTranslations("bundles");
  const items = t.raw("items") as BundleItem[];
  const mail = `mailto:hello@smaesi.com?subject=${encodeURIComponent(t("mailtoSubject"))}`;

  return (
    <section id="bundles" className="relative scroll-mt-24 border-t border-white/5 py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <h2 className="mb-4 text-3xl font-thin tracking-tight text-white/95 md:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mb-14 max-w-2xl text-lg font-thin text-white/50 md:text-xl">{t("subtitle")}</p>

        <div className="grid gap-10 md:grid-cols-2">
          {items.map((b) => (
            <article
              key={b.title}
              className="flex flex-col rounded-sm border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 shadow-[0_0_60px_-24px_rgba(201,135,86,0.25)]"
            >
              <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary-bright">
                <span aria-hidden>👉</span>
                <span>{b.emoji}</span>
              </div>
              <h3 className="mb-2 text-xl font-medium text-white md:text-2xl">{b.title}</h3>
              <p className="mb-6 font-mono text-sm tracking-wide text-white/70">{b.price}</p>
              <p className="mb-8 text-sm text-white/50">{b.perfect}</p>
              <ul className="mb-10 flex-1 space-y-3 text-sm text-white/65">
                {b.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href={mail}
                className="inline-flex w-full items-center justify-center rounded-sm border border-primary/50 bg-primary/10 py-3 font-mono text-xs font-medium uppercase tracking-widest text-primary-bright transition-colors hover:bg-primary/20 md:w-auto md:px-8"
              >
                {t("claim")}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
