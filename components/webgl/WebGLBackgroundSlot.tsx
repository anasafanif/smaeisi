"use client";

import dynamic from "next/dynamic";

const WebGLBackground = dynamic(
  () => import("./WebGLBackground").then((m) => m.WebGLBackground),
  { ssr: false },
);

export function WebGLBackgroundSlot() {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full md:w-[60%] opacity-80 mix-blend-screen md:opacity-100">
      <WebGLBackground />
    </div>
  );
}
