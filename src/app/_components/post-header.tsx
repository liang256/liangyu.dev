import Link from "next/link";
import DateFormatter from "./date-formatter";
import { PostTitle } from "./post-title";
import { ParallaxImage } from "./motion/parallax-image";
import { type Author } from "@/interfaces/author";
import { getDictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";

type Props = {
  title: string;
  coverImage?: string;
  date: string;
  author: Author;
  category?: string;
  readingTime: number;
  locale: Locale;
};

export function PostHeader({ title, coverImage, date, author, category, readingTime, locale }: Props) {
  const dict = getDictionary(locale);
  return (
    <header className="mb-12 md:mb-16">
      <p className="label">
        <Link href={localePath(locale, "/posts")} className="hover:text-fg">{dict.posts.back}</Link>
        {category && <>&nbsp;&nbsp;/&nbsp;&nbsp;{category}</>}
      </p>
      <PostTitle>{title}</PostTitle>
      <div className="label flex flex-wrap gap-x-10 gap-y-1 border-t border-line pt-3">
        <DateFormatter dateString={date} locale={locale} />
        <span>{readingTime} {dict.common.minRead}</span>
        <span>{author.name}</span>
      </div>
      {coverImage && (
        <ParallaxImage src={coverImage} alt={dict.common.coverAlt(title)} priority className="mt-10 aspect-[1300/630]" />
      )}
    </header>
  );
}
