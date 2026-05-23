import type { Metadata } from "next";
import fs from "fs";
import { join } from "path";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostBody } from "@/app/_components/post-body";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Liangyu Chen — software engineer, writer, and creator based in Montreal.",
  openGraph: {
    title: "About | Liangyu Chen",
    description:
      "Learn about Liangyu Chen — software engineer, writer, and creator based in Montreal.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Liangyu Chen",
    description:
      "Learn about Liangyu Chen — software engineer, writer, and creator based in Montreal.",
  },
};

export default async function AboutPage() {
  const fullPath = join(process.cwd(), "_about/about.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const markdownContent = await markdownToHtml(fileContents || "");

  return (
    <div>
      <div style={{ padding: "41.77% 0 0 0", position: "relative" }}>
        <iframe
          src="https://player.vimeo.com/video/412302470?h=d0af2aa869"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
      </div>
      <PostBody content={markdownContent} />
    </div>
  );
}
