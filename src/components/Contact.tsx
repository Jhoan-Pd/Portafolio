"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Send, Linkedin, Github } from "lucide-react";

type ContactJson = {
  titulo?: string;
  descripcion?: string;
  correo?: string;
  redes?: { github?: string; linkedin?: string; email?: string };
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copy, setCopy] = useState<ContactJson | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    fetch("/data/data.json")
      .then((r) => r.json())
      .then((d) => setCopy(d?.contacto ?? null))
      .catch(() => setCopy(null));
  }, []);

  const title = copy?.titulo ?? "Contacto";
  const desc =
    copy?.descripcion ??
    "Si tienes un proyecto o quieres colaborar, completa el formulario o envíame un correo.";
  const gh = copy?.redes?.github ?? "https://github.com/tuusuario";
  const ln = copy?.redes?.linkedin ?? "https://linkedin.com/in/tuusuario";
  const em = copy?.redes?.email ?? `mailto:${copy?.correo ?? "tuemail@ejemplo.com"}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return alert("Completa todos los campos.");
    alert(`✅ Gracias ${formData.name}, tu mensaje fue enviado correctamente.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 px-4 sm:px-6 flex flex-col items-center bg-[#F4F1EB] text-neutral-900 dark:bg-neutral-900 dark:text-white"
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

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col gap-4 border border-black/10 dark:border-white/10"
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <label className="sr-only" htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          className="w-full rounded-lg px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          required
        />
        <label className="sr-only" htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Tu correo"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full rounded-lg px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          required
        />
        <label className="sr-only" htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tu mensaje"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-neutral-900 transition"
        >
          <Send size={18} /> Enviar
        </button>
      </motion.form>

      <motion.div
        className="flex gap-5 sm:gap-6 mt-8 sm:mt-10"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={prefersReduced ? {} : { opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        aria-label="Redes"
      >
                <a
                  href={gh}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Github size={24} />
                </a>
                <a
                  href={ln}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={em}
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
