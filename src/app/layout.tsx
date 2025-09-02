import Footer from "@/app/_components/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/app/_components/nav-bar";
import Container from "@/app/_components/container";
import { ThemeProvider } from "@/app/contexts/theme-context";
import "./globals.css";
import '@/app/prism-themes/prism-xonokai.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liangyu Chen",
  description: "Personal website of Liangyu Chen: software engineer, writer, and creator based in Montreal. Focuse on python, javascript, go, visaul art and more.",
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

        <meta property="og:title" content="Liangyu | Developer" />
        <meta property="og:description" content="Welcome to Liangyu Chen's personal website, where you can explore his innovative projects, insightful blog posts, and professional journey in software development. Dive into a world of creativity and technical expertise." />
        <meta property="og:image" content="/og.png" />
        <meta property="og:url" content="https://liangyu.dev" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="Liangyu's website" />
        <meta name="twitter:title" content="Liangyu | Developer" />
        <meta name="twitter:description" content="Welcome to Liangyu Chen's personal website, where you can explore his innovative projects, insightful blog posts, and professional journey in software development. Dive into a world of creativity and technical expertise." />
        <meta name="twitter:image" content="og.png" />
        {/* Google AdSence */}
        <meta name="google-adsense-account" content="ca-pub-3438250780938861"></meta>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3438250780938861"
     crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <NavBar />
          <Container><div className="min-h-screen">{children}</div></Container>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
