'use client';

import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { usePortfolioSection, type HeroCopy } from '@/hooks/usePortfolioSection';
import { useLanguage } from '@/contexts/LanguageContext';

const HERO_BOTTOM_RADIUS = 40;

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

  const scrollToProjects = (e: { preventDefault(): void }) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full theme-page transition-colors duration-300">
      {/* NAV FIJA */}
      <nav
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-5xl px-4 sm:px-6 pointer-events-none"
        aria-label="Barra de acciones del héroe"
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="pointer-events-auto flex items-center gap-3 sm:gap-4 radius-md border theme-material px-4 sm:px-5 py-2.5 sm:py-3 elev-2 transition-colors">
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
              <div className="t-footnote font-semibold">
                {hero.author.firstName}
              </div>
              <div className="t-caption text-secondary">
                {hero.author.lastName}
              </div>
            </div>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 radius-md border theme-material px-2.5 sm:px-3 py-2 elev-2 transition-colors">
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
        {/* Overlay base */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/30" />
        {/* Gradiente que integra la imagen con la card inferior */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[var(--page-bg)]" />
      </div>

      {/* CARD INFERIOR */}
      <div className="relative z-20 -mt-14 sm:-mt-20">
        <div
          className="
            mx-auto w-[min(94%,960px)] radius-xl
            border theme-card
            px-6 py-8 sm:px-10 sm:py-11
            elev-3
            transition-colors
          "
        >
          {/* Etiqueta de ubicación y disponibilidad */}
          <p className="t-footnote text-center font-semibold mb-4 text-accent">
            {hero.locationTag ?? (language === 'es'
              ? 'Pasto, Colombia · Disponible para proyectos'
              : 'Pasto, Colombia · Available for projects')}
          </p>

          {/* Texto descriptivo — normal, sin uppercase, sin tracking extremo */}
          <p className="t-body text-center mx-auto max-w-[62ch]">
            {hero.intro}
          </p>

          {/* CTAs */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={hero.cvLink}
              target="_blank"
              rel="noreferrer noopener"
              className="
                inline-flex items-center gap-2 rounded-full px-6 sm:px-7 py-3
                text-white t-callout font-semibold
                elev-1 hover:brightness-110 active:scale-[0.97]
                bg-accent transition-[filter,transform] duration-150
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

            <a
              href="#projects"
              onClick={scrollToProjects}
              className="
                inline-flex items-center gap-2 rounded-full px-6 sm:px-7 py-3
                t-callout font-semibold border border-accent text-accent
                hover:bg-accent hover:text-white
                active:scale-[0.97] transition-[colors,transform] duration-150
              "
            >
              {hero.viewWorkLabel ?? (language === 'es' ? 'Ver proyectos →' : 'View work →')}
            </a>
          </div>

          {/* Indicador de scroll */}
          <div className="mt-6 flex justify-center opacity-50" aria-hidden="true">
            <span className="t-caption text-tertiary animate-bounce select-none">↓ scroll</span>
          </div>
        </div>
      </div>

      {/* BADGE FLOTANTE */}
      <div className="pointer-events-none absolute right-4 sm:right-6 bottom-4 sm:bottom-6 z-20">
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full elev-2 ring-1 ring-black/10 dark:ring-white/10 theme-material t-footnote font-semibold transition-colors">
          {hero.author.badge}
        </div>
      </div>
    </section>
  );
}
