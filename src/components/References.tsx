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
      <section className="py-20 flex justify-center items-center text-gray-500">
        Cargando testimonios...
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-[url('/paper-texture.jpg')] bg-cover bg-center relative overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16 italic tracking-wide text-gray-800">
        TESTIMONIOS
      </h2>

      {referencias.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-10 relative">
          {referencias.map((ref, index) => {
            const isEven = index % 2 === 0;
            const rotation = isEven ? "-5deg" : "5deg"; // torcidas más visibles

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
        <p className="text-center text-gray-500 mt-8">
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
      className="relative w-72 h-[400px] cursor-pointer [perspective:1000px]"
      style={{ rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 180 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl shadow-2xl border-2 p-6 text-center"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* Frente */}
        <div
          className={`absolute inset-0 backface-hidden flex flex-col justify-center items-center rounded-3xl border-2 ${
            isEven
              ? "bg-white text-gray-800 border-blue-300"
              : "bg-cyan-700 text-white border-cyan-900"
          }`}
        >
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-md mb-3">
            <Image
              src={refData.imagen || "/avatar-placeholder.png"}
              alt={refData.nombre}
              width={100}
              height={100}
              className="object-cover rounded-full"
            />
          </div>
          <h3 className="font-bold text-lg">{refData.nombre}</h3>
          <p className="text-sm font-medium opacity-80">{refData.profesion}</p>
        </div>

        {/* Reverso */}
        <div
          className={`absolute inset-0 backface-hidden flex items-center justify-center rounded-3xl px-6 text-center [transform:rotateY(180deg)] ${
            isEven
              ? "bg-blue-200 text-gray-800 border-blue-300"
              : "bg-cyan-800 text-white border-cyan-900"
          }`}
        >
          <p className="italic text-sm leading-relaxed">“{refData.mensaje}”</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default References;
