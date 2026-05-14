"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";

const navKeys = ["whyUs", "services", "bundles"] as const;
const hashByKey = { whyUs: "#why-us", services: "#services", bundles: "#bundles" } as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between gap-3 px-6">
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-2">
          <Image
            src="/logo-smaesi.png"
            alt="SMAESI"
            width={408}
            height={326}
            sizes="(max-width: 640px) 84px, (max-width: 1024px) 100px, 112px"
            className="h-auto w-[84px] max-w-[29vw] translate-y-1 object-contain object-center sm:w-[90px] md:w-[100px] lg:w-28"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex md:gap-10">
          {navKeys.map((key) => (
            <a
              key={key}
              href={hashByKey[key]}
              className="font-mono text-xs tracking-widest text-white/60 transition-colors duration-300 hover:text-white"
            >
              {tNav(key).toUpperCase()}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <LocaleSwitcher />
          <a
            href="#audit"
            className="hidden rounded-sm bg-surface px-4 py-2.5 font-mono text-xs font-medium tracking-widest text-black transition-colors hover:bg-white sm:inline-block md:px-5"
          >
            {tHeader("bookAudit")}
          </a>
          <button
            type="button"
            className="font-mono text-xs tracking-widest text-white/70 md:hidden"
            aria-expanded={open}
            aria-label={open ? tHeader("close") : tHeader("menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? tHeader("close") : tHeader("menu")}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-b border-white/5 bg-background/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4 font-mono text-xs tracking-widest">
            {navKeys.map((key) => (
              <a
                key={key}
                href={hashByKey[key]}
                className="text-white/80"
                onClick={() => setOpen(false)}
              >
                {tNav(key).toUpperCase()}
              </a>
            ))}
            <a
              href="#audit"
              className="text-primary-bright"
              onClick={() => setOpen(false)}
            >
              {tHeader("bookAuditMobile")}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
