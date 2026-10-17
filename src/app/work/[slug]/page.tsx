import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWork, getWorkBySlug } from "@/lib/work";
import { SITE_URL } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { IndexRow } from "@/app/_components/index-row";
import { PillButton } from "@/app/_components/pill-button";
import { PostBody } from "@/app/_components/post-body";
import { PostTitle } from "@/app/_components/post-title";
import { projectsData } from "@/app/data/project-data";

export const dynamicParams = false;

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const work = getWorkBySlug(params.slug);

  if (!work) {
    return notFound();
  }

  const title = work.seoTitle ?? `${work.title} — ${work.subtitle}`;

  return {
    title,
    description: work.excerpt,
    alternates: {
      canonical: `${SITE_URL}/work/${work.slug}`,
    },
    openGraph: {
      title,
      description: work.excerpt,
      type: "article",
      publishedTime: work.date,
      url: `${SITE_URL}/work/${work.slug}`,
      images: [
        {
          url: work.coverImage,
          alt: work.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: work.excerpt,
      images: [work.coverImage],
    },
  };
}

export default async function WorkDetail({ params }: Params) {
  const work = getWorkBySlug(params.slug);

  if (!work) {
    return notFound();
  }

  const content = await markdownToHtml(work.content || "");
  const otherProjects = projectsData
    .filter((p) => p.published && p.slug !== work.slug)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 3);

  const facts = [
    { label: "year", value: work.year },
    { label: "role", value: work.role },
    { label: "platform", value: work.platform },
    { label: "stack", value: work.stack.join(", ") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    headline: work.seoTitle ?? `${work.title} — ${work.subtitle}`,
    description: work.excerpt,
    image: `${SITE_URL}${work.coverImage}`,
    datePublished: work.date,
    url: `${SITE_URL}/work/${work.slug}`,
    ...(work.liveUrl ? { sameAs: work.liveUrl } : {}),
    author: {
      "@type": "Person",
      name: "Liangyu Chen",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="pt-28">
        <article className="mb-24">
          <header className="mb-12 md:mb-16">
            <p className="label">
              <Link href="/work" className="hover:text-fg">← work</Link>
              {work.category && <>&nbsp;&nbsp;/&nbsp;&nbsp;{work.category}</>}
              &nbsp;&nbsp;/&nbsp;&nbsp;case study
            </p>
            <PostTitle>{work.title}</PostTitle>
            <p className="mb-10 max-w-[40ch] text-xl leading-snug tracking-[-0.02em] md:text-2xl">
              {work.subtitle}
            </p>
            <dl className="grid gap-x-10 gap-y-4 border-t border-line pt-4 sm:grid-cols-2 md:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="label">{f.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed">{f.value}</dd>
                </div>
              ))}
            </dl>
            {work.liveUrl && (
              <div className="mt-8 flex flex-wrap gap-3">
                <PillButton href={work.liveUrl} external>
                  visit live ↗
                </PillButton>
                <PillButton href="mailto:liangyu.chen.dev@gmail.com">get in touch</PillButton>
              </div>
            )}
          </header>
          <PostBody content={content} />
        </article>
        <section className="mb-24 border-t border-line pt-10">
          <span className="label">( work with me )</span>
          <p className="mt-6 max-w-[32ch] text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Planning a LINE bot or mini app? Let&apos;s talk it through.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton href="mailto:liangyu.chen.dev@gmail.com">liangyu.chen.dev@gmail.com</PillButton>
            <PillButton href="https://www.linkedin.com/in/liang256/" external>
              linkedin ↗
            </PillButton>
          </div>
        </section>
        <section className="border-t border-line pt-10">
          <span className="label">( more work )</span>
          <div className="mt-8">
            {otherProjects.map((p) => {
              const external = /^https?:\/\//.test(p.link);
              return (
                <IndexRow
                  key={p.slug}
                  href={p.link}
                  year={p.date.slice(0, 4)}
                  title={p.title}
                  category={p.category}
                  meta={external ? "↗" : "→"}
                  hoverLabel={external ? "open ↗" : "read case study →"}
                  cursor={external ? "open" : "read"}
                  external={external}
                />
              );
            })}
          </div>
        </section>
      </Container>
    </>
  );
}

export async function generateStaticParams() {
  return getAllWork().map((work) => ({
    slug: work.slug,
  }));
}
