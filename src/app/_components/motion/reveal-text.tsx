"use client";

import React, { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, motionEnabled } from "./gsap";

type Props = {
  as?: "h1" | "h2" | "p" | "div";
  className?: string;
  children: ReactNode;
};

export function RevealText({ as = "div", className, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !motionEnabled()) return;
      // Wait out the intro loader if it is playing.
      const delay = document.documentElement.classList.contains("loader") ? 1.7 : 0;
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: "visible" });
          return gsap.from(self.lines, {
            yPercent: 105,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            delay,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}
