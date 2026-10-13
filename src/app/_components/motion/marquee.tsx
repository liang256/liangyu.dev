"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, motionEnabled } from "./gsap";

type Props = { text: string; className?: string };

export function Marquee({ text, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motionEnabled()) return;
      const tween = gsap.to(track.current, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        onUpdate: (self) => gsap.to(tween, { timeScale: self.direction, duration: 0.4, overwrite: true }),
      });
    },
    { scope: root },
  );

  const chunk = Array(4).fill(`${text} — `).join("");
  return (
    <div ref={root} className={`overflow-hidden whitespace-nowrap ${className}`} aria-label={text}>
      <div ref={track} className="inline-block" aria-hidden>
        <span>{chunk}</span>
        <span>{chunk}</span>
      </div>
    </div>
  );
}
