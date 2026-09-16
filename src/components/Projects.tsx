'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, cubicBezier } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { usePortfolioSection, type Project as ProjectItem } from '@/hooks/usePortfolioSection';
import { useLanguage } from '@/contexts/LanguageContext';

/* Un color de acento por proyecto, cíclico */
const PROJECT_COLORS = ['#E57F79', '#6366F1', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'];

export default function Projects() {
  const copy = usePortfolioSection('projects');
  const { language } = useLanguage();
  const items = copy?.items as ProjectItem[] | undefined;
  const projects = useMemo(() => items ?? [], [items]);
  const defaultDescription = copy?.defaultDescription ?? '';
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    setActive(0);
  }, [projects]);

  const staged = useMemo(() => projects.slice(0, 6), [projects]);
  const easeOutExpo = cubicBezier(0.22, 1, 0.36, 1);

  const layer = (i: number) => {
    const depth = active - i;
    const isPast = depth > 0;
    const isCurrent = depth === 0;
    const isFuture = depth < 0;

    return {
      isCurrent,
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

  const title = copy?.title ?? (language === 'es' ? 'Mis proyectos' : 'My projects');
  const linkLabels =
    copy?.linkLabels ??
    (language === 'es' ? { demo: 'Ver en vivo', repo: 'Código' } : { demo: 'Live demo', repo: 'Code' });

  return (
    <section id="projects" ref={sectionRef} className="w-full theme-page transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* MEJORA 2: título unificado */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_300px] gap-6 sm:gap-8">
          {/* PANEL IZQUIERDO PRINCIPAL */}
          <div className="relative rounded-[28px] border theme-card p-3 sm:p-5 md:p-8 shadow-[0_14px_40px_rgba(0,0,0,.12)] transition-colors">
            <div className="relative h-[62svh] md:h-[68svh] overflow-hidden rounded-3xl theme-glass transition-colors">
              <div className="absolute inset-0 rounded-3xl ring-1 ring-black/10 dark:ring-white/10" />
              {staged.map((p, i) => {
                const { isCurrent, animate, style } = layer(i);
                const accentColor = p.accentColor ?? PROJECT_COLORS[i % PROJECT_COLORS.length];

                return (
                  <motion.article
                    key={p.id}
                    className={`
                      absolute inset-0 m-auto w-[92%] md:w-[88%] h-[86%]
                      rounded-3xl overflow-hidden
                      bg-black/5 dark:bg-white/5
                      border border-black/10 dark:border-white/10
                      transition-colors
                      ${isCurrent ? 'pointer-events-auto' : 'pointer-events-none'}
                    `}
                    animate={animate}
                    initial={{ opacity: 0, y: 60, scale: 0.98 }}
                    style={style}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        priority={i === active}
                        sizes="(min-width:1024px) 70vw, 100vw"
                        className="object-cover"
                      />

                      {/* MEJORA 4b: barra de información inferior con overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent pt-16 pb-4 px-4 rounded-b-3xl">
                        {/* MEJORA 4d: chip permanente con número + nombre */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: accentColor }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-white text-sm font-semibold truncate">{p.title}</span>
                        </div>

                        {/* Stack chips — solo visibles en la card activa */}
                        <div
                          className={`flex flex-wrap gap-1 mb-1.5 transition-opacity duration-300 ${isCurrent ? 'opacity-100' : 'opacity-0'}`}
                        >
                          {p.stack?.map((s) => (
                            <span
                              key={s}
                              className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        {/* Rol — solo visible en la card activa */}
                        {p.role && (
                          <p
                            className={`text-xs font-medium transition-opacity duration-300 ${isCurrent ? 'opacity-100' : 'opacity-0'}`}
                            style={{ color: accentColor }}
                          >
                            {p.role}
                          </p>
                        )}

                        {/* Enlaces del proyecto — solo en la card activa */}
                        {isCurrent && (p.links?.demo || p.links?.repo) && (
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {p.links?.demo && (
                              <a
                                href={p.links.demo}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:brightness-110 transition-[filter]"
                                style={{ backgroundColor: accentColor }}
                              >
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                {linkLabels.demo}
                              </a>
                            )}
                            {p.links?.repo && (
                              <a
                                href={p.links.repo}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white bg-white/15 backdrop-blur-sm ring-1 ring-white/25 hover:bg-white/25 transition-colors"
                              >
                                <Github className="h-3 w-3" aria-hidden="true" />
                                {linkLabels.repo}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* COLUMNA DERECHA DE NAVEGACIÓN */}
          <div className="hidden md:block rounded-[24px] border theme-card p-3 sm:p-4 shadow-[0_14px_40px_rgba(0,0,0,.12)] h-[68svh] overflow-y-auto transition-colors">
            <div className="space-y-2.5">
              {projects.map((p, i) => {
                const isActive = i === active;
                const accentColor = p.accentColor ?? PROJECT_COLORS[i % PROJECT_COLORS.length];

                return (
                  <button
                    key={p.id}
                    onClick={() => setActive(i)}
                    style={{
                      borderLeftColor: accentColor,
                      ...(isActive
                        ? { backgroundColor: `${accentColor}18` }
                        : {}),
                    }}
                    className={`group relative w-full text-left flex items-start gap-3 rounded-2xl p-3 border-l-[4px] border-r border-t border-b transition-all duration-200 ${
                      isActive
                        ? 'border-r-[var(--card-border)] border-t-[var(--card-border)] border-b-[var(--card-border)]'
                        : 'theme-card'
                    }`}
                  >
                    <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 shrink-0 ring-1 ring-black/10 dark:ring-white/10">
                      <Image src={p.image} alt={p.title} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] sm:text-[14px] font-semibold truncate">{p.title}</p>
                      <p className="mt-0.5 text-[11px] sm:text-[12px] text-neutral-600 dark:text-neutral-300 line-clamp-2">
                        {p.description ?? defaultDescription}
                      </p>
                    </div>
                    <span
                      className="ml-2 text-[10px] font-bold opacity-70 shrink-0"
                      style={{ color: accentColor }}
                    >
                      {String(i + 1).padStart(2, '0')}
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
