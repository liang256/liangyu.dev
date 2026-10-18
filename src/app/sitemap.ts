import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/api";
import { getAllWork } from "@/lib/work";
import { SITE_URL } from "@/lib/constants";
import { LOCALES, alternatesFor } from "@/lib/i18n";

type Entry = Omit<MetadataRoute.Sitemap[number], "url" | "alternates"> & { path: string };

// One URL per locale for every page, each listing its translations as hreflang alternates.
function localized({ path, ...rest }: Entry): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => {
    const { canonical, languages } = alternatesFor(SITE_URL, locale, path);
    return { ...rest, url: canonical, alternates: { languages } };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries: Entry[] = getAllPosts().map((post) => ({
    path: `/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const workEntries: Entry[] = getAllWork().map((work) => ({
    path: `/work/${work.slug}`,
    lastModified: new Date(work.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const entries: Entry[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/posts", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.5 },
    { path: "/work", changeFrequency: "monthly", priority: 0.5 },
    ...workEntries,
    ...postEntries,
  ];

  return entries.flatMap(localized);
}
