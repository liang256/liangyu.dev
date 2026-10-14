import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/_components/container";
import { Section } from "@/app/_components/section";
import { IndexRow } from "@/app/_components/index-row";
import { PillButton } from "@/app/_components/pill-button";
import { RevealText } from "@/app/_components/motion/reveal-text";
import { ParallaxImage } from "@/app/_components/motion/parallax-image";
import { Loader } from "@/app/_components/motion/loader";
import { getAllPosts } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Liangyu Chen" },
  description: "Liangyu Chen builds pipeline tooling, AI-video workflows, and backend systems for creative production.",
  alternates: {
    canonical: SITE_URL,
  },
};

const FOCUS = [
  { title: "pipeline tooling", blurb: "Houdini automation, headless rendering, batch systems." },
  { title: "ai video", blurb: "Seedance prompting, hybrid generation pipelines." },
  { title: "backend", blurb: "Domain models and APIs that stay maintainable." },
  { title: "creative tech", blurb: "Animation and rigging background; tools for artists." },
];

export default function Home() {
  const posts = getAllPosts();
  const latest = posts.slice(0, 4);

  return (
    <div data-page="home">
      <Loader />
      <Container>
        <section className="flex min-h-[100svh] flex-col justify-between pb-10 pt-28">
          <span className="label">( pipeline · ai video · backend )</span>
          <RevealText as="h1" className="display my-12 text-[clamp(3.5rem,9vw,9rem)]">
            tools for the<br />creative pipeline.
          </RevealText>
          <div className="flex flex-col gap-6 border-t border-line pt-4 md:flex-row md:items-end md:justify-between">
            <p className="max-w-sm text-base">
              I build pipeline tools, AI-video workflows and backend systems for creative production.
            </p>
            <span className="label md:text-right">available remotely<br />scroll ↓</span>
          </div>
        </section>

        <Section label="focus" aside="04">
          <RevealText as="p" className="max-w-4xl text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            Pipeline tooling, AI video, backend systems — and the people who use them.
          </RevealText>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {FOCUS.map((f, i) => (
              <div key={f.title}>
                <span className="label">( 0{i + 1} )</span>
                <p className="mt-3 font-medium">{f.title}</p>
                <p className="mt-1 text-sm text-fg-muted">{f.blurb}</p>
              </div>
            ))}
          </div>
          <ParallaxImage
            src="/assets/blog/end-to-end-vs-hybrid-ai-video-pipelines/cover.png"
            alt=""
            className="mt-16 aspect-[16/7]"
          />
        </Section>

        <Section label="writing" count={posts.length} aside={<Link href="/posts">all posts →</Link>}>
          <div>
            {latest.map((p) => (
              <IndexRow
                key={p.slug}
                href={`/posts/${p.slug}`}
                year={p.date.slice(0, 4)}
                title={p.title}
                category={p.category}
                meta={`${p.readingTime} min`}
                hoverLabel="read →"
                cursor="read"
              />
            ))}
          </div>
        </Section>

        <Section label="contact">
          <RevealText as="h2" className="display text-[clamp(3.5rem,9vw,9rem)]">let’s talk.</RevealText>
          <div className="mt-10 flex flex-wrap gap-3">
            <PillButton href="mailto:liangyu.chen.dev@gmail.com">liangyu.chen.dev@gmail.com</PillButton>
            <PillButton href="https://github.com/liang256" external>github ↗</PillButton>
            <PillButton href="https://www.linkedin.com/in/liang256/" external>linkedin ↗</PillButton>
          </div>
        </Section>
      </Container>
    </div>
  );
}
