import React from 'react';
import { Card } from '../_components/card';
import Link from "next/link";
import { Article } from './article';
import { Eye } from "lucide-react";
import { projectsData } from "@/app/data/project-data";

export default function Projects() {
  const featured = projectsData.find((project) => project.slug === "prompt-swim")!;
  const top2 = projectsData.find((project) => project.slug === "tetris")!;
  const top3 = projectsData.find((project) => project.slug === "go-tiny-raytracer")!;
  const sorted = projectsData
    .filter((p) => p.published)
    .filter((p) => p.slug !== featured.slug && p.slug !== top2.slug && p.slug !== top3.slug)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div>
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card>
            <Link href={featured.link}>
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs" style={{ color: 'var(--text-primary)' }}>
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      featured.views ?? 0,
                    )}
                  </span>
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold group-hover:opacity-80 sm:text-4xl font-display"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {featured.title}
                </h2>
                <p className="mt-4 leading-8 duration-150 group-hover:opacity-90"
                   style={{ color: 'var(--text-secondary)' }}
                dangerouslySetInnerHTML={{ __html: featured.description.replace(/\n/g, "<br/>") }}>
                  {}
                </p>
                {/* <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div> */}
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <Article project={project}/>
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden my-6 w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project}/>
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project}/>
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project}/>
                </Card>
              ))}
          </div>
        </div>
    </div>
  );
}