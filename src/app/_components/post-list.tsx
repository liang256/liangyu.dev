import { type Author } from "@/interfaces/author";
import Link from "next/link";
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

export function PostListItem({
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
        <div className="flex gap-6 p-6 rounded-xl border border-transparent hover:border-gray-700 hover:bg-gray-900/30 transition-all duration-300">
          {/* Small Cover Image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-24 rounded-lg overflow-hidden">
              <Image
                src={coverImage}
                alt={`Cover Image for ${title}`}
                width={128}
                height={96}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="128px"
                priority={false}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                quality={85}
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold leading-tight text-white group-hover:text-gradient transition-all duration-300">
                  {title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-0.5" />
              </div>
              
              <p className="secondary-text leading-relaxed line-clamp-2 pr-4">
                {excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Image
                    src={author.picture}
                    alt={author.name}
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="tertiary-text">{author.name}</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <DateFormatter dateString={date} />
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <div className="flex items-center gap-1 tertiary-text">
                  <Clock className="w-3 h-3" />
                  <span>3 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}