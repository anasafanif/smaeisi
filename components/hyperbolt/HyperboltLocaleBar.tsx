"use client";

import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";

export function HyperboltLocaleBar() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] flex justify-end px-5 py-6 sm:px-8 lg:px-10 xl:px-12"
      dir="ltr"
      aria-hidden={false}
    >
      <div className="pointer-events-auto">
        <LocaleSwitcher variant="glass" />
      </div>
    </div>
  );
}
