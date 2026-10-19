export type Work = {
  slug: string;
  title: string;
  subtitle: string;
  seoTitle?: string;
  excerpt: string;
  coverImage: string;
  date: string;
  year: string;
  category?: string;
  role: string;
  platform: string;
  stack: string[];
  liveUrl?: string;
  liveLabel?: string;
  cta?: string;
  content: string;
  readingTime: number;
};
