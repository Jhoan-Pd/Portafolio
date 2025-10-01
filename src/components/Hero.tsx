// components/Hero.tsx
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full">
      {/* HERO wrapper con borde curvado */}
      <div className="relative h-[520px] sm:h-[640px] md:h-[760px] lg:h-[820px] rounded-b-[100px] overflow-hidden">
        {/* Background image (fill) */}
        <Image
          src="/cielo.jpg"
          alt="City skyline"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay oscuro para contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

        {/* Navbar */}
        <nav className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-6xl px-6 flex items-center justify-between">
          {/* Logo + nombre */}
          <div className="flex items-center gap-4 bg-[#183047]/95 text-white rounded-2xl py-3 px-6 shadow-md">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-800 overflow-hidden">
              <Image src="/JPD.jpg" alt="JPD" width={48} height={48} className="object-cover" />
            </div>
            <div className="text-left leading-tight">
              <div className="text-sm font-semibold">Jhoan Alexander</div>
              <div className="text-xs font-medium opacity-90">Paredes Delgado</div>
            </div>
          </div>

          {/* Iconos */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-white shadow-sm">
              <Image src="/CambiarIdioma.png" alt="language" width={28} height={28} />
            </button>
            <button className="p-2 rounded-lg bg-white shadow-sm">
              <Image src="/AlternarEncendido.png" alt="theme" width={28} height={28} />
            </button>
            <button className="p-2 rounded-lg bg-white shadow-sm">
              <Image src="/Menú.gif" alt="menu" width={28} height={28} />
            </button>
          </div>
        </nav>

        {/* Contenido central */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
          {/* Frase */}
          <h1 className="max-w-4xl text-center text-white italic font-light text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] leading-tight drop-shadow-md">
            El secreto de la <span className="text-[#3498DB] font-semibold">felicidad</span> no es hacer siempre lo que se quiere,
            <br /> sino querer siempre lo que se hace
          </h1>

          {/* Card inferior */}
          <div className="mt-8 w-full max-w-3xl">
            <div className="mx-auto bg-white/95 rounded-2xl shadow-xl p-8">
              <p className="text-center text-gray-700 font-sans text-base sm:text-lg leading-relaxed tracking-wide">
                La arquitectura de software es el espacio donde combino creatividad y lógica. Me inspira diseñar
                estructuras tecnológicas y planear cada capa de un sistema como si fuera un edificio digital, cuidando
                cada detalle para que las aplicaciones crezcan de manera sólida y ofrezcan soluciones reales a quienes
                las usan.
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/cv.pdf"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-white font-semibold bg-red-400 shadow hover:bg-red-500 transition"
                  target="_blank"
                >
                  <span className="text-lg">⬇</span>
                  CV
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Badge decorativo */}
        <div className="absolute right-8 bottom-8 z-30">
          <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-md text-white font-semibold">
            JPD
          </div>
        </div>
      </div>
    </section>
  );
}
