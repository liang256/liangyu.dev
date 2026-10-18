import type { Metadata } from "next";
import { join } from "path";
import Script from "next/script";
import markdownToHtml from "@/lib/markdownToHtml";
import { readLocalizedMarkdown } from "@/lib/content";
import { splitMarkdownSections } from "@/lib/markdown-sections";
import { PostBody } from "@/app/_components/post-body";
import Container from "@/app/_components/container";
import { RevealText } from "@/app/_components/motion/reveal-text";
import { getDictionary } from "@/dictionaries";
import { SITE_URL } from "@/lib/constants";
import { alternatesFor, type Locale } from "@/lib/i18n";

type Props = { params: { locale: Locale } };

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
  const rendered = await Promise.all(
    sections.map(async (s) => ({ label: s.heading.toLowerCase(), html: await markdownToHtml(s.body) })),
  );

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
          <PostBody content={s.html} />
        </Row>
      ))}
    </Container>
  );
}
