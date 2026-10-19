const en = {
  site: {
    description:
      "Liangyu Chen builds pipeline tooling, AI-video workflows, and backend systems for creative production.",
    twitterDescription: "Personal website of Liangyu Chen: software engineer, writer, and creator.",
    jobTitle: "Software Engineer",
  },
  nav: {
    work: "work",
    writing: "writing",
    about: "about",
    contact: "contact",
    menu: "menu",
    close: "close",
    light: "light",
    dark: "dark",
    toggleTheme: "Toggle theme",
    language: "Language",
  },
  footer: {
    marquee: "pipeline tooling — USD — python — 3D — ai video — backend systems — creative tech",
    name: "liangyu chen",
    email: "email",
  },
  cursor: {
    read: "read",
    open: "open",
  },
  common: {
    min: "min",
    minRead: "min read",
    readArrow: "read →",
    openArrow: "open ↗",
    readCaseStudy: "read case study →",
    getInTouch: "get in touch",
    coverAlt: (title: string) => `Cover image for ${title}`,
  },
  home: {
    heroLabel: "( pipeline · ai video · backend )",
    heroLines: ["tools for the", "creative pipeline."],
    heroBlurb: "I build pipeline tools, AI-video workflows and backend systems for creative production.",
    availability: ["available remotely", "scroll ↓"],
    focusLabel: "focus",
    focusStatement: "Pipeline tooling, AI video, backend systems — and the people who use them.",
    focus: [
      { title: "pipeline tooling", blurb: "Houdini automation, headless rendering, batch systems." },
      { title: "ai video", blurb: "Seedance prompting, hybrid generation pipelines." },
      { title: "backend", blurb: "Domain models and APIs that stay maintainable." },
      { title: "creative tech", blurb: "Animation and rigging background; tools for artists." },
    ],
    writingLabel: "writing",
    allPosts: "all posts →",
    contactLabel: "contact",
    letsTalk: "let’s talk.",
  },
  posts: {
    title: "Blog",
    description:
      "Writing about pipeline tooling, AI video, backend systems, and the occasional practical rabbit hole.",
    label: "writing",
    heading: "writing.",
    latest: "latest",
    back: "← writing",
    more: "more writing",
  },
  about: {
    title: "About",
    description:
      "Software engineer focused on pipeline tooling, AI-video workflows, and backend systems for creative production.",
    label: "about",
    heading: "where technical depth meets creative production.",
    intro: "intro",
    shortFilm: "short film",
    selectedWork: "selected work",
    allWork: "all work →",
  },
  work: {
    title: "Work",
    description:
      "Selected open-source and personal projects across LINE apps, Python, Go, AI video, and creative tooling.",
    label: "work",
    heading: "work.",
    back: "← work",
    caseStudy: "case study",
    year: "year",
    role: "role",
    platform: "platform",
    stack: "stack",
    visitLive: "visit live ↗",
    workWithMe: "work with me",
    cta: "Planning a LINE bot or mini app? Let’s talk it through.",
    more: "more work",
    categories: {} as Record<string, string>,
  },
};

export default en;
export type Dictionary = typeof en;
