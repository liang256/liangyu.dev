import type { Metadata } from "next";
import Container from "@/app/_components/container";
import { IndexRow } from "@/app/_components/index-row";
import { RevealText } from "@/app/_components/motion/reveal-text";
import { projectsData } from "@/app/data/project-data";
import { getDictionary } from "@/dictionaries";
import { SITE_URL } from "@/lib/constants";
import { alternatesFor, localePath, type Locale } from "@/lib/i18n";

type Props = { params: { locale: Locale } };

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const { title, description } = getDictionary(locale).work;
  return {
    title,
    description,
    alternates: alternatesFor(SITE_URL, locale, "/work"),
    openGraph: { title: `${title} | Liangyu Chen`, description },
    twitter: { card: "summary_large_image", title: `${title} | Liangyu Chen`, description },
  };
}

export default function WorkPage({ params: { locale } }: Props) {
  const t = getDictionary(locale);
  const projects = projectsData
    .filter((p) => p.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <Container className="pt-28">
      <span className="label">( {t.work.label} )&nbsp;&nbsp;({projects.length})</span>
      <RevealText as="h1" className="display mb-16 mt-6 text-[clamp(3.5rem,11vw,11rem)]">{t.work.heading}</RevealText>
      <div>
        {projects.map((p) => {
          const external = /^https?:\/\//.test(p.link);
          return (
            <IndexRow
              key={p.slug}
              href={localePath(locale, p.link)}
              year={p.date.slice(0, 4)}
              title={p.title}
              category={p.category && (t.work.categories[p.category] ?? p.category)}
              meta={external ? "↗" : "→"}
              hoverLabel={external ? t.common.openArrow : t.common.readCaseStudy}
              cursor={external ? "open" : "read"}
              external={external}
            />
          );
        })}
      </div>
    </Container>
  );
}
