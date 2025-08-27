import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <article className="group">
      <Link href={`/posts/${slug}`} className="block">
        <div className="card fade-in group-hover:scale-[1.02] transition-transform duration-300">
          <div className="aspect-[16/9] mb-6 overflow-hidden rounded-lg">
            <CoverImage 
              slug={slug} 
              title={title} 
              src={coverImage}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold leading-tight text-white group-hover:text-gradient transition-all duration-300">
                {title}
              </h3>
              <ArrowUpRight 
                className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-1" 
              />
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <DateFormatter dateString={date} />
              <span className="w-1 h-1 rounded-full bg-gray-500"></span>
              <span className="tertiary-text">3 min read</span>
            </div>
            
            <p className="secondary-text leading-relaxed line-clamp-3">
              {excerpt}
            </p>
            
            <div className="pt-4 border-t border-gray-800">
              <Avatar name={author.name} picture={author.picture} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
