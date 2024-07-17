import Link from "next/link";

export function NavBar() {
  return (
    <div className="my-10 flex justify-center space-x-4">
    <nav>
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/">
            <span>Projects</span>
          </Link>
        </li>
        <li>
          <Link href="/posts">
            <span>Blog</span>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <span>About</span>
          </Link>
        </li>
      </ul>
    </nav>
    </div>
  );
}
