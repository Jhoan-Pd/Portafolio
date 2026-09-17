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

/* Cresta del Galeras calcada sobre cielo.jpg (1280 × 721).
   El SVG usa ese mismo viewBox con preserveAspectRatio="xMidYMid slice",
   que recorta igual que object-cover + object-center: la línea sigue
   pegada a la montaña en cualquier ancho de pantalla. */
const GALERAS_RIDGE =
  'M0,471 C8,470.5 33,468.3 50,468 C67,467.7 83,469.0 100,469 C117,469.0 133,468.3 150,468 ' +
  'C167,467.7 183,467.7 200,467 C217,466.3 233,465.0 250,464 C267,463.0 283,462.2 300,461 ' +
  'C317,459.8 333,458.5 350,457 C367,455.5 385,453.8 400,452 C415,450.2 427,449.0 440,446 ' +
  'C453,443.0 469,436.7 480,434 C491,431.3 497,431.2 505,430 C513,428.8 522,428.0 530,427 ' +
  'C538,426.0 547,424.3 555,424 C563,423.7 572,424.7 580,425 C588,425.3 597,426.3 605,426 ' +
  'C613,425.7 622,423.7 630,423 C638,422.3 647,422.3 655,422 C663,421.7 672,421.3 680,421 ' +
  'C688,420.7 697,420.3 705,420 C713,419.7 722,419.5 730,419 C738,418.5 747,417.8 755,417 ' +
  'C763,416.2 772,414.7 780,414 C788,413.3 797,413.0 805,413 C813,413.0 822,413.0 830,414 ' +
  'C838,415.0 847,416.5 855,419 C863,421.5 872,425.5 880,429 C888,432.5 897,436.5 905,440 ' +
  'C913,443.5 921,446.5 930,450 C939,453.5 950,457.3 960,461 C970,464.7 980,468.8 990,472 ' +
  'C1000,475.2 1009,477.3 1020,480 C1031,482.7 1045,485.3 1057,488 C1069,490.7 1080,493.3 1090,496 ' +
  'C1100,498.7 1111,501.7 1120,504 C1129,506.3 1141,509.0 1145,510';

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
        {/* La foto entra oscura y ampliada, y sube a luz plena mientras se asienta */}
        <motion.div
          className="absolute inset-0"
          initial={{
            scale: prefersReduced ? 1 : 1.09,
            filter: prefersReduced
              ? 'brightness(1) saturate(1.08) contrast(1.04)'
              : 'brightness(0.5) saturate(0.65) contrast(1.04)',
          }}
          animate={{ scale: 1, filter: 'brightness(1) saturate(1.08) contrast(1.04)' }}
          transition={{
            duration: prefersReduced ? 0 : 1.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="absolute inset-0 hero-drift">
            <Image
              src={hero.backgroundImage}
              alt={
                language === 'es'
                  ? 'Amanecer sobre Pasto, con el Volcán Galeras al fondo'
                  : 'Sunrise over Pasto, with the Galeras Volcano in the background'
              }
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>

        {/* La bruma sobre la ciudad — suave: el cielo real ya es pálido */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReduced ? 0 : 1.4,
            delay: prefersReduced ? 0 : 0.9,
          }}
        >
          <div
            className="hero-haze absolute bottom-0 h-[34%]"
            style={{
              left: '-25%',
              right: '-25%',
              background:
                'linear-gradient(to top, rgba(244,225,205,0.20), rgba(244,225,205,0.05) 55%, transparent)',
            }}
          />
        </motion.div>

        {/* Velos: apenas lo necesario para que la nav se lea y la foto entregue a la página */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--page-bg)]" />

        {/* La cresta del Galeras: va ENCIMA de la bruma y de los velos, si no se pierde.
            Repite las mismas animaciones de escala que la foto — el amanecer y la deriva
            ambiental — para que la línea nunca se despegue de la montaña. */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ scale: prefersReduced ? 1 : 1.09 }}
          animate={{ scale: 1 }}
          transition={{ duration: prefersReduced ? 0 : 1.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-drift absolute inset-0">
            <svg
              className="h-full w-full"
              viewBox="0 0 1280 721"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <motion.path
                d={GALERAS_RIDGE}
                fill="none"
                stroke="#FFE1B4"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter:
                    'drop-shadow(0 0 5px rgba(255,170,90,0.95)) drop-shadow(0 0 14px rgba(255,140,60,0.55))',
                }}
                initial={{
                  pathLength: prefersReduced ? 1 : 0,
                  opacity: prefersReduced ? 0.6 : 1,
                }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{
                  pathLength: {
                    duration: prefersReduced ? 0 : 1.8,
                    delay: prefersReduced ? 0 : 0.45,
                    ease: [0.33, 0.9, 0.3, 1],
                  },
                  opacity: {
                    duration: prefersReduced ? 0 : 1.4,
                    delay: prefersReduced ? 0 : 2.25,
                  },
                }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Etiqueta del lugar: la foto pasa de fondo bonito a dato */}
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
