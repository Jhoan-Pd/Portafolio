'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const nav = usePortfolioSection('nav');
  const label = nav?.languageLabel ?? (language === 'es' ? 'Cambiar idioma' : 'Switch language');
  const names = nav?.languageNames ?? { es: 'ES', en: 'EN' };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex h-10 items-center gap-1 radius-sm border theme-card px-1 t-caption font-semibold uppercase tracking-[0.06em] elev-1 transition hover:brightness-95 duration-150"
      aria-label={label}
      title={label}
    >
      <span
        className={`radius-sm px-2.5 py-1.5 transition-colors duration-150 ${
          language === 'es'
            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
            : 'text-secondary'
        }`}
      >
        {names.es}
      </span>
      <span
        className={`radius-sm px-2.5 py-1.5 transition-colors duration-150 ${
          language === 'en'
            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
            : 'text-secondary'
        }`}
      >
        {names.en}
      </span>
    </button>
  );
}
