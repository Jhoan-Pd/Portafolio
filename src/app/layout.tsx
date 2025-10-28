// src/app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portafolio Jhoan Paredes",
  description: "Portafolio profesional",
};


const ThemeScript = () => (
  <>
    <meta name="color-scheme" content="light dark" />
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  try {
    var stored = localStorage.getItem('theme'); // 'dark' | 'light' | null
    var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (sysDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');

    // Si NO hay preferencia guardada, seguimos el sistema en vivo
    if (!stored) {
      var mql = window.matchMedia('(prefers-color-scheme: dark)');
      var handler = function(e) {
        var next = e.matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', next === 'dark');
      };
      if (mql.addEventListener) mql.addEventListener('change', handler);
      else mql.addListener(handler);
    }
  } catch (_) {}
})();`.trim(),
      }}
    />
    {/* Fallback si JS está deshabilitado: sigue el sistema */}
    <noscript>
      <style>{`
        @media (prefers-color-scheme: dark) {
          html { color-scheme: dark; }
          html { background-color: #0a0a0a; }
          body { background-color: #0a0a0a; color: #fff; }
        }
      `}</style>
    </noscript>
  </>
);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-[#F4F1EB] text-neutral-900 dark:bg-neutral-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
