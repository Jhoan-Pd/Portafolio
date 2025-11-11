import type { Language } from '@/contexts/LanguageContext';

export interface LanguagePreferenceStrategy {
  getPreferredLanguages(active: Language): Language[];
}

export class DefaultLanguagePreferenceStrategy implements LanguagePreferenceStrategy {
  getPreferredLanguages(active: Language): Language[] {
    return active === 'es' ? ['es', 'en'] : ['en', 'es'];
  }
}

export const defaultLanguagePreferenceStrategy = new DefaultLanguagePreferenceStrategy();
