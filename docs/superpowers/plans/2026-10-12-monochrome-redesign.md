# liangyu.dev Monochrome Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle liangyu.dev after noth.in — monochrome, Hanken Grotesk, parenthetical labels, GSAP/Lenis motion — with a new home page and `/work`, `/posts`, `/about` pages.

**Architecture:** Next.js 14 App Router, pages stay server components. All motion lives in small client components under `src/app/_components/motion/` that share one GSAP setup module. A tiny inline `<head>` script sets `data-theme`, `html.motion`, and `html.loader` before first paint, so server HTML always contains full content and CSS hides "pre-animation" states only when motion will actually run.

**Tech Stack:** Next.js 14.2, React 18, Tailwind 3, `gsap` 3.13+ (ScrollTrigger, SplitText), `@gsap/react`, `lenis`, `next/font/google` (Hanken Grotesk, IBM Plex Mono), Node 22 built-in test runner (`node --test`, native TS type stripping) for pure helpers.

**Spec:** `docs/superpowers/specs/2026-10-12-monochrome-redesign-design.md`

## Global Constraints

- Work only in the worktree `.claude/worktrees/redesign-monochrome` on branch `worktree-redesign-monochrome`. Never edit `main`.
- Colors: only `--bg`, `--fg`, `--fg-muted`, `--fg-subtle`, `--line`. Dark: `#000` / `#fff` / `rgb(255 255 255 / 0.6)` / `rgb(255 255 255 / 0.4)` / `rgb(255 255 255 / 0.2)`. Light: `#fff` / `#000` / `rgb(0 0 0 / 0.6)` / `rgb(0 0 0 / 0.4)` / `rgb(0 0 0 / 0.15)`. No accent color anywhere.
- Fonts: Hanken Grotesk 400/500/600 (`--font-sans`), IBM Plex Mono 400 (`--font-mono`). No Inter, no JetBrains Mono.
- UI copy (nav, labels, buttons) lowercase; section labels in parentheses `( writing )`; counts as `(12)`. Post titles keep their casing.
- Contact email: `liangyu.chen.dev@gmail.com`. GitHub `https://github.com/liang256`, LinkedIn `https://www.linkedin.com/in/liang256/`, X `https://x.com/LiangyuDev`.
- No living location anywhere; home hero shows "available remotely". `grep -ri montreal src` must return nothing at the end.
- Post URLs `/posts/[slug]` unchanged. `/projects` → `/work` permanent redirect.
- Preserve AdSense script + meta, JSON-LD, favicons, sitemap, robots, the `<link rel="alternate" ... /feed.xml>` tag.
- Under `prefers-reduced-motion: reduce`: no loader, no Lenis, no reveals/parallax/marquee motion, no custom cursor; all text visible.
- Without JS: all content visible in final position, no loader.
- Dates: derive years by string slice of the ISO `date` (`post.date.slice(0, 4)`), not `new Date()`, so no timezone shifts (site convention is Asia/Taipei).
- Hero copy: "tools for the / creative pipeline."; About headline: "where technical depth meets creative production."

## Review Focus

1. **JS disabled / GSAP failure** — every page's text must be present and visible in server HTML; hidden pre-animation states must be gated by `html.motion`. Pinned by Task 1 Step 7 and Task 9 Step 4 (`curl` content checks + CSS gating check).
2. **Reduced motion** — a visitor with reduced motion must see no loader overlay and no hidden text. Pinned by the head-script logic in Task 1 and the browser check in Task 9 Step 6.
3. **Client-side navigation** — going `/` → `/posts/x` → back must reset scroll to top, not leave stale ScrollTriggers, and never replay the loader. Pinned by `useGSAP` scoping in Task 3 and the navigation check in Task 9 Step 6.
4. **Stored theme value is garbage or missing** (`localStorage.theme = "blue"`, private mode throwing) — must fall back to system preference without throwing. Pinned by `resolveTheme` tests in Task 2 and its use in Task 1's head script.
5. **Post/markdown edge input** — empty content, CJK text, markdown with no `#` headings or text before the first heading — `readingTime` and `splitMarkdownSections` must not crash and must return sane values. Pinned by tests in Task 2.

---

## File Structure

```
src/app/
  layout.tsx                         MODIFY  fonts, head init script, SmoothScroll, Cursor, nav/footer
  globals.css                        REWRITE monochrome tokens, base, label utilities, motion gating
  prism-themes/prism-mono.css        CREATE  grayscale code theme
  prism-themes/prism-xonokai.css     DELETE
  page.tsx                           REWRITE home
  work/page.tsx                      CREATE
  projects/page.tsx, projects/article.tsx  DELETE
  posts/page.tsx                     REWRITE
  posts/[slug]/page.tsx              MODIFY
  about/page.tsx                     REWRITE
  sitemap.ts                         MODIFY  /projects → /work
  contexts/theme-context.tsx         MODIFY  never render null
  data/project-data.tsx              MODIFY  add category
  _components/
    motion/gsap.ts                   CREATE  plugin registration + motionEnabled()
    motion/smooth-scroll.tsx         CREATE
    motion/reveal-text.tsx           CREATE
    motion/parallax-image.tsx        CREATE
    motion/loader.tsx                CREATE
    motion/cursor.tsx                CREATE
    motion/marquee.tsx               CREATE
    section.tsx                      CREATE
    index-row.tsx                    CREATE
    pill-button.tsx                  CREATE
    container.tsx                    MODIFY
    nav-bar.tsx                      REWRITE
    footer.tsx                       REWRITE
    theme-toggle.tsx                 REWRITE
    post-header.tsx, post-title.tsx  REWRITE
    post-body.tsx                    MODIFY
    markdown-styles.module.css       REWRITE
    (deleted) alert, avatar, card, cover-image, header, hero-post, intro, more-stories,
              optimized-image, post-grid, post-list, post-preview, section-separator, view-toggle
  .default-page.tsx                  DELETE
src/lib/
  reading-time.ts (+ .test.ts)       CREATE
  markdown-sections.ts (+ .test.ts)  CREATE
  theme.ts (+ .test.ts)              CREATE  resolveTheme + THEME_INIT_SCRIPT
  api.ts                             MODIFY  readingTime on posts
src/interfaces/post.ts, project.ts   MODIFY
next.config.mjs                      MODIFY  redirect
tailwind.config.ts                   MODIFY
tsconfig.json                        MODIFY  exclude *.test.ts
package.json                         MODIFY  deps, test script
```

---

### Task 1: Foundation — tokens, fonts, theme init, SSR fix

**Files:**
- Create: `src/lib/theme.ts`, `src/app/prism-themes/prism-mono.css`
- Rewrite: `src/app/globals.css`, `src/app/_components/theme-toggle.tsx`
- Modify: `src/app/layout.tsx`, `src/app/contexts/theme-context.tsx`, `tailwind.config.ts`, `src/app/_components/container.tsx`
- Delete: `src/app/prism-themes/prism-xonokai.css`

**Interfaces:**
- Produces: `resolveTheme(stored: string | null, prefersDark: boolean): 'light' | 'dark'` and `THEME_INIT_SCRIPT: string` from `@/lib/theme`; Tailwind colors `bg`, `fg`, `fg-muted`, `fg-subtle`, `line`; font families `font-sans`, `font-mono`; CSS classes `.label` and `.display`; `html.motion` and `html.loader` gating classes; `useTheme()` unchanged signature `{ theme, toggleTheme }`.

- [ ] **Step 1: Install motion dependencies** (used from Task 3; installing now keeps package.json changes in one place)

```bash
npm install gsap@^3.13.0 @gsap/react@^2.1.2 lenis@^1.3.0
```

- [ ] **Step 2: Create `src/lib/theme.ts`**

```ts
export type Theme = "light" | "dark";

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === "light" || stored === "dark") return stored;
  return prefersDark ? "dark" : "light";
}

// Runs in <head> before first paint. Must stay dependency-free ES5.
// Mirrors resolveTheme; keep both in sync.
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;var s=null;try{s=localStorage.getItem('theme')}catch(e){}
var m=function(q){return window.matchMedia&&window.matchMedia(q).matches};
var t=(s==='light'||s==='dark')?s:(m('(prefers-color-scheme: dark)')?'dark':'light');
d.setAttribute('data-theme',t);
if(!m('(prefers-reduced-motion: reduce)')){d.classList.add('motion');
var p=null;try{p=sessionStorage.getItem('loader-played')}catch(e){}
if(location.pathname==='/'&&p!=='1')d.classList.add('loader');}})();`;
```

- [ ] **Step 3: Rewrite `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root,
[data-theme="dark"] {
  --bg: #000;
  --fg: #fff;
  --fg-muted: rgb(255 255 255 / 0.6);
  --fg-subtle: rgb(255 255 255 / 0.4);
  --line: rgb(255 255 255 / 0.2);
  color-scheme: dark;
}

[data-theme="light"] {
  --bg: #fff;
  --fg: #000;
  --fg-muted: rgb(0 0 0 / 0.6);
  --fg-subtle: rgb(0 0 0 / 0.4);
  --line: rgb(0 0 0 / 0.15);
  color-scheme: light;
}

@layer base {
  body {
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-sans), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }
  a { color: inherit; text-decoration: none; }
  ::selection { background: var(--fg); color: var(--bg); }
  *:focus-visible { outline: 1px solid var(--fg); outline-offset: 3px; }
}

@layer components {
  .label {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    line-height: 1.4;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--fg-muted);
  }
  .display {
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 0.92;
  }
}

/* Home hides the scrollbar (spec: home only) */
html:has([data-page="home"]) { scrollbar-width: none; }
html:has([data-page="home"])::-webkit-scrollbar { display: none; }

/* Motion gating: pre-animation states exist only when the head script added html.motion */
html.motion [data-reveal] { visibility: hidden; }
.loader-overlay { display: none; }
html.loader .loader-overlay { display: flex; }
.cursor-dot { display: none; }
```

- [ ] **Step 4: Create `src/app/prism-themes/prism-mono.css` and delete xonokai**

```css
code[class*="language-"],
pre[class*="language-"] {
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--fg);
  background: none;
  white-space: pre;
  tab-size: 2;
}
pre[class*="language-"] {
  padding: 1.25rem;
  overflow: auto;
  border: 1px solid var(--line);
}
.token.comment, .token.prolog, .token.doctype, .token.cdata { color: var(--fg-subtle); font-style: italic; }
.token.punctuation, .token.operator { color: var(--fg-muted); }
.token.keyword, .token.selector, .token.important, .token.atrule { font-weight: 600; }
.token.string, .token.char, .token.attr-value, .token.regex { color: var(--fg-muted); }
.token.function, .token.class-name { text-decoration: underline; text-decoration-color: var(--line); text-underline-offset: 3px; }
.token.number, .token.boolean, .token.constant { color: var(--fg); }
```

```bash
git rm -q src/app/prism-themes/prism-xonokai.css
```

- [ ] **Step 5: Update `tailwind.config.ts`** — replace the whole `theme.extend` block with:

```ts
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        "fg-subtle": "var(--fg-subtle)",
        line: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
```

- [ ] **Step 6: Theme context, toggle, container, layout**

`src/app/contexts/theme-context.tsx` — replace the provider body (keep `useTheme` export as is):

```tsx
'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Theme } from '@/lib/theme';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  // The head script already set data-theme before paint; just sync state.
  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

`src/app/_components/theme-toggle.tsx`:

```tsx
'use client';

import { useTheme } from '@/app/contexts/theme-context';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} aria-label="Toggle theme" className="opacity-60 transition-opacity hover:opacity-100">
      {theme === 'dark' ? 'light' : 'dark'}
    </button>
  );
}
```

`src/app/_components/container.tsx`:

```tsx
type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: Props) => {
  return <div className={`mx-auto w-full max-w-[1440px] px-4 md:px-8 ${className}`}>{children}</div>;
};

export default Container;
```

`src/app/layout.tsx` — change imports, metadata descriptions, `<html>`, and `<head>`/`<body>`:

```tsx
import Footer from "@/app/_components/footer";
import { HOME_OG_IMAGE_URL, SITE_URL } from "@/lib/constants";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { NavBar } from "@/app/_components/nav-bar";
import { ThemeProvider } from "@/app/contexts/theme-context";
import "./globals.css";
import "@/app/prism-themes/prism-mono.css";

const sans = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-mono" });
```

In `metadata`: `description` → `"Personal website of Liangyu Chen: software engineer, writer, and creator. Focuses on Python, JavaScript, Go, visual art, and more."`; `twitter.description` → `"Personal website of Liangyu Chen: software engineer, writer, and creator."`.

Return block:

```tsx
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* ...keep every existing favicon/meta/link/AdSense/JSON-LD tag unchanged... */}
      </head>
      <body>
        <ThemeProvider>
          <NavBar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
```

Remove the `Inter` import/usage and the `Container` import (pages own their containers from now on). Remove the line `<meta name="theme-color" content="#000" />` only if lint complains; otherwise keep it.

- [ ] **Step 7: Verify SSR HTML is no longer blank**

```bash
npx next build && (npx next start -p 3100 > /tmp/next-3100.log 2>&1 &) && sleep 4
curl -s http://localhost:3100/posts | grep -c "Controlling Seedance"
curl -s http://localhost:3100/posts | grep -o 'data-theme\|class="motion' | head
pkill -f "next start -p 3100"
```

Expected: build succeeds; first `grep -c` prints ≥ 1 (before this task it printed 0 because the provider returned `null`); server HTML contains no `class="motion` (the class is only added client-side).

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "Monochrome tokens, Hanken/Plex fonts, pre-paint theme script, SSR fix

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Pure helpers with tests + data fields

**Files:**
- Create: `src/lib/reading-time.ts`, `src/lib/reading-time.test.ts`, `src/lib/markdown-sections.ts`, `src/lib/markdown-sections.test.ts`, `src/lib/theme.test.ts`
- Modify: `src/lib/api.ts`, `src/interfaces/post.ts`, `src/interfaces/project.ts`, `src/app/data/project-data.tsx`, `package.json`, `tsconfig.json`

**Interfaces:**
- Consumes: `resolveTheme` from Task 1.
- Produces: `readingTime(content: string): number`; `splitMarkdownSections(md: string): { heading: string; body: string }[]`; `Post.readingTime: number`; `Post.category?: string`; `Project.category?: string`.

- [ ] **Step 1: Add test script and exclude tests from Next's type-check**

`package.json` scripts: add `"test": "node --experimental-strip-types --test src/lib/*.test.ts"` (Node 22.18 strips types by default; the flag keeps older 22.x working).
`tsconfig.json`: add `"**/*.test.ts"` to the `exclude` array.

- [ ] **Step 2: Write failing tests**

`src/lib/reading-time.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { readingTime } from "./reading-time.ts";

test("empty content is 1 minute", () => {
  assert.equal(readingTime(""), 1);
  assert.equal(readingTime("   \n  "), 1);
});

test("230 words is 1 minute, 231 is 2", () => {
  assert.equal(readingTime(Array(230).fill("w").join(" ")), 1);
  assert.equal(readingTime(Array(231).fill("w").join(" ")), 2);
});

test("ignores markdown code fences and image syntax noise", () => {
  const md = "word ".repeat(460) + "\n```ts\nconst x = 1;\n```\n![alt](/a.png)";
  assert.equal(readingTime(md), 2);
});

test("CJK characters count roughly as words", () => {
  assert.equal(readingTime("字".repeat(460)), 2);
});
```

`src/lib/markdown-sections.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { splitMarkdownSections } from "./markdown-sections.ts";

test("splits on level-1 headings only", () => {
  const md = "# A\ntext a\n### sub\nmore\n# B\ntext b\n";
  assert.deepEqual(splitMarkdownSections(md), [
    { heading: "A", body: "text a\n### sub\nmore" },
    { heading: "B", body: "text b" },
  ]);
});

test("text before first heading becomes an unnamed section", () => {
  assert.deepEqual(splitMarkdownSections("intro\n# A\nx"), [
    { heading: "", body: "intro" },
    { heading: "A", body: "x" },
  ]);
});

test("no headings returns one unnamed section; empty returns []", () => {
  assert.deepEqual(splitMarkdownSections("just text"), [{ heading: "", body: "just text" }]);
  assert.deepEqual(splitMarkdownSections(""), []);
});

test("does not split on # inside code fences", () => {
  const md = "# A\n```sh\n# comment\n```\n";
  assert.deepEqual(splitMarkdownSections(md), [{ heading: "A", body: "```sh\n# comment\n```" }]);
});
```

`src/lib/theme.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveTheme } from "./theme.ts";

test("stored valid value wins", () => {
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme("dark", false), "dark");
});

test("missing or garbage falls back to system", () => {
  assert.equal(resolveTheme(null, true), "dark");
  assert.equal(resolveTheme("blue", false), "light");
  assert.equal(resolveTheme("", true), "dark");
});
```

- [ ] **Step 3: Run tests, confirm failures**

Run: `npm test`
Expected: `theme.test.ts` passes; the other two fail with `ERR_MODULE_NOT_FOUND` for `reading-time.ts` / `markdown-sections.ts`.

- [ ] **Step 4: Implement helpers**

`src/lib/reading-time.ts`:

```ts
const WORDS_PER_MINUTE = 230;
const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/g;

export function readingTime(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  const cjk = (text.match(CJK) ?? []).length;
  const words = text.replace(CJK, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil((words + cjk) / WORDS_PER_MINUTE));
}
```

`src/lib/markdown-sections.ts`:

```ts
export type MarkdownSection = { heading: string; body: string };

export function splitMarkdownSections(md: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  let current: { heading: string; lines: string[] } | null = null;
  let inFence = false;

  for (const line of md.split("\n")) {
    if (line.trimStart().startsWith("```")) inFence = !inFence;
    const match = !inFence && /^# (.+)$/.exec(line);
    if (match) {
      if (current) sections.push(finish(current));
      current = { heading: match[1].trim(), lines: [] };
    } else {
      current ??= { heading: "", lines: [] };
      current.lines.push(line);
    }
  }
  if (current) sections.push(finish(current));
  return sections.filter((s) => s.heading !== "" || s.body !== "");
}

function finish(s: { heading: string; lines: string[] }): MarkdownSection {
  return { heading: s.heading, body: s.lines.join("\n").trim() };
}
```

- [ ] **Step 5: Run tests, confirm pass**

Run: `npm test`
Expected: all 3 files pass, 0 failures.

- [ ] **Step 6: Wire into data**

`src/interfaces/post.ts` — add fields:

```ts
  category?: string;
  readingTime: number;
```

`src/lib/api.ts` — import and compute in `getPostBySlug`:

```ts
import { readingTime } from "./reading-time";
...
  return { ...data, slug: realSlug, content, readingTime: readingTime(content) } as Post;
```

`src/interfaces/project.ts` — add `category?: string;`.

`src/app/data/project-data.tsx` — add a `category` line to each project, by slug:
`tetris: 'game'`, `blind-gomoku: 'game'`, `go-tiny-raytracer: 'graphics'`, `solana-by-example: 'docs'`, `crack-ats: 'tool'`, `enso-executer: 'pipeline tool'`, `into-pool: 'ai imagery'`, `cigarette-after-fight: 'short film'`, `bike-sharing` (blend-mesh-deformer): `'maya plugin'`, `emoji-picker: 'web app'`, `instagram-viewer: 'web app'`, `prompt-swim: 'web app'`.

- [ ] **Step 7: Verify and commit**

```bash
npm test && npx next build
git add -A && git commit -m "Add readingTime, splitMarkdownSections, theme tests; post/project category

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: tests pass, build passes.

---

### Task 3: Motion primitives

**Files:**
- Create: `src/app/_components/motion/gsap.ts`, `smooth-scroll.tsx`, `reveal-text.tsx`, `parallax-image.tsx`, `loader.tsx`, `cursor.tsx`, `marquee.tsx` (all under `src/app/_components/motion/`)
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `html.motion`, `html.loader`, `[data-reveal]`, `.loader-overlay`, `.cursor-dot` CSS from Task 1.
- Produces:
  - `motionEnabled(): boolean`
  - `<SmoothScroll />`
  - `<RevealText as?: 'h1'|'h2'|'p'|'div' className?: string>{children}</RevealText>`
  - `<ParallaxImage src: string alt: string className?: string priority?: boolean sizes?: string />` (className must give the frame a height or aspect ratio)
  - `<Loader />`
  - `<Cursor />` — activates on any element with `data-cursor="<label>"`
  - `<Marquee text: string className?: string />`

- [ ] **Step 1: `motion/gsap.ts`**

```ts
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export function motionEnabled(): boolean {
  return typeof document !== "undefined" && document.documentElement.classList.contains("motion");
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
```

- [ ] **Step 2: `motion/smooth-scroll.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, motionEnabled } from "./gsap";

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!motionEnabled()) return;
    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
```

- [ ] **Step 3: `motion/reveal-text.tsx`**

```tsx
"use client";

import React, { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, motionEnabled } from "./gsap";

type Props = {
  as?: "h1" | "h2" | "p" | "div";
  className?: string;
  children: ReactNode;
};

export function RevealText({ as = "div", className, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !motionEnabled()) return;
      // Wait out the intro loader if it is playing.
      const delay = document.documentElement.classList.contains("loader") ? 1.7 : 0;
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: "visible" });
          return gsap.from(self.lines, {
            yPercent: 105,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            delay,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 4: `motion/parallax-image.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, motionEnabled } from "./gsap";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ParallaxImage({ src, alt, className = "", priority, sizes = "100vw" }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motionEnabled()) return;
      gsap.fromTo(
        inner.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: `motion/loader.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.classList.contains("loader")) return;
      const done = () => {
        html.classList.remove("loader");
        try {
          sessionStorage.setItem("loader-played", "1");
        } catch {}
      };
      const counter = { v: 100 };
      gsap
        .timeline({ onComplete: done })
        .to(counter, {
          v: 0,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
        .to(root.current, { yPercent: -100, duration: 0.6, ease: "power4.inOut" });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="loader-overlay fixed inset-0 z-[100] items-center justify-center bg-bg text-fg">
      <span className="display text-[clamp(3rem,10vw,8rem)]">liangyu’</span>
      <span ref={count} className="label absolute bottom-6 right-4 text-sm text-fg md:right-8">100</span>
    </div>
  );
}
```

- [ ] **Step 6: `motion/cursor.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, motionEnabled } from "./gsap";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!motionEnabled() || !window.matchMedia("(pointer: fine)").matches || !dot.current) return;
    const el = dot.current;
    el.style.display = "flex";
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 });

    const onMove = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
      gsap.to(el, { scale: target ? 1 : 0, duration: 0.25, overwrite: "auto" });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[90] h-20 w-20 items-center justify-center rounded-full bg-fg font-mono text-[11px] lowercase text-bg"
    >
      {label}
    </div>
  );
}
```

- [ ] **Step 7: `motion/marquee.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, motionEnabled } from "./gsap";

type Props = { text: string; className?: string };

export function Marquee({ text, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motionEnabled()) return;
      const tween = gsap.to(track.current, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        onUpdate: (self) => gsap.to(tween, { timeScale: self.direction, duration: 0.4, overwrite: true }),
      });
    },
    { scope: root },
  );

  const chunk = Array(4).fill(`${text} — `).join("");
  return (
    <div ref={root} className={`overflow-hidden whitespace-nowrap ${className}`} aria-label={text}>
      <div ref={track} className="inline-block" aria-hidden>
        <span>{chunk}</span>
        <span>{chunk}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Mount global pieces in `layout.tsx`**

Add imports:

```tsx
import { SmoothScroll } from "@/app/_components/motion/smooth-scroll";
import { Cursor } from "@/app/_components/motion/cursor";
```

Inside `<ThemeProvider>`, before `<NavBar />`: `<SmoothScroll />` and after `<Footer />`: `<Cursor />`.

- [ ] **Step 9: Verify and commit**

```bash
npx next lint && npx next build
git add -A && git commit -m "Add GSAP/Lenis motion primitives

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: lint and build pass (components not yet used by pages except SmoothScroll/Cursor).

---

### Task 4: Shared server components, nav, footer

**Files:**
- Create: `src/app/_components/section.tsx`, `index-row.tsx`, `pill-button.tsx`
- Rewrite: `src/app/_components/nav-bar.tsx`, `src/app/_components/footer.tsx`

**Interfaces:**
- Consumes: `Container` (Task 1), `Marquee` (Task 3), `ThemeToggle` (Task 1).
- Produces:
  - `<Section label: string count?: number aside?: ReactNode className?: string>{children}</Section>`
  - `<IndexRow href: string year: string title: string category?: string meta?: string hoverLabel: string cursor: string external?: boolean />`
  - `<PillButton href: string external?: boolean>{children}</PillButton>`

- [ ] **Step 1: `section.tsx`**

```tsx
import type { ReactNode } from "react";

type Props = {
  label: string;
  count?: number;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Section({ label, count, aside, className = "", children }: Props) {
  return (
    <section className={`border-t border-line py-16 md:py-24 ${className}`}>
      <div className="mb-8 flex items-baseline justify-between gap-4 md:mb-12">
        <span className="label">
          ( {label} ){count !== undefined && <>&nbsp;&nbsp;({count})</>}
        </span>
        {aside && <span className="label">{aside}</span>}
      </div>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: `index-row.tsx`**

```tsx
import Link from "next/link";

type Props = {
  href: string;
  year: string;
  title: string;
  category?: string;
  meta?: string;
  hoverLabel: string;
  cursor: string;
  external?: boolean;
};

export function IndexRow({ href, year, title, category, meta, hoverLabel, cursor, external }: Props) {
  const className =
    "group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-t border-line py-5 last:border-b md:grid-cols-[4rem_1fr_10rem_5rem] md:py-6";
  const body = (
    <>
      <span className="label">{year}</span>
      <span className="relative block h-[1.15em] overflow-hidden text-xl font-medium tracking-[-0.03em] md:text-[1.75rem]">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-full">
          {title}
        </span>
        <span className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-full">
          {hoverLabel}
        </span>
      </span>
      <span className="label hidden md:block">{category ?? ""}</span>
      <span className="label text-right">{meta ?? ""}</span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" data-cursor={cursor} className={className}>
      {body}
    </a>
  ) : (
    <Link href={href} data-cursor={cursor} className={className}>
      {body}
    </Link>
  );
}
```

- [ ] **Step 3: `pill-button.tsx`**

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

type Props = { href: string; external?: boolean; children: ReactNode };

const cls =
  "inline-flex items-center rounded-full border border-fg px-5 py-2.5 text-sm lowercase transition-colors duration-200 hover:bg-fg hover:text-bg";

export function PillButton({ href, external, children }: Props) {
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 4: Rewrite `nav-bar.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

const links = [
  { name: "work", href: "/work" },
  { name: "writing", href: "/posts" },
  { name: "about", href: "/about" },
  { name: "contact", href: "mailto:liangyu.chen.dev@gmail.com" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => href !== "/" && pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 text-sm md:px-8">
          <Link href="/" className="font-semibold">liangyu’</Link>
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.name}>
                <Link href={l.href} className={isActive(l.href) ? "" : "opacity-60 transition-opacity hover:opacity-100"}>
                  {l.name}
                </Link>
              </li>
            ))}
            <li><ThemeToggle /></li>
          </ul>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? "close" : "menu"}
          </button>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end gap-2 bg-bg px-4 pb-10 text-fg md:hidden">
          {links.map((l) => (
            <Link key={l.name} href={l.href} className="display text-6xl">{l.name}</Link>
          ))}
          <div className="mt-6 text-sm"><ThemeToggle /></div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 5: Rewrite `footer.tsx`**

```tsx
import Container from "./container";
import { Marquee } from "./motion/marquee";

const social = [
  { name: "email", href: "mailto:liangyu.chen.dev@gmail.com" },
  { name: "github", href: "https://github.com/liang256" },
  { name: "linkedin", href: "https://www.linkedin.com/in/liang256/" },
  { name: "x", href: "https://x.com/LiangyuDev" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <Marquee text="liangyu.dev" className="display py-6 text-[clamp(3.5rem,10vw,9rem)]" />
      <Container className="flex flex-col gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
        <span className="label">liangyu chen</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {social.map((s) => (
            <li key={s.name}>
              {s.href.startsWith("mailto:") ? (
                <a href={s.href} className="opacity-60 hover:opacity-100">{s.name}</a>
              ) : (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100">{s.name} ↗</a>
              )}
            </li>
          ))}
        </ul>
        <span className="label">© {new Date().getFullYear()}</span>
      </Container>
    </footer>
  );
}

export default Footer;
```

- [ ] **Step 6: Verify and commit**

```bash
npx next lint && npx next build
git add -A && git commit -m "Add Section/IndexRow/PillButton; noth-style nav and footer

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Home page

**Files:**
- Rewrite: `src/app/page.tsx`

**Interfaces:**
- Consumes: `getAllPosts()` (with `readingTime`, `category`), `Container`, `Section`, `IndexRow`, `PillButton`, `RevealText`, `ParallaxImage`, `Loader`.

- [ ] **Step 1: Write `src/app/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/_components/container";
import { Section } from "@/app/_components/section";
import { IndexRow } from "@/app/_components/index-row";
import { PillButton } from "@/app/_components/pill-button";
import { RevealText } from "@/app/_components/motion/reveal-text";
import { ParallaxImage } from "@/app/_components/motion/parallax-image";
import { Loader } from "@/app/_components/motion/loader";
import { getAllPosts } from "@/lib/api";

export const metadata: Metadata = { title: { absolute: "Liangyu Chen" } };

const FOCUS = [
  { title: "pipeline tooling", blurb: "Houdini automation, headless rendering, batch systems." },
  { title: "ai video", blurb: "Seedance prompting, hybrid generation pipelines." },
  { title: "backend", blurb: "Domain models and APIs that stay maintainable." },
  { title: "creative tech", blurb: "Animation and rigging background; tools for artists." },
];

export default function Home() {
  const posts = getAllPosts();
  const latest = posts.slice(0, 4);

  return (
    <div data-page="home">
      <Loader />
      <Container>
        <section className="flex min-h-[100svh] flex-col justify-between pb-10 pt-28">
          <span className="label">( pipeline · ai video · backend )</span>
          <RevealText as="h1" className="display my-12 text-[clamp(3.5rem,9vw,9rem)]">
            tools for the<br />creative pipeline.
          </RevealText>
          <div className="flex flex-col gap-6 border-t border-line pt-4 md:flex-row md:items-end md:justify-between">
            <p className="max-w-sm text-base">
              I build pipeline tools, AI-video workflows and backend systems for creative production.
            </p>
            <span className="label md:text-right">available remotely<br />scroll ↓</span>
          </div>
        </section>

        <Section label="focus" aside="04">
          <RevealText as="p" className="max-w-4xl text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            Pipeline tooling, AI video, backend systems — and the people who use them.
          </RevealText>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {FOCUS.map((f, i) => (
              <div key={f.title}>
                <span className="label">( 0{i + 1} )</span>
                <p className="mt-3 font-medium">{f.title}</p>
                <p className="mt-1 text-sm text-fg-muted">{f.blurb}</p>
              </div>
            ))}
          </div>
          <ParallaxImage
            src="/assets/blog/end-to-end-vs-hybrid-ai-video-pipelines/cover.png"
            alt=""
            className="mt-16 aspect-[16/7]"
          />
        </Section>

        <Section label="writing" count={posts.length} aside={<Link href="/posts">all posts →</Link>}>
          <div>
            {latest.map((p) => (
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
        </Section>

        <Section label="contact">
          <RevealText as="h2" className="display text-[clamp(3.5rem,9vw,9rem)]">let’s talk.</RevealText>
          <div className="mt-10 flex flex-wrap gap-3">
            <PillButton href="mailto:liangyu.chen.dev@gmail.com">liangyu.chen.dev@gmail.com</PillButton>
            <PillButton href="https://github.com/liang256" external>github ↗</PillButton>
            <PillButton href="https://www.linkedin.com/in/liang256/" external>linkedin ↗</PillButton>
          </div>
        </Section>
      </Container>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx next lint && npx next build && (npx next start -p 3100 > /tmp/next-3100.log 2>&1 &) && sleep 4
curl -s http://localhost:3100/ | grep -c "creative pipeline\|available remotely\|let’s talk"
pkill -f "next start -p 3100"
```

Expected: count ≥ 3; `/` returns 200 (no longer redirects to `/posts`).

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "New home page: intro, focus, writing, contact

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: `/work` page, redirect, sitemap

**Files:**
- Create: `src/app/work/page.tsx`
- Delete: `src/app/projects/page.tsx`, `src/app/projects/article.tsx`
- Modify: `next.config.mjs`, `src/app/sitemap.ts`

- [ ] **Step 1: `src/app/work/page.tsx`**

```tsx
import type { Metadata } from "next";
import Container from "@/app/_components/container";
import { IndexRow } from "@/app/_components/index-row";
import { RevealText } from "@/app/_components/motion/reveal-text";
import { projectsData } from "@/app/data/project-data";

export const metadata: Metadata = {
  title: "Work",
  description: "Open source and personal projects by Liangyu Chen.",
  openGraph: { title: "Work | Liangyu Chen", description: "Open source and personal projects by Liangyu Chen." },
  twitter: { card: "summary_large_image", title: "Work | Liangyu Chen", description: "Open source and personal projects by Liangyu Chen." },
};

export default function WorkPage() {
  const projects = projectsData
    .filter((p) => p.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <Container className="pt-28">
      <span className="label">( work )&nbsp;&nbsp;({projects.length})</span>
      <RevealText as="h1" className="display mb-16 mt-6 text-[clamp(3.5rem,11vw,11rem)]">work.</RevealText>
      <div>
        {projects.map((p) => (
          <IndexRow
            key={p.slug}
            href={p.link}
            year={p.date.slice(0, 4)}
            title={p.title}
            category={p.category}
            meta="↗"
            hoverLabel="open ↗"
            cursor="open"
            external
          />
        ))}
      </div>
    </Container>
  );
}
```

- [ ] **Step 2: Redirect** — in `next.config.mjs` add to `nextConfig`:

```js
  async redirects() {
    return [{ source: "/projects", destination: "/work", permanent: true }];
  },
```

- [ ] **Step 3: Sitemap** — in `src/app/sitemap.ts` change `${SITE_URL}/projects` to `${SITE_URL}/work`.

- [ ] **Step 4: Delete old projects page**

```bash
git rm -q src/app/projects/page.tsx src/app/projects/article.tsx
```

- [ ] **Step 5: Verify and commit**

```bash
npx next lint && npx next build && (npx next start -p 3100 > /tmp/next-3100.log 2>&1 &) && sleep 4
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3100/projects
curl -s http://localhost:3100/work | grep -c "Enso Executer"
curl -s http://localhost:3100/sitemap.xml | grep -c "/work"
pkill -f "next start -p 3100"
git add -A && git commit -m "Add /work index, redirect /projects

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: `308 http://localhost:3100/work`; counts ≥ 1.

---

### Task 7: `/posts` index and post page

**Files:**
- Rewrite: `src/app/posts/page.tsx`, `src/app/_components/post-header.tsx`, `src/app/_components/post-title.tsx`, `src/app/_components/markdown-styles.module.css`
- Modify: `src/app/posts/[slug]/page.tsx`, `src/app/_components/post-body.tsx`

**Interfaces:**
- Consumes: `IndexRow`, `RevealText`, `ParallaxImage`, `Container`, `DateFormatter` (existing default export `({ dateString })`), `Post.readingTime`, `Post.category`.
- Produces: `PostHeader({ title, coverImage, date, author, category, readingTime })`.

- [ ] **Step 1: `src/app/posts/page.tsx`** — keep the existing `metadata` export, replace imports and component:

```tsx
import Link from "next/link";
import Container from "@/app/_components/container";
import { IndexRow } from "@/app/_components/index-row";
import { RevealText } from "@/app/_components/motion/reveal-text";
import { ParallaxImage } from "@/app/_components/motion/parallax-image";
import DateFormatter from "@/app/_components/date-formatter";
import { getAllPosts } from "@/lib/api";

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
```

- [ ] **Step 2: `post-title.tsx`**

```tsx
import { ReactNode } from "react";
import { RevealText } from "./motion/reveal-text";

export function PostTitle({ children }: { children?: ReactNode }) {
  return (
    <RevealText as="h1" className="display my-6 text-[clamp(2.75rem,7vw,6.5rem)]">
      {children}
    </RevealText>
  );
}
```

- [ ] **Step 3: `post-header.tsx`**

```tsx
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { PostTitle } from "./post-title";
import { ParallaxImage } from "./motion/parallax-image";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage?: string;
  date: string;
  author: Author;
  category?: string;
  readingTime: number;
};

export function PostHeader({ title, coverImage, date, author, category, readingTime }: Props) {
  return (
    <header className="mb-12 md:mb-16">
      <p className="label">
        <Link href="/posts" className="hover:text-fg">← writing</Link>
        {category && <>&nbsp;&nbsp;/&nbsp;&nbsp;{category}</>}
      </p>
      <PostTitle>{title}</PostTitle>
      <div className="label flex flex-wrap gap-x-10 gap-y-1 border-t border-line pt-3">
        <DateFormatter dateString={date} />
        <span>{readingTime} min read</span>
        <span>{author.name}</span>
      </div>
      {coverImage && (
        <ParallaxImage src={coverImage} alt={`Cover image for ${title}`} priority className="mt-10 aspect-[1300/630]" />
      )}
    </header>
  );
}
```

- [ ] **Step 4: `post-body.tsx`** — change the wrapper class from `max-w-2xl mx-auto` to `mx-auto max-w-[680px]`.

- [ ] **Step 5: Rewrite `markdown-styles.module.css`**

```css
.markdown {
  @apply text-[18px] leading-[1.6] md:text-[19px];
}
.markdown p,
.markdown ul,
.markdown ol,
.markdown blockquote,
.markdown pre,
.markdown figure,
.markdown picture { @apply my-6; }
.markdown ul { @apply list-disc pl-6; }
.markdown ol { @apply list-decimal pl-6; }
.markdown li { @apply my-2; }
.markdown ul ul, .markdown ol ol, .markdown ul ol, .markdown ol ul { @apply mt-2 pl-4; }
.markdown h1 { @apply mb-6 mt-16 text-4xl font-medium leading-tight tracking-[-0.03em]; }
.markdown h2 { @apply mb-4 mt-14 text-3xl font-medium leading-snug tracking-[-0.03em]; }
.markdown h3 { @apply mb-4 mt-10 text-2xl font-medium leading-snug tracking-[-0.02em]; }
.markdown a { @apply underline decoration-line underline-offset-4 transition-colors hover:decoration-fg; }
.markdown blockquote { @apply border-l border-fg pl-5 text-fg-muted; }
.markdown img { @apply h-auto max-w-full; }
.markdown hr { @apply my-12 border-line; }
.markdown :not(pre) > code { @apply border border-line px-1 py-0.5 font-mono text-[0.875em]; }
.markdown table { @apply w-full border-collapse text-base; }
.markdown th, .markdown td { @apply border-b border-line py-2 pr-4 text-left; }
```

- [ ] **Step 6: `src/app/posts/[slug]/page.tsx`** — keep `generateMetadata`, `jsonLd`, `generateStaticParams`. Replace imports of `Container`, `Header`, add `IndexRow`; replace the returned JSX:

```tsx
import Container from "@/app/_components/container";
import { IndexRow } from "@/app/_components/index-row";
// (remove: import Header ..., import Link ...)
```

```tsx
  const otherPosts = getAllPosts()
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3);
  ...
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
```

(The outer `<main>` is dropped because `layout.tsx` now provides `<main>`.)

- [ ] **Step 7: Verify and commit**

```bash
npx next lint && npx next build && (npx next start -p 3100 > /tmp/next-3100.log 2>&1 &) && sleep 4
curl -s http://localhost:3100/posts | grep -c "( latest )"
curl -s http://localhost:3100/posts/controlling-seedance-2-5-one-source-one-dimension | grep -c "min read\|( more writing )"
pkill -f "next start -p 3100"
git add -A && git commit -m "Restyle /posts index and post page

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: counts ≥ 1 and ≥ 2.

---

### Task 8: `/about` page

**Files:**
- Rewrite: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `splitMarkdownSections` (Task 2), `markdownToHtml`, `PostBody`, `Container`, `RevealText`.

- [ ] **Step 1: Write `src/app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import fs from "fs";
import { join } from "path";
import Script from "next/script";
import markdownToHtml from "@/lib/markdownToHtml";
import { splitMarkdownSections } from "@/lib/markdown-sections";
import { PostBody } from "@/app/_components/post-body";
import Container from "@/app/_components/container";
import { RevealText } from "@/app/_components/motion/reveal-text";

const DESCRIPTION = "Learn about Liangyu Chen — software engineer, writer, and creator.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  openGraph: { title: "About | Liangyu Chen", description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: "About | Liangyu Chen", description: DESCRIPTION },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-8">
      <span className="label pt-1">( {label} )</span>
      <div>{children}</div>
    </div>
  );
}

export default async function AboutPage() {
  const raw = fs.readFileSync(join(process.cwd(), "_about/about.md"), "utf8");
  const [intro, ...sections] = splitMarkdownSections(raw);
  const introHtml = intro ? await markdownToHtml(intro.body) : "";
  const rendered = await Promise.all(
    sections.map(async (s) => ({ label: s.heading.toLowerCase(), html: await markdownToHtml(s.body) })),
  );

  return (
    <Container className="pt-28">
      <span className="label">( about )</span>
      <RevealText as="h1" className="display mb-12 mt-6 max-w-6xl text-[clamp(2.75rem,7vw,7rem)]">
        where technical depth meets creative production.
      </RevealText>
      {introHtml && (
        <Row label="intro">
          <PostBody content={introHtml} />
        </Row>
      )}
      <Row label="short film">
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
```

Note: `PostBody` centers itself with `mx-auto max-w-[680px]`; inside a row that is fine (it left-aligns within the right column only if the column is ≤ 680px; acceptable).

- [ ] **Step 2: Verify and commit**

```bash
npx next lint && npx next build && (npx next start -p 3100 > /tmp/next-3100.log 2>&1 &) && sleep 4
curl -s http://localhost:3100/about | grep -c "( what i do )\|( inspirations from animation )\|( short film )"
pkill -f "next start -p 3100"
git add -A && git commit -m "Restyle /about as labeled sections

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: count ≥ 3.

---

### Task 9: Cleanup and full verification

**Files:**
- Delete: `src/app/_components/{alert,avatar,card,cover-image,header,hero-post,intro,more-stories,optimized-image,post-grid,post-list,post-preview,section-separator,view-toggle}.tsx`, `src/app/.default-page.tsx`
- Modify: `package.json` (remove `framer-motion`)

- [ ] **Step 1: Confirm nothing imports the files to delete, then delete**

```bash
for c in alert avatar card cover-image header hero-post intro more-stories optimized-image post-grid post-list post-preview section-separator view-toggle; do
  grep -rlE "[/.]${c}[\"']" src | grep -v "_components/${c}.tsx" | grep -v ".default-page.tsx"
done
```

Expected: no output. Then:

```bash
git rm -q src/app/.default-page.tsx $(for c in alert avatar card cover-image header hero-post intro more-stories optimized-image post-grid post-list post-preview section-separator view-toggle; do echo "src/app/_components/$c.tsx"; done)
```

- [ ] **Step 2: Remove framer-motion**

```bash
grep -rn "framer-motion" src || npm uninstall framer-motion
```

Expected: grep finds nothing; uninstall succeeds.

- [ ] **Step 3: Static checks**

```bash
npm test && npx next lint && npx next build
grep -ri montreal src; echo "montreal-exit=$?"
grep -rn "accent-\|--text-\|--bg-secondary\|glass\|text-gradient" src; echo "oldtokens-exit=$?"
```

Expected: tests, lint, build pass; both greps print nothing and exit 1.

- [ ] **Step 4: Server HTML checks (Review Focus #1)**

```bash
(npx next start -p 3100 > /tmp/next-3100.log 2>&1 &) && sleep 4
for p in / /work /posts /posts/the-art-of-prompting-seedance /about; do
  printf "%s " "$p"; curl -s "http://localhost:3100$p" | sed 's/<[^>]*>/ /g' | wc -w
done
curl -s http://localhost:3100/ | grep -o 'html[^>]*class="[^"]*motion' | head -1; echo "ssr-motion-exit=$?"
```

Expected: every page prints a word count > 100; the last grep finds nothing (motion class is client-only), so no content is hidden for non-JS visitors.

- [ ] **Step 5: Commit cleanup**

```bash
pkill -f "next start -p 3100"
git add -A && git commit -m "Remove unused starter components and framer-motion

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 6: Browser pass (Review Focus #2, #3)**

Run `npx next start -p 3100` and in Chrome check each of `/`, `/work`, `/posts`, one post, `/about`:
- Dark and light (toggle in nav; reload keeps choice; no flash of wrong theme).
- 375px and 1440px widths; mobile `menu` opens full-screen menu and closes on navigation.
- Home: loader plays once; reload in same tab → no loader; hero lines reveal after loader.
- Hover an index row on desktop: title flips, circular cursor shows `read` / `open`.
- Navigate `/` → a post → back: page starts at top, reveals still work, loader does not replay.
- DevTools → Rendering → emulate `prefers-reduced-motion: reduce`, hard reload `/`: no loader, native scroll, all text visible immediately, no custom cursor.
- `/projects` lands on `/work`.

Record any defects as fixes with their own commits before declaring done.
