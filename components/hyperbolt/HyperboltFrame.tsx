"use client";

/**
 * Full-viewport iframe so the Aura HTML template runs as-is
 * (module scripts, Tailwind CDN, Lucide, Three.js, inline handlers).
 */
export function HyperboltFrame() {
  return (
    <iframe
      src="/hyperbolt/index.html"
      title="Hyperbolt Digital"
      className="block h-[100dvh] w-full border-0 bg-black"
      loading="eager"
    />
  );
}
