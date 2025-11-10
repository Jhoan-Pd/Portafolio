'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import es from '@/locales/es.json';
import en from '@/locales/en.json';

type Language = 'es' | 'en';

type Content = typeof es;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  content: Content;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'portfolio-language';
const dictionaries: Record<Language, Content> = {
  es,
  en,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && stored in dictionaries) {
      setLanguage(stored);
    }
  }, []);

  const applyLanguage = useCallback((next: Language) => {
    setLanguage(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    applyLanguage(language === 'es' ? 'en' : 'es');
  }, [applyLanguage, language]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage: applyLanguage, toggleLanguage, content: dictionaries[language] }),
    [applyLanguage, language, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
