import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/_components/container";
import { IndexRow } from "@/app/_components/index-row";
import { RevealText } from "@/app/_components/motion/reveal-text";
import { ParallaxImage } from "@/app/_components/motion/parallax-image";
import DateFormatter from "@/app/_components/date-formatter";
import { getAllPosts } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about pipeline tooling, AI video, backend systems, and the occasional practical rabbit hole.",
  alternates: {
    canonical: `${SITE_URL}/posts`,
  },
  openGraph: {
    title: "Blog | Liangyu Chen",
    description:
      "Writing about pipeline tooling, AI video, backend systems, and the occasional practical rabbit hole.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Liangyu Chen",
    description:
      "Writing about pipeline tooling, AI video, backend systems, and the occasional practical rabbit hole.",
  },
};

export default function PostList() {
  const [latest, ...rest] = getAllPosts();

  return (
    <Container className="pt-28">
      <span className="label">( writing )&nbsp;&nbsp;({rest.length + (latest ? 1 : 0)})</span>
      <RevealText as="h1" className="display mb-16 mt-6 text-[clamp(3.5rem,11vw,11rem)]">writing.</RevealText>

      {latest && (
        <Link href={`/posts/${latest.slug}`} data-cursor="read" className="mb-16 grid items-end gap-6 md:grid-cols-[1.4fr_1fr] md:gap-10">
          {latest.coverImage && (
            <ParallaxImage src={latest.coverImage} alt="" priority className="aspect-[16/10]" sizes="(min-width: 768px) 60vw, 100vw" />
          )}
          <div>
            <span className="label">( latest )</span>
            <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-medium leading-none tracking-[-0.035em]">{latest.title}</h2>
            <p className="label mt-4"><DateFormatter dateString={latest.date} /> · {latest.readingTime} min</p>
          </div>
        </Link>
      )}

      <div>
        {rest.map((p) => (
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
    </Container>
  );
}
