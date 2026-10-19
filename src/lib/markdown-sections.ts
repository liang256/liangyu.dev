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

/** Splits a section body on `### ` headings; returns [] when it has none, so callers can fall back to prose. */
export function splitSubsections(body: string): MarkdownSection[] {
  const items: MarkdownSection[] = [];
  let current: { heading: string; lines: string[] } | null = null;

  for (const line of body.split("\n")) {
    const match = /^### (.+)$/.exec(line);
    if (match) {
      if (current) items.push(finish(current));
      current = { heading: match[1].trim(), lines: [] };
    } else {
      current?.lines.push(line);
    }
  }
  if (current) items.push(finish(current));
  return items;
}

function finish(s: { heading: string; lines: string[] }): MarkdownSection {
  return { heading: s.heading, body: s.lines.join("\n").trim() };
}
