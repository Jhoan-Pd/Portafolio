"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

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

  useEffect(() => {
    fetch("/data/data.json")
      .then((r) => r.json())
      .then((d) => setHero(d.hero as HeroData))
      .catch((e) => console.error("Error cargando Hero data:", e));
  }, []);

  if (!hero) {
    return (
      <section className="h-[60svh] min-h-[420px] grid place-items-center text-neutral-400">
        Cargando información…
      </section>
    );
  }

  const strokeBlue = "#2F80ED";
  const pillDark = "#102535";
  const pillLight = "#EFE6D2";
  const coral = "#E57F79";
  const rounded = 140;

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
    <section className="relative w-full bg-[#F4F1EB] text-neutral-900 dark:bg-neutral-900 dark:text-white">
      <nav
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-5xl px-4 sm:px-6 pointer-events-none"
        aria-label="Barra de acciones"
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div
            className="pointer-events-auto flex items-center gap-3 sm:gap-4 rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg backdrop-blur-sm ring-1 ring-white/10"
            style={{ backgroundColor: pillDark }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-slate-800 ring-2 ring-white/10 shrink-0">
              <Image
                src={hero.author.photo}
                alt={hero.author.firstName}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight text-white">
              <div className="text-[11px] sm:text-sm font-semibold uppercase tracking-[0.08em]">
                {hero.author.firstName}
              </div>
              <div className="text-[10px] sm:text-xs opacity-90 uppercase tracking-[0.12em]">
                {hero.author.lastName}
              </div>
            </div>
          </div>

          <div
            className="pointer-events-auto flex items-center gap-2 sm:gap-3 rounded-2xl px-2.5 sm:px-3 py-2 shadow-lg backdrop-blur-sm ring-1 ring-black/10"
            style={{ backgroundColor: pillLight }}
          >
            <button
              onClick={() => {}}
              className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white shadow hover:bg-neutral-100 transition"
              aria-label="Cambiar idioma"
              title="Idioma"
            >
              <Image src={hero.icons.language} alt="language" width={22} height={22} />
            </button>

            {/* Toggle de tema reutilizable (sigue sistema por defecto) */}
            <div className="h-9 w-9 sm:h-10 sm:w-10 grid place-items-center">
              <ThemeToggle />
            </div>

            <button
              onClick={() => {}}
              className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white shadow hover:bg-neutral-100 transition"
              aria-label="Menú"
              title="Menú"
            >
              <Image src={hero.icons.menu} alt="menu" width={22} height={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO con imagen y curva inferior */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "68svh",
          minHeight: 520,
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
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/20" />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6">
          <h1
            className="max-w-5xl text-center italic font-light text-white
                       text-[26px] sm:text-[34px] md:text-[46px] lg:text-[56px]
                       leading-[1.15] tracking-tight drop-shadow-[0_1px_20px_rgba(0,0,0,.55)]"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            {renderHighlighted(hero.quote, hero.highlight)}
          </h1>
        </div>

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
        </svg>
      </div>

      {/* Card de introducción + botón CV */}
      <div className="relative z-20 -mt-14 sm:-mt-20">
        <div className="mx-auto w-[min(94%,960px)] rounded-3xl border border-black/10 px-5 py-7 sm:px-10 sm:py-10 shadow-[0_12px_40px_rgba(0,0,0,.12)] bg-white text-neutral-800 dark:bg-neutral-800 dark:text-white">
          <p className="text-center text-[14px] sm:text-[16px] leading-relaxed sm:leading-8 tracking-[0.14em] sm:tracking-[0.18em] uppercase">
            {hero.intro}
          </p>

          <div className="mt-6 sm:mt-7 flex justify-center">
            <Link
              href={hero.cvLink}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5 text-white text-sm font-semibold tracking-wide shadow hover:brightness-110 active:translate-y-[1px]"
              style={{ backgroundColor: coral }}
            >
              <span className="text-base leading-none">↓</span>
              {hero.cvLabel ?? "CV"}
            </Link>
          </div>
        </div>
      </div>

      {/* Badge inferior */}
      <div className="pointer-events-none absolute right-4 sm:right-6 bottom-4 sm:bottom-6 z-20">
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full shadow-lg backdrop-blur bg-white/70 text-neutral-900 ring-1 ring-black/10 dark:bg-white/10 dark:text-white dark:ring-white/20">
          {hero.author.badge}
        </div>
      </div>
    </section>
  );
}
