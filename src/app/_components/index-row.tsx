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
      <span className="relative block h-[1.15em] overflow-hidden text-xl font-medium tracking-[-0.03em] md:text-[1.75rem]">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-full">
          {title}
        </span>
        <span className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-full">
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
