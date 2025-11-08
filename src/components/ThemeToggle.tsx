'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const active = theme === 'system' ? resolvedTheme : theme;

  return (
    <div className="inline-flex rounded-md border overflow-hidden">
      <button
        onClick={() => setTheme('light')}
        className={`px-3 py-1 text-sm ${active === 'light' ? 'font-semibold' : ''}`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`px-3 py-1 text-sm ${active === 'dark' ? 'font-semibold' : ''}`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`px-3 py-1 text-sm ${theme === 'system' ? 'font-semibold' : ''}`}
      >
        Sistema
      </button>
    </div>
  );
}
