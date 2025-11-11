'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import type { Testimonial } from '@/types/portfolio';

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const testimonials = usePortfolioSection('testimonials');
  const entries = (testimonials?.items as Testimonial[]) ?? [];
  const title = testimonials?.title ?? (language === 'es' ? 'Testimonios' : 'Testimonials');
  const emptyLabel = testimonials?.empty ?? (language === 'es' ? 'No hay testimonios disponibles.' : 'No testimonials available.');
  const ariaPrefix = language === 'es' ? 'Testimonio de' : 'Testimonial from';

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 theme-page transition-colors">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 italic tracking-wide">
        {title.toUpperCase()}
      </h2>

      {entries.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
          {entries.map((testimonial, index) => (
            <FlipCard
              key={testimonial.name + index}
              testimonial={testimonial}
              rotation={index % 2 === 0 ? '-5deg' : '5deg'}
              ariaPrefix={ariaPrefix}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">{emptyLabel}</p>
      )}
    </section>
  );
}

type FlipCardProps = {
  testimonial: Testimonial;
  rotation: string;
  ariaPrefix: string;
};

function FlipCard({ testimonial, rotation, ariaPrefix }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const prefersReduced = useReducedMotion();

  const toggle = () => setFlipped((value) => !value);
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <motion.div
      className="relative h-[360px] w-64 cursor-pointer rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 sm:h-[400px] sm:w-72"
      style={{ perspective: 1000, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 180 }}
      onMouseEnter={() => !prefersReduced && setFlipped(true)}
      onMouseLeave={() => !prefersReduced && setFlipped(false)}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${ariaPrefix} ${testimonial.name}`}
      onKeyDown={onKeyDown}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl p-5 text-center shadow-2xl sm:p-6"
        style={{ transformStyle: 'preserve-3d' as const }}
        animate={{ rotateY: flipped && !prefersReduced ? 180 : 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.7, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border theme-card transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="mb-3 h-20 w-20 overflow-hidden rounded-full ring-1 ring-black/10 shadow-md dark:ring-white/10 sm:mb-4 sm:h-24 sm:w-24">
            <Image
              src={testimonial.image || '/avatar-placeholder.png'}
              alt={testimonial.name}
              width={120}
              height={120}
              className="h-full w-full rounded-full object-cover"
              loading="lazy"
            />
          </div>
          <h3 className="font-bold text-base sm:text-lg">{testimonial.name}</h3>
          <p className="text-xs font-medium opacity-80 sm:text-sm">{testimonial.role}</p>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center rounded-3xl border px-5 text-center theme-card transition-colors sm:px-6"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <p className="max-w-prose text-sm leading-relaxed italic sm:text-[15px]">“{testimonial.message}”</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
