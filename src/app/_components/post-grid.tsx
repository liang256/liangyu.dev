import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Image from "next/image";
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

export function PostGridItem({
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
        <div className="card fade-in group-hover:scale-[1.02] transition-transform duration-300 h-full">
          {/* Compact Cover Image */}
          <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg">
            <Image
              src={coverImage}
              alt={`Cover Image for ${title}`}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              quality={85}
            />
          </div>
          
          <div className="space-y-3 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold leading-tight text-white group-hover:text-gradient transition-all duration-300 line-clamp-2">
                {title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-0.5" />
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <DateFormatter dateString={date} />
              <span className="w-1 h-1 rounded-full bg-gray-500"></span>
              <span className="tertiary-text">{author.name}</span>
            </div>
            
            <p className="secondary-text text-sm leading-relaxed line-clamp-2">
              {excerpt}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}