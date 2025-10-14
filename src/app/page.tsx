import React from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Informacion from "@/components/Informacion";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Sección Hero */}
      <Hero />

      {/* Sección Proyectos */}
      <Projects />

      {/* Sección informacion */}
      <Informacion />

      {/* Sección Contacto */}
      <Contact />
    </main>
  );
}
