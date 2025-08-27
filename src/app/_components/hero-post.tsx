import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
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

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section className="relative mb-20 md:mb-32">
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>
      
      <div className="relative">
        <div className="mb-8 md:mb-16 overflow-hidden rounded-2xl">
          <CoverImage title={title} src={coverImage} slug={slug} />
        </div>
        
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/20 rounded-full text-blue-400 font-medium">
                  Featured
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <DateFormatter dateString={date} />
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <div className="flex items-center gap-1 tertiary-text">
                  <Clock className="w-3 h-3" />
                  <span>5 min read</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <Link 
                  href={`/posts/${slug}`} 
                  className="group inline-flex items-start gap-3 text-gradient hover:filter hover:brightness-110 transition-all duration-300"
                >
                  <span className="flex-1">{title}</span>
                  <ArrowUpRight className="w-8 h-8 mt-2 text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0" />
                </Link>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                {excerpt}
              </p>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <div className="glass rounded-xl p-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-white">About the Author</h4>
                <Avatar name={author.name} picture={author.picture} />
                <div className="pt-4 border-t border-gray-700">
                  <Link 
                    href={`/posts/${slug}`} 
                    className="btn-primary w-full justify-center text-center"
                  >
                    Read Full Article
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
