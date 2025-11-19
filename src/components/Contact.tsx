'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePortfolioSection, type ContactCopy } from '@/hooks/usePortfolioSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();
  const prefersReduced = useReducedMotion();

  const contact = usePortfolioSection('contact') as ContactCopy | null;
  const title =
    contact?.title ??
    contact?.titulo ??
    (language === 'es' ? 'Contacto' : 'Contact');


  const social = contact?.social ?? contact?.redes ?? {};
  const LINKEDIN =
    social.linkedin ??
    'https://www.linkedin.com/in/jhoan-paredes-delgado-87755b249/';
  const GITHUB = social.github ?? 'https://github.com/Jhoan-Pd';
  const EMAIL =
    social.email ?? 'mailto:jhoan123paredes@gmail.com';


  const labels = {
    linkedin: 'LinkedIn',
    email: language === 'es' ? 'Correo' : 'Email',
    github: 'GitHub',
  };

  return (
    <section
      id="contact"
      className="relative theme-page transition-colors py-16 sm:py-24"
      aria-labelledby="contact-title"
    >

      <div
        className="
          relative mx-auto w-[min(94%,1080px)]
          rounded-t-[120px] sm:rounded-t-[140px]
          px-5 sm:px-10 pt-24 pb-16 sm:pb-20
          border theme-card shadow-[0_30px_80px_rgba(0,0,0,.25)]
          transition-colors
        "
      >
        <div className="
          absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2
          h-20 w-20 sm:h-24 sm:w-24 rounded-full
          grid place-items-center
          shadow-xl ring-1 ring-black/10 dark:ring-white/10
          bg-[var(--pill-left)] text-white
          dark:bg-neutral-800 dark:text-white
        ">
          <span className="text-xl sm:text-2xl font-semibold tracking-[0.25em]">JPD</span>
        </div>

        <motion.h2
          id="contact-title"
          className="text-center text-3xl sm:text-5xl font-extrabold tracking-wide mb-10 sm:mb-12"
          initial={prefersReduced ? false : { opacity: 0, y: -12 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="mx-auto grid w-full max-w-2xl grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 place-items-center"
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <Pill href={LINKEDIN} label={labels.linkedin} />
          <Pill href={EMAIL} label={labels.email} />
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 flex justify-center"
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <Pill href={GITHUB} label={labels.github} />
        </motion.div>
      </div>


      <div className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5" />
    </section>
  );
}


function Pill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        group inline-flex items-center gap-3
        rounded-full px-6 sm:px-8 py-3 sm:py-4
        bg-teal-700/90 hover:bg-teal-600 text-white
        font-semibold tracking-wide
        ring-1 ring-white/10 shadow-md transition
        dark:ring-black/20
      "
      aria-label={label}
      title={label}
    >
      <span className="grid h-6 w-9 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
      {label.toLowerCase()}
    </a>
  );
}