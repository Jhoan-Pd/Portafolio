'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      className="rounded-md border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
      aria-label="Cambiar tema"
    >
      {current === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
