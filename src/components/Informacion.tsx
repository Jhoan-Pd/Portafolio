'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { usePortfolioSection, type InfoBlock } from '@/hooks/usePortfolioSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Informacion() {
  const information = usePortfolioSection('information');
  const { language } = useLanguage();
  const infoBlocks = (information?.blocks ?? []) as InfoBlock[];
  const title = information?.title ?? (language === 'es' ? 'Sobre mí' : 'About me');

  const spanClass = (n?: number) =>
    n === 4 ? 'md:col-span-4'
    : n === 3 ? 'md:col-span-3'
    : n === 2 ? 'md:col-span-2'
    : '';

  return (
    <section
      id="sobre-mi"
      className="w-full section-y theme-page transition-colors"
      aria-labelledby="sobre-mi-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MEJORA 2: título unificado — semibold, sin uppercase, alineado izquierda */}
        <h2
          id="sobre-mi-title"
          className="t-title mb-8 sm:mb-10"
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {infoBlocks.map((block) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              whileHover={{ scale: 1.02 }}
              className={`radius-lg p-6 sm:p-8 min-h-[200px] flex flex-col items-center justify-center text-center border theme-card elev-2 transition-colors ${spanClass(block.span)}`}
            >
              {/* MEJORA 5d/5e: iconos especiales */}
              {block.icon === 'layers-icon' ? (
                <Layers
                  size={64}
                  className="mb-4 sm:mb-5 text-accent"
                  aria-hidden="true"
                />
              ) : block.icon === 'java-python-logos' ? (
                /* MEJORA 5e: logos reales Java + Python lado a lado */
                <div className="flex items-center gap-4 mb-4 sm:mb-5">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                    alt="Java"
                    width={48}
                    height={48}
                    loading="lazy"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
                    alt="Python"
                    width={48}
                    height={48}
                    loading="lazy"
                  />
                </div>
              ) : block.icon ? (
                <Image
                  src={block.icon}
                  alt={block.title || block.subtitle || 'icono'}
                  width={72}
                  height={72}
                  className="mb-4 sm:mb-5"
                  loading="lazy"
                  decoding="async"
                />
              ) : block.value ? (
                /* MEJORA 1: métricas en color acento */
                <p className="mb-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-accent">
                  {block.value}
                </p>
              ) : null}

              {block.subtitle && (
                <p className="t-grouphead text-accent">
                  {block.subtitle}
                </p>
              )}

              {block.title && (
                /* MEJORA 1 + 2: sin itálica, sin cian — color foreground */
                <h3 className="mt-2 mb-3 t-headline sm:text-xl">
                  {block.title}
                </h3>
              )}

              {block.description && (
                <p className="t-callout text-secondary max-w-prose">
                  {block.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
