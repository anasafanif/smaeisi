export function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-40"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at top, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at top, black 20%, transparent 80%)",
      }}
      aria-hidden
    />
  );
}
