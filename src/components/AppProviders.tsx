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
    </ThemeProvider>
  );
}
