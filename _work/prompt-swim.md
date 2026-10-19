---
title: "Prompt Swim"
seoTitle: "Prompt Swim: Case Study of an AI Image Gallery with Stripe Pay-As-You-Go Billing"
subtitle: "An AI image gallery with pay-as-you-go credits — OpenAI generation, Stripe Checkout, and a points ledger that never double-charges."
excerpt: "Case study: how I built Prompt Swim, a public AI image gallery where users buy credits through Stripe and spend them on DALL·E generations. Third-party API integration, webhook-driven payments, transactional credit accounting, and lessons for teams adding AI and billing to their product."
coverImage: "/assets/work/prompt-swim/gallery.jpg"
date: "2026-10-19T05:00:00.000Z"
year: "2024"
category: "web app"
role: "Solo — product, design, engineering, operations"
platform: "Web (Next.js on Vercel)"
stack: ["Next.js", "TypeScript", "OpenAI Images API", "Stripe Checkout", "MongoDB", "AWS S3", "Auth.js (Google OAuth)", "Vercel"]
liveUrl: "https://promptswim.com"
cta: "Need AI features, payments, or a third-party API wired into your product? Let’s talk it through."
---

Prompt Swim is a public gallery of AI-generated images where every picture shows the prompt that made it. Users sign in with Google, buy a pack of points through Stripe, and spend those points generating images with OpenAI's DALL·E models. Each result is saved to their profile and the shared feed, so the gallery doubles as a library of prompts other people can learn from.

On the surface it's a small product. Underneath, it has the same parts most AI and SaaS products need: a paid third-party API, a payment provider talking back through webhooks, user accounts, file storage, and a ledger that has to stay correct when any of those fail halfway. This case study covers how those parts fit together, written for teams planning similar integrations.

![The Prompt Swim gallery: every image is linked to its author and the prompt that produced it.](/assets/work/prompt-swim/gallery.jpg)

## What the user experiences

1. **Browse.** The home page is an infinite-scroll feed of everyone's generations, newest first. Opening an image shows the original prompt, the model used, the author, and share/save buttons.
2. **Sign in.** Google OAuth only: one click, no passwords to store. The first sign-in creates a public profile with a unique handle and a points account.
3. **Generate.** Pick a model (DALL·E 3 or DALL·E 2), write a prompt, and optionally post anonymously. The image appears in a few seconds and the balance updates.
4. **Top up.** When the points run out, the pricing page sells four packs through Stripe Checkout. No subscription.

![Pay-as-you-go pricing: four point packs, with the per-model cost shown up front.](/assets/work/prompt-swim/pricing.png)

## Why credits instead of a subscription

AI generation has a real cost per request, and usage is spiky. Some people make three images and leave; others make three hundred in an evening. A flat subscription either overcharges the first group or loses money on the second.

Prepaid credits avoid both:

- **Price follows cost.** DALL·E 3 costs more upstream than DALL·E 2, so it costs 60 points instead of 30. Per-model prices live in configuration, so a change in OpenAI's pricing is an environment change, not a deploy.
- **No unpaid usage.** The money arrives before the API call is made, so there's no invoicing and no chasing failed card renewals.
- **Bigger packs are cheaper.** Rates run from 600 points per dollar on the $2 pack to 1,000 per dollar on the $30 pack.

## Architecture

```
Browser (Next.js App Router + React Query)
  │
  ├─► /api/generate-image ── auth ─► OpenAI Images API
  │                                   └─► copy result to S3
  │                                   └─► Mongo transaction:
  │                                         insert image + deduct points
  │
  ├─► /api/create-checkout-session ─► Stripe Checkout
  │                                   └─► order saved as "created"
  │
  └─► /api/images?page=n ─► paginated public feed

Stripe ─► /api/stripe-webhook ── verify signature
                                 └─► Mongo transaction:
                                       order → "completed" + credit points
```

- **Next.js on Vercel** serves the UI and every API route from one codebase. The generation route gets a longer function timeout, because DALL·E 3 calls can take a while.
- **Auth.js with Google** handles sign-in, with sessions stored as JWTs and user records in MongoDB through the official adapter. A `createUser` event provisions the profile and points account, so a new user never exists without a balance.
- **MongoDB** holds profiles, images, point accounts and orders. Every operation that touches money runs inside a multi-document transaction.
- **AWS S3** stores the images permanently. OpenAI only returns a temporary URL, so each result is downloaded and re-uploaded under its own ID with the user and model attached as metadata.

## Integrating OpenAI: treat it like any paid, unreliable dependency

The OpenAI call is one line. Most of the work is in the code around it:

- **Validate before spending.** The route rejects unauthenticated requests, empty prompts and unknown models before anything is sent upstream. The model list is checked on the server, not just in the dropdown.
- **Typed errors.** Failures from OpenAI (a content-policy rejection, for example) become an `ImageGenerationError` and a 400 with a readable message. Bugs in my own code become a 500. The user sees "your prompt was rejected", not a stack trace.
- **Keep what the model actually did.** DALL·E 3 rewrites prompts before generating. The rewritten `revised_prompt` is saved next to the user's original, which is useful both for users learning to prompt and for debugging odd results.
- **Own your assets.** Because the image is copied to S3 before anything is recorded, the gallery never shows a link that expires an hour later.

## Integrating Stripe: the webhook is the source of truth

The most common payment bug is crediting a user because they landed on the success page. Users close tabs, card payments can settle later, and a success URL can simply be visited. Prompt Swim never credits anything from the browser.

**1. The server sets the price.** The client sends which pack it wants, and the server works out the price from its own table. If the two disagree, the request is rejected, so editing the request in DevTools can't buy 30,000 points for $2.

**2. Every checkout is recorded as an order.** When the Checkout Session is created, an order is stored under the Stripe session ID with status `created`, the user, the points and the price in cents.

**3. Only a verified webhook moves the order forward.** The webhook route checks Stripe's signature against the raw request body, then handles the events that matter:

- `checkout.session.completed` with `payment_status: paid` → fulfil: order → `completed`, points credited
- `checkout.session.async_payment_succeeded` → fulfil (for payment methods that settle later)
- `checkout.session.async_payment_failed` → order → `failed`
- `checkout.session.expired` → order → `expired`

**4. Fulfilment is idempotent.** Stripe retries webhooks and sometimes delivers them twice. The order status works as a small state machine: a `created` order can be fulfilled once. Fulfilling a `completed` order again does nothing, and fulfilling an `expired` or `failed` order raises an error instead of quietly crediting points. Duplicate deliveries can't give double credit.

**5. Order status and balance change together.** Marking the order completed and adding the points run in one MongoDB transaction. Either both happen or neither does, so there's never a "paid but no points" state to fix by hand.

## The points ledger

Spending points uses the same pattern in reverse. After the image is generated and stored, one transaction inserts the image record and deducts its cost. If the database write fails, the user isn't charged for an image they can't see, and an image never appears in the gallery without being paid for.

## What I'd change today

The system has done its job, but rereading it with production experience, there are three things I'd tighten for a client project:

- **Reserve points before calling the model, not after.** The balance check currently runs after generation, so a user with too few points still triggers a paid OpenAI call before being rejected. A hold → generate → settle-or-release flow fixes this.
- **Use a conditional atomic update for the balance.** The balance is read, changed, then written. Inside a transaction that's correct, but a single `$inc` filtered on `balance >= cost` is simpler and holds up better under concurrency.
- **Store processed webhook event IDs.** The order state machine already prevents double credit, but keeping Stripe event IDs makes replays and audits easier to trace.

None of these needed solving to launch. Knowing where the edges are is what separates a demo from something you can hand over to someone else.

## What this means if you're building something similar

Prompt Swim is my own product, but the pieces show up in most projects that add AI or payments to an existing business:

- **Adding an AI feature to your product** → server-side model calls with validation, typed error handling, cost per request and output storage you control
- **Charging for usage** → prepaid credits, usage-based pricing, or Stripe subscriptions, with prices enforced on the server
- **Accepting payments safely** → Stripe Checkout plus signature-verified, idempotent webhooks as the single source of truth
- **Keeping money and data consistent** → transactional writes so a failure halfway never leaves a customer charged without being served
- **Connecting third-party APIs** → OAuth sign-in, cloud storage, and any REST or webhook-based service your product depends on

Typical projects I can help with: adding generative AI (images, text, vision) to an existing app, building usage-based or credit billing on Stripe, integrating payment, auth or storage providers into a Next.js or Python backend, and reviewing an existing integration for the double-charge and lost-webhook bugs above.
