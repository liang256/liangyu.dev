import Container from "@/app/_components/container";
import Link from "next/link";
import { ExternalLink, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800">
      <Container>
        <div className="py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <Link href="/" className="inline-block">
                  <h2 className="text-4xl font-bold text-gradient">
                    Liang
                  </h2>
                </Link>
                <p className="text-gray-400 max-w-md leading-relaxed">
                  Software engineer, writer, and creator based in Montreal. 
                  Passionate about building beautiful, functional solutions that make a difference.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                  <span>using Next.js & TypeScript</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-white mb-4">Connect</h3>
                  <div className="space-y-3">
                    {[
                      { name: "X (Twitter)", href: "https://x.com/LiangyuDev" },
                      { name: "LinkedIn", href: "https://www.linkedin.com/in/liang256/" },
                      { name: "GitHub", href: "https://github.com/liang256" },
                    ].map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </a>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-4">Explore</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Projects", href: "/projects" },
                      { name: "Blog", href: "/posts" },
                      { name: "About", href: "/about" },
                    ].map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="block text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} Liangyu Chen. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <Link 
                    href="/feed.xml" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    RSS Feed
                  </Link>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-500">
                    Montreal, Canada
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
