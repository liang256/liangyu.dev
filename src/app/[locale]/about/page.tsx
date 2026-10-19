import type { Metadata } from "next";
import Link from "next/link";
import { join } from "path";
import Script from "next/script";
import markdownToHtml from "@/lib/markdownToHtml";
import { readLocalizedMarkdown } from "@/lib/content";
import { splitMarkdownSections, splitSubsections } from "@/lib/markdown-sections";
import { getWorkBySlug } from "@/lib/work";
import { PostBody } from "@/app/_components/post-body";
import Container from "@/app/_components/container";
import { RevealText } from "@/app/_components/motion/reveal-text";
import { ParallaxImage } from "@/app/_components/motion/parallax-image";
import { getDictionary } from "@/dictionaries";
import { SITE_URL } from "@/lib/constants";
import { alternatesFor, localePath, type Locale } from "@/lib/i18n";

type Props = { params: { locale: Locale } };

const FEATURED_WORK = ["prompt-swim", "line-bot-food-diary", "into-pool"];

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const { title, description } = getDictionary(locale).about;
  return {
    title,
    description,
    alternates: alternatesFor(SITE_URL, locale, "/about"),
    openGraph: { title: `${title} | Liangyu Chen`, description },
    twitter: { card: "summary_large_image", title: `${title} | Liangyu Chen`, description },
  };
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-8">
      <span className="label pt-1">( {label} )</span>
      <div>{children}</div>
    </div>
  );
}

export default async function AboutPage({ params: { locale } }: Props) {
  const t = getDictionary(locale);
  const raw = readLocalizedMarkdown(join(process.cwd(), "_about"), "about", locale)?.content ?? "";
  const [intro, ...sections] = splitMarkdownSections(raw);
  const introHtml = intro ? await markdownToHtml(intro.body) : "";
  // Sections made of ### subsections render as a tile grid; everything else stays prose.
  const rendered = await Promise.all(
    sections.map(async (s) => {
      const tiles = await Promise.all(
        splitSubsections(s.body).map(async (sub) => ({ title: sub.heading, html: await markdownToHtml(sub.body) })),
      );
      return { label: s.heading.toLowerCase(), html: tiles.length ? "" : await markdownToHtml(s.body), tiles };
    }),
  );
  const featured = FEATURED_WORK.flatMap((slug) => getWorkBySlug(slug, locale) ?? []);

  return (
    <Container className="pt-28">
      <span className="label">( {t.about.label} )</span>
      <RevealText as="h1" className="display mb-12 mt-6 max-w-6xl text-[clamp(2.75rem,7vw,7rem)]">
        {t.about.heading}
      </RevealText>
      {introHtml && (
        <Row label={t.about.intro}>
          <PostBody content={introHtml} />
        </Row>
      )}
      <Row label={t.about.selectedWork}>
        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((w) => (
            <Link key={w.slug} href={localePath(locale, `/work/${w.slug}`)} data-cursor="read" className="group block">
              <ParallaxImage src={w.coverImage} alt={w.title} className="aspect-[4/3]" sizes="(min-width: 768px) 30vw, 100vw" />
              <span className="label mt-4 block">
                {w.year}&nbsp;&nbsp;/&nbsp;&nbsp;{w.category && (t.work.categories[w.category] ?? w.category)}
              </span>
              <p className="mt-2 text-xl font-medium leading-[1.15] tracking-[-0.03em] group-hover:underline">{w.title}</p>
              <p className="mt-1 text-sm text-fg-muted">{w.subtitle}</p>
            </Link>
          ))}
        </div>
        <Link href={localePath(locale, "/work")} className="label mt-8 inline-block hover:text-fg">
          {t.about.allWork}
        </Link>
      </Row>
      <Row label={t.about.shortFilm}>
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
          {s.tiles.length ? (
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {s.tiles.map((tile, i) => (
                <div key={tile.title} className="border-t border-line pt-4">
                  <span className="label">( 0{i + 1} )</span>
                  <p className="mt-3 text-xl font-medium leading-[1.15] tracking-[-0.03em]">{tile.title}</p>
                  <div
                    className="mt-3 text-sm leading-relaxed text-fg-muted [&_a]:underline [&_a]:underline-offset-2"
                    dangerouslySetInnerHTML={{ __html: tile.html }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <PostBody content={s.html} />
          )}
        </Row>
      ))}
    </Container>
  );
}
