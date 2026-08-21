---
title: "Controlling Seedance 2.5: One Source, One Dimension"
excerpt: "How to control Seedance 2.5 references across motion, rendering, backgrounds, and multimodal inputs—while avoiding conflicts between competing sources."
coverImage: "/assets/blog/controlling-seedance-2-5-one-source-one-dimension/cover.png"
date: "2026-08-20T18:00:00.000Z"
author:
  name: Liang
  picture: "/assets/blog/authors/cat_coffee.png"
ogImage:
  url: "/assets/blog/controlling-seedance-2-5-one-source-one-dimension/cover.png"
---

Seedance 2.5 supports targeting specific dimensions when using references. For example, you can ask it to **reference only the motion, not the rendering**.

Those dimensions might include:

- Motion
- Rendering
- Background
- Other visual or temporal properties

This creates a useful way to think about control: not only in terms of which references we provide, but also which part of the result each reference is responsible for.

## The Multi-Source Model

Seedance 2.5 supports several types of input:

- Text
- Images
- Video
- Audio

Each source can affect one or more dimensions of the output. We can control motion using text, images, and video, for example. But once several sources influence the same dimension, the final motion becomes the result of text, images, and video interacting with one another.

This can sometimes produce unexpectedly good results, but it also makes the outcome less controllable.

For higher control, reduce the number of sources affecting the same dimension. Ideally, one source should contribute to one dimension.

If video is responsible for motion, let it primarily control motion instead of also asking text and image references to strongly define the same motion.

## Why Rough Layouts Probably Do Not Work Well

To be clear, I am not saying that rough layouts cannot work. I am saying that the probability of getting a good result is lower.

The model can reference motion, and motion is essentially a sequence of poses—or, more generally, shapes. Those shapes inherently include position.

So if the task is to **reference the position but not the pose**, the instruction is inherently confusing. The model has to reference one property while selectively excluding another property that is tightly connected to it. As a result, it can easily reuse a non-final pose from the input.

You might ask: what if I provide an additional pose reference? Would that help?

Maybe. But then the more useful question is: why not provide an image where both the position and the pose are correct from the beginning?

## Recommendations

### 1. Only Provide Correct Information

If something is not right, do not give it to the model.

**Do not:** Ask for a meal containing A, B, and C, then ask the model to remove C.

**Do:** Ask for A and B.

Providing incorrect information and then asking the model to ignore part of it creates unnecessary ambiguity. If a piece of information should not contribute to the result, it is better not to provide it at all.

### 2. Let One Channel Control One Dimension

If you use both storyboards or keyframes and text to control the shots, do not expect the model to follow the storyboard exactly. The text is also contributing to the same dimension.

For higher control, make each channel responsible for a specific dimension instead of allowing multiple channels to compete over the same thing.

### 3. Test Both Specific and High-Level Prompts

Try both ends of the spectrum at the same time:

- **Specific:** Explicitly describe the desired motion, timing, poses, and other details.
- **High-level intention:** Describe what the shot should achieve and give the model more room to solve it.

More detailed prompting does not always produce more control or a better result.

## A Practical Principle

The more sources that compete to define the same dimension, the harder the result is to predict. The cleaner the division of responsibility between sources, the easier it becomes to understand what each input is doing.

For controllable generation, a useful default is simple:

**Provide only correct information, and let one source control one dimension whenever possible.**
