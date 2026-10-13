"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

const links = [
  { name: "work", href: "/work" },
  { name: "writing", href: "/posts" },
  { name: "about", href: "/about" },
  { name: "contact", href: "mailto:liangyu.chen.dev@gmail.com" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => href !== "/" && pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 text-sm md:px-8">
          <Link href="/" className="font-semibold">liangyu’</Link>
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.name}>
                <Link href={l.href} className={isActive(l.href) ? "" : "opacity-60 transition-opacity hover:opacity-100"}>
                  {l.name}
                </Link>
              </li>
            ))}
            <li><ThemeToggle /></li>
          </ul>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? "close" : "menu"}
          </button>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end gap-2 bg-bg px-4 pb-10 text-fg md:hidden">
          {links.map((l) => (
            <Link key={l.name} href={l.href} className="display text-6xl">{l.name}</Link>
          ))}
          <div className="mt-6 text-sm"><ThemeToggle /></div>
        </div>
      )}
    </>
  );
}
