'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface InfoBlock {
  id: number;
  type: string;
  title?: string;
  value?: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  span?: number;
}

export default function Informacion() {
  const { content } = useLanguage();
  const infoBlocks = content.information.blocks as InfoBlock[];
  const title = content.information.title;

  const spanClass = (n?: number) =>
    n === 4 ? 'md:col-span-4'
    : n === 3 ? 'md:col-span-3'
    : n === 2 ? 'md:col-span-2'
    : '';

  return (
    <section
      id="sobre-mi"
      className="w-full py-14 sm:py-20 theme-page transition-colors"
      aria-labelledby="sobre-mi-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="sobre-mi-title"
          className="text-center text-3xl sm:text-4xl font-bold tracking-wider mb-10 sm:mb-12"
        >
          {title.toUpperCase()}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {infoBlocks.map((block) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              className={`rounded-2xl p-6 sm:p-8 min-h-[200px] flex flex-col items-center justify-center text-center
                          border theme-card
                          shadow-[0_14px_40px_rgba(0,0,0,.12)]
                          transition-colors ${spanClass(block.span)}`}
            >
              {block.icon ? (
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
                <p className="mb-2 text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-500 dark:text-red-400">
                  {block.value}
                </p>
              ) : null}

              {block.subtitle && (
                <p className="uppercase font-bold text-[10px] sm:text-xs tracking-wide leading-tight text-red-400 dark:text-red-300">
                  {block.subtitle}
                </p>
              )}

              {block.title && (
                <h3 className="mt-2 mb-3 sm:mb-4 text-xl sm:text-2xl font-bold italic text-cyan-600 dark:text-cyan-300">
                  {block.title}
                </h3>
              )}

              {block.description && (
                <p className="text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 max-w-prose">
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
