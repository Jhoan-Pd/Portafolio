import React from "react";
import data from "../data/data.json";

const References: React.FC = () => {
  const referencias = Array.isArray(data.testimonios) ? data.testimonios : [];

  return (
    <section className="py-16 px-8 bg-[url('/paper-texture.jpg')] bg-cover bg-center">
      <h2 className="text-3xl font-bold text-center mb-12 italic tracking-wide">
        Testimonios
      </h2>

      {referencias.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-8">
          {referencias.map((ref, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center rounded-3xl shadow-md w-72 h-[380px] p-6 transition-transform ${
                index % 2 === 0
                  ? "bg-white text-gray-800 border-2 border-blue-400 -rotate-1"
                  : "bg-cyan-700 text-white rotate-1"
              }`}
            >
              {index % 2 === 0 ? (
                <>
                  <img
                    src={ref.imagen}
                    alt={ref.nombre}
                    className="w-20 h-20 rounded-full bg-gray-200 mb-4"
                  />
                  <h3 className="font-bold">{ref.nombre}</h3>
                  <p className="text-sm font-semibold mb-4">{ref.profesion}</p>
                </>
              ) : (
                <p className="text-center font-semibold text-lg leading-relaxed">
                  “{ref.mensaje}”
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay testimonios disponibles.</p>
      )}
    </section>
  );
};

export default References;