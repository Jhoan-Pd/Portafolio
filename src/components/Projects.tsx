"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  { id: 1, title: "Layouts", image: "/trabajo1.jpg" },
  { id: 2, title: "Diseño de interfacez", image: "/trabajo2.jpg" },
  { id: 3, title: "Diseño", image: "/trabajo3.jpg" },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number;

    const computeActive = () => {
      if (!containerRef.current) return;
      const children = Array.from(containerRef.current.children);
      let closestIndex = 0;
      let closestDistance = Infinity;

      children.forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActive(closestIndex);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(computeActive);
    };

    window.addEventListener("scroll", handleScroll);
    computeActive();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="w-full h-screen flex">
      {/* Panel izquierdo */}
      <div className="w-2/3 h-full flex items-center justify-center bg-gray-100 relative overflow-hidden">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: i === active ? 1 : 0, x: i === active ? 0 : 100 }}
            transition={{ duration: 0.6 }}
            className="absolute w-[80%] h-[80%] rounded-xl shadow-xl overflow-hidden"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Panel derecho */}
      <div className="w-1/3 h-full overflow-y-scroll space-y-6 p-6" ref={containerRef}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`cursor-pointer rounded-lg overflow-hidden shadow-md transition-transform duration-300 ${
              i === active ? "ring-4 ring-blue-500 scale-105" : "opacity-70"
            }`}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className="w-full h-40 object-cover"
            />
            <p className="text-center py-2 font-semibold">{project.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
