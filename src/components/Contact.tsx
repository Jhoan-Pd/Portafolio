"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Linkedin, Github } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      alert("Por favor completa todos los campos.");
      return;
    }

    alert(`✅ Gracias ${formData.name}, tu mensaje fue enviado correctamente.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-blue-50 to-gray-100 px-6 flex flex-col items-center"
    >
      <motion.h2
        className="text-4xl font-bold mb-8 text-gray-900"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contacto
      </motion.h2>

      <motion.p
        className="text-lg text-gray-700 mb-8 text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Si tienes un proyecto o quieres colaborar, completa el formulario o envíame un correo.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu correo"
          value={formData.email}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="message"
          placeholder="Tu mensaje"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400"
          required
        ></textarea>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Send size={18} /> Enviar
        </button>
      </motion.form>

      <motion.div
        className="flex gap-6 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <a
          href="https://github.com/tuusuario"
          target="_blank"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          <Github size={28} />
        </a>
        <a
          href="https://linkedin.com/in/tuusuario"
          target="_blank"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          <Linkedin size={28} />
        </a>
        <a
          href="mailto:tuemail@ejemplo.com"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          <Mail size={28} />
        </a>
      </motion.div>
    </section>
  );
}
