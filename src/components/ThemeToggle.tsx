'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const navigation = usePortfolioSection('nav');
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const themeLabel = navigation?.themeLabel ?? (language === 'es' ? 'Cambiar tema' : 'Toggle theme');

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white/80 text-neutral-900 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-neutral-900/70 dark:text-white dark:hover:bg-neutral-800/80"
      aria-label={themeLabel}
      title={themeLabel}
    >
      <Sun className={`h-5 w-5 transition-opacity ${isDark ? 'opacity-0' : 'opacity-100'}`} />
      <Moon className={`absolute h-5 w-5 transition-opacity ${isDark ? 'opacity-100' : 'opacity-0'}`} />
    </button>
  );
}
