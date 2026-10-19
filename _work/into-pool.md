---
title: "into pool"
seoTitle: "into pool: An AI Art Series Where Taste Mattered More Than the Newest Model"
subtitle: "An AI art series of liminal swimming pools — and why the older model made the better pictures."
excerpt: "Case study: into pool, a poolcore / liminal-space image series made with AI. The newest model rendered the prompts perfectly and missed the feeling; the older one got it. How I defined the look, sifted through the results, and built a process that turns a mood into a consistent series."
coverImage: "/assets/work/into-pool/cover.jpg"
date: "2026-10-19T08:00:00.000Z"
year: "2024"
category: "ai imagery"
role: "Solo — concept, art direction, image generation, curation"
platform: "Instagram (@intopool)"
stack: ["DALL·E 2", "DALL·E 3", "GPT-3.5", "Python"]
liveUrl: "https://www.instagram.com/intopool/"
liveLabel: "view portfolio ↗"
cta: "Looking for AI visuals with a clear look — a series, a campaign, a world? Let’s talk it through."
---

> pools are attractive to me, though I can't swim. their calm surfaces and silent depths invite curiosity, drawing me in.
> — [@intopool](https://www.instagram.com/intopool/)

into pool is an AI art series of empty indoor swimming pools: white tiles, still water, fluorescent light, a single plastic chair, stairs that go nowhere. It belongs to the *poolcore* and *liminal space* genre, where the whole point is a feeling: quiet, nostalgic, a little wrong, like a place you visited once as a child and could never find again.

Anyone can type "abandoned swimming pool" into an image generator. Getting a whole series that holds that feeling, image after image, takes something else. This case study is about that something else.

![A selection from into pool. None of these are photographs.](/assets/work/into-pool/cover.jpg)

## The newest model got it wrong

I started with DALL·E 3, the most capable image model available to me in 2024. It follows long descriptions closely and produces clean, well-lit, beautifully composed pictures.

For this series, that was the problem. Ask DALL·E 3 for an abandoned pool and it delivers exactly that: rubble, peeling paint, dramatic beams of light. Each image looks like a film set. Every surface is crisp and every detail makes sense, so nothing feels like a memory.

The look I was after runs on the opposite qualities:

- **Wrongness you can't name.** Tiles that don't quite line up, a ladder leading into a wall, a doorway at the wrong height. Unease, with nothing frightening in the frame.
- **Low fidelity as memory.** Film grain, washed-out colour, soft focus. It should look like a photo someone took twenty years ago, not a render.
- **Amateur framing.** Slightly crooked, oddly centred, as if nobody was really trying.
- **Calm, not horror.** Once it turns creepy, it stops being nostalgic.

DALL·E 2, the older and supposedly weaker model, does all of this by default. Its distortions, its slightly melted geometry and its grainy texture, everything that made it look outdated, are exactly what this look needs. My notes from the time: *"dalle3: not core style. dalle2: much more core. random and wild. hard to control. simple prompt works good."*

I wrote about this comparison back then in [DALL·E 2 Is Better Than DALL·E 3 In This Scenario](/posts/dalle2-is-better-than-dalle3-in-this-scenario). Same prompt, two models, and the "worse" one made the better picture.

**The newest tool is the best on average, but a creative brief is never average.** Knowing which tool fits the look is part of the craft.

## Defining the look before making it

No software can tell you whether a pool feels right. So before generating at scale, I wrote down what "right" meant:

- **Research.** Existing poolcore and liminal-space work, photos of real municipal pools, and the words the community uses to describe the feeling (`#dreamcore`, `#liminalspace`, `#anemoia`, `#backrooms`…).
- **A visual vocabulary.** A short list of objects (white tiles, a plastic chair, dark holes in the wall, a lone rubber duck, a red water slide) and a list of moods (silent, echo, VHS glitch, fuzzy memories, good old days). Every image in the series is built from these, which is what makes them feel like one world instead of a pile of random pictures.
- **Clear reject rules.** Too clean, too dramatic, too scary, too obviously AI. Most images fail on one of these, and knowing which one tells you what to change next.

This is the same work an art director does for a campaign. With AI it matters more, because the tool will happily produce a thousand images that miss the brief.

## Combining two models to get both control and feeling

The answer wasn't simply "use the old model". DALL·E 2 is hard to steer: ask for a red water slide in a tiled hall and you get something vaguely red, somewhere. DALL·E 3 is the opposite: precise about layout, wrong about mood.

So I used each for what it does best:

1. **DALL·E 3 builds the scene.** Where the pool sits, where the slide curves, where the light falls.
2. **DALL·E 2 redraws it with feeling.** The DALL·E 3 image is fed back into DALL·E 2, which reinterprets it in its own looser, grainier, slightly wrong way.

![Left: the DALL·E 3 image. Middle and right: DALL·E 2 reinterpretations. The composition survives; the gloss doesn't.](/assets/work/into-pool/slide-dalle3-to-dalle2.jpg)

![The same treatment on a ruined pool. DALL·E 3 over-explains the decay; DALL·E 2 turns it back into a memory.](/assets/work/into-pool/ruin-dalle3-to-dalle2.jpg)

By any technical measure, the left image wins: sharper, more coherent, more detailed. The images on the right are the ones that belong in the series.

## Making it efficient

Taste decides *what* to keep. Process decides how quickly you get there. Only a small share of the generated images ever make it into the series. That's normal for creative work, so the aim was to make every round of exploring fast and cheap:

- **Reusable prompt sets.** Named recipes ("dream", "dark", "circle", even one written entirely in Chinese) that can be mixed and varied instead of rewritten each time. A good direction becomes something I can return to, not a lucky accident.
- **An idea generator.** An AI writing assistant turns the visual vocabulary into new scene descriptions, suggesting combinations I wouldn't have thought of. I keep the ones that fit and drop the rest.
- **Keeping the AI from "improving" things.** Newer models quietly rewrite prompts to add detail. For a look built on emptiness, that's the wrong instinct, so the process tells the model to leave short prompts alone.
- **Everything recorded.** Every image is saved with the exact prompt and model that made it, so when a client says "more like that one", I can make more like that one.

I wrote this as a small set of scripts rather than clicking through a web interface, which is what keeps a large volume of generations manageable for one person. The same setup scales to the volumes a campaign or content calendar needs.

## Why this matters if you're commissioning visuals

AI has made images cheap. It hasn't made *good* images cheap, and it hasn't made a consistent look easy. What you're really paying for is the judgement: knowing what the work should feel like, spotting it when it appears, and getting there without burning weeks on trial and error.

My background is in animation and visual effects: I've made a short film and built production tools for Maya and Houdini. Composition, light, texture and mood are things I look at deliberately. The technical side is what lets me explore quickly. The artistic side is what decides which results are worth keeping.

## What I can make for you

- **A series with one recognisable look:** social content, an Instagram concept, a set of key visuals that clearly belong together
- **Mood boards and concept exploration:** for games, animation, film, music releases or interiors, covering many directions quickly, then going deep on the right one
- **Campaign and brand visuals:** AI imagery that follows your art direction instead of looking like generic AI
- **A repeatable process for your team:** the vocabulary, prompt recipes and review rules behind a look, so it can be produced again without me
- **Choosing the right tools:** sometimes the newest model, sometimes an older one, sometimes two together, chosen for how the result looks rather than for the model's release date

If you have a feeling in mind and haven't been able to get AI to produce it yet, I'd love to hear about it.
