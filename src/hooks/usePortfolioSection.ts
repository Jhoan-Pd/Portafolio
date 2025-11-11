'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioContentRepository } from '@/lib/portfolioContent';
import type { SectionCopy, SectionKey } from '@/types/portfolio';

export function usePortfolioSection<K extends SectionKey>(section: K): SectionCopy<K> | null {
  const { language } = useLanguage();
  const [localized, setLocalized] = useState<SectionCopy<K> | null>(() =>
    portfolioContentRepository.getLocalizedSection(section, language),
  );

  useEffect(() => {
    setLocalized(portfolioContentRepository.getLocalizedSection(section, language));

    let active = true;

    portfolioContentRepository
      .fetchSection(section)
      .then(() => {
        if (!active) return;
        setLocalized(portfolioContentRepository.getLocalizedSection(section, language));
      })
      .catch(() => {
        if (active) {
          setLocalized(null);
        }
      });

    return () => {
      active = false;
    };
  }, [language, section]);

  return localized;
}

export function __clearPortfolioDataCache() {
  portfolioContentRepository.clear();
}
