'use client';

import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/language';

type AppProvidersProps = {
  children: React.ReactNode;
  initialLanguage: Language;
};

export default function AppProviders({ children, initialLanguage }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
