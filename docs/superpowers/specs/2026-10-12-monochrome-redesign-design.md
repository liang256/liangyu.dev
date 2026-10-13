# liangyu.dev Monochrome Redesign — Design

**Date:** 2026-10-12
**Status:** Approved in brainstorming, pending spec review

## Intent

**Goal:** Redesign liangyu.dev so it works equally as a portfolio (pipeline TD / AI video / backend engineer) and as a blog, with a real home page and a coherent page map.

**Visual reference:** [noth.in](https://www.noth.in/) — monochrome, large grotesk type, parenthetical labels, lowercase UI voice, smooth scroll and text-reveal motion. Earlier exploration of therobotand.me (editorial, numbered sections) was superseded by this direction.

**Decisions made by the user:**

- Portfolio and blog weighted equally → new home page.
- Page map: Home, `/work` (renamed from `/projects`), `/posts`, `/about`.
- Home sections: intro, focus, writing, contact. No curated "selected work" section for now.
- Visuals follow noth.in fully; the existing green accent and color tokens are dropped.
- No WebGL / 3D objects (nothing to show yet).
- Motion level: noth.in feel — Lenis smooth scroll, GSAP ScrollTrigger reveals, intro loader, custom cursor, marquee.
- Font: Hanken Grotesk (free stand-in for PP Neue Montreal) + IBM Plex Mono.
- Dark and light themes kept; light is an exact black/white inversion; default follows system.
- Scrollbar hidden on the home page only.
- Contact email: `liangyu.chen.dev@gmail.com`.

**Assumptions (correct at review if wrong):**

- Location shown as "based in montréal" (already in site metadata).
- Hero headline: "tools for the creative pipeline." and About headline "where technical depth meets creative production." — editable copy.
- Focus blurbs condensed from `_about/about.md`.
- All existing `/posts/[slug]` URLs remain unchanged; `/projects` permanently redirects to `/work`.
- AdSense, JSON-LD, sitemap, robots, RSS link, and favicons are preserved.

**Success criteria:**

- Every page renders in the new monochrome system in both themes, at mobile (375px) and desktop (1440px) widths.
- Server-rendered HTML contains full page content (fixes current blank-HTML issue; see Theme).
- With `prefers-reduced-motion: reduce`, there is no loader, no smooth scroll, no reveal/parallax, and all text is visible immediately.
- `next build` and `next lint` pass.

## Visual System

### Color

Only five tokens, defined in `globals.css` on `[data-theme]`:

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#000` | `#fff` |
| `--fg` | `#fff` | `#000` |
| `--fg-muted` | `rgb(255 255 255 / 0.6)` | `rgb(0 0 0 / 0.6)` |
| `--fg-subtle` | `rgb(255 255 255 / 0.4)` | `rgb(0 0 0 / 0.4)` |
| `--line` | `rgb(255 255 255 / 0.2)` | `rgb(0 0 0 / 0.15)` |

Removed: all `--accent-*`, `--bg-secondary/tertiary/accent`, `--text-*`, `--border-*`, `--shadow-*`, the `.glass` style, tailwind `accent-*`/`success`/`cyan` colors, and the colored Prism xonokai theme (replaced by a grayscale Prism theme). Images are not desaturated; only UI is monochrome.

### Typography

- **Hanken Grotesk** 400/500/600 via `next/font/google` — headings and body.
- **IBM Plex Mono** 400 via `next/font/google` — labels, dates, counts, code.
- Inter, JetBrains Mono, and the `@import` of Google Fonts in `globals.css` are removed.
- Display sizes use `clamp()`: hero ≈ `clamp(3.5rem, 9vw, 9rem)`, letter-spacing −0.045em, line-height 0.92. Page titles (`work.`, `writing.`) use the same scale.
- Post body: 18–19px, line-height 1.6, max measure ~680px.

### Voice and layout conventions

- Section labels in parentheses: `( focus )`, `( writing )`, with optional counts `(12)`.
- Nav, labels, and buttons are lowercase. Post titles keep their own casing.
- Pill buttons: 1px border, full radius; hover inverts fill.
- Full-width grid, 1px `--line` dividers, no card shadows or rounded cards.
- Scrollbar hidden on home only.

### Motion rules

- Lenis smooth scroll synced to GSAP ticker; ScrollTrigger for reveals and parallax.
- Line-by-line text reveal via GSAP SplitText (free since GSAP 3.13).
- Intro loader: home only, once per session (`sessionStorage`), ~1.5s.
- Custom cursor: desktop (fine pointer) only, over index lists.
- All motion disabled under `prefers-reduced-motion: reduce`.

## Components

### New — client (`src/app/_components/motion/`)

| File | Responsibility |
|---|---|
| `smooth-scroll.tsx` | Initializes Lenis in the root layout, drives it from `gsap.ticker`, calls `ScrollTrigger.update` on scroll. Scrolls to top and refreshes ScrollTrigger on route change. No-op under reduced motion. |
| `reveal-text.tsx` | `<RevealText as="h1" \| "h2" \| "p">` — SplitText into lines, each line masked and translated up on enter. Renders plain text under reduced motion; text is in server HTML regardless. |
| `parallax-image.tsx` | Clipping frame with an oversized inner `next/image` translated by scroll progress. Replaces `cover-image`. |
| `loader.tsx` | Full-screen `--bg` overlay with "liangyu’" centered and a 100→000 counter; slides up after ~1.5s. Visible only when `html.loader` is set by the head script (see Error Handling); sets `sessionStorage['loader-played']` and removes the class when done. |
| `cursor.tsx` | Circle cursor that scales in over elements with `data-cursor="read" \| "open"` and shows that label. Disabled on coarse pointers and reduced motion. |
| `marquee.tsx` | Infinite horizontal text loop; direction follows scroll direction. |

### New — server (`src/app/_components/`)

| File | Responsibility |
|---|---|
| `section.tsx` | `<Section label count?>` — top 1px line, parenthetical label row, consistent vertical spacing. |
| `index-row.tsx` | List row: year · title · category · meta. Title flips to an alternate line ("read →" / "open ↗") on hover. Used by home writing, `/posts`, `/work`. |
| `pill-button.tsx` | Pill link/button with inverted hover. |

### Modified

- `nav-bar.tsx` — "liangyu’" left; `work` `writing` `about` `contact` + theme toggle right; sticky, transparent, `mix-blend-mode: difference`. Mobile: `menu` button opening a full-screen large-type menu. framer-motion indicator removed.
- `footer.tsx` — large "let's talk." , email, GitHub, RSS pills, `liangyu.dev` marquee, name and year.
- `post-header.tsx`, `post-title.tsx` — breadcrumb (`← writing / category`), `RevealText` title, mono meta row (date · read time · author), `ParallaxImage` cover.
- `post-body.tsx`, `markdown-styles.module.css` — monochrome: underlined links, grayscale code, Hanken headings.
- `theme-context.tsx` — stop returning `null` before mount. Add an inline script in `<head>` (in `layout.tsx`) that reads `localStorage.theme` or `prefers-color-scheme` and sets `data-theme` before paint. Provider always renders children.
- `theme-toggle.tsx` — lowercase text toggle (`light` / `dark`).
- `container.tsx` — widened, horizontal padding matches the 32px grid gutter (16px on mobile).

### Removed

- Unused: `alert`, `optimized-image`, `post-grid`, `post-list`, `section-separator`, `view-toggle`, `src/app/.default-page.tsx`.
- Starter leftovers: `hero-post`, `intro`, `more-stories`, `avatar`.
- Replaced: `header`, `post-preview`, `card`, `cover-image`, `src/app/projects/article.tsx`.

### Dependencies

- Add: `gsap`, `@gsap/react`, `lenis`.
- Remove: `framer-motion` (only used by the nav indicator).

## Pages

### `/` Home (new; replaces redirect to `/posts`)

1. Loader (first visit per session).
2. Intro: `( pipeline · ai video · backend )`; hero "tools for the / creative pipeline." with line reveal and slight parallax; bottom rule with one-line positioning statement left, "based in montréal / scroll ↓" right.
3. `( focus ) 04`: one large statement paragraph; four columns `( 01 )`–`( 04 )` (pipeline tooling, ai video, backend, creative tech) with one-line blurbs; one parallax image (uses an existing blog cover asset).
4. `( writing ) (N) all posts →`: latest 4 posts as `IndexRow`s with `data-cursor="read"`.
5. `( contact )`: "let's talk." reveal; pills: email (mailto), github ↗, rss.
6. Footer.

Metadata: title "Liangyu Chen", existing description.

### `/work` (renamed from `/projects`)

- Page title "work." with `( work ) (N)`.
- All published projects as `IndexRow`s sorted by date desc: year · title · category · ↗, linking to `project.link`, `data-cursor="open"`.
- `next.config.mjs`: permanent redirect `/projects` → `/work`. Sitemap entry updated.

### `/posts`

- Page title "writing." with `( writing ) (N)`.
- Latest post as a featured block: `ParallaxImage` cover + label `( latest )`, title, mono meta.
- Remaining posts as `IndexRow`s.

### `/posts/[slug]`

- Layout per modified post components above; body at ~680px measure. URLs unchanged.

### `/about`

- Large statement headline ("where technical depth meets creative production.").
- `_about/about.md` is split at `#` headings server-side; each section renders as a two-column row: parenthetical label (lowercased heading) left, rendered markdown right. The first "About Me" section becomes the intro paragraph under the headline.

## Data

- `Project` interface: add optional `category?: string`. Backfill categories for existing projects in `project-data.tsx`.
- `Post` interface: add optional `category?: string` (frontmatter) and computed `readingTime: number` (minutes, word count / 230, rounded up) set in `src/lib/api.ts`. `IndexRow` omits the category column when absent.
- No changes to post URLs, frontmatter requirements, or `scripts/create-post.js`.

## Error Handling and Edge Cases

- JavaScript disabled or failed: the head script from `layout.tsx` also adds `html.motion` when JS runs, reduced motion is off, and (for the loader) `sessionStorage['loader-played']` is unset → `html.loader`. CSS hides reveal targets' initial state and shows the loader overlay only under those classes. Without JS, neither class exists: all content is visible in its final position and no loader appears. With JS, there is no flash because the classes are set before first paint.
- Reduced motion: see Motion rules.
- Route changes: ScrollTrigger instances are created inside `useGSAP` scopes so they are reverted on unmount; Lenis resets scroll on navigation.
- Touch devices: no custom cursor; hover-flip rows still navigate on tap.
- Missing cover image: `ParallaxImage` not rendered; featured block falls back to text only.

## Verification

No test framework exists; none is added for this styling work.

- `next build` and `next lint` pass.
- `curl` of `/`, `/work`, `/posts`, a post, `/about` returns HTML containing page content (blank-HTML fix).
- Browser pass on every page: dark and light, 375px and 1440px, reduced motion on and off.
- `/projects` returns a 308 redirect to `/work`.
- Sitemap lists `/`, `/work`, `/posts`, `/about`, and all posts.

## Housekeeping

- Add `.superpowers/` to `.gitignore`.

## Out of Scope

- WebGL / 3D hero.
- Curated selected-work section.
- Licensing PP Neue Montreal.
- New content (posts, project write-ups, project detail pages).
