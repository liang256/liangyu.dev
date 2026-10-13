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
