"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLocale, useTranslations } from "next-intl";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const t = useTranslations("hero");
  const locale = useLocale();

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    let cancelled = false;
    let ctx: gsap.Context | null = null;

    const run = () => {
      if (cancelled || !section.isConnected) return;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set(section.querySelectorAll(".gsap-reveal"), { y: "0%" });
          gsap.set(section.querySelectorAll(".gsap-fade-in"), { opacity: 1, y: 0 });
          return;
        }
        gsap.to(section.querySelectorAll(".gsap-reveal"), {
          y: "0%",
          duration: 1.15,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.15,
          force3D: true,
        });
        gsap.fromTo(
          section.querySelectorAll(".gsap-fade-in"),
          { opacity: 0, y: 16, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.55,
            force3D: true,
          },
        );
      }, section);
    };

    const kickoff = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) run();
        });
      });
    };

    if (typeof document !== "undefined" && document.fonts?.ready) {
      void document.fonts.ready.then(kickoff);
    } else {
      kickoff();
    }

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [locale]);

  useEffect(() => {
    const tmr = window.setTimeout(() => {
      const section = root.current;
      if (!section) return;
      const sample = section.querySelector(".gsap-fade-in") as HTMLElement | null;
      if (!sample) return;
      if (parseFloat(getComputedStyle(sample).opacity) < 0.05) {
        gsap.set(section.querySelectorAll(".gsap-fade-in"), { opacity: 1, y: 0 });
        gsap.set(section.querySelectorAll(".gsap-reveal"), { y: "0%" });
      }
    }, 1100);
    return () => window.clearTimeout(tmr);
  }, [locale]);

  const auditHref = `mailto:hello@smaesi.com?subject=${encodeURIComponent(t("auditSubject"))}`;

  return (
    <section
      ref={root}
      className="flex min-h-screen flex-col justify-center pb-24 pt-28 sm:pt-32 md:pt-36"
      aria-labelledby="hero-heading"
    >
      <div className="container relative mx-auto flex px-6">
        <div className="ms-auto max-w-2xl pt-8 md:pt-0 rtl:me-auto rtl:ms-0">
          <div className="gsap-fade-in mb-10 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/50 opacity-0">
            <span className="rounded-sm bg-primary px-1.5 py-0.5 font-medium text-background">
              {t("badgeMorocco")}
            </span>
            <span>{t("badgeStack")}</span>
            <span className="text-white/20">|</span>
            <span>{t("badgeBots")}</span>
          </div>

          <h1
            id="hero-heading"
            className="mb-8 text-4xl font-thin leading-[1.05] tracking-tight text-white/95 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block overflow-hidden pb-1">
              <span className="gsap-reveal inline-block translate-y-full">{t("line1")}</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="gsap-reveal inline-block translate-y-full text-primary-bright">
                {t("line2")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="gsap-reveal inline-block translate-y-full">{t("line3")}</span>
            </span>
          </h1>

          <p className="gsap-fade-in mb-12 max-w-xl text-lg font-thin leading-relaxed text-white/50 opacity-0 md:text-xl">
            {t("sub")}
          </p>

          <div className="gsap-fade-in mb-24 flex flex-col items-stretch gap-6 opacity-0 sm:flex-row sm:items-center">
            <div
              className="rounded p-px shadow-[0_0_40px_-10px_rgba(201,135,86,0.35)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,135,86,0.85) 0%, rgba(201,135,86,0.12) 100%)",
              }}
            >
              <a
                id="audit"
                href={auditHref}
                className="group flex items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 font-mono text-xs font-medium tracking-widest text-background transition-colors hover:bg-primary-bright sm:inline-flex"
              >
                {t("ctaPrimary")}
                <ArrowIcon className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </a>
            </div>
            <a
              href="#services"
              className="group flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              {t("ctaSecondary")}
              <ArrowIcon className="opacity-50 transition-all group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:opacity-100 rtl:rotate-180" />
            </a>
          </div>

          <div className="gsap-fade-in relative grid grid-cols-2 gap-8 border-t border-white/10 pt-10 opacity-0 md:grid-cols-3 md:gap-12">
            <div
              className="absolute start-0 top-[-1px] h-px w-1/3 max-w-xs bg-[linear-gradient(90deg,#c98756,transparent)] rtl:bg-[linear-gradient(270deg,#c98756,transparent)]"
            />
            <div>
              <div className="mb-2 text-3xl font-thin tracking-tight text-white/90 md:text-4xl">
                {t("stat1Value")}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-white/40">
                {t("stat1Label")}
              </div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-thin tracking-tight text-white/90 md:text-4xl">
                {t("stat2Value")}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-white/40">
                {t("stat2Label")}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="mb-2 text-3xl font-thin tracking-tight text-white/90 md:text-4xl">
                {t("stat3Value")}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-white/40">
                {t("stat3Label")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
