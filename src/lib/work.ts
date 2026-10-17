import { Work } from "@/interfaces/work";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { readingTime } from "./reading-time";

const workDirectory = join(process.cwd(), "_work");

export function getWorkSlugs() {
  if (!fs.existsSync(workDirectory)) return [];
  return fs.readdirSync(workDirectory).filter((f) => f.endsWith(".md"));
}

export function getWorkBySlug(slug: string): Work | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(workDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content, readingTime: readingTime(content) } as Work;
}

export function getAllWork(): Work[] {
  return getWorkSlugs()
    .map((slug) => getWorkBySlug(slug) as Work)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
