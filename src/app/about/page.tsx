import type { Metadata } from "next";
import fs from "fs";
import { join } from "path";
import Script from "next/script";
import markdownToHtml from "@/lib/markdownToHtml";
import { splitMarkdownSections } from "@/lib/markdown-sections";
import { PostBody } from "@/app/_components/post-body";
import Container from "@/app/_components/container";
import { RevealText } from "@/app/_components/motion/reveal-text";

const DESCRIPTION = "Learn about Liangyu Chen — software engineer, writer, and creator.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  openGraph: { title: "About | Liangyu Chen", description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: "About | Liangyu Chen", description: DESCRIPTION },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-8">
      <span className="label pt-1">( {label} )</span>
      <div>{children}</div>
    </div>
  );
}

export default async function AboutPage() {
  const raw = fs.readFileSync(join(process.cwd(), "_about/about.md"), "utf8");
  const [intro, ...sections] = splitMarkdownSections(raw);
  const introHtml = intro ? await markdownToHtml(intro.body) : "";
  const rendered = await Promise.all(
    sections.map(async (s) => ({ label: s.heading.toLowerCase(), html: await markdownToHtml(s.body) })),
  );

  return (
    <Container className="pt-28">
      <span className="label">( about )</span>
      <RevealText as="h1" className="display mb-12 mt-6 max-w-6xl text-[clamp(2.75rem,7vw,7rem)]">
        where technical depth meets creative production.
      </RevealText>
      {introHtml && (
        <Row label="intro">
          <PostBody content={introHtml} />
        </Row>
      )}
      <Row label="short film">
        <div className="relative aspect-video w-full">
          <iframe
            src="https://player.vimeo.com/video/412302470?h=d0af2aa869"
            className="absolute inset-0 h-full w-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Cigarette After Fight"
          />
          <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
        </div>
      </Row>
      {rendered.map((s) => (
        <Row key={s.label} label={s.label}>
          <PostBody content={s.html} />
        </Row>
      ))}
    </Container>
  );
}
