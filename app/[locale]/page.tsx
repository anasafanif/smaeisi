import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GridBackground } from "@/components/layout/GridBackground";
import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { Bundles } from "@/components/sections/Bundles";
import { WebGLBackgroundSlot } from "@/components/webgl/WebGLBackgroundSlot";

export default function HomePage() {
  return (
    <>
      <GridBackground />
      <WebGLBackgroundSlot />
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <WhyUs />
        <Services />
        <Bundles />
      </main>
      <SiteFooter />
    </>
  );
}
