"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Informacion() {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título */}
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12 tracking-wider">
          SOBRE MI
        </h2>

        {/* GRID CON MOSAICO */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* FILA 1 */}
          {/* 15+ PROYECTOS */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[220px]"
          >
            <p className="text-red-500 font-bold text-6xl mb-2">15+</p>
            <p className="uppercase font-bold text-xs text-red-400 tracking-wide">
              PROYECTOS<br />ACADÉMICOS
            </p>
          </motion.div>

          {/* PROYECTOS ACADÉMICOS (Ocupa 3 columnas) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-lg rounded-xl p-12 md:col-span-3 min-h-[220px]"
          >
            <h3 className="text-3xl font-bold text-cyan-600 mb-6 italic">
              Proyectos Académicos
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Más de cinco proyectos desarrollados en mi formación, donde he aplicado
              conceptos de ingeniería a soluciones prácticas y funcionales
            </p>
          </motion.div>

          {/* FILA 2 */}
          {/* COMPROMISO */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[220px]"
          >
            <p className="text-red-500 font-bold text-6xl mb-2">100%</p>
            <p className="uppercase font-bold text-xs text-red-400 tracking-wide">
              COMPROMISO Y<br />DEDICACIÓN
            </p>
          </motion.div>

          {/* EXPERIENCIA ACADÉMICA (Ocupa 2 columnas) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-lg rounded-xl p-12 md:col-span-2 min-h-[220px]"
          >
            <h3 className="text-3xl font-bold text-cyan-600 mb-6 italic">
              Experiencia Académica
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              He participado en seminarios y actividades académicas que fortalecen mi
              visión profesional, desde la arquitectura de software hasta el desarrollo
              de aplicaciones prácticas
            </p>
          </motion.div>

          {/* ICONO: ARQUITECTURA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[220px]"
          >
            <Image src="/visto.png" alt="Arquitectura" width={70} height={70} />
            <p className="uppercase font-bold text-xs text-gray-600 tracking-wide text-center mt-4">
              ARQUITECTURA DE<br />SOFTWARE
            </p>
          </motion.div>

          {/* FILA 3 */}
          {/* EXPERIENCIA LABORAL (Ocupa 3 columnas) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-md rounded-xl p-8 md:col-span-3"
          >
            <h3 className="text-2xl font-bold text-cyan-600 mb-4 italic">
              Experiencia laboral
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              He participado en seminarios y actividades académicas que fortalecen mi
              visión profesional, desde la arquitectura de software hasta el desarrollo
              de aplicaciones prácticas
            </p>
          </motion.div>

          {/* ICONO: DESARROLLO */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[220px]"
          >
            <Image src="/codigo.png" alt="Desarrollo" width={70} height={70} />
            <p className="uppercase font-bold text-xs text-gray-600 tracking-wide text-center mt-4">
              DESARROLLO EN JAVA Y<br />PYTHON
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}