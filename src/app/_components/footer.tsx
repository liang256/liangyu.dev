import type { Dictionary } from "@/dictionaries";
import Container from "./container";
import { Marquee } from "./motion/marquee";

type Props = { footer: Dictionary["footer"] };

export function Footer({ footer }: Props) {
  const social = [
    { name: footer.email, href: "mailto:liangyu.chen.dev@gmail.com" },
    { name: "github", href: "https://github.com/liang256" },
    { name: "linkedin", href: "https://www.linkedin.com/in/liang256/" },
    { name: "x", href: "https://x.com/LiangyuDev" },
  ];

  return (
    <footer className="mt-24 border-t border-line">
      <Marquee text={footer.marquee} className="display py-6 text-[clamp(3.5rem,10vw,9rem)]" />
      <Container className="flex flex-col gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
        <span className="label">{footer.name}</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {social.map((s) => (
            <li key={s.href}>
              {s.href.startsWith("mailto:") ? (
                <a href={s.href} className="opacity-60 hover:opacity-100">{s.name}</a>
              ) : (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100">{s.name} ↗</a>
              )}
            </li>
          ))}
        </ul>
        <span className="label">© {new Date().getFullYear()}</span>
      </Container>
    </footer>
  );
}

export default Footer;
