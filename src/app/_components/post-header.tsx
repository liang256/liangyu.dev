import Link from "next/link";
import DateFormatter from "./date-formatter";
import { PostTitle } from "./post-title";
import { ParallaxImage } from "./motion/parallax-image";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage?: string;
  date: string;
  author: Author;
  category?: string;
  readingTime: number;
};

export function PostHeader({ title, coverImage, date, author, category, readingTime }: Props) {
  return (
    <header className="mb-12 md:mb-16">
      <p className="label">
        <Link href="/posts" className="hover:text-fg">← writing</Link>
        {category && <>&nbsp;&nbsp;/&nbsp;&nbsp;{category}</>}
      </p>
      <PostTitle>{title}</PostTitle>
      <div className="label flex flex-wrap gap-x-10 gap-y-1 border-t border-line pt-3">
        <DateFormatter dateString={date} />
        <span>{readingTime} min read</span>
        <span>{author.name}</span>
      </div>
      {coverImage && (
        <ParallaxImage src={coverImage} alt={`Cover image for ${title}`} priority className="mt-10 aspect-[1300/630]" />
      )}
    </header>
  );
}
