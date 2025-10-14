"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroData {
  backgroundImage: string;
  quote: string;
  highlight: string;
  intro: string;
  cvLink: string;
  author: {
    firstName: string;
    lastName: string;
    photo: string;
    badge: string;
  };
  icons: {
    language: string;
    theme: string;
    menu: string;
  };
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setHeroData(data.hero))
      .catch((err) => console.error("Error cargando Hero data:", err));
  }, []);

  if (!heroData) {
    return (
      <section className="h-[500px] flex items-center justify-center text-gray-400">
        Cargando información...
      </section>
    );
  }

  return (
    <section className="relative w-full">
      {/* Contenedor principal */}
      <div className="relative h-[520px] sm:h-[640px] md:h-[760px] lg:h-[820px] rounded-b-[100px] overflow-hidden">
        {/* Imagen de fondo */}
        <Image
          src={heroData.backgroundImage}
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Capa oscura */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

        {/* Navbar */}
        <nav className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-6xl px-6 flex items-center justify-between">
          {/* Logo + Nombre */}
          <div className="flex items-center gap-4 bg-[#183047]/95 text-white rounded-2xl py-3 px-6 shadow-md">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-800 overflow-hidden">
              <Image
                src={heroData.author.photo}
                alt={heroData.author.firstName}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="text-left leading-tight">
              <div className="text-sm font-semibold">{heroData.author.firstName}</div>
              <div className="text-xs font-medium opacity-90">{heroData.author.lastName}</div>
            </div>
          </div>

          {/* Iconos */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-white shadow-sm">
              <Image
                src={heroData.icons.language}
                alt="language"
                width={28}
                height={28}
              />
            </button>
            <button className="p-2 rounded-lg bg-white shadow-sm">
              <Image
                src={heroData.icons.theme}
                alt="theme"
                width={28}
                height={28}
              />
            </button>
            <button className="p-2 rounded-lg bg-white shadow-sm">
              <Image
                src={heroData.icons.menu}
                alt="menu"
                width={28}
                height={28}
              />
            </button>
          </div>
        </nav>

        {/* Contenido central */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
          <h1 className="max-w-4xl text-center text-white italic font-light text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] leading-tight drop-shadow-md">
            El secreto de la{" "}
            <span className="text-[#3498DB] font-semibold">
              {heroData.highlight}
            </span>{" "}
            no es hacer siempre lo que se quiere,
            <br /> sino querer siempre lo que se hace
          </h1>

          <div className="mt-8 w-full max-w-3xl">
            <div className="mx-auto bg-white/95 rounded-2xl shadow-xl p-8">
              <p className="text-center text-gray-700 font-sans text-base sm:text-lg leading-relaxed tracking-wide">
                {heroData.intro}
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  href={heroData.cvLink}
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

        {/* Badge */}
        <div className="absolute right-8 bottom-8 z-30">
          <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-md text-white font-semibold">
            {heroData.author.badge}
          </div>
        </div>
      </div>
    </section>
  );
}
