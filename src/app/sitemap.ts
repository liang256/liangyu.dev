import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/api";
import { getAllWork } from "@/lib/work";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const workEntries: MetadataRoute.Sitemap = getAllWork().map((work) => ({
    url: `${SITE_URL}/work/${work.slug}`,
    lastModified: new Date(work.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/posts`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/work`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...workEntries,
    ...postEntries,
  ];
}
