# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all broken SEO metadata, add per-page metadata, generate a sitemap and robots.txt, and add JSON-LD structured data to maximize blog post discovery in Google Search.

**Architecture:** All changes use Next.js 14 App Router conventions — `metadata` exports, `generateMetadata`, `sitemap.ts`, and `robots.ts` are handled natively by the framework. JSON-LD is injected via inline `<script>` tags in component JSX. No new dependencies required.

**Tech Stack:** Next.js 14 (App Router), TypeScript, existing `getAllPosts()` / `getPostBySlug()` from `src/lib/api.ts`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/constants.ts` | Modify | Add `SITE_URL`, fix `HOME_OG_IMAGE_URL` |
| `src/app/layout.tsx` | Modify | Fix `metadata` export, remove duplicate meta tags, add WebSite+Person JSON-LD |
| `src/app/posts/page.tsx` | Modify | Add `metadata` export |
| `src/app/about/page.tsx` | Modify | Add `metadata` export |
| `src/app/projects/page.tsx` | Modify | Add `metadata` export |
| `src/app/posts/[slug]/page.tsx` | Modify | Fix `generateMetadata`, add BlogPosting JSON-LD |
| `src/app/sitemap.ts` | Create | Auto-generated `/sitemap.xml` at build time |
| `src/app/robots.ts` | Create | Auto-generated `/robots.txt` at build time |

---

## Task 1: Fix `constants.ts`

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Update constants**

Replace the entire file with:

```ts
export const EXAMPLE_PATH = "blog-starter";
export const CMS_NAME = "Markdown";
export const SITE_URL = "https://liangyu.dev";
export const HOME_OG_IMAGE_URL = "/og.png";
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/kani/projects/js_projects/liangyu.dev && npx tsc --noEmit
```

Expected: no errors related to `constants.ts`

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "fix: update SITE_URL constant and fix HOME_OG_IMAGE_URL placeholder"
```

---

## Task 2: Fix root layout metadata + add WebSite/Person JSON-LD

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the metadata export and clean up `<head>`**

Replace the entire file with:

```tsx
import Footer from "@/app/_components/footer";
import { HOME_OG_IMAGE_URL, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/app/_components/nav-bar";
import Container from "@/app/_components/container";
import { ThemeProvider } from "@/app/contexts/theme-context";
import "./globals.css";
import '@/app/prism-themes/prism-xonokai.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Liangyu Chen",
    template: "%s | Liangyu Chen",
  },
  description:
    "Personal website of Liangyu Chen: software engineer, writer, and creator based in Montreal. Focuses on Python, JavaScript, Go, visual art, and more.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Liangyu Chen",
    images: [HOME_OG_IMAGE_URL],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liangyu Chen",
    description:
      "Personal website of Liangyu Chen: software engineer, writer, and creator based in Montreal.",
    images: [HOME_OG_IMAGE_URL],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      url: SITE_URL,
      name: "Liangyu Chen",
    },
    {
      "@type": "Person",
      name: "Liangyu Chen",
      url: SITE_URL,
      jobTitle: "Software Engineer",
      sameAs: [] as string[],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-3438250780938861" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3438250780938861"
          crossOrigin="anonymous"
        />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <NavBar />
          <Container>
            <div className="min-h-screen">{children}</div>
          </Container>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/kani/projects/js_projects/liangyu.dev && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "fix: fix root layout metadata, remove duplicate OG/Twitter meta tags, add JSON-LD"
```

---

## Task 3: Add metadata to `/posts` page

**Files:**
- Modify: `src/app/posts/page.tsx`

- [ ] **Step 1: Add metadata export**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { PostPreview } from "../_components/post-preview";
import { getAllPosts } from "@/lib/api";
import Header from "../_components/header";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on programming, AI, creative tech, and more by Liangyu Chen.",
  openGraph: {
    title: "Blog | Liangyu Chen",
    description:
      "Articles on programming, AI, creative tech, and more by Liangyu Chen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Liangyu Chen",
    description:
      "Articles on programming, AI, creative tech, and more by Liangyu Chen.",
  },
};

export default function PostList() {
  const posts = getAllPosts();
  return (
    <div className="space-y-12">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/kani/projects/js_projects/liangyu.dev && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/posts/page.tsx
git commit -m "feat: add metadata to /posts page"
```

---

## Task 4: Add metadata to `/about` page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Add metadata export**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import fs from "fs";
import { join } from "path";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostBody } from "@/app/_components/post-body";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Liangyu Chen — software engineer, writer, and creator based in Montreal.",
  openGraph: {
    title: "About | Liangyu Chen",
    description:
      "Learn about Liangyu Chen — software engineer, writer, and creator based in Montreal.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Liangyu Chen",
    description:
      "Learn about Liangyu Chen — software engineer, writer, and creator based in Montreal.",
  },
};

export default async function AboutPage() {
  const fullPath = join(process.cwd(), "_about/about.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const markdownContent = await markdownToHtml(fileContents || "");

  return (
    <div>
      <div style={{ padding: "41.77% 0 0 0", position: "relative" }}>
        <iframe
          src="https://player.vimeo.com/video/412302470?h=d0af2aa869"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
      </div>
      <PostBody content={markdownContent} />
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/kani/projects/js_projects/liangyu.dev && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add metadata to /about page"
```

---

## Task 5: Add metadata to `/projects` page

**Files:**
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Add metadata export at the top of the file**

Add the following two lines at the very top of `src/app/projects/page.tsx`, before the existing imports:

```tsx
import type { Metadata } from "next";
```

Then add this export after the imports, before the `export default function Projects()`:

```tsx
export const metadata: Metadata = {
  title: "Projects",
  description: "Open source and personal projects by Liangyu Chen.",
  openGraph: {
    title: "Projects | Liangyu Chen",
    description: "Open source and personal projects by Liangyu Chen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Liangyu Chen",
    description: "Open source and personal projects by Liangyu Chen.",
  },
};
```

The existing `export default function Projects()` component body is unchanged.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/kani/projects/js_projects/liangyu.dev && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat: add metadata to /projects page"
```

---

## Task 6: Fix post `generateMetadata` + add BlogPosting JSON-LD

**Files:**
- Modify: `src/app/posts/[slug]/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import Link from "next/link";

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
    .slice(0, 6);

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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherPosts.map((otherPost) => (
            <div key={otherPost.slug}>
              <Link href={`/posts/${otherPost.slug}`} className="mr-4">
                <h2 className="text-xl">{otherPost.title}</h2>
                <p className="text-gray-500">{otherPost.excerpt}</p>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/kani/projects/js_projects/liangyu.dev && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/posts/[slug]/page.tsx
git commit -m "feat: fix post generateMetadata and add BlogPosting JSON-LD"
```

---

## Task 7: Create `sitemap.ts`

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create the file**

```ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/posts`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/projects`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...postEntries,
  ];
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/kani/projects/js_projects/liangyu.dev && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add auto-generated sitemap.xml"
```

---

## Task 8: Create `robots.ts`

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create the file**

```ts
import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/kani/projects/js_projects/liangyu.dev && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat: add robots.txt via Next.js robots.ts convention"
```

---

## Task 9: Full build verification

**Files:** none (verification only)

- [ ] **Step 1: Run a production build**

```bash
cd /Users/kani/projects/js_projects/liangyu.dev && npm run build
```

Expected: build completes with no errors. You should see entries like:
```
Route (app)                              Size
├ ○ /                                    ...
├ ○ /posts                               ...
├ ○ /about                               ...
├ ○ /projects                            ...
├ ● /posts/[slug]                        ...
├ ○ /sitemap.xml                         ...
└ ○ /robots.txt                          ...
```

- [ ] **Step 2: Start the production server and spot-check sitemap**

```bash
npm run start &
sleep 3
curl http://localhost:3000/sitemap.xml
```

Expected: valid XML with `<url>` entries for `/`, `/posts`, `/about`, `/projects`, and each post slug.

- [ ] **Step 3: Spot-check robots.txt**

```bash
curl http://localhost:3000/robots.txt
```

Expected:
```
User-agent: *
Allow: /

Sitemap: https://liangyu.dev/sitemap.xml
```

- [ ] **Step 4: Spot-check JSON-LD on a post page**

```bash
curl -s http://localhost:3000/posts/dalle2-is-better-than-dalle3-in-this-scenario | grep -A5 'application/ld+json'
```

Expected: output contains `"@type":"BlogPosting"` with the post's headline.

- [ ] **Step 5: Stop the dev server and commit**

```bash
kill %1
git add -A
git commit -m "chore: verify SEO build — all routes, sitemap, robots, JSON-LD confirmed"
```
