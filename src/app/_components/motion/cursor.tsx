"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, motionEnabled } from "./gsap";

// labels translates data-cursor keys ("read", "open") into the page language.
export function Cursor({ labels }: { labels: Record<string, string> }) {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!motionEnabled() || !window.matchMedia("(pointer: fine)").matches || !dot.current) return;
    const el = dot.current;
    el.style.display = "flex";
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 });

    const onMove = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
      gsap.to(el, { scale: target ? 1 : 0, duration: 0.25, overwrite: "auto" });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[90] h-20 w-20 items-center justify-center rounded-full bg-fg font-mono text-[11px] lowercase text-bg"
    >
      {labels[label] ?? label}
    </div>
  );
}
