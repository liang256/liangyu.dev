import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/_components/container";
import { Section } from "@/app/_components/section";
import { IndexRow } from "@/app/_components/index-row";
import { PillButton } from "@/app/_components/pill-button";
import { RevealText } from "@/app/_components/motion/reveal-text";
import { ParallaxImage } from "@/app/_components/motion/parallax-image";
import { Loader } from "@/app/_components/motion/loader";
import { getDictionary } from "@/dictionaries";
import { getAllPosts } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import { alternatesFor, localePath, type Locale } from "@/lib/i18n";

type Props = { params: { locale: Locale } };

export function generateMetadata({ params: { locale } }: Props): Metadata {
  return {
    title: { absolute: "Liangyu Chen" },
    description: getDictionary(locale).site.description,
    alternates: alternatesFor(SITE_URL, locale, "/"),
  };
}

export default function Home({ params: { locale } }: Props) {
  const t = getDictionary(locale);
  const posts = getAllPosts(locale);
  const latest = posts.slice(0, 4);

  return (
    <div data-page="home">
      <Loader />
      <Container>
        <section className="flex min-h-[100svh] flex-col justify-between pb-10 pt-28">
          <span className="label">{t.home.heroLabel}</span>
          <RevealText as="h1" className="display my-12 text-[clamp(3.5rem,9vw,9rem)]">
            {t.home.heroLines[0]}<br />{t.home.heroLines[1]}
          </RevealText>
          <div className="flex flex-col gap-6 border-t border-line pt-4 md:flex-row md:items-end md:justify-between">
            <p className="max-w-sm text-base">{t.home.heroBlurb}</p>
            <span className="label md:text-right">{t.home.availability[0]}<br />{t.home.availability[1]}</span>
          </div>
        </section>

        <Section label={t.home.focusLabel} aside="04">
          <RevealText as="p" className="max-w-4xl text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            {t.home.focusStatement}
          </RevealText>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {t.home.focus.map((f, i) => (
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

        <Section
          label={t.home.writingLabel}
          count={posts.length}
          aside={<Link href={localePath(locale, "/posts")}>{t.home.allPosts}</Link>}
        >
          <div>
            {latest.map((p) => (
              <IndexRow
                key={p.slug}
                href={localePath(locale, `/posts/${p.slug}`)}
                year={p.date.slice(0, 4)}
                title={p.title}
                category={p.category}
                meta={`${p.readingTime} ${t.common.min}`}
                hoverLabel={t.common.readArrow}
                cursor="read"
              />
            ))}
          </div>
        </Section>

        <Section label={t.home.contactLabel}>
          <RevealText as="h2" className="display text-[clamp(3.5rem,9vw,9rem)]">{t.home.letsTalk}</RevealText>
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
