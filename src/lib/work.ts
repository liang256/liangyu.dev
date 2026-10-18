import { Work } from "@/interfaces/work";
import { join } from "path";
import { markdownSlugs, readLocalizedMarkdown } from "./content";
import { DEFAULT_LOCALE, type Locale } from "./i18n";
import { readingTime } from "./reading-time";

const workDirectory = join(process.cwd(), "_work");

export function getWorkSlugs() {
  return markdownSlugs(workDirectory);
}

export function getWorkBySlug(slug: string, locale: Locale = DEFAULT_LOCALE): Work | null {
  const realSlug = slug.replace(/\.md$/, "");
  const file = readLocalizedMarkdown(workDirectory, realSlug, locale);
  if (!file) return null;
  const { data, content } = file;

  return { ...data, slug: realSlug, content, readingTime: readingTime(content) } as Work;
}

export function getAllWork(locale: Locale = DEFAULT_LOCALE): Work[] {
  return getWorkSlugs()
    .map((slug) => getWorkBySlug(slug, locale) as Work)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
