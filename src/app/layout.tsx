// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portafolio Jhoan Paredes",
  description: "Portafolio profesional",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setInitialTheme = `
  (function() {
    try {
      var saved = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var useDark = saved ? saved === 'dark' : prefersDark;
      document.documentElement.classList.toggle('dark', useDark);
    } catch (_) {}
  })();`;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body className="bg-[#F4F1EB] text-neutral-900 dark:bg-neutral-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
