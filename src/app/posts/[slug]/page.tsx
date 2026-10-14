import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { IndexRow } from "@/app/_components/index-row";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `${SITE_URL}/posts/${post.slug}`,
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
  const post = getPostBySlug(params.slug);
  const otherPosts = getAllPosts()
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.date,
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
      "@id": `${SITE_URL}/posts/${post.slug}`,
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
          />
          <PostBody content={content} />
        </article>
        <section className="border-t border-line pt-10">
          <span className="label">( more writing )</span>
          <div className="mt-8">
            {otherPosts.map((p) => (
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
        </section>
      </Container>
    </>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
