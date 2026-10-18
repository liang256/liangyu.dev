'use client';

import { useTheme } from '@/app/contexts/theme-context';

type Props = { labels: { light: string; dark: string; toggle: string } };

export default function ThemeToggle({ labels }: Props) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} aria-label={labels.toggle} className="opacity-60 transition-opacity hover:opacity-100">
      {theme === 'dark' ? labels.light : labels.dark}
    </button>
  );
}
