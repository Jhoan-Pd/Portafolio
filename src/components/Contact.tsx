'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();

  const title = language === 'es' ? 'Contacto' : 'Contact';

  // Enlaces reales
  const LINKEDIN = 'https://www.linkedin.com/in/jhoan-paredes-delgado-87755b249/';
  const GITHUB   = 'https://github.com/Jhoan-Pd';
  const EMAIL    = 'mailto:jhoan123paredes@gmail.com';

  return (
    <section className="relative py-16 sm:py-24 bg-[var(--page-bg)] text-[var(--page-fg)]">
      {/* Bloque principal con bordes súper redondeados arriba */}
      <div className="relative mx-auto w-[min(92%,1080px)] rounded-t-[120px] sm:rounded-t-[140px] px-5 sm:px-10 pb-16 sm:pb-24 pt-20 sm:pt-28
                      shadow-[0_30px_80px_rgba(0,0,0,.25)] ring-1 ring-black/10 dark:ring-white/10
                      bg-neutral-900 text-white dark:bg-neutral-900">
        {/* badge centrado */}
        <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 h-20 w-20 sm:h-24 sm:w-24
                        rounded-full grid place-items-center shadow-xl ring-1 ring-black/10
                        bg-[var(--pill-left)] dark:bg-neutral-800">
          <span className="text-xl sm:text-2xl font-semibold tracking-[0.25em]">JPD</span>
        </div>

        {/* Título */}
        <motion.h2
          className="text-center text-3xl sm:text-5xl font-extrabold tracking-wide mb-10 sm:mb-12"
          initial={prefersReduced ? false : { opacity: 0, y: -16 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {title}
        </motion.h2>

        {/* Botones tipo píldora */}
        <motion.div
          className="mx-auto grid w-full max-w-2xl grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 place-items-center"
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Pill href={LINKEDIN} label="LinkedIn" />
          <Pill href={EMAIL} label={language === 'es' ? 'Correo' : 'Email'} />
        </motion.div>

        {/* GitHub debajo centrado */}
        <motion.div
          className="mt-6 sm:mt-8 flex justify-center"
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Pill href={GITHUB} label="GitHub" />
        </motion.div>
      </div>

      {/* Suavizado del fondo superior (opcional, para parecerse más a tu captura) */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5" />
    </section>
  );
}

/* ---------- Botón tipo píldora ---------- */
function Pill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-3 rounded-full px-6 sm:px-8 py-3 sm:py-4
                 bg-teal-700/90 hover:bg-teal-600 text-white font-semibold tracking-wide
                 ring-1 ring-white/10 shadow-md transition"
    >
      <span className="grid h-6 w-9 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
      {label.toLowerCase()}
    </a>
  );
}
