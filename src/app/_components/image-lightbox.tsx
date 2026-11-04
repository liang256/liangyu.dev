"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Zoomed = { src: string; alt: string };

// Wraps rendered markdown: clicking an image (not inside a link) opens it full-screen.
export function ImageLightbox({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [zoomed, setZoomed] = useState<Zoomed | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const zoomable = (img: HTMLImageElement) => !img.closest("a");
    el.querySelectorAll("img").forEach((img) => {
      if (!zoomable(img)) return;
      img.dataset.cursor = "zoom";
      img.tabIndex = 0;
      img.setAttribute("role", "button");
    });
    const open = (target: EventTarget | null) => {
      const img = (target as Element | null)?.closest("img");
      if (!img || !zoomable(img)) return false;
      opener.current = img;
      setZoomed({ src: img.currentSrc || img.src, alt: img.alt });
      return true;
    };
    const onClick = (e: MouseEvent) => open(e.target);
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && open(e.target)) e.preventDefault();
    };
    el.addEventListener("click", onClick);
    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("click", onClick);
      el.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!zoomed) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      opener.current?.focus?.();
    };
  }, [zoomed]);

  return (
    <>
      <div ref={root}>{children}</div>
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.alt || "Image"}
          data-lenis-prevent
          onClick={() => setZoomed(null)}
          style={{ backgroundColor: "color-mix(in srgb, var(--bg) 92%, transparent)" }}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center p-4 backdrop-blur-sm md:p-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoomed.src}
            alt={zoomed.alt}
            className="max-h-full max-w-full bg-white object-contain shadow-2xl"
          />
          <button
            ref={closeBtn}
            type="button"
            aria-label="Close"
            onClick={() => setZoomed(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg text-xl leading-none text-fg transition-colors hover:border-fg"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
