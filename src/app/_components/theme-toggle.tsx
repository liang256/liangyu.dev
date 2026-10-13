'use client';

import { useTheme } from '@/app/contexts/theme-context';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} aria-label="Toggle theme" className="opacity-60 transition-opacity hover:opacity-100">
      {theme === 'dark' ? 'light' : 'dark'}
    </button>
  );
}
