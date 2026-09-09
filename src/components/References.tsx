'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePortfolioSection, type Testimonial } from '@/hooks/usePortfolioSection';

const References: React.FC = () => {
  const { language } = useLanguage();
  const testimonials = usePortfolioSection('testimonials');
  const referencias = (testimonials?.items as Testimonial[]) ?? [];
  /* MEJORA 7c: nuevo título en diccionarios */
  const title = testimonials?.title ?? (language === 'es' ? 'Perspectivas' : 'Perspectives');
  const emptyLabel = testimonials?.empty ?? (language === 'es' ? 'No hay testimonios disponibles.' : 'No testimonials available.');
  const ariaPrefix = language === 'es' ? 'Testimonio de' : 'Testimonial from';

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 theme-page transition-colors">
      {/* MEJORA 2: título unificado */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-10 sm:mb-16">
        {title}
      </h2>

      {referencias.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
          {referencias.map((ref, index) => {
            const rotation = index % 2 === 0 ? '-5deg' : '5deg';
            return (
              <FlipCard
                key={index}
                refData={ref}
                rotation={rotation}
                ariaPrefix={ariaPrefix}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          {emptyLabel}
        </p>
      )}
    </section>
  );
};

interface FlipCardProps {
  refData: Testimonial;
  rotation: string;
  ariaPrefix: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ refData, rotation, ariaPrefix }) => {
  const [flipped, setFlipped] = useState(false);
  const prefersReduced = useReducedMotion();

  const toggle = () => setFlipped((v) => !v);
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <motion.div
      className="relative w-64 sm:w-72 h-[360px] sm:h-[400px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 rounded-3xl"
      style={{ perspective: 1000, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 180 }}
      onMouseEnter={() => !prefersReduced && setFlipped(true)}
      onMouseLeave={() => !prefersReduced && setFlipped(false)}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${ariaPrefix} ${refData.nombre}`}
      onKeyDown={onKey}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl p-5 sm:p-6 text-center shadow-2xl"
        style={{ transformStyle: 'preserve-3d' as const }}
        animate={{ rotateY: flipped && !prefersReduced ? 180 : 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.7, ease: 'easeInOut' }}
      >
        {/* CARA FRONTAL */}
        <div
          className="
            absolute inset-0 flex flex-col justify-center items-center
            rounded-3xl border theme-card overflow-hidden
            transition-colors
          "
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* MEJORA 7b: comilla decorativa de fondo */}
          <span
            className="absolute top-2 right-4 text-[96px] leading-none font-serif text-accent select-none pointer-events-none"
            style={{ opacity: 0.12 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-md mb-3 sm:mb-4 ring-1 ring-black/10 dark:ring-white/10">
            <Image
              src={refData.imagen || '/avatar-placeholder.png'}
              alt={refData.nombre}
              width={120}
              height={120}
              className="object-cover rounded-full"
              loading="lazy"
            />
          </div>
          <h3 className="font-bold text-base sm:text-lg">{refData.nombre}</h3>
          <p className="text-xs sm:text-sm font-medium opacity-80">{refData.profesion}</p>
        </div>

        {/* CARA TRASERA */}
        <div
          className="
            absolute inset-0 flex flex-col items-center justify-between rounded-3xl px-5 sm:px-6 py-6
            border theme-card transition-colors
          "
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          {/* Cita */}
          <p className="italic text-sm sm:text-[15px] leading-relaxed max-w-prose text-center flex-1 flex items-center">
            &ldquo;{refData.mensaje}&rdquo;
          </p>

          {/* MEJORA 7a: atribución con nombre y cargo */}
          <div className="w-full pt-3 mt-3 border-t border-[var(--card-border)]">
            <p className="text-sm font-semibold text-center">{refData.nombre}</p>
            <p className="text-xs text-center opacity-70">{refData.profesion}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default References;
