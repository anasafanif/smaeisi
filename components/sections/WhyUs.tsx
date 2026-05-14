import { getTranslations } from "next-intl/server";

type Bullet = { icon: string; title: string; body: string };

export async function WhyUs() {
  const t = await getTranslations("whyUs");
  const bullets = t.raw("bullets") as Bullet[];

  return (
    <section
      id="why-us"
      className="relative border-t border-white/5 bg-background/60 py-24 backdrop-blur-sm"
    >
      <div className="container mx-auto max-w-5xl px-6">
        <h2 className="mb-6 text-3xl font-thin tracking-tight text-white/95 md:text-4xl lg:text-5xl">
          {t("headlinePrefix")}{" "}
          <span className="text-primary-bright">{t("headlineAccent")}</span>
          {t("headlineSuffix")}
        </h2>
        <p className="mb-16 max-w-3xl text-lg font-thin leading-relaxed text-white/55 md:text-xl">
          {t("body")}
        </p>
        <ul className="grid gap-10 md:grid-cols-3">
          {bullets.map((b) => (
            <li
              key={b.title}
              className="rounded-sm border border-white/10 bg-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
            >
              <div className="mb-4 text-2xl" aria-hidden>
                {b.icon}
              </div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary-bright">
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/55">{b.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
