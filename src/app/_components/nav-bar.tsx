"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/dictionaries";
import { LOCALES, LOCALE_LABEL, localePath, splitLocale, type Locale } from "@/lib/i18n";
import ThemeToggle from "./theme-toggle";

type Props = { locale: Locale; nav: Dictionary["nav"] };

function LanguageSwitcher({ locale, path, label }: { locale: Locale; path: string; label: string }) {
  return (
    <span role="group" aria-label={label} className="flex gap-3">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={localePath(l, path)}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={l === locale ? "" : "opacity-60 transition-opacity hover:opacity-100"}
        >
          {LOCALE_LABEL[l]}
        </Link>
      ))}
    </span>
  );
}

export function NavBar({ locale, nav }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  // usePathname returns the browser URL (no /en prefix for English).
  const { path } = splitLocale(pathname);
  const links = [
    { name: nav.work, href: "/work" },
    { name: nav.writing, href: "/posts" },
    { name: nav.about, href: "/about" },
    { name: nav.contact, href: "mailto:liangyu.chen.dev@gmail.com" },
  ];
  const isActive = (href: string) => href !== "/" && path.startsWith(href);
  const themeLabels = { light: nav.light, dark: nav.dark, toggle: nav.toggleTheme };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 text-sm md:px-8">
          <Link href={localePath(locale, "/")} className="font-semibold">liangyu’</Link>
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={localePath(locale, l.href)} className={isActive(l.href) ? "" : "opacity-60 transition-opacity hover:opacity-100"}>
                  {l.name}
                </Link>
              </li>
            ))}
            <li><ThemeToggle labels={themeLabels} /></li>
            <li><LanguageSwitcher locale={locale} path={path} label={nav.language} /></li>
          </ul>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? nav.close : nav.menu}
          </button>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end gap-2 bg-bg px-4 pb-10 text-fg md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={localePath(locale, l.href)} onClick={() => setOpen(false)} className="display text-6xl">{l.name}</Link>
          ))}
          <div className="mt-6 flex gap-6 text-sm">
            <ThemeToggle labels={themeLabels} />
            <LanguageSwitcher locale={locale} path={path} label={nav.language} />
          </div>
        </div>
      )}
    </>
  );
}
