import React from 'react';
import { Card } from '../_components/card';
import Link from "next/link";
import { Article } from './article';
import { Eye } from "lucide-react";
import { getGitHubProjects } from "@/lib/github";

export default async function Projects() {
  const projects = await getGitHubProjects();
  
  // Find featured projects with fallbacks
  const featured = projects.find((project) => project.slug === "prompt-swim") 
    || projects.find((project) => project.type === "hero")
    || projects[0];
  
  const top2 = projects.find((project) => project.slug === "tetris")
    || projects.find((project) => project.type === "secondary")
    || projects[1];
    
  const top3 = projects.find((project) => project.slug === "go-tinyraytracer") 
    || projects.filter((p) => p.type === "secondary")[1]
    || projects[2];
  
  // Get remaining projects
  const sorted = projects
    .filter((p) => p.published)
    .filter((p) => p.id !== featured?.id && p.id !== top2?.id && p.id !== top3?.id)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  // Handle loading state or no projects
  if (!projects.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No projects available at the moment.</p>
        <Link 
          href="https://github.com/liang256" 
          className="text-blue-400 hover:text-blue-300 underline mt-2 inline-block"
        >
          Visit GitHub Profile
        </Link>
      </div>
    );
  }

  return (
    <div>
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          {featured && (
            <Card>
              <Link href={featured.link}>
                <article className="relative w-full h-full p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-zinc-100">
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
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        featured.views ?? 0,
                      )}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300"
                  dangerouslySetInnerHTML={{ __html: featured.description.replace(/\n/g, "<br/>") }}>
                    {}
                  </p>
                </article>
              </Link>
            </Card>
          )}

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].filter(Boolean).map((project) => (
              <Card key={project.slug}>
                <Article project={project}/>
              </Card>
            ))}
          </div>
        </div>
        
        {sorted.length > 0 && (
          <>
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
          </>
        )}
    </div>
  );
}