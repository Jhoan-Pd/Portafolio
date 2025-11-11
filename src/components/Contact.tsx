'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Send, Linkedin, Github, Check } from 'lucide-react';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ContactCopy } from '@/types/portfolio';

export default function Contact() {
  const contact = usePortfolioSection('contact') as ContactCopy | null;
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', hp: '' });
  const [sent, setSent] = useState<null | 'ok' | 'error'>(null);
  const prefersReduced = useReducedMotion();

  const title = contact?.title ?? (language === 'es' ? 'Contacto' : 'Contact');
  const desc =
    contact?.description ??
    (language === 'es'
      ? 'Si tienes un proyecto o quieres colaborar, completa el formulario o envíame un correo.'
      : 'If you have a project or want to collaborate, fill out the form or send me an email.');

  const social = contact?.social ?? {};
  const githubUrl = social.github ?? 'https://github.com/tuusuario';
  const linkedinUrl = social.linkedin ?? 'https://linkedin.com/in/tuusuario';
  const emailUrl = social.email ?? `mailto:${contact?.email ?? 'tuemail@ejemplo.com'}`;

  const formCopy =
    contact?.form ?? {
      nameLabel: language === 'es' ? 'Nombre' : 'Name',
      emailLabel: language === 'es' ? 'Correo' : 'Email',
      messageLabel: language === 'es' ? 'Mensaje' : 'Message',
      namePlaceholder: language === 'es' ? 'Tu nombre' : 'Your name',
      emailPlaceholder: language === 'es' ? 'Tu correo' : 'Your email',
      messagePlaceholder: language === 'es' ? 'Tu mensaje' : 'Your message',
      submit: language === 'es' ? 'Enviar' : 'Send',
      success: language === 'es' ? '¡Gracias! Tu mensaje fue enviado.' : 'Thanks! Your message was sent.',
      validationError: language === 'es' ? 'Completa todos los campos.' : 'Please complete every field.',
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.hp) return;
    if (!formData.name || !formData.email || !formData.message) {
      alert(formCopy.validationError);
      return;
    }
    setSent('ok');
    setFormData({ name: '', email: '', message: '', hp: '' });
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 px-4 sm:px-6 flex flex-col items-center theme-page transition-colors"
      aria-labelledby="contact-title"
    >
      <motion.h2
        id="contact-title"
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center"
        initial={prefersReduced ? false : { opacity: 0, y: -30 }}
        animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg mb-8 text-center max-w-xl text-gray-700 dark:text-gray-300"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={prefersReduced ? {} : { opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {desc}
      </motion.p>

      {sent === 'ok' && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200">
          <Check size={18} />
          <span>{formCopy.success}</span>
        </div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md border theme-card shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col gap-4 transition-colors"
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <input
          type="text"
          name="hp"
          value={formData.hp}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <label className="sr-only" htmlFor="name">{formCopy.nameLabel}</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder={formCopy.namePlaceholder}
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          className="w-full rounded-lg px-4 py-2 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="sr-only" htmlFor="email">{formCopy.emailLabel}</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder={formCopy.emailPlaceholder}
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full rounded-lg px-4 py-2 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="sr-only" htmlFor="message">{formCopy.messageLabel}</label>
        <textarea
          id="message"
          name="message"
          placeholder={formCopy.messagePlaceholder}
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg px-4 py-2 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-neutral-950 transition"
        >
          <Send size={18} /> {formCopy.submit}
        </button>
      </motion.form>

      <motion.div
        className="flex gap-5 sm:gap-6 mt-8 sm:mt-10"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={prefersReduced ? {} : { opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        aria-label={language === 'es' ? 'Redes' : 'Social links'}
      >
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <Github size={24} />
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <Linkedin size={24} />
        </a>
        <a
          href={emailUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Email"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <Mail size={24} />
        </a>
      </motion.div>
    </section>
  );
}
