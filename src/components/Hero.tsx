'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { usePortfolioSection, type HeroCopy } from '@/hooks/usePortfolioSection';
import { useLanguage } from '@/contexts/LanguageContext';

const HERO_BOTTOM_RADIUS = 40;

/* Escena pintada del amanecer sobre Pasto (viewBox 1200 × 560).
   Tres planos de cordillera + la cresta del Galeras que se dibuja sola. */
const RIDGE_FAR =
  'M0,356 C40,348 76,330 116,318 C152,306 188,316 222,330 ' +
  'C260,345 300,360 340,372 C400,390 460,400 520,404 ' +
  'C600,410 680,404 740,392 C800,380 850,360 900,340 ' +
  'C940,324 980,306 1024,296 C1060,288 1100,292 1140,302 ' +
  'C1164,308 1182,314 1200,320 L1200,560 L0,560 Z';

const GALERAS_CREST =
  'M0,402 C42,398 78,390 112,378 C146,366 172,358 200,364 ' +
  'C224,369 244,372 268,366 C300,358 330,350 358,344 ' +
  'C392,336 414,326 438,310 C468,290 492,268 516,246 ' +
  'C538,226 556,212 576,206 C584,203 590,208 596,213 ' +
  'C599,212 604,213 612,208 C620,203 634,206 646,214 ' +
  'C664,226 678,242 694,258 C712,276 728,290 746,300 ' +
  'C764,310 778,306 792,298 C804,291 816,292 828,300 ' +
  'C846,312 866,322 888,328 C912,335 938,334 962,330 ' +
  'C990,325 1016,328 1042,336 C1074,346 1112,352 1148,356 ' +
  'C1168,358 1184,360 1200,364';

const RIDGE_NEAR =
  'M0,470 C80,462 150,452 230,456 C300,459 360,470 430,474 ' +
  'C520,479 610,470 700,462 C790,454 880,458 960,466 ' +
  'C1050,475 1130,480 1200,476 L1200,560 L0,560 Z';

export default function Hero() {
  const hero = usePortfolioSection('hero') as HeroCopy | null;
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();

  /* Nav que colapsa: con histéresis para que no parpadee en el umbral */
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    setCompact((prev) => (prev ? y > 56 : y > 88));
  });

  const navSpring = prefersReduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 400, damping: 40 };

  /* Revelado con desenfoque — sin movimiento cuando el sistema lo pide */
  const reveal = (delay: number) => ({
    initial: {
      opacity: 0,
      y: prefersReduced ? 0 : 10,
      filter: prefersReduced ? 'blur(0px)' : 'blur(6px)',
    },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: {
      duration: prefersReduced ? 0 : 0.5,
      delay: prefersReduced ? 0 : delay,
      ease: 'easeOut' as const,
    },
  });

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

  const placeLabel =
    language === 'es'
      ? 'Pasto, Nariño · Volcán Galeras'
      : 'Pasto, Nariño · Galeras Volcano';

  return (
    <section className="relative w-full theme-page transition-colors duration-300">
      {/* NAV FIJA */}
      <nav
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-5xl px-4 sm:px-6 pointer-events-none"
        aria-label="Barra de acciones del héroe"
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Píldora que se compacta al bajar. Cada propiedad animada lleva su
              valor en `initial` para que el primer render ya tenga medidas. */}
          <motion.div
            className="pointer-events-auto flex items-center radius-md border theme-material elev-2 transition-colors"
            initial={{
              paddingLeft: 16,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              gap: 14,
            }}
            animate={{
              paddingLeft: compact ? 10 : 16,
              paddingRight: compact ? 14 : 20,
              paddingTop: compact ? 8 : 10,
              paddingBottom: compact ? 8 : 10,
              gap: compact ? 10 : 14,
            }}
            transition={navSpring}
          >
            <motion.div
              className="rounded-full overflow-hidden bg-slate-200 ring-2 ring-black/10 dark:ring-white/10 shrink-0"
              initial={{ width: 42, height: 42 }}
              animate={{ width: compact ? 30 : 42, height: compact ? 30 : 42 }}
              transition={navSpring}
            >
              <Image
                src={hero.author.photo}
                alt={`Foto de ${hero.author.firstName} ${hero.author.lastName}`}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <div className="leading-tight">
              <div className="t-footnote font-semibold whitespace-nowrap">
                {hero.author.firstName}
              </div>
              {/* El apellido se pliega igual que el título grande de iOS.
                  Altura fija (no 'auto') para no depender de una medición. */}
              <motion.div
                className="t-caption text-secondary whitespace-nowrap overflow-hidden"
                initial={{ height: 16, opacity: 1 }}
                animate={{ height: compact ? 0 : 16, opacity: compact ? 0 : 1 }}
                transition={navSpring}
              >
                {hero.author.lastName}
              </motion.div>
            </div>
          </motion.div>

          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 radius-md border theme-material px-2.5 sm:px-3 py-2 elev-2 transition-colors">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* HERO VISUAL — amanece sobre Pasto */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 'clamp(430px, 64svh, 580px)',
          borderBottomLeftRadius: HERO_BOTTOM_RADIUS,
          borderBottomRightRadius: HERO_BOTTOM_RADIUS,
        }}
      >
        {/* El cielo amanece y queda respirando */}
        <div className="hero-sky absolute inset-0" />

        {/* El sol asoma detrás de la cumbre */}
        <div className="hero-sun" />

        {/* La cordillera: lejana difusa, el Galeras, y las lomas del frente */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1200 560"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="hero-ridge-far" d={RIDGE_FAR} />
          <path className="hero-ridge-mid" d={GALERAS_CREST + ' L1200,560 L0,560 Z'} />
          <path className="hero-ridge-line" pathLength={1} d={GALERAS_CREST} />
          <path className="hero-ridge-near" d={RIDGE_NEAR} />
          <g className="hero-mast">
            <path d="M742,462 L742,96" />
            <path d="M730,150 L754,150 M732,212 L752,212 M734,284 L750,284 M736,356 L748,356" />
            <path className="hero-mast-guy" d="M742,152 L698,462 M742,152 L786,462" />
          </g>
        </svg>

        {/* La bruma sobre la ciudad */}
        <div className="hero-haze pointer-events-none" />

        {/* Etiqueta del lugar: la escena pasa de fondo bonito a dato */}
        <motion.div
          className="absolute left-1/2 top-24 sm:top-28 flex items-center gap-2.5 rounded-full border border-white/20 px-4 py-2.5 backdrop-blur-xl"
          style={{ background: 'rgba(20, 14, 30, 0.42)', color: '#FFF3E4', x: '-50%' }}
          initial={{
            opacity: 0,
            y: prefersReduced ? 0 : -8,
            filter: prefersReduced ? 'blur(0px)' : 'blur(6px)',
          }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: prefersReduced ? 0 : 0.7,
            delay: prefersReduced ? 0 : 1.2,
            ease: 'easeOut',
          }}
        >
          <span
            className="hero-pulse h-[7px] w-[7px] shrink-0 rounded-full"
            style={{ background: '#FFC178' }}
            aria-hidden="true"
          />
          <span className="t-footnote font-semibold whitespace-nowrap">{placeLabel}</span>
          <span className="t-caption hidden border-l border-white/25 pl-2.5 opacity-80 sm:inline whitespace-nowrap">
            1°12′N 77°16′O · 2 527 m
          </span>
        </motion.div>
      </div>

      {/* CARD INFERIOR — de vidrio, para que la ciudad se transparente por detrás */}
      <div className="relative z-20 -mt-14 sm:-mt-20">
        <div
          className="
            mx-auto w-[min(92%,760px)] radius-xl
            border theme-material
            px-6 py-8 sm:px-9 sm:py-9
            elev-3
            transition-colors
          "
        >
          {/* Etiqueta de ubicación y disponibilidad */}
          <motion.p
            {...reveal(1.32)}
            className="t-footnote text-center font-semibold mb-4 text-accent"
          >
            {hero.locationTag ?? (language === 'es'
              ? 'Pasto, Colombia · Disponible para proyectos'
              : 'Pasto, Colombia · Available for projects')}
          </motion.p>

          {/* Texto descriptivo — normal, sin uppercase, sin tracking extremo */}
          <motion.p
            {...reveal(1.42)}
            className="t-body text-center mx-auto max-w-[62ch]"
          >
            {hero.intro}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...reveal(1.54)}
            className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3"
          >
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
          </motion.div>

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
