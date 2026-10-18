import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/_components/container";
import { IndexRow } from "@/app/_components/index-row";
import { RevealText } from "@/app/_components/motion/reveal-text";
import { ParallaxImage } from "@/app/_components/motion/parallax-image";
import DateFormatter from "@/app/_components/date-formatter";
import { getDictionary } from "@/dictionaries";
import { getAllPosts } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import { alternatesFor, localePath, type Locale } from "@/lib/i18n";

type Props = { params: { locale: Locale } };

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const { title, description } = getDictionary(locale).posts;
  return {
    title,
    description,
    alternates: alternatesFor(SITE_URL, locale, "/posts"),
    openGraph: { title: `${title} | Liangyu Chen`, description },
    twitter: { card: "summary_large_image", title: `${title} | Liangyu Chen`, description },
  };
}

export default function PostList({ params: { locale } }: Props) {
  const t = getDictionary(locale);
  const [latest, ...rest] = getAllPosts(locale);

  return (
    <Container className="pt-28">
      <span className="label">( {t.posts.label} )&nbsp;&nbsp;({rest.length + (latest ? 1 : 0)})</span>
      <RevealText as="h1" className="display mb-16 mt-6 text-[clamp(3.5rem,11vw,11rem)]">{t.posts.heading}</RevealText>

      {latest && (
        <Link href={localePath(locale, `/posts/${latest.slug}`)} data-cursor="read" className="mb-16 grid items-end gap-6 md:grid-cols-[1.4fr_1fr] md:gap-10">
          {latest.coverImage && (
            <ParallaxImage src={latest.coverImage} alt="" priority className="aspect-[16/10]" sizes="(min-width: 768px) 60vw, 100vw" />
          )}
          <div>
            <span className="label">( {t.posts.latest} )</span>
            <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-medium leading-none tracking-[-0.035em]">{latest.title}</h2>
            <p className="label mt-4"><DateFormatter dateString={latest.date} locale={locale} /> · {latest.readingTime} {t.common.min}</p>
          </div>
        </Link>
      )}

      <div>
        {rest.map((p) => (
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
    </Container>
  );
}
