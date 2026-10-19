# About Me - Liang

I'm Liang, a developer who builds at the intersection of backend engineering, workflow automation, and creative technology. My background spans VFX pipeline tooling, AI-assisted production, and indie SaaS — work that tends to live where technical depth meets domain-specific constraints.

# What I Do

### Pipeline Tooling
Tools that make messy production workflows reliable and repeatable: batch processing, Houdini automation, headless rendering, and domain-driven Python that holds up in a real studio. Example: [Enso Executer](https://github.com/liang256/enso-executer).

### Backend Engineering
Maintainable backend systems with clean domain models and thoughtful APIs. I've integrated travel agency ticketing APIs, built ERP systems from scratch, and rebuilt legacy systems too fragile to extend.

### AI in Production
AI features and AI-assisted workflows that actually help, not just add noise, especially in niche domains like VFX where models know less. I [write about this](/posts) concretely, not promotionally.

### Creative Technology
I came from animation, including rigging on a Disney Jr. series. I think about the person using the tool, and I judge generative AI output as an image, not just an API response.

# Open Source

I contributed fixes to the [USD Survival Guide](https://github.com/LucaScheller/VFX-UsdSurvivalGuide), a well-known OpenUSD reference for VFX pipeline developers. [My merged pull request](https://github.com/LucaScheller/VFX-UsdSurvivalGuide/pull/19) corrected examples that didn't match how the USD API actually behaves, like this one:

```diff
- Sdf.AttributeSpec(prim_spec, UsdGeom.Tokens.purpose, ...)
+ Sdf.AttributeSpec(prim_spec, UsdGeom.Tokens.visibility, ...)
- UsdGeom.Primvar.IsPrimvar(primvar)  # Returns: False
+ UsdGeom.Primvar.IsPrimvar(primvar)  # Returns: True
```

# Inspirations from Animation

Pixar and Hayao Miyazaki shaped my sense of story and craft; Cat Soup, Over the Garden Wall and Smiling Friends remind me that interesting technical work is never purely technical.

# Connect

If you're building pipeline tools, adding AI or payments to a product, looking for AI visuals with a clear point of view, or thinking through a hard technical problem in creative tech — I'm interested. Email me at [liangyu.chen.dev@gmail.com](mailto:liangyu.chen.dev@gmail.com). You can find my code on [GitHub](https://github.com/liang256) and my writing on [the blog](/posts).
