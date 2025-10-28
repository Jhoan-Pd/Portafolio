"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, cubicBezier } from "framer-motion";

interface Project {
  id: number;
  title: string;
  image: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((r) => r.json())
      .then((d) => setProjects(d.projects || []))
      .catch((e) => console.error("Error cargando proyectos:", e));
  }, []);

  // Scroll global → índice activo (sin useScroll para evitar problemas de hidratación)
  useEffect(() => {
    if (!projects.length) return;

    let raf = 0;
    const compute = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const progress = clamp((viewportCenter - rect.top) / rect.height, 0, 1);
      const idx = Math.round(progress * Math.max(0, projects.length - 1));
      if (idx !== active) setActive(idx);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
    // dep: solo cambia cuando hay datos; no dependas de `active` para no re-suscribir
  }, [projects.length]);

  const staged = useMemo(() => projects.slice(0, 6), [projects]);
  const easeOutExpo = cubicBezier(0.22, 1, 0.36, 1);

  // Carta actual al frente; la anterior desaparece; siguientes semi-visibles detrás
  const layer = (i: number) => {
    const depth = active - i; // >0 pasada, 0 actual, <0 futura
    const isPast = depth > 0;
    const isCurrent = depth === 0;
    const isFuture = depth < 0;

    return {
      animate: {
        zIndex: 100 - i,
        opacity: isCurrent ? 1 : isPast ? 0 : 0.6,
        scale: isCurrent ? 1 : isPast ? 0.94 : 0.98,
        y: isCurrent ? 0 : isPast ? 36 : -8,
        x: isCurrent ? 0 : isPast ? -16 : 12,
        rotate: isPast ? 0.3 : isFuture ? -0.15 : 0,
        filter: isPast ? "blur(2px) saturate(0.9)" : "none",
        transition: { duration: 0.55, ease: easeOutExpo },
      } as const,
      style: {
        boxShadow: "0 18px 40px rgba(0,0,0,.18), 0 4px 10px rgba(0,0,0,.08)",
      } as const,
    };
  };

  if (!projects.length) {
    return (
      <section className="w-full min-h-[60svh] grid place-items-center text-gray-500 dark:text-gray-400 bg-[#F4F1EB] dark:bg-neutral-900">
        Cargando proyectos...
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F4F1EB] text-neutral-900 dark:bg-neutral-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-center text-3xl sm:text-4xl font-bold italic tracking-wide mb-6 sm:mb-8">
          MIS PROYECTOS
        </h2>

        {/* En móvil solo el escenario; la lista aparece desde md */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_300px] gap-6 sm:gap-8">
          {/* Escenario */}
          <div className="relative rounded-[28px] bg-white dark:bg-neutral-950/70 border border-black/5 dark:border-white/10 p-3 sm:p-5 md:p-8 shadow-[0_14px_40px_rgba(0,0,0,.12)]">
            <div className="relative h-[62svh] md:h-[68svh] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
              <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 dark:ring-white/10" />
              {staged.map((p, i) => {
                const { animate, style } = layer(i);
                return (
                  <motion.article
                    key={p.id}
                    className="absolute inset-0 m-auto w-[92%] md:w-[88%] h-[86%] rounded-3xl bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/10 overflow-hidden"
                    animate={animate}
                    initial={{ opacity: 0, y: 60, scale: 0.98 }}
                    style={style}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-6 h-full p-4 sm:p-6 lg:p-7">
                      <div className="relative rounded-2xl overflow-hidden bg-neutral-200">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover"
                          sizes="(min-width:1024px) 220px, 100vw"
                          priority={i === active}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-lg sm:text-xl font-semibold leading-snug mb-2">
                          {p.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-[15px] leading-relaxed">
                          Breve descripción del proyecto. Tecnologías, objetivo y
                          resultado principal.
                        </p>
                        <div className="mt-auto pt-4 flex items-center gap-3">
                          <div className="h-7 w-7 rounded-full bg-neutral-200 overflow-hidden" />
                          <div className="text-xs sm:text-sm opacity-70">
                            Portfolio • {new Date().getFullYear()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* Lista de vistas previas (mini) – oculta en móvil */}
          <div className="hidden md:block rounded-[24px] bg-white dark:bg-neutral-950/70 border border-black/5 dark:border-white/10 p-3 sm:p-4 shadow-[0_14px_40px_rgba(0,0,0,.12)] h-[68svh] overflow-y-auto">
            <div className="space-y-2.5">
              {projects.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActive(i)}
                    className={`group relative w-full flex items-center gap-3 rounded-2xl p-2 border transition ${
                      isActive
                        ? "border-blue-400 ring-1 ring-blue-300/60 dark:ring-blue-500/40 bg-blue-50/60 dark:bg-blue-500/10"
                        : "border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900"
                    }`}
                  >
                    <div className="relative h-8 w-8 rounded-lg overflow-hidden bg-neutral-200 shrink-0">
                      <Image src={p.image} alt={p.title} fill className="object-cover" sizes="32px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] sm:text-[13px] font-semibold truncate">{p.title}</p>
                      <p className="text-[10px] opacity-70">#{String(i + 1).padStart(2, "0")}</p>
                    </div>
                    <span className="text-[10px] font-semibold opacity-60">
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
