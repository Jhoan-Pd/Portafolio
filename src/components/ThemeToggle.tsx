'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const nav = usePortfolioSection('nav');
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const themeLabel = nav?.themeLabel ?? (language === 'es' ? 'Cambiar tema' : 'Toggle theme');

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex h-10 w-10 items-center justify-center radius-sm border theme-card elev-1 transition hover:brightness-95 active:scale-[0.94] duration-150"
      aria-label={themeLabel}
      title={themeLabel}
    >
      <Sun className={`h-5 w-5 transition-opacity ${isDark ? 'opacity-0' : 'opacity-100'}`} />
      <Moon className={`absolute h-5 w-5 transition-opacity ${isDark ? 'opacity-100' : 'opacity-0'}`} />
    </button>
  );
}
