import { ReactNode } from "react";
import { RevealText } from "./motion/reveal-text";

export function PostTitle({ children }: { children?: ReactNode }) {
  return (
    <RevealText as="h1" className="display my-6 text-[clamp(2.75rem,7vw,6.5rem)]">
      {children}
    </RevealText>
  );
}
