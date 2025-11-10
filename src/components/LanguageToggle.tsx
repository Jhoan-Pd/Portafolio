'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage, content } = useLanguage();
  const { languageLabel, languageNames } = content.nav;

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex h-10 items-center gap-1 rounded-2xl border border-black/10 bg-white/80 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-neutral-900/70 dark:hover:bg-neutral-800/80"
      aria-label={languageLabel}
      title={languageLabel}
    >
      <span
        className={`rounded-xl px-2 py-1 transition-colors ${
          language === 'es'
            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
            : 'text-neutral-600 dark:text-neutral-300'
        }`}
      >
        {languageNames.es}
      </span>
      <span
        className={`rounded-xl px-2 py-1 transition-colors ${
          language === 'en'
            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
            : 'text-neutral-600 dark:text-neutral-300'
        }`}
      >
        {languageNames.en}
      </span>
    </button>
  );
}
