import type { Language } from '@/contexts/LanguageContext';

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
  image: string;
  name: string;
  role: string;
  message: string;
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
  title?: string;
  description?: string;
  email?: string;
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

export type SectionKey = keyof PortfolioData;
export type SectionDictionary<K extends SectionKey> = PortfolioData[K];
export type SectionCopy<K extends SectionKey> = SectionDictionary<K>[Language];
