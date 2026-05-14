"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const COPPER = 0xc98756;
const COPPER_LIGHT = 0xe8b896;

function canCreateWebGLContext(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ??
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false });
    return !!gl;
  } catch {
    return false;
  }
}

/** Visible when WebGL fails or as a subtle base layer under the canvas */
function CopperGlowFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -left-1/4 top-1/3 h-[min(85vw,520px)] w-[min(85vw,520px)] -translate-y-1/2 rounded-full bg-primary/20 blur-[90px]"
        style={{ animation: "smaesi-glow 11s ease-in-out infinite" }}
      />
      <div
        className="absolute left-1/4 top-1/2 h-[min(65vw,380px)] w-[min(65vw,380px)] rounded-full bg-primary-deep/25 blur-[75px]"
        style={{ animation: "smaesi-glow 13s ease-in-out infinite reverse" }}
      />
    </div>
  );
}

export function WebGLBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [canvasMounted, setCanvasMounted] = useState(false);

  useEffect(() => {
    if (!canCreateWebGLContext()) return;

    const container = mountRef.current;
    if (!container) return;

    let disposed = false;
    let rafId = 0;

    const cleanup = () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      });
      if (!renderer.getContext()) {
        renderer.dispose();
        return;
      }
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5;
    camera.position.x = -1.5;

    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: COPPER,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const pointsMaterial = new THREE.PointsMaterial({
      color: COPPER_LIGHT,
      size: 0.03,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const mesh = new THREE.Mesh(geometry, wireframeMaterial);
    const points = new THREE.Points(geometry, pointsMaterial);
    const coreGroup = new THREE.Group();
    coreGroup.add(mesh);
    coreGroup.add(points);
    coreGroup.rotation.x = Math.PI / 4;
    coreGroup.position.y = 0.5;
    scene.add(coreGroup);

    const resize = () => {
      if (disposed || !container) return;
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1";
    container.appendChild(renderer.domElement);
    setCanvasMounted(true);
    resize();

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cleanup();
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    const tick = () => {
      if (disposed) return;
      rafId = requestAnimationFrame(tick);
      try {
        coreGroup.rotation.y -= 0.002;
        coreGroup.rotation.z += 0.001;
        const t = Date.now() * 0.001;
        pointsMaterial.size = 0.03 + Math.sin(t * 2) * 0.01;
        renderer.render(scene, camera);
      } catch {
        cleanup();
      }
    };

    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        if (!disposed) {
          resize();
          rafId = requestAnimationFrame(tick);
        }
      });
    });

    return () => {
      cleanup();
      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      geometry.dispose();
      wireframeMaterial.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      setCanvasMounted(false);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none relative h-full min-h-[50vh] w-full md:min-h-screen"
      style={{
        maskImage: "linear-gradient(to right, black 40%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 100%)",
      }}
      aria-hidden
    >
      <div
        className={`absolute inset-0 z-0 ${canvasMounted ? "opacity-40" : "opacity-100"}`}
        aria-hidden
      >
        <CopperGlowFallback />
      </div>
    </div>
  );
}
