---
title: "減脂小豬"
seoTitle: "減脂小豬: Case Study of a LINE-Native AI Food Diary"
subtitle: "A LINE-native AI food diary — snap a meal, get a nutrition log in seconds."
excerpt: "Case study: how I designed, built, and run 減脂小豬, a LINE bot plus LIFF mini app that turns a food photo into a nutrition log. Architecture, LINE-specific decisions, and running a LINE product in production."
coverImage: "/assets/work/line-bot-food-diary/landing.jpg"
date: "2026-10-17T01:00:00.000Z"
year: "2026"
category: "line app"
role: "Solo — product, design, engineering, operations"
platform: "LINE Official Account + LIFF"
stack: ["LINE Messaging API", "LIFF", "Next.js", "TypeScript", "Supabase", "OpenAI", "Vercel"]
liveUrl: "https://fit.promptswim.com"
---

減脂小豬 ("the fat-loss piglet") is a food-diary product that lives entirely inside LINE. Users snap a photo of their lunch, the bot recognises the dish, estimates portions using Taiwan's six-food-group exchange system, asks for a one-tap confirmation, and replies with how much room is left for the rest of the day. No app download, no account sign-up, no manual calorie lookup.

This case study is a walkthrough of how it's built and why, written for teams who are thinking about building something on LINE themselves.

## Why LINE instead of an app

In Taiwan, Japan and Thailand, LINE is where people already are. Asking someone to install yet another diet app is a big ask; asking them to add a LINE friend is not. That shapes every product decision:

- **Zero install, zero sign-up.** The LINE user ID *is* the account. Onboarding is "add friend → send first photo".
- **Conversation is the UI.** The fastest interaction is the one the user already knows: send a photo, tap a button.
- **Push is native.** Reminders and weekly reviews arrive in the same chat the user opens every day — no notification permission dialogs, no email.

The trade-off is that a chat window is a narrow canvas. Anything richer than a message — browsing history, editing an entry, charts — needs a different surface. That's where LIFF comes in.

## What the user experiences

### 1. Photo → structured log in one round trip

1. The user sends a food photo (or types `紀錄 拿鐵 224克`).
2. The webhook sends the image to a vision model, which returns a structured breakdown: dish name, estimated grams, and servings per food group.
3. The bot replies with a **LINE Confirm Template**: a short summary plus ✅ 儲存 / ❌ 取消 buttons.
4. On ✅, the entry is saved and the bot replies with today's remaining allowance:

```
✅ 已儲存：雞腿便當

今日還能吃：
五穀雜糧  ▓▓░░░  剩 2.0 份
豆魚肉蛋  ▓░░░░  剩 9.0 份
蔬菜      ░░░░░  剩 6.0 份
油脂堅果  ░░░░░  剩 4.0 份
```

The confirm step matters. AI estimates are good but not perfect, and a user who sees a wrong number they *didn't* agree to stops trusting the product. A pending-then-confirm flow keeps the user in control while still being one tap.

### 2. A rich menu as the app's home screen

![The 減脂小豬 rich menu: photo log, today's diary, water, blog, weekly review, and help.](/assets/work/line-bot-food-diary/rich-menu.png)

The rich menu is the persistent navigation bar at the bottom of the chat. It's generated from code (SVG → PNG), uploaded through the Messaging API and set as default with a single script, so changing the menu is a commit, not a manual console session.

### 3. A LIFF mini app for everything a chat can't do

Tapping 拍照記錄 opens a LIFF (LINE Front-end Framework) web app inside LINE. It's a regular Next.js page, but it runs with the user's LINE identity, so there's no login screen. It provides:

- A week view with per-day stats and food-group chips
- Editing and deleting entries
- Weight tracking with a trend chart
- Personal nutrition goals

It also quietly reports the device's time zone back to the server, so "today" means the user's today — a small thing that removes a whole class of off-by-one-day bugs for users travelling or living abroad.

### 4. Natural-language commands and an optional AI companion

Beyond photos, the bot understands plain Chinese: `日記` (today's summary), `週報` (7-day review), `我今天還可以吃什麼` (AI suggestion based on what's left today), `低脂那一份來自什麼` (which meal contributed that serving), `目標 蔬菜 5` (update goals). Users can opt into free-form AI chat with `跟我聊天` and turn it off with `閉嘴` — the bot never talks unless invited.

## Architecture

```
LINE app
  └─► Messaging API
        └─► /api/line/webhook  (Next.js on Vercel, Tokyo)
              ├─ text     → command router / AI chat
              ├─ image    → vision parse → confirm card
              └─ postback → save or cancel → allowance reply

LIFF mini app ──► Next.js API routes
Cron jobs     ──► weekly review · re-engagement · D1 reminder

Everything reads and writes Supabase (Postgres + RLS).
```

- **Next.js App Router** serves the webhook, the LIFF app, the marketing landing page and an SEO blog from one codebase.
- **Vercel**, pinned to the Tokyo region to stay close to LINE's servers and Taiwanese users.
- **Supabase Postgres**, with a strict split between the public anon key (browser, protected by RLS) and the service-role key (server only). 16 numbered SQL migrations track the schema.
- **OpenAI models**, chosen per task: a stronger model for photos and corrections, a cheaper one for text logs. Every call goes through a single gateway function that records token usage per user, so cost per active user is a query, not a guess.
- **Domain knowledge in code.** Portion rules for the six food groups are encoded and verified after the model responds, rather than trusting the model to remember nutrition tables.

## LINE-specific lessons

A few things that are easy to get wrong on LINE and that I'd bring to any client project:

- **Reply tokens expire fast.** The webhook must answer within seconds. Slow work (vision calls, database writes) has to be fast or structured so the user gets an immediate response.
- **Push messages cost quota; reply messages don't.** Design flows so most messages are replies to user actions, and reserve push for high-value moments (weekly review, a single re-engagement nudge).
- **Don't nag.** The re-engagement job nudges a user exactly once when they've been quiet for N days — never daily. Churned users who get spammed block the account, and blocks are permanent.
- **Templates and quick replies beat free text.** Buttons reduce typos, reduce AI cost, and make the bot feel like an app.
- **Webhook signatures and secrets.** Every request is verified against the channel secret; server-only keys never touch the client bundle.

## Running it in production

Shipping the bot is half the job. Keeping it healthy as a solo developer required some automation:

- **On-call alerting via LINE.** Every uncaught server error is fingerprinted and deduplicated. The first sighting (and any regression) pushes an alert to my own LINE account.
- **Agent-assisted fixes.** A scheduled coding agent picks up new errors, investigates the repo, writes a fix, runs lint and tests, and opens a *draft* pull request for me to review. Humans still merge; the agent just shortens the time from error to fix.
- **Funnel and retention reports.** Events like first photo, first confirmation and return visits are logged so I can see where users drop off — which is how the re-engagement nudge and the improved onboarding message came about.
- **CI on every PR.** Lint plus a Vitest suite of 50+ test files, including time-frozen tests for anything that depends on "today".
- **Content for acquisition.** A blog of practical guides (eating at convenience stores, hotpot, night-shift meals, TDEE) drives search traffic into a LINE "add friend" CTA.

## What this means if you need a LINE product

減脂小豬 is my own product, but the building blocks are the same ones most LINE projects need:

- **Customers interact without installing an app** → LINE Official Account + webhook bot
- **Forms, dashboards, booking or editing screens inside LINE** → LIFF mini app with LINE login built in
- **A branded home screen in the chat** → code-generated rich menu
- **AI that understands photos or free text** → vision + LLM pipeline with confirm-before-save
- **Scheduled reminders and reports** → cron-driven push with quota-aware rules
- **Confidence it keeps running** → error alerting, CI, usage tracking

Typical projects I can help with: membership and loyalty bots for shops and clinics, reservation and reminder flows, LIFF mini apps for order forms or customer dashboards, AI customer-service or intake bots, and integrating LINE with an existing backend.
