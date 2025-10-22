"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

type Lang = { name: string; icon: string };

export default function Lenguajes() {
  const [items, setItems] = useState<Lang[]>([]);

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
  const controls = useAnimationControls();
  const SPEED_S = 36;

  useEffect(() => {
    if (!items.length) return;
    controls.start({
      x: ["0%", "-50%"],
      transition: { duration: SPEED_S, ease: "linear", repeat: Infinity },
    });
    return () => controls.stop();
  }, [controls, items.length]);

  return (
    <section id="lenguajes" className="space-y-6 py-4 bg-[#F4F1EB] text-neutral-900 dark:bg-neutral-900 dark:text-white">
      <h2 className="text-center text-2xl sm:text-3xl font-bold italic tracking-wide">
        LENGUAJES TRABAJADOS
      </h2>

      <div className="relative overflow-hidden">
        <motion.div className="flex gap-6 sm:gap-8 w-[200%] will-change-transform" animate={controls}>
          {track.map((lang, i) => (
            <Card key={`${lang.name}-${i}`} {...lang} />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[#F4F1EB] to-transparent dark:from-neutral-900" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[#F4F1EB] to-transparent dark:from-neutral-900" />
      </div>
    </section>
  );
}

function Card({ name, icon }: Lang) {
  return (
    <div className="shrink-0">
      <div className="rounded-[26px] bg-[#2A3340] p-3 sm:p-4 shadow-xl w-[180px] sm:w-[200px] md:w-[220px]">
        <div className="rounded-2xl bg-white p-4 sm:p-5 ring-1 ring-black/10">
          <div className="relative aspect-square">
            <Image
              src={icon}
              alt={name}
              fill
              sizes="(min-width: 1024px) 220px, (min-width: 640px) 200px, 180px"
              className="object-contain"
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
