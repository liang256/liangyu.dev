import { Post } from "@/interfaces/post";
import { join } from "path";
import { markdownSlugs, readLocalizedMarkdown } from "./content";
import { DEFAULT_LOCALE, type Locale } from "./i18n";
import { readingTime } from "./reading-time";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return markdownSlugs(postsDirectory);
}

export function getPostBySlug(slug: string, locale: Locale = DEFAULT_LOCALE): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  const file = readLocalizedMarkdown(postsDirectory, realSlug, locale);
  if (!file) return null;
  const { data, content } = file;

  return { ...data, slug: realSlug, content, readingTime: readingTime(content) } as Post;
}

export function getAllPosts(locale: Locale = DEFAULT_LOCALE): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug, locale) as Post)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
