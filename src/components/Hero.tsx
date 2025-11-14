'use client';

import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { usePortfolioSection, type HeroCopy } from '@/hooks/usePortfolioSection';
import { useLanguage } from '@/contexts/LanguageContext';

const HERO_BOTTOM_RADIUS = 140;

function renderHighlighted(text: string, highlight?: string) {
  if (!highlight?.trim() || !text.includes(highlight)) return text;

  const parts = text.split(highlight);

  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 && (
        <span className="font-semibold text-slate-100">
          {highlight}
        </span>
      )}
    </span>
  ));
}

export default function Hero() {
  const hero = usePortfolioSection('hero') as HeroCopy | null;
  const { language } = useLanguage();

  if (!hero) {
    return (
      <section className="h-[60svh] min-h-[420px] grid place-items-center text-neutral-400">
        {language === 'es' ? 'Cargando información…' : 'Loading information…'}
      </section>
    );
  }

  return (
    <section className="relative w-full theme-page transition-colors duration-300">
      {/* NAV FIJA */}
      <nav
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-5xl px-4 sm:px-6 pointer-events-none"
        aria-label="Barra de acciones del héroe"
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="pointer-events-auto flex items-center gap-3 sm:gap-4 rounded-2xl border theme-card px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg backdrop-blur-sm transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-slate-200 ring-2 ring-black/10 dark:ring-white/10 shrink-0">
              <Image
                src={hero.author.photo}
                alt={`Foto de ${hero.author.firstName} ${hero.author.lastName}`}
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

          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 rounded-2xl border theme-card px-2.5 sm:px-3 py-2 shadow-lg backdrop-blur-sm transition-colors">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* HERO VISUAL */}
      <div
        className="relative overflow-hidden"
        style={{
          height: '68svh',
          minHeight: 520,
          borderBottomLeftRadius: HERO_BOTTOM_RADIUS,
          borderBottomRightRadius: HERO_BOTTOM_RADIUS,
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

      {/* CARD INFERIOR */}
      <div className="relative z-20 -mt-14 sm:-mt-20">
        <div
          className="
            mx-auto w-[min(94%,960px)] rounded-3xl
            border theme-card
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
              rel="noreferrer noopener"
              className="
                inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5
                text-white text-sm font-semibold tracking-wide
                shadow hover:brightness-110 active:translate-y-[1px]
                bg-[rgb(229,127,121)]
              "
              aria-label={
                hero.cvLabel
                  ? `${hero.cvLabel} (se abre en una pestaña nueva)`
                  : language === 'es'
                    ? 'Ver o descargar CV (se abre en una pestaña nueva)'
                    : 'View or download CV (opens in a new tab)'
              }
            >
              <span className="text-base leading-none">↓</span>
              {hero.cvLabel ?? 'CV'}
            </Link>
          </div>
        </div>
      </div>

      {/* BADGE FLOTANTE */}
      <div className="pointer-events-none absolute right-4 sm:right-6 bottom-4 sm:bottom-6 z-20">
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full shadow-lg backdrop-blur ring-1 ring-black/10 dark:ring-white/10 theme-card transition-colors">
          {hero.author.badge}
        </div>
      </div>
    </section>
  );
}
