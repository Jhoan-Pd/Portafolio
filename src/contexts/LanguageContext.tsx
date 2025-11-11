'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import es from '@/locales/es.json';
import en from '@/locales/en.json';

export type Language = 'es' | 'en';

export function isLanguage(value: unknown): value is Language {
  return value === 'es' || value === 'en';
}

type Content = typeof es;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  content: Content;
};

type LanguageProviderProps = {
  children: React.ReactNode;
  initialLanguage: Language;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'portfolio-language';
const COOKIE_KEY = 'portfolio-language';

const dictionaries: Record<Language, Content> = {
  es,
  en,
};

function devWarn(message: string, error: unknown) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message, error);
  }
}

function readPersistedLanguage(): Language | null {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLanguage(stored)) {
        return stored;
      }
    } catch (error) {
      devWarn('Failed to read language from localStorage', error);
    }
  }

  if (typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp(`${COOKIE_KEY}=([^;]+)`));
    const value = match?.[1];
    if (isLanguage(value)) {
      return value;
    }
  }

  return null;
}

function persistLanguage(lang: Language) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.cookie = `${COOKIE_KEY}=${lang}; path=/; max-age=31536000`;
  }

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      devWarn('Failed to persist language preference', error);
    }
  }
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const languageRef = useRef(language);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    const stored = readPersistedLanguage();
    if (stored && stored !== languageRef.current) {
      setLanguageState(stored);
      return;
    }
    if (!stored && typeof navigator !== 'undefined') {
      const browser = navigator.language.slice(0, 2).toLowerCase();
      if (isLanguage(browser) && browser !== languageRef.current) {
        setLanguageState(browser);
        return;
      }
    }
    persistLanguage(languageRef.current);
  }, [languageRef, setLanguageState]);

  useEffect(() => {
    persistLanguage(language);
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState((current) => (current === next ? current : next));
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === 'es' ? 'en' : 'es'));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, toggleLanguage, content: dictionaries[language] }),
    [language, setLanguage, toggleLanguage],
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
