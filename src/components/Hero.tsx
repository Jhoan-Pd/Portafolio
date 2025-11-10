'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';

type HeroData = {
  backgroundImage: string;
  quote: string;
  highlight?: string;
  intro: string;
  cvLink: string;
  cvLabel?: string;
  author: { firstName: string; lastName: string; photo: string; badge: string };
  icons: { language: string; menu: string };
};

type Lang = 'es' | 'en';

/* ---------- Popover IDIOMA (ES/EN) ---------- */
function LangMenu({ icon }: { icon: string }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('es');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('lang')) as Lang | null;
    const initial = stored || (document.documentElement.lang as Lang) || 'es';
    setLang(initial);
    if (document.documentElement.lang !== initial) document.documentElement.lang = initial;
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);

  const applyLang = (value: Lang) => {
    setLang(value);
    localStorage.setItem('lang', value);
    document.documentElement.lang = value;
    window.dispatchEvent(new CustomEvent('app:lang', { detail: { lang: value } }));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Idioma"
        className="
          inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full
          bg-white/90 text-neutral-900 ring-1 ring-black/10 shadow
          hover:bg-white dark:bg-neutral-800/80 dark:text-white dark:ring-white/10 dark:hover:bg-neutral-800
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          transition
        "
      >
        <span className="text-xs font-bold">{(document?.documentElement?.lang || 'es').toUpperCase()}</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Seleccionar idioma"
          className="
            absolute right-0 top-[calc(100%+8px)] z-50 w-36 overflow-hidden
            rounded-xl border border-black/10 bg-white text-neutral-900 shadow-xl
            dark:border-white/10 dark:bg-neutral-900 dark:text-white
          "
        >
          <button
            role="menuitem"
            onClick={() => applyLang('es')}
            className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            🇪🇸 Español
          </button>
          <button
            role="menuitem"
            onClick={() => applyLang('en')}
            className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            🇬🇧 English
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Popover TEMA (Light/Dark/System) ---------- */
function ThemeMenu() {
  const { setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);

  const Icon = () => {
    if (!mounted) return <div className="h-4 w-4 rounded-full bg-current/50 animate-pulse" />;
    return resolvedTheme === 'dark' ? (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
    ) : (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9.83-18.16l-1.79-1.79-1.8 1.79 1.8 1.79 1.79-1.79zM20 13h3v-2h-3v2zM6.76 19.16l-1.8 1.79 1.42 1.42 1.79-1.79-1.41-1.42zM17.24 19.16l1.41 1.42 1.79-1.79-1.41-1.42-1.79 1.79zM12 6a6 6 0 100 12A6 6 0 0012 6z"/></svg>
    );
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Tema"
        className="
          inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full
          bg-white/90 text-neutral-900 ring-1 ring-black/10 shadow
          hover:bg-white dark:bg-neutral-800/80 dark:text-white dark:ring-white/10 dark:hover:bg-neutral-800
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          transition
        "
      >
        <Icon />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Seleccionar tema"
          className="
            absolute right-0 top-[calc(100%+8px)] z-50 w-40 overflow-hidden
            rounded-xl border border-black/10 bg-white text-neutral-900 shadow-xl
            dark:border-white/10 dark:bg-neutral-900 dark:text-white
          "
        >
          <button
            role="menuitem"
            onClick={() => { setTheme('light'); setOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            ☀️ Claro
          </button>
          <button
            role="menuitem"
            onClick={() => { setTheme('dark'); setOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            🌙 Oscuro
          </button>
          <button
            role="menuitem"
            onClick={() => { setTheme('system'); setOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            💻 Sistema
          </button>
        </div>
      )}
    </div>
  );
}

/* =================== HERO =================== */
export default function Hero() {
  const [hero, setHero] = useState<HeroData | null>(null);

  useEffect(() => {
    fetch('/data/data.json')
      .then((r) => r.json())
      .then((d) => setHero(d.hero as HeroData))
      .catch((e) => console.error('Error cargando Hero data:', e));
  }, []);

  if (!hero) {
    return (
      <section className="h-[60svh] min-h-[420px] grid place-items-center text-neutral-400">
        Cargando información…
      </section>
    );
  }

  const rounded = 140;

  const renderHighlighted = (text: string, hl?: string) => {
    if (!hl) return text;
    const i = text.indexOf(hl);
    if (i === -1) return text;
    return (
      <>
        {text.slice(0, i)}
        <span className="font-semibold text-[#E9EEF3]">{hl}</span>
        {text.slice(i + hl.length)}
      </>
    );
  };

  return (
    <section className="relative w-full bg-[var(--page-bg)] text-[var(--page-fg)] transition-colors duration-300">
      {/* NAVBAR */}
      <nav
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-5xl px-4 sm:px-6 pointer-events-none"
        aria-label="Barra de acciones"
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Pastilla izquierda (autor) */}
          <div
            className="
              pointer-events-auto flex items-center gap-3 sm:gap-4 rounded-2xl
              px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg backdrop-blur-sm
              bg-white text-neutral-900 border border-black/10
              dark:bg-neutral-900 dark:text-white dark:border-white/10
              transition-colors
            "
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-slate-200 ring-2 ring-black/10 dark:ring-white/10 shrink-0">
              <Image
                src={hero.author.photo}
                alt={hero.author.firstName}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] sm:text-sm font-semibold uppercase tracking-[0.08em]">
                {hero.author.firstName}
              </div>
              <div className="text-[10px] sm:text-xs opacity-90 uppercase tracking-[0.12em]">
                {hero.author.lastName}
              </div>
            </div>
          </div>

          {/* Pastilla derecha: SOLO Idioma + Tema */}
          <div
            className="
              pointer-events-auto flex items-center gap-2 sm:gap-2.5 rounded-2xl
              px-2.5 sm:px-3 py-2 shadow-lg backdrop-blur-sm
              bg-white text-neutral-900 border border-black/10
              dark:bg-neutral-900 dark:text-white dark:border-white/10
              transition-colors
            "
          >
            <LangMenu icon={hero.icons.language} />
            <ThemeMenu />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div
        className="relative overflow-hidden"
        style={{
          height: '68svh',
          minHeight: 520,
          borderBottomLeftRadius: rounded,
          borderBottomRightRadius: rounded,
        }}
      >
        <Image
          src={hero.backgroundImage}
          alt="Fondo principal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45 dark:bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/10 dark:from-black/25 dark:via-black/15 dark:to-black/5" />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6">
          <h1
            className="
              max-w-5xl text-center italic font-light text-white
              text-[26px] sm:text-[34px] md:text-[46px] lg:text-[56px]
              leading-[1.15] tracking-tight drop-shadow-[0_1px_20px_rgba(0,0,0,.55)]
            "
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            {renderHighlighted(hero.quote, hero.highlight)}
          </h1>
        </div>
      </div>

      {/* Card intro */}
      <div className="relative z-20 -mt-14 sm:-mt-20">
        <div
          className="
            mx-auto w-[min(94%,960px)] rounded-3xl
            bg-white text-neutral-900 border border-black/10
            dark:bg-neutral-900 dark:text-white dark:border-white/10
            px-5 py-7 sm:px-10 sm:py-10
            shadow-[0_12px_40px_rgba(0,0,0,.18)]
            transition-colors
          "
        >
          <p className="text-center text-[14px] sm:text-[16px] leading-relaxed sm:leading-8 tracking-[0.14em] sm:tracking-[0.18em] uppercase">
            {hero.intro}
          </p>

          <div className="mt-6 sm:mt-7 flex justify-center">
            <Link
              href={hero.cvLink}
              target="_blank"
              className="
                inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5
                text-white text-sm font-semibold tracking-wide
                shadow hover:brightness-110 active:translate-y-[1px]
                bg-[rgb(229,127,121)]
              "
            >
              <span className="text-base leading-none">↓</span>
              {hero.cvLabel ?? 'CV'}
            </Link>
          </div>
        </div>
      </div>

      {/* Badge */}
      <div className="pointer-events-none absolute right-4 sm:right-6 bottom-4 sm:bottom-6 z-20">
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full shadow-lg backdrop-blur
                        bg-white text-neutral-900 ring-1 ring-black/10
                        dark:bg-neutral-900 dark:text-white dark:ring-white/10
                        transition-colors">
          {hero.author.badge}
        </div>
      </div>
    </section>
  );
}
