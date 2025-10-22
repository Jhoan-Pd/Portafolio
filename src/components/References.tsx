"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Testimonio {
  imagen: string;
  nombre: string;
  profesion: string;
  mensaje: string;
}

const References: React.FC = () => {
  const [referencias, setReferencias] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setReferencias(Array.isArray(data.testimonios) ? data.testimonios : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando testimonios:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 grid place-items-center text-gray-500 dark:text-gray-400 bg-[#F4F1EB] dark:bg-neutral-900">
        Cargando testimonios...
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 bg-[#F4F1EB] text-neutral-900 dark:bg-neutral-900 dark:text-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 italic tracking-wide">
        TESTIMONIOS
      </h2>

      {referencias.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
          {referencias.map((ref, index) => {
            const isEven = index % 2 === 0;
            const rotation = isEven ? "-5deg" : "5deg";
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
          No hay testimonios disponibles.
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

const FlipCard: React.FC<FlipCardProps> = ({ refData, rotation, isEven }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-64 sm:w-72 h-[360px] sm:h-[400px] cursor-pointer [perspective:1000px]"
      style={{ rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 180 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 p-5 sm:p-6 text-center shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div
          className={`absolute inset-0 backface-hidden flex flex-col justify-center items-center rounded-3xl border-2 ${
            isEven
              ? "bg-white text-gray-800 border-blue-300 dark:bg-white/5 dark:text-gray-100 dark:border-blue-500/40"
              : "bg-cyan-700 text-white border-cyan-900 dark:bg-cyan-900 dark:border-cyan-700"
          }`}
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-md mb-3 sm:mb-4 ring-1 ring-black/10 dark:ring-white/10">
            <Image
              src={refData.imagen || "/avatar-placeholder.png"}
              alt={refData.nombre}
              width={120}
              height={120}
              className="object-cover rounded-full"
            />
          </div>
          <h3 className="font-bold text-base sm:text-lg">{refData.nombre}</h3>
          <p className="text-xs sm:text-sm font-medium opacity-80">{refData.profesion}</p>
        </div>

        <div
          className={`absolute inset-0 backface-hidden flex items-center justify-center rounded-3xl px-5 sm:px-6 text-center [transform:rotateY(180deg)] ${
            isEven
              ? "bg-blue-200 text-gray-800 border-blue-300 dark:bg-blue-500/15 dark:text-gray-100 dark:border-blue-500/40"
              : "bg-cyan-800 text-white border-cyan-900 dark:bg-cyan-950 dark:border-cyan-800"
          }`}
        >
          <p className="italic text-sm sm:text-[15px] leading-relaxed max-w-prose">“{refData.mensaje}”</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default References;
