import Link from "next/link";

type Props = {
  href: string;
  year: string;
  title: string;
  category?: string;
  meta?: string;
  hoverLabel: string;
  cursor: string;
  external?: boolean;
};

export function IndexRow({ href, year, title, category, meta, hoverLabel, cursor, external }: Props) {
  const className =
    "group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-t border-line py-5 last:border-b md:grid-cols-[4rem_1fr_10rem_5rem] md:py-6";
  const body = (
    <>
      <span className="label">{year}</span>
      {/* Mobile: full title wraps (no hover). Desktop: one truncated line that flips to hoverLabel. */}
      <span className="relative block min-w-0 text-xl font-medium leading-[1.15] tracking-[-0.03em] md:h-[1.15em] md:overflow-hidden md:text-[1.75rem]">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] md:truncate md:group-hover:-translate-y-full">
          {title}
        </span>
        <span className="absolute left-0 top-full hidden w-full truncate transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] md:block md:group-hover:-translate-y-full">
          {hoverLabel}
        </span>
      </span>
      <span className="label hidden md:block">{category ?? ""}</span>
      <span className="label text-right">{meta ?? ""}</span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" data-cursor={cursor} className={className}>
      {body}
    </a>
  ) : (
    <Link href={href} data-cursor={cursor} className={className}>
      {body}
    </Link>
  );
}
