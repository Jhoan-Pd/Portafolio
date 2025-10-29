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
      // Aplica tema antes de hidratar y expone window.__setTheme
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  try {
    var mql = window.matchMedia('(prefers-color-scheme: dark)');

    function apply(pref) {
      var mode = pref;
      if (!pref || pref === 'system') {
        mode = mql.matches ? 'dark' : 'light';
      }
      document.documentElement.classList.toggle('dark', mode === 'dark');
      // Notificar a React (useTheme) que el tema cambió
      window.dispatchEvent(new CustomEvent('themechange', { detail: mode }));
    }

    window.__setTheme = function(next) {
      if (next === 'system') {
        localStorage.removeItem('theme');
      } else {
        localStorage.setItem('theme', next);
      }
      apply(next);
    };

    var stored = localStorage.getItem('theme'); // 'light' | 'dark' | null
    apply(stored || 'system');

    if (!stored) {
      var handler = function(){ apply('system'); };
      if (mql.addEventListener) mql.addEventListener('change', handler);
      else mql.addListener(handler);
    }
  } catch (_) {}
})();`.trim(),
      }}
    />
    <noscript>
      <style>{`
        @media (prefers-color-scheme: dark) {
          html { color-scheme: dark; }
          body { background:#0a0a0a; color:#fff; }
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
