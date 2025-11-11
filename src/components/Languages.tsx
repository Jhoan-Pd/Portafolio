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

  const SPEED_S = 28;

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

  const title = languages?.title?.toUpperCase() ?? (language === 'es' ? 'LENGUAJES' : 'LANGUAGES');

  return (
    <section id="languages" className="space-y-6 py-10 theme-page transition-colors">
      <h2 className="text-center text-2xl sm:text-3xl font-bold italic tracking-wide">{title}</h2>

      <div className="relative overflow-hidden">
        <motion.div className="flex gap-6 sm:gap-8 w-[200%] will-change-transform" animate={controls}>
          {track.map((lang, i) => (
            <Card key={`${lang.name}-${i}`} name={lang.name} icon={lang.icon} />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[var(--page-bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[var(--page-bg)] to-transparent" />
      </div>
    </section>
  );
}

function Card({ name, icon }: LanguageItem) {
  return (
    <div className="shrink-0">
      <div className="rounded-[26px] theme-pill p-3 sm:p-4 shadow-xl w-[200px] sm:w-[220px] md:w-[240px] transition-colors">
        <div className="rounded-2xl border theme-card p-4 sm:p-5 ring-1 ring-black/10 dark:ring-white/10 transition-colors">
          <div className="relative aspect-square">
            <Image
              src={icon}
              alt={name}
              fill
              sizes="(min-width:1024px) 240px, (min-width:640px) 220px, 200px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-sm sm:text-base font-medium text-neutral-800 dark:text-neutral-200 opacity-80">
        {name}
      </p>
    </div>
  );
}
