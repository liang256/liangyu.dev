import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import Image from "next/image";
import DateFormatter from "./date-formatter";
import { ArrowUpRight, Clock } from "lucide-react";

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
        <div className="card group-hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
          {/* Large Square Cover Image */}
          <div className="aspect-square overflow-hidden rounded-lg mb-6">
            <Image
              src={coverImage}
              alt={`Cover Image for ${title}`}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              quality={90}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-bold leading-tight group-hover:text-gradient transition-all duration-300 flex-1">
                {title}
              </h3>
              <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-0.5" />
            </div>
            
            <p className="secondary-text leading-relaxed line-clamp-3 flex-1">
              {excerpt}
            </p>
            
            {/* Meta information at bottom */}
            <div className="pt-4 border-t border-gray-800 mt-auto">
              <div className="flex items-center justify-between">
                <Avatar name={author.name} picture={author.picture} />
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <DateFormatter dateString={date} />
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>3 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
