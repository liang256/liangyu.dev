"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function NavBar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/posts" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="my-12 flex justify-center">
      <nav className="glass rounded-full px-6 py-4 backdrop-blur-md">
        <ul className="flex items-center space-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href === "/posts" && pathname.startsWith("/posts"));
            
            return (
              <li key={item.name} className="relative">
                <Link 
                  href={item.href}
                  className={`
                    relative px-4 py-2 rounded-full font-medium transition-all duration-300
                    ${isActive 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "var(--accent-gradient)",
                      }}
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
