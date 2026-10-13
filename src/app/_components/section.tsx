import type { ReactNode } from "react";

type Props = {
  label: string;
  count?: number;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Section({ label, count, aside, className = "", children }: Props) {
  return (
    <section className={`border-t border-line py-16 md:py-24 ${className}`}>
      <div className="mb-8 flex items-baseline justify-between gap-4 md:mb-12">
        <span className="label">
          ( {label} ){count !== undefined && <>&nbsp;&nbsp;({count})</>}
        </span>
        {aside && <span className="label">{aside}</span>}
      </div>
      {children}
    </section>
  );
}
