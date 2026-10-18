export const LOCALES = ["en", "zh-tw", "ja"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

// BCP 47 tags for <html lang> and hreflang.
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  "zh-tw": "zh-Hant-TW",
  ja: "ja",
};

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  "zh-tw": "zh_TW",
  ja: "ja_JP",
};

// Shown in the language switcher, in each language's own script.
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "en",
  "zh-tw": "中文",
  ja: "日本語",
};

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

/**
 * Splits "/ja/posts/x" into { locale: "ja", path: "/posts/x" }. Unprefixed paths are the default locale.
 * "/en/..." is also stripped: it's the internal rewrite target, which usePathname() reports during prerender.
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first)) {
    return { locale: first, path: "/" + rest.join("/") };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}

/** Builds a site path for a locale. The default locale is unprefixed: localePath("ja", "/posts") → "/ja/posts". */
export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return path; // external / mailto
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Metadata `alternates` for a path: canonical for this locale plus hreflang links for every locale. */
export function alternatesFor(siteUrl: string, locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HTML_LANG[l]] = siteUrl + localePath(l, path);
  languages["x-default"] = siteUrl + localePath(DEFAULT_LOCALE, path);
  return { canonical: siteUrl + localePath(locale, path), languages };
}
