'use client';

import { ThemeProvider } from 'next-themes';
import { LanguageProvider, type Language } from '@/contexts/LanguageContext';

type AppProvidersProps = {
  children: React.ReactNode;
  initialLanguage: Language;
};

export default function AppProviders({ children, initialLanguage }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
