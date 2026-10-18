import Footer from "@/app/_components/footer";
import { HOME_OG_IMAGE_URL, SITE_URL } from "@/lib/constants";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { HTML_LANG, LOCALES, OG_LOCALE, alternatesFor, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { NavBar } from "@/app/_components/nav-bar";
import { ThemeProvider } from "@/app/contexts/theme-context";
import { SmoothScroll } from "@/app/_components/motion/smooth-scroll";
import { Cursor } from "@/app/_components/motion/cursor";
import "../globals.css";
import "@/app/prism-themes/prism-mono.css";

const sans = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-mono" });

type Props = { params: { locale: Locale } };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Liangyu Chen",
      template: "%s | Liangyu Chen",
    },
    description: dict.site.description,
    alternates: alternatesFor(SITE_URL, locale, "/"),
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName: "Liangyu Chen",
      locale: OG_LOCALE[locale],
      images: [HOME_OG_IMAGE_URL],
    },
    twitter: {
      card: "summary_large_image",
      title: "Liangyu Chen",
      description: dict.site.twitterDescription,
      images: [HOME_OG_IMAGE_URL],
    },
  };
}

function jsonLdFor(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        url: SITE_URL,
        name: "Liangyu Chen",
        inLanguage: Object.values(HTML_LANG),
      },
      {
        "@type": "Person",
        name: "Liangyu Chen",
        url: SITE_URL,
        jobTitle: getDictionary(locale).site.jobTitle,
        sameAs: [] as string[],
      },
    ],
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
}> & Props) {
  const dict = getDictionary(locale);
  return (
    <html lang={HTML_LANG[locale]} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFor(locale)) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll />
          <NavBar locale={locale} nav={dict.nav} />
          <main className="min-h-screen">{children}</main>
          <Footer footer={dict.footer} />
          <Cursor labels={dict.cursor} />
        </ThemeProvider>
      </body>
    </html>
  );
}
