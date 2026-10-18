import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import type { Locale } from "./i18n";

/**
 * Reads `<dir>/<slug>.md` (the original, in whatever language it was written), overlaid with its
 * translation at `<dir>/<locale>/<slug>.md` when one exists. This applies to every locale, including
 * English, so a post written in Chinese gets its English version from `<dir>/en/<slug>.md`.
 * Translation frontmatter is merged over the source's, so translations only need the fields they change
 * (title, excerpt, …); date, coverImage etc. are inherited.
 */
export function readLocalizedMarkdown(dir: string, slug: string, locale: Locale) {
  const sourcePath = join(dir, `${slug}.md`);
  if (!fs.existsSync(sourcePath)) return null;
  const source = matter(fs.readFileSync(sourcePath, "utf8"));

  const translatedPath = join(dir, locale, `${slug}.md`);
  if (!fs.existsSync(translatedPath)) {
    return { data: source.data, content: source.content };
  }
  const translated = matter(fs.readFileSync(translatedPath, "utf8"));
  return { data: { ...source.data, ...translated.data }, content: translated.content };
}

/** Slugs of the source-language markdown files in `dir` (translation subfolders are skipped). */
export function markdownSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
