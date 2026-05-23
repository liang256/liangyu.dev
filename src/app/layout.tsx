import Footer from "@/app/_components/footer";
import { HOME_OG_IMAGE_URL, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/app/_components/nav-bar";
import Container from "@/app/_components/container";
import { ThemeProvider } from "@/app/contexts/theme-context";
import "./globals.css";
import '@/app/prism-themes/prism-xonokai.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Liangyu Chen",
    template: "%s | Liangyu Chen",
  },
  description:
    "Personal website of Liangyu Chen: software engineer, writer, and creator based in Montreal. Focuses on Python, JavaScript, Go, visual art, and more.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Liangyu Chen",
    images: [HOME_OG_IMAGE_URL],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liangyu Chen",
    description:
      "Personal website of Liangyu Chen: software engineer, writer, and creator based in Montreal.",
    images: [HOME_OG_IMAGE_URL],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      url: SITE_URL,
      name: "Liangyu Chen",
    },
    {
      "@type": "Person",
      name: "Liangyu Chen",
      url: SITE_URL,
      jobTitle: "Software Engineer",
      sameAs: [] as string[],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-3438250780938861" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3438250780938861"
          crossOrigin="anonymous"
        />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <NavBar />
          <Container>
            <div className="min-h-screen">{children}</div>
          </Container>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
