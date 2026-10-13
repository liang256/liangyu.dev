"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.classList.contains("loader")) return;
      const done = () => {
        html.classList.remove("loader");
        try {
          sessionStorage.setItem("loader-played", "1");
        } catch {}
      };
      const counter = { v: 100 };
      gsap
        .timeline({ onComplete: done })
        .to(counter, {
          v: 0,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
        .to(root.current, { yPercent: -100, duration: 0.6, ease: "power4.inOut" });
      // Leaving / before the timeline finishes still counts as played.
      return done;
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="loader-overlay fixed inset-0 z-[100] items-center justify-center bg-bg text-fg">
      <span className="display text-[clamp(3rem,10vw,8rem)]">liangyu’</span>
      <span ref={count} className="label absolute bottom-6 right-4 text-sm text-fg md:right-8">100</span>
    </div>
  );
}
