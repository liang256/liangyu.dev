import Link from "next/link";
import type { ReactNode } from "react";

type Props = { href: string; external?: boolean; children: ReactNode };

const cls =
  "inline-flex items-center rounded-full border border-fg px-5 py-2.5 text-sm lowercase transition-colors duration-200 hover:bg-fg hover:text-bg";

export function PillButton({ href, external, children }: Props) {
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
