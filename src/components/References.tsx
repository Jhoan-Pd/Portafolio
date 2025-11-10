'use client';
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface Testimonio {
  imagen: string;
  nombre: string;
  profesion: string;
  mensaje: string;
}

const References: React.FC = () => {
  const { content } = useLanguage();
  const referencias = content.testimonials.items as Testimonio[];
  const title = content.testimonials.title;
  const emptyLabel = content.testimonials.empty;

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 theme-page transition-colors">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 italic tracking-wide">
        {title.toUpperCase()}
      </h2>

      {referencias.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
          {referencias.map((ref, index) => {
            const isEven = index % 2 === 0;
            const rotation = isEven ? '-5deg' : '5deg';
            return (
              <FlipCard
                key={index}
                refData={ref}
                rotation={rotation}
                isEven={isEven}
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
  refData: Testimonio;
  rotation: string;
  isEven: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({ refData, rotation }) => {
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
      aria-label={`Testimonio de ${refData.nombre}`}
      onKeyDown={onKey}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl p-5 sm:p-6 text-center shadow-2xl"
        style={{ transformStyle: 'preserve-3d' as const }}
        animate={{ rotateY: flipped && !prefersReduced ? 180 : 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.7, ease: 'easeInOut' }}
      >
        {/* Frente */}
        <div
          className="
            absolute inset-0 flex flex-col justify-center items-center
            rounded-3xl border theme-card
            transition-colors
          "
          style={{ backfaceVisibility: 'hidden' }}
        >
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

        {/* Reverso */}
        <div
          className="
            absolute inset-0 flex items-center justify-center rounded-3xl px-5 sm:px-6 text-center
            border theme-card transition-colors
          "
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <p className="italic text-sm sm:text-[15px] leading-relaxed max-w-prose">
            “{refData.mensaje}”
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default References;
