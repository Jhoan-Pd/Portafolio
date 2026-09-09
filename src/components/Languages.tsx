'use client';

import { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';
import { usePortfolioSection, type LanguageItem } from '@/hooks/usePortfolioSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Languages() {
  const languages = usePortfolioSection('languages');
  const { language } = useLanguage();
  const rawItems = languages?.items as LanguageItem[] | undefined;
  const items = useMemo(() => rawItems ?? [], [rawItems]);
  const controls = useAnimationControls();
  const mounted = useRef(false);

  const track = useMemo(() => [...items, ...items], [items]);

  const SPEED_S = 32;

  useEffect(() => {
    if (!items.length) return;
    if (mounted.current) controls.stop();

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      controls.set({ x: '0%' });
      controls.start({
        x: ['0%', '-50%'],
        transition: { duration: SPEED_S, ease: 'linear', repeat: Infinity },
      });
    }

    const onVis = () => {
      if (document.visibilityState === 'visible' && !prefersReduced) {
        controls.set({ x: '0%' });
        controls.start({
          x: ['0%', '-50%'],
          transition: { duration: SPEED_S, ease: 'linear', repeat: Infinity },
        });
      } else {
        controls.stop();
      }
    };
    const onResize = () => {
      controls.stop();
      if (!prefersReduced) {
        controls.set({ x: '0%' });
        controls.start({
          x: ['0%', '-50%'],
          transition: { duration: SPEED_S, ease: 'linear', repeat: Infinity },
        });
      }
    };

    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', onResize);
    mounted.current = true;

    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
      controls.stop();
    };
  }, [controls, items.length]);

  /* MEJORA 2: título unificado; MEJORA 6f: nuevo texto */
  const title = languages?.title ?? (language === 'es' ? 'Tecnologías' : 'Tech Stack');

  return (
    <section id="languages" className="space-y-6 py-10 theme-page transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
      </div>

      <div className="relative overflow-hidden">
        <motion.div className="flex gap-5 sm:gap-6 w-[200%] will-change-transform" animate={controls}>
          {track.map((lang, i) => (
            <Card key={`${lang.name}-${i}`} name={lang.name} icon={lang.icon} invertInDark={lang.invertInDark} />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[var(--page-bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[var(--page-bg)] to-transparent" />
      </div>
    </section>
  );
}

function Card({ name, icon, invertInDark }: LanguageItem) {
  return (
    /* MEJORA 6e: border sutil + rounded-2xl, sin sombra de gradiente Windows XP */
    <div className="group shrink-0 w-[140px] sm:w-[160px] md:w-[180px]">
      <div className="rounded-2xl border border-[var(--card-border)] theme-card p-4 sm:p-5 flex flex-col items-center gap-3 transition-colors">
        <div className="relative aspect-square w-full">
          <Image
            src={icon}
            alt={name}
            fill
            sizes="(min-width:1024px) 180px, (min-width:640px) 160px, 140px"
            /* MEJORA 6: invertir íconos negros (Next.js, GitHub) en dark mode */
            className={`object-contain${invertInDark ? ' dark:invert dark:brightness-90' : ''}`}
          />
        </div>
        {/* MEJORA 6d: nombre visible solo en hover, con transición suave */}
        <p className="text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
          {name}
        </p>
      </div>
    </div>
  );
}
