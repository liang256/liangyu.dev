import Container from "@/app/_components/container";
import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="py-16 flex flex-col lg:flex-row items-center">
          <p className="text-4xl lg:text-[2rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <Link href="/">Liang</Link>
          </p>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href={`https://x.com/LiangyuDev`}
              className="mx-3 font-bold hover:underline"
            >
              X
            </a>
            <a
              href={`https://www.linkedin.com/in/liang256/`}
              className="mx-3 font-bold hover:underline"
            >
              Linkedin
            </a>
            <a
              href={`https://github.com/liang256`}
              className="mx-3 font-bold hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
