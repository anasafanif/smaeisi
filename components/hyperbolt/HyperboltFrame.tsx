"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

/**
 * Full-viewport iframe so the Aura HTML template runs as-is
 * (module scripts, Tailwind CDN, Lucide, Three.js, inline handlers).
 */
export function HyperboltFrame() {
  const locale = useLocale();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src =
    locale === "ar"
      ? "/hyperbolt/ar/index.html"
      : locale === "fr"
        ? "/hyperbolt/fr/index.html"
        : "/hyperbolt/index.html";

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onWheel = (e: WheelEvent) => {
      // When the iframe is not focused, wheel events hit the iframe element on
      // the parent page and never reach the document inside.
      if (e.target !== iframe) return;

      const win = iframe.contentWindow;
      if (!win) return;

      win.scrollBy({ top: e.deltaY, left: e.deltaX });
      e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [src]);

  return (
    <iframe
      ref={iframeRef}
      key={locale}
      src={src}
      title="SMAESI"
      className="block h-[100dvh] w-full border-0 bg-black"
      loading="eager"
    />
  );
}
