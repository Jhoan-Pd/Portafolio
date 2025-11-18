import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import AppProviders from '@/components/AppProviders';
import { isLanguage, type Language } from '@/lib/language';

export const metadata: Metadata = {
  title: 'Portafolio',
  description: 'Mi portafolio con Next.js y Tailwind',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const stored = cookieStore.get('portfolio-language');
  const initialLanguage: Language = stored && isLanguage(stored.value) ? stored.value : 'es';

  return (
    <html lang={initialLanguage} suppressHydrationWarning>
      <body>
        <AppProviders initialLanguage={initialLanguage}>
          <div className="min-h-screen theme-page transition-colors duration-300">
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
