# SEO Improvements Design — liangyu.dev

**Date:** 2026-05-22  
**Goal:** Maximize blog post discovery in Google Search  
**Scope:** Metadata fixes, per-page metadata, sitemap, robots.txt, JSON-LD structured data

---

## 1. Fix Broken Metadata in `layout.tsx` + `constants.ts`

### Problems
- `HOME_OG_IMAGE_URL` in `constants.ts` points to a Vercel placeholder (`"Next.js Blog Starter Example"` OG generator URL)
- `twitter:card` meta content is `"Liangyu's website"` — invalid value; must be `"summary_large_image"`
- Twitter image is `"og.png"` (relative path, broken on all routes except `/`)
- OG + Twitter `<meta>` tags are duplicated — Next.js `metadata` export already emits them; the 10 manual tags in `<head>` double them up
- No `metadataBase` set — relative OG image URLs cannot be resolved by crawlers

### Changes

**`src/lib/constants.ts`**
- Add `SITE_URL = "https://liangyu.dev"`
- Change `HOME_OG_IMAGE_URL = "/og.png"`

**`src/app/layout.tsx`**
- Remove the 10 manual `<meta>` OG + Twitter tags from `<head>` (keep favicon `<link>` tags)
- Update `metadata` export:
  - Add `metadataBase: new URL("https://liangyu.dev")`
  - Change `title` to a template object: `{ default: "Liangyu Chen", template: "%s | Liangyu Chen" }`
  - Fix `description` typo ("Focuse" → "Focuses")
  - Add `twitter` object with `card: "summary_large_image"`, `title`, `description`, `images`
  - Add `openGraph` with `type: "website"`, `url`, `siteName`

---

## 2. Add Metadata to All Pages

### Problems
- `/posts` — no `metadata` export
- `/about` — no `metadata` export
- `/projects` — no `metadata` export
- `/posts/[slug]` — `generateMetadata` exists but has wrong title suffix (`"Next.js Blog Example with Markdown"`), no `description`, no Twitter card, relative OG image URL

### Changes

**`src/app/posts/page.tsx`** — add:
```ts
export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on programming, AI, creative tech, and more by Liangyu Chen.",
};
```

**`src/app/about/page.tsx`** — add:
```ts
export const metadata: Metadata = {
  title: "About",
  description: "Learn about Liangyu Chen — software engineer, writer, and creator based in Montreal.",
};
```

**`src/app/projects/page.tsx`** — add:
```ts
export const metadata: Metadata = {
  title: "Projects",
  description: "Open source and personal projects by Liangyu Chen.",
};
```

**`src/app/posts/[slug]/page.tsx`** — update `generateMetadata`:
- `title`: `post.title` (template from layout renders it as `"<title> | Liangyu Chen"`)
- `description`: `post.excerpt`
- `openGraph.description`: `post.excerpt`
- `openGraph.type`: `"article"`
- `openGraph.publishedTime`: `post.date`
- `openGraph.images`: absolute URL via `metadataBase` (use `post.coverImage`)
- Add `twitter` object: `card: "summary_large_image"`, `title: post.title`, `description: post.excerpt`, `images: [post.coverImage]`

---

## 3. Sitemap + robots.txt

### New Files

**`src/app/sitemap.ts`** (Next.js built-in convention, generates `/sitemap.xml` at build time):

| URL | changeFrequency | priority | lastModified |
|-----|----------------|----------|--------------|
| `https://liangyu.dev/` | `monthly` | `1` | — |
| `https://liangyu.dev/posts` | `weekly` | `0.8` | — |
| `https://liangyu.dev/about` | `monthly` | `0.5` | — |
| `https://liangyu.dev/projects` | `monthly` | `0.5` | — |
| `https://liangyu.dev/posts/[slug]` | `monthly` | `0.7` | `post.date` |

Iterates all posts via existing `getAllPosts()` from `src/lib/api.ts`.

**`src/app/robots.ts`** (Next.js built-in convention, generates `/robots.txt` at build time):
```
User-agent: *
Allow: /
Sitemap: https://liangyu.dev/sitemap.xml
```

---

## 4. JSON-LD Structured Data

### New Components / Inline Scripts

**`WebSite` + `Person` schema — added to `src/app/layout.tsx`**

Injected as an inline `<script type="application/ld+json">` in `<head>`. Appears on every page.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "url": "https://liangyu.dev",
      "name": "Liangyu Chen"
    },
    {
      "@type": "Person",
      "name": "Liangyu Chen",
      "url": "https://liangyu.dev",
      "jobTitle": "Software Engineer",
      "sameAs": []
    }
  ]
}
```

**`BlogPosting` schema — added to `src/app/posts/[slug]/page.tsx`**

Injected as an inline `<script type="application/ld+json">` in the post `<head>` via Next.js Script or a `<script>` tag in the page component.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "<post.title>",
  "description": "<post.excerpt>",
  "image": "https://liangyu.dev<post.coverImage>",
  "datePublished": "<post.date>",
  "author": {
    "@type": "Person",
    "name": "<post.author.name>"
  },
  "publisher": {
    "@type": "Person",
    "name": "Liangyu Chen",
    "url": "https://liangyu.dev"
  }
}
```

---

## Files Changed / Created

| File | Action |
|------|--------|
| `src/lib/constants.ts` | Update — add `SITE_URL`, fix `HOME_OG_IMAGE_URL` |
| `src/app/layout.tsx` | Update — fix metadata, remove duplicate meta tags, add JSON-LD |
| `src/app/posts/page.tsx` | Update — add metadata export |
| `src/app/about/page.tsx` | Update — add metadata export |
| `src/app/projects/page.tsx` | Update — add metadata export |
| `src/app/posts/[slug]/page.tsx` | Update — fix generateMetadata, add JSON-LD |
| `src/app/sitemap.ts` | Create — auto-generated sitemap |
| `src/app/robots.ts` | Create — robots.txt |

---

## Out of Scope

- Dynamic per-post OG image generation (ImageResponse)
- Google Search Console setup / verification
- Analytics integration
- Performance/Core Web Vitals improvements
