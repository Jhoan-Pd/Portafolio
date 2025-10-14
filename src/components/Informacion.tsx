"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
  const [infoBlocks, setInfoBlocks] = useState<InfoBlock[]>([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setInfoBlocks(data.informacion || []))
      .catch((err) => console.error("Error cargando información:", err));
  }, []);

  if (infoBlocks.length === 0) {
    return (
      <section className="w-full py-20 flex justify-center items-center text-gray-500">
        Cargando información...
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título general */}
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12 tracking-wider">
          SOBRE MI
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {infoBlocks.map((block) => (
            <motion.div
              key={block.id}
              whileHover={{ scale: 1.05 }}
              className={`bg-white shadow-lg rounded-xl p-10 flex flex-col items-center justify-center text-center min-h-[220px] ${
                block.span ? `md:col-span-${block.span}` : ""
              }`}
            >
              {/* Mostrar valor numérico o ícono */}
              {block.icon ? (
                <Image
                  src={block.icon}
                  alt={block.title || "icono"}
                  width={70}
                  height={70}
                  className="mb-4"
                />
              ) : block.value ? (
                <p className="text-red-500 font-bold text-6xl mb-2">{block.value}</p>
              ) : null}

              {/* Subtítulo numérico o descriptivo */}
              {block.subtitle && (
                <p className="uppercase font-bold text-xs text-red-400 tracking-wide leading-tight">
                  {block.subtitle}
                </p>
              )}

              {/* Título (cuando es bloque de texto largo) */}
              {block.title && (
                <h3 className="text-2xl font-bold text-cyan-600 mb-4 italic mt-2">
                  {block.title}
                </h3>
              )}

              {/* Descripción */}
              {block.description && (
                <p className="text-gray-700 text-sm leading-relaxed">
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
