import { getTranslations } from "next-intl/server";

const accents: Record<string, string> = {
  automation: "border-emerald-500/30",
  web: "border-sky-500/30",
  marketing: "border-violet-500/30",
};

type Item = { title: string; desc: string };
type Block = { key: string; badge: string; intro: string; items: Item[] };

export async function Services() {
  const t = await getTranslations("services");
  const blocks = t.raw("blocks") as Block[];

  return (
    <section id="services" className="relative scroll-mt-24 py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <h2 className="mb-4 text-3xl font-thin tracking-tight text-white/95 md:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mb-16 max-w-2xl text-lg font-thin text-white/50 md:text-xl">{t("subtitle")}</p>

        <div className="flex flex-col gap-12">
          {blocks.map((block) => (
            <article
              key={block.key}
              className={`rounded-sm border bg-white/[0.02] p-6 md:p-8 ${accents[block.key] ?? ""}`}
            >
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-white/80 md:text-sm">
                {block.badge}
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-white/55 md:text-base">{block.intro}</p>
              <ul className="space-y-6">
                {block.items.map((item) => (
                  <li
                    key={item.title}
                    className="border-s-2 border-primary/40 ps-4 md:border-s-[3px] md:ps-5"
                  >
                    <h4 className="mb-1 font-medium text-white/90">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
