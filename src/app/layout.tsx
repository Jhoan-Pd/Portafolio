// src/app/layout.tsx
import './styles/globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: 'Portafolio',
  description: 'Mi portafolio con Next.js y Tailwind',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"      // <-- pone 'dark' en <html> cuando toca
          defaultTheme="system"  // <-- System por defecto
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
