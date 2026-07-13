---
title: "I Used Claude Code to Build a Houdini Pipeline Tool. Here's What Agentic Coding Actually Feels Like."
excerpt: "Everyone is writing about agentic coding. Almost no one is writing about it from inside a VFX pipeline. I built Enso Executer — a Houdini batch processor — partly with AI assistance. Here's what actually happened."
coverImage: "/og.png"
date: "2026-07-06T09:00:00.000Z"
author:
  name: Liang
  picture: "/assets/blog/authors/cat_coffee.png"
ogImage:
  url: "/og.png"
---

The internet is saturated with agentic coding takes right now. Claude Code, Cursor, Replit Agent — every developer has a story. Most of those stories follow the same arc: "I vibe-coded a startup in a weekend" or "AI wrote 90% of my codebase."

I want to tell a different story. Not because the other ones are wrong, but because mine comes from a context almost nobody is writing from: a VFX pipeline.

## What Is a Pipeline TD, and Why Does It Matter Here

A Technical Director in a VFX studio sits at the intersection of art and infrastructure. You're not building the final shot. You're building the tools, scripts, and systems that let artists build the final shot. If a lighter asks "can I batch-render 200 variants overnight without setting up 200 separate Houdini sessions?" — that's your problem.

The job is inherently about automation, reliability, and domain-specific constraints. Houdini has its own Python API. Asset resolution is fragile. Render farm integration varies per studio. DCC (Digital Content Creation) tools have quirks that no LLM was trained to deeply know.

This context matters for evaluating agentic coding. When you're building a general CRUD app, the AI has seen millions of examples. When you're writing a Houdini node traversal routine with PDG hooks, the training data thins out fast.

## The Tool: Enso Executer

[Enso Executer](https://github.com/liang256/enso-executer) is a Houdini batch processing tool I built to solve a recurring problem: artists needed to run a defined sequence of Houdini operations — node cook, file export, render — across a set of hip files, without manual intervention for each one.

The architecture I settled on:
- A Python + Flask backend
- Domain-Driven Design (DDD) for the core processing logic
- Docker for portable deployment
- Houdini's `hython` interpreter for headless execution

DDD in a Houdini context sounds like overkill. It isn't. The domain is genuinely complex: you have Jobs (what to execute), Executors (how to run them), and Assets (what to operate on). Keeping those concerns separated means the tool doesn't collapse when the studio changes render engines or asset naming conventions.

## Where I Brought In Claude Code

I didn't use an AI agent to scaffold the whole thing from scratch. That would have been a mistake — too much domain-specific setup that requires manual verification at every step.

What I did instead: I used Claude Code as a **tactical pair programmer** at specific bottlenecks.

**Bottleneck 1: The executor abstraction.** I knew I needed a clean interface between "what gets executed" and "how it gets executed." I described the problem in natural language, pasted the relevant domain entities, and asked for a first-pass class hierarchy. Claude gave me four options. Two were wrong for my constraints (they assumed a job queue I wasn't building), one was close, one was right. I took the right one and tuned it. That exchange saved me maybe two hours of whiteboarding.

**Bottleneck 2: hython subprocess wrangling.** Getting `hython` to behave correctly inside Docker — environment paths, license resolution, stdout capture — is tedious and not well-documented. I had a half-working script and asked Claude to debug it. It caught a PATH ordering issue and a missing `HOUDINI_PATH` env var that I'd been staring past for forty minutes. That's a tool doing what tools should do.

**Bottleneck 3: Test fixtures.** Writing fixture factories for DDD entities is boring and error-prone. I described the entity structure once and asked Claude to generate the fixture module. It did, correctly, on the first try. I added three edge-case fixtures by hand. Net time: fifteen minutes instead of an hour.

## What the Agent Got Wrong (and Why It Matters)

Here's the part most agentic coding posts skip.

The agent hallucinated a `hou.Node.cook()` signature. This function exists in Houdini's Python API, but Claude's version had incorrect keyword arguments — likely interpolating from its training data on older API versions or similar DCC tools. The code looked plausible. It would fail silently in some conditions and loudly in others. If I hadn't known the correct signature from memory, I would have shipped a bug.

The takeaway isn't "AI is bad." The takeaway is: **the value of domain expertise doesn't disappear with agentic coding. It shifts.** In the old workflow, expertise went into writing the code. In the agentic workflow, expertise goes into *verifying* the code. You still need a person who knows what correct looks like.

This maps directly to what I wrote in [Not Speed, but Continuity](/posts/not-speed-but-continuity): the bottleneck isn't generation. It's judgment. Agentic coding doesn't remove the need for a technical director. It compresses the time between problem and draft, and pushes judgment to the front.

## The Real Workflow Shift

After building with this tooling for a few months, here's how I'd describe the change:

**Before:** I'd start with a blank file, figure out structure, write boilerplate, then get to the interesting problem. Maybe 60% of time was on setup and maintenance code.

**After:** I describe the interesting problem immediately. The agent handles boilerplate and first drafts. I spend more time in review, verification, and architecture — the parts that actually require domain knowledge.

This is not "AI writes my code." This is a different task distribution. The pipeline TD's job becomes more about system thinking and correctness verification, less about syntax and scaffolding. That's a good trade — provided you can actually judge correctness.

## What This Means for Pipeline TDs Specifically

If you work in a VFX or games pipeline and haven't started using these tools, start now — but start deliberately.

Three practical suggestions:

1. **Use the agent for the boring parts first.** Fixture generation, config parsers, repetitive schema definitions. Get a feel for where it's reliable before trusting it on domain-sensitive logic.

2. **Write your domain context into every prompt.** Don't say "write a job runner." Say "write a job runner that uses hython, handles HOUDINI_PATH env vars, and runs inside Docker with network-mode host because of license server access." Specificity is how you get useful output from a model that wasn't trained on your exact stack.

3. **Treat the agent's output as a first draft from a junior who can code but doesn't know Houdini.** Review it with that frame. You'll catch the API hallucinations faster.

## A Note on Where This Goes

The tools are improving fast. Claude Code's context window is large enough to hold a modest Python codebase. As tool-use and codebase indexing improve, the "junior who doesn't know Houdini" problem will shrink.

But the fundamental dynamic won't flip. Creative pipeline tools live at a domain-specific layer that is, almost by definition, underrepresented in training data. The advantage of a Pipeline TD who can code, verify, and make architectural decisions in this space isn't going away. It's getting more concentrated.

The new risk isn't that AI takes the job. The new risk is that TDs who don't adapt to the agentic workflow fall behind TDs who do — not because AI is doing the work, but because the agentic ones ship faster and spend more time on the parts that matter.

That's the real story from inside a Houdini pipeline.

---

*Enso Executer is open source. If you're working on similar pipeline tooling problems and want to compare notes, find me on [GitHub](https://github.com/liang256).*
