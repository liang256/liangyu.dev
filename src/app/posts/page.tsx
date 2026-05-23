import type { Metadata } from "next";
import { PostPreview } from "../_components/post-preview";
import { getAllPosts } from "@/lib/api";
import Header from "../_components/header";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on programming, AI, creative tech, and more by Liangyu Chen.",
  openGraph: {
    title: "Blog | Liangyu Chen",
    description:
      "Articles on programming, AI, creative tech, and more by Liangyu Chen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Liangyu Chen",
    description:
      "Articles on programming, AI, creative tech, and more by Liangyu Chen.",
  },
};

export default function PostList() {
  const posts = getAllPosts();
  return (
    <div className="space-y-12">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  );
}
