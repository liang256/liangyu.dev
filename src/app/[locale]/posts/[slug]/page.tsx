import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import { HTML_LANG, OG_LOCALE, alternatesFor, localePath, type Locale } from "@/lib/i18n";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { IndexRow } from "@/app/_components/index-row";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export const dynamicParams = false;

type Params = {
  params: {
    locale: Locale;
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug, params.locale);

  if (!post) {
    return notFound();
  }

  const path = `/posts/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: alternatesFor(SITE_URL, params.locale, path),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: SITE_URL + localePath(params.locale, path),
      locale: OG_LOCALE[params.locale],
      images: [
        {
          url: post.coverImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function Post({ params }: Params) {
  const { locale } = params;
  const t = getDictionary(locale);
  const post = getPostBySlug(params.slug, locale);
  const otherPosts = getAllPosts(locale)
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");
  const url = SITE_URL + localePath(locale, `/posts/${post.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.date,
    inLanguage: HTML_LANG[locale],
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Person",
      name: "Liangyu Chen",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
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
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            category={post.category}
            readingTime={post.readingTime}
            locale={locale}
          />
          <PostBody content={content} />
        </article>
        <section className="border-t border-line pt-10">
          <span className="label">( {t.posts.more} )</span>
          <div className="mt-8">
            {otherPosts.map((p) => (
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
        </section>
      </Container>
    </>
  );
}

// Called once per locale from the [locale] layout's params.
export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}
