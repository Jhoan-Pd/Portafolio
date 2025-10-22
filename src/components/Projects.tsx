"use client";
import { useState, useEffect, useRef, useMemo } from "react";
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
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((r) => r.json())
      .then((d) => setProjects(d.projects || []))
      .catch((e) => console.error("Error cargando proyectos:", e));
  }, []);

  useEffect(() => {
    let rafId = 0;
    const compute = () => {
      const el = listRef.current;
      if (!el) return;
      const center = el.getBoundingClientRect().top + el.clientHeight / 2;
      const items = Array.from(el.children);
      let idx = 0;
      let min = Infinity;
      items.forEach((child, i) => {
        const r = (child as HTMLElement).getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - center);
        if (d < min) {
          min = d;
          idx = i;
        }
      });
      setActive(idx);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(compute);
    };
    const el = listRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    compute();
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [projects]);

  // hooks antes de cualquier return condicional
  const staged = useMemo(() => projects.slice(0, 6), [projects]);
  const easeOutExpo = cubicBezier(0.22, 1, 0.36, 1);

  // capa visual para cada card del escenario
  const layer = (i: number) => {
    const depth = active - i;           // >0: quedó atrás, 0: foco, <0: por delante (futuras)
    const isPast = depth > 0;
    const isCurrent = depth === 0;
    const isFuture = depth < 0;
    const backSteps = Math.min(3, Math.max(0, depth)); // limitar cuántas se apilan visibles

    return {
      animate: {
        zIndex: 60 - i,
        // Visibilidad: actual 1, pasadas 0.9..0.7, futuras 0.35 (para que se vean y “prometan”)
        opacity: isCurrent ? 1 : isPast ? 0.95 - backSteps * 0.08 : 0.35,
        // Escala: pasadas se van reduciendo, futuras un pelín más pequeñas
        scale: isCurrent ? 1 : isPast ? Math.pow(0.94, backSteps) : 0.96,
        // Offsets: pasadas bajan/izquierda, futuras arriba/derecha
        y: isCurrent ? 0 : isPast ? backSteps * 24 : -18,
        x: isCurrent ? 0 : isPast ? backSteps * -10 : 16,
        // Ligero desenfoque en pasadas para dar profundidad
        filter: isPast ? "saturate(0.9) blur(0px)" : "none",
        // Pequeña rotación acumulada
        rotate: isPast ? Math.min(3, backSteps) * 0.25 : isFuture ? -0.2 : 0,
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
    <section className="w-full bg-[#F4F1EB] text-neutral-900 dark:bg-neutral-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-center text-3xl sm:text-4xl font-bold italic tracking-wide mb-6 sm:mb-8">
          MIS PROYECTOS
        </h2>

        {/* en móvil solo el escenario; la lista aparece desde md */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px] gap-6 sm:gap-8">
          {/* Escenario */}
          <div className="relative rounded-[28px] bg-white dark:bg-neutral-950/70 border border-black/5 dark:border-white/10 p-3 sm:p-5 md:p-8 shadow-[0_14px_40px_rgba(0,0,0,.12)]">
            <div className="relative h-[60svh] md:h-[68svh] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
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
                    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-6 h-full p-4 sm:p-6 lg:p-7">
                      <div className="relative rounded-2xl overflow-hidden bg-neutral-200">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover"
                          sizes="(min-width:1024px) 240px, 100vw"
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

          {/* Lista scrollable (miniaturas pequeñas) */}
          <div
            ref={listRef}
            className="hidden md:block rounded-[24px] bg-white dark:bg-neutral-950/70 border border-black/5 dark:border-white/10 p-3 sm:p-4 shadow-[0_14px_40px_rgba(0,0,0,.12)] h-[68svh] overflow-y-auto"
          >
            <div className="space-y-3">
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
                    <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold truncate">{p.title}</p>
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
