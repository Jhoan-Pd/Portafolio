'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, cubicBezier } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  image: string;
  description?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch('/data/data.json')
      .then((r) => r.json())
      .then((d) => setProjects(d.projects || []))
      .catch((e) => console.error('Error cargando proyectos:', e));
  }, []);

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
      setActive((prev) => (idx === prev ? prev : idx));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(compute); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    compute();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [projects.length]);

  const staged = useMemo(() => projects.slice(0, 6), [projects]);
  const easeOutExpo = cubicBezier(0.22, 1, 0.36, 1);

  const layer = (i: number) => {
    const depth = active - i;
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
        filter: isPast ? 'blur(2px) saturate(0.9)' : 'none',
        transition: { duration: 0.55, ease: easeOutExpo },
      } as const,
      style: { boxShadow: '0 18px 40px rgba(0,0,0,.18), 0 4px 10px rgba(0,0,0,.08)' } as const,
    };
  };

  if (!projects.length) {
    return (
      <section className="w-full min-h-[60svh] grid place-items-center text-gray-500 dark:text-gray-400 theme-page">
        Cargando proyectos...
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="w-full theme-page transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-center text-3xl sm:text-4xl font-bold italic tracking-wide mb-6 sm:mb-8">
          MIS PROYECTOS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_300px] gap-6 sm:gap-8">
          {/* Escenario (tarjeta grande) — cambia por modo */}
          <div className="relative rounded-[28px] border theme-card p-3 sm:p-5 md:p-8 shadow-[0_14px_40px_rgba(0,0,0,.12)] transition-colors">
            <div className="relative h-[62svh] md:h-[68svh] overflow-hidden rounded-3xl theme-glass transition-colors">
              <div className="absolute inset-0 rounded-3xl ring-1 ring-black/10 dark:ring-white/10" />
              {staged.map((p, i) => {
                const { animate, style } = layer(i);
                return (
                  <motion.article
                    key={p.id}
                    className="
                      absolute inset-0 m-auto w-[92%] md:w-[88%] h-[86%]
                      rounded-3xl overflow-hidden
                      bg-black/5 dark:bg-white/5
                      border border-black/10 dark:border-white/10
                      transition-colors
                    "
                    animate={animate}
                    initial={{ opacity: 0, y: 60, scale: 0.98 }}
                    style={style}
                  >
                    {/* IMAGEN FULL COVER (sin descripción aquí) */}
                    <div className="relative inset-0 w-full h-full">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        priority={i === active}
                        sizes="(min-width:1024px) 70vw, 100vw"
                        className="object-cover"
                      />
                      {/* Etiqueta del título */}
                      <div className="absolute left-4 right-4 bottom-4">
                        <div className="inline-flex max-w-[90%] items-center gap-2 rounded-xl px-3 py-2
                                        bg-white/90 text-neutral-900 ring-1 ring-black/10
                                        dark:bg-neutral-100/90 dark:text-neutral-900 dark:ring-black/20">
                          <span className="text-sm sm:text-base font-semibold truncate">{p.title}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* Lista lateral — descripción aquí */}
          <div className="hidden md:block rounded-[24px] border theme-card p-3 sm:p-4 shadow-[0_14px_40px_rgba(0,0,0,.12)] h-[68svh] overflow-y-auto transition-colors">
            <div className="space-y-2.5">
              {projects.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActive(i)}
                    className={`group relative w-full text-left flex items-start gap-3 rounded-2xl p-3 border transition-colors ${
                      isActive
                        ? 'border-blue-400 ring-1 ring-blue-300/60 bg-blue-50 dark:bg-blue-500/15 dark:ring-blue-400/50'
                        : 'theme-card'
                    }`}
                  >
                    <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 shrink-0 ring-1 ring-black/10 dark:ring-white/10">
                      <Image src={p.image} alt={p.title} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] sm:text-[14px] font-semibold truncate">{p.title}</p>
                      <p className="mt-0.5 text-[11px] sm:text-[12px] text-neutral-600 dark:text-neutral-300 line-clamp-2">
                        {p.description ?? 'Breve descripción del proyecto, tecnologías y objetivo.'}
                      </p>
                    </div>
                    <span className="ml-2 text-[10px] font-semibold opacity-60 shrink-0">
                      ({String(i + 1).padStart(2, '0')})
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
