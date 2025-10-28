"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

type Lang = { name: string; icon: string };

export default function Lenguajes() {
  const [items, setItems] = useState<Lang[]>([]);
  const controls = useAnimationControls();
  const mounted = useRef(false);

  useEffect(() => {
    fetch("/data/data.json")
      .then((r) => r.json())
      .then((d) => {
        const fromJson: Lang[] = d?.lenguajes ?? [];
        setItems(
          fromJson.length
            ? fromJson
            : [
                { name: "C#", icon: "/codigo.png" },
                { name: "JavaScript", icon: "/Javascript.gif" },
                { name: "MySQL", icon: "/Mysql.png" },
                { name: "Python", icon: "/Python.gif" },
                { name: "Java", icon: "/JavaCoffeeCup.gif" },
              ]
        );
      })
      .catch(() => {
        setItems([
          { name: "C#", icon: "/codigo.png" },
          { name: "JavaScript", icon: "/Javascript.gif" },
          { name: "MySQL", icon: "/Mysql.png" },
          { name: "Python", icon: "/Python.gif" },
          { name: "Java", icon: "/JavaCoffeeCup.gif" },
        ]);
      });
  }, []);

  const track = useMemo(() => [...items, ...items], [items]);

  // velocidad (en s) para desplazar 50% del track
  const SPEED_S = 28;

  useEffect(() => {
    if (!items.length) return;
    if (mounted.current) {
      controls.stop();
    }
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced) {
      controls.set({ x: "0%" });
      controls.start({
        x: ["0%", "-50%"],
        transition: { duration: SPEED_S, ease: "linear", repeat: Infinity },
      });
    }

    const onVis = () => {
      if (document.visibilityState === "visible" && !prefersReduced) {
        controls.set({ x: "0%" });
        controls.start({
          x: ["0%", "-50%"],
          transition: { duration: SPEED_S, ease: "linear", repeat: Infinity },
        });
      } else {
        controls.stop();
      }
    };
    const onResize = () => {
      controls.stop();
      if (!prefersReduced) {
        controls.set({ x: "0%" });
        controls.start({
          x: ["0%", "-50%"],
          transition: { duration: SPEED_S, ease: "linear", repeat: Infinity },
        });
      }
    };

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    mounted.current = true;

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      controls.stop();
    };
  }, [controls, items.length]);

  if (!items.length) {
    return (
      <section className="w-full min-h-[30svh] grid place-items-center text-gray-500 dark:text-gray-400 bg-[#F4F1EB] dark:bg-neutral-900">
        Cargando lenguajes...
      </section>
    );
  }

  return (
    <section
      id="lenguajes"
      className="space-y-6 py-10 bg-[#F4F1EB] text-neutral-900 dark:bg-neutral-900 dark:text-white"
    >
      <h2 className="text-center text-2xl sm:text-3xl font-bold italic tracking-wide">
        LENGUAJES TRABAJADOS
      </h2>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6 sm:gap-8 w-[200%] will-change-transform"
          animate={controls}
        >
          {track.map((lang, i) => (
            <Card key={`${lang.name}-${i}`} {...lang} />
          ))}
        </motion.div>

        {/* Fades alineados al fondo del Hero */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[#F4F1EB] to-transparent dark:from-neutral-900" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[#F4F1EB] to-transparent dark:from-neutral-900" />
      </div>
    </section>
  );
}

function Card({ name, icon }: Lang) {
  return (
    <div className="shrink-0">
      <div className="rounded-[26px] bg-[#2A3340] p-3 sm:p-4 shadow-xl w-[200px] sm:w-[220px] md:w-[240px]">
        <div className="rounded-2xl bg-white p-4 sm:p-5 ring-1 ring-black/10">
          <div className="relative aspect-square">
            <Image
              src={icon}
              alt={name}
              fill
              sizes="(min-width:1024px) 240px, (min-width:640px) 220px, 200px"
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-sm sm:text-base font-medium text-neutral-800 dark:text-neutral-200 opacity-80">
        {name}
      </p>
    </div>
  );
}
