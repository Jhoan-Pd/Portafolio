import type { Language } from '@/contexts/LanguageContext';
import {
  defaultLanguagePreferenceStrategy,
  type LanguagePreferenceStrategy,
} from '@/lib/languagePreference';
import type { PortfolioData, SectionCopy, SectionDictionary, SectionKey } from '@/types/portfolio';

const DATA_URL = '/data/data.json';

export class PortfolioContentRepository {
  private static instance: PortfolioContentRepository | null = null;

  static getInstance(): PortfolioContentRepository {
    if (!PortfolioContentRepository.instance) {
      PortfolioContentRepository.instance = new PortfolioContentRepository(
        DATA_URL,
        defaultLanguagePreferenceStrategy,
      );
    }
    return PortfolioContentRepository.instance;
  }

  private cache: PortfolioData | null = null;
  private inflight: Promise<PortfolioData> | null = null;

  private constructor(
    private readonly dataUrl: string,
    private preferenceStrategy: LanguagePreferenceStrategy,
  ) {}

  setPreferenceStrategy(strategy: LanguagePreferenceStrategy) {
    this.preferenceStrategy = strategy;
  }

  getCachedSection<K extends SectionKey>(section: K): SectionDictionary<K> | null {
    return this.cache ? this.cache[section] : null;
  }

  getLocalizedSection<K extends SectionKey>(section: K, language: Language): SectionCopy<K> | null {
    const sectionDictionary = this.getCachedSection(section);
    return sectionDictionary ? this.pickLocalized(sectionDictionary, language) : null;
  }

  async fetchLocalizedSection<K extends SectionKey>(section: K, language: Language): Promise<SectionCopy<K> | null> {
    const dictionary = await this.fetchSection(section);
    return this.pickLocalized(dictionary, language);
  }

  async fetchSection<K extends SectionKey>(section: K): Promise<SectionDictionary<K>> {
    const data = await this.loadData();
    return data[section];
  }

  clear() {
    this.cache = null;
    this.inflight = null;
  }

  private async loadData(): Promise<PortfolioData> {
    if (this.cache) {
      return this.cache;
    }

    if (!this.inflight) {
      this.inflight = fetch(this.dataUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load portfolio data: ${response.status}`);
          }
          return response.json() as Promise<PortfolioData>;
        })
        .then((data) => {
          this.cache = data;
          return data;
        })
        .catch((error) => {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Failed to load localized portfolio data', error);
          }
          throw error;
        })
        .finally(() => {
          this.inflight = null;
        });
    }

    return this.inflight;
  }

  private pickLocalized<K extends SectionKey>(
    dictionary: SectionDictionary<K>,
    language: Language,
  ): SectionCopy<K> | null {
    const candidates = this.preferenceStrategy.getPreferredLanguages(language);
    for (const candidate of candidates) {
      const localized = dictionary[candidate];
      if (localized) {
        return localized as SectionCopy<K>;
      }
    }

    const [first] = Object.values(dictionary) as SectionCopy<K>[];
    return first ?? null;
  }
}

export const portfolioContentRepository = PortfolioContentRepository.getInstance();
