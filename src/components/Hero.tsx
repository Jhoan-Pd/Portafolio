"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroData = {
  backgroundImage: string;
  quote: string;
  highlight?: string;
  intro: string;
  cvLink: string;
  cvLabel?: string;
  author: {
    firstName: string;
    lastName: string;
    photo: string;
    badge: string;
  };
  icons: {
    language: string;
    menu: string;
    theme?: string;
    themeLight?: string;
    themeDark?: string;
  };
};

export default function Hero() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    fetch("/data/data.json")
      .then((r) => r.json())
      .then((d) => setHero(d.hero as HeroData))
      .catch((e) => console.error("Error cargando Hero data:", e));
  }, []);

  if (!hero) {
    return (
      <section className="h-[60svh] min-h-[480px] grid place-items-center text-neutral-400">
        Cargando información…
      </section>
    );
  }

  // Tokens de estilo (ajusta si usas otra paleta)
  const strokeBlue = "#2F80ED";
  const pillDark = "#102535";
  const pillLight = "#EFE6D2";
  const coral = "#E57F79";
  const rounded = 140;

  // Icono para el botón de tema (acepta themeLight/themeDark o theme genérico)
  const themeIcon = dark
    ? hero.icons.themeDark ?? hero.icons.theme ?? hero.icons.language
    : hero.icons.themeLight ?? hero.icons.theme ?? hero.icons.language;

  // Resalta una única ocurrencia de `highlight` sin usar HTML crudo
  const renderHighlighted = (text: string, hl?: string) => {
    if (!hl) return text;
    const i = text.indexOf(hl);
    if (i === -1) return text;
    return (
      <>
        {text.slice(0, i)}
        <span className="font-semibold text-[#E9EEF3]">{hl}</span>
        {text.slice(i + hl.length)}
      </>
    );
  };

  return (
    <section
      className={`relative w-full ${
        dark ? "bg-neutral-900 text-white" : "bg-[#F4F1EB] text-neutral-900"
      }`}
    >
      {/* Top: imagen con borde inferior redondeado */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "68svh",
          minHeight: 560,
          borderBottomLeftRadius: rounded,
          borderBottomRightRadius: rounded,
        }}
      >
        <Image
          src={hero.backgroundImage}
          alt="Fondo principal"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlays para contraste */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/20" />

        {/* Navbar de pastillas */}
        <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-5xl px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Avatar + nombre */}
            <div
              className="flex items-center gap-4 rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm"
              style={{ backgroundColor: pillDark }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 ring-2 ring-white/10 shrink-0">
                <Image
                  src={hero.author.photo}
                  alt={hero.author.firstName}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="leading-tight text-white">
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.08em]">
                  {hero.author.firstName}
                </div>
                <div className="text-[11px] sm:text-xs opacity-90 uppercase tracking-[0.12em]">
                  {hero.author.lastName}
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div
              className="flex items-center gap-3 rounded-2xl px-3 py-2 shadow-lg backdrop-blur-sm"
              style={{ backgroundColor: pillLight }}
            >
              <button
                onClick={() => {}}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow hover:bg-neutral-100 transition"
                aria-label="Cambiar idioma"
                title="Idioma"
              >
                <Image
                  src={hero.icons.language}
                  alt="language"
                  width={22}
                  height={22}
                />
              </button>
              <button
                onClick={() => setDark((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow hover:bg-neutral-100 transition"
                aria-label="Tema"
                title="Tema"
              >
                <Image src={themeIcon} alt="theme" width={22} height={22} />
              </button>
              <button
                onClick={() => {}}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow hover:bg-neutral-100 transition"
                aria-label="Menú"
                title="Menú"
              >
                <Image src={hero.icons.menu} alt="menu" width={22} height={22} />
              </button>
            </div>
          </div>
        </nav>

        {/* Cita central con highlight */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <h1
            className="max-w-5xl text-center italic font-light
                       text-white text-[28px] sm:text-[36px] md:text-[46px] lg:text-[56px]
                       leading-[1.15] tracking-tight drop-shadow-[0_1px_20px_rgba(0,0,0,.55)]"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            {renderHighlighted(hero.quote, hero.highlight)}
          </h1>
        </div>

        {/* Línea inferior recta con esquinas redondeadas */}
        <svg
          className="pointer-events-none absolute inset-0 z-10"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="show-bottom-only">
              <rect x="0" y="640" width="1440" height="160" />
            </clipPath>
          </defs>
          <rect
            x="2"
            y="2"
            width="1436"
            height="796"
            rx={rounded}
            ry={rounded}
            fill="none"
            stroke={strokeBlue}
            strokeWidth="4"
            clipPath="url(#show-bottom-only)"
          />
        </svg>
      </div>

      {/* Card de introducción + botón CV */}
      <div className="relative z-20 -mt-16 sm:-mt-24">
        <div
          className={`mx-auto w-[min(92%,960px)] rounded-3xl border border-black/10 px-6 py-8 sm:px-10 sm:py-10 shadow-[0_12px_40px_rgba(0,0,0,.12)] ${
            dark ? "bg-neutral-800 text-white" : "bg-white text-neutral-800"
          }`}
        >
          <p className="text-center text-[15px] sm:text-[17px] leading-[1.9] tracking-[0.18em] uppercase">
            {hero.intro}
          </p>

          <div className="mt-7 flex justify-center">
            <Link
              href={hero.cvLink}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-white text-sm font-semibold tracking-wide shadow hover:brightness-110 active:translate-y-[1px]"
              style={{ backgroundColor: coral }}
            >
              <span className="text-base leading-none">↓</span>
              {hero.cvLabel ?? "CV"}
            </Link>
          </div>
        </div>
      </div>

      {/* Badge inferior derecho */}
      <div className="pointer-events-none absolute right-6 bottom-6 z-20">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg backdrop-blur ${
            dark
              ? "bg-white/10 text-white ring-1 ring-white/20"
              : "bg-white/70 text-neutral-900 ring-1 ring-black/10"
          }`}
        >
          {hero.author.badge}
        </div>
      </div>
    </section>
  );
}
