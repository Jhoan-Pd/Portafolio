'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/language';

export type HeroCopy = {
  backgroundImage: string;
  quote: string;
  highlight?: string;
  intro: string;
  cvLink: string;
  cvLabel?: string;
  author: { firstName: string; lastName: string; photo: string; badge: string };
};

export type InfoBlock = {
  id: number;
  type: string;
  title?: string;
  value?: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  span?: number;
};

export type InformationCopy = {
  title: string;
  blocks: InfoBlock[];
};

export type Project = {
  id: number;
  title: string;
  image: string;
  description?: string;
};

export type ProjectsCopy = {
  title: string;
  defaultDescription?: string;
  items: Project[];
};

export type LanguageItem = {
  name: string;
  icon: string;
};

export type LanguagesCopy = {
  title: string;
  items: LanguageItem[];
};

export type Testimonial = {
  imagen: string;
  nombre: string;
  profesion: string;
  mensaje: string;
};

export type TestimonialsCopy = {
  title: string;
  empty?: string;
  items: Testimonial[];
};

export type ContactFormCopy = {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  success: string;
  validationError: string;
};

export type ContactCopy = {
  titulo?: string;
  title?: string;
  descripcion?: string;
  description?: string;
  correo?: string;
  email?: string;
  redes?: { github?: string; linkedin?: string; email?: string };
  social?: { github?: string; linkedin?: string; email?: string };
  form?: ContactFormCopy;
};

export type NavCopy = {
  languageLabel: string;
  themeLabel: string;
  languageNames: Record<Language, string>;
};

export type PortfolioData = {
  nav: Record<Language, NavCopy>;
  hero: Record<Language, HeroCopy>;
  information: Record<Language, InformationCopy>;
  projects: Record<Language, ProjectsCopy>;
  languages: Record<Language, LanguagesCopy>;
  testimonials: Record<Language, TestimonialsCopy>;
  contact: Record<Language, ContactCopy>;
};

const DATA_URL = '/data/data.json';

let cache: PortfolioData | null = null;
let inflight: Promise<PortfolioData> | null = null;

async function loadData(): Promise<PortfolioData> {
  if (cache) {
    return cache;
  }

  if (!inflight) {
    inflight = fetch(DATA_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load portfolio data: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        cache = data as PortfolioData;
        return cache;
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Failed to load localized portfolio data', error);
        }
        throw error;
      })
      .finally(() => {
        inflight = null;
      });
  }

  return inflight;
}

export function usePortfolioSection<K extends keyof PortfolioData>(
  section: K,
): PortfolioData[K][Language] | null {
  const { language } = useLanguage();
  const [data, setData] = useState<PortfolioData[K] | null>(() => (cache ? cache[section] : null));

  useEffect(() => {
    let active = true;

    if (cache) {
      setData(cache[section]);
      return () => {
        active = false;
      };
    }

    loadData()
      .then((loaded) => {
        if (active) {
          setData(loaded[section]);
        }
      })
      .catch(() => {
        if (active) {
          setData(null);
        }
      });

    return () => {
      active = false;
    };
  }, [section]);

  const localized = data?.[language] ?? data?.es ?? null;

  return localized as PortfolioData[K][Language] | null;
}

export function __clearPortfolioDataCache() {
  cache = null;
  inflight = null;
}
