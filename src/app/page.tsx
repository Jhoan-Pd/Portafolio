import React from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Informacion from "@/components/Informacion";
import References from "@/components/References";
import Contact from "@/components/Contact";
import Languages from "@/components/Languages";
import DawnDivider from "@/components/DawnDivider";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* El hero no lleva separador: ya se disuelve solo en la página */}
      <Hero />
      <Projects />
      <DawnDivider />
      <Informacion />
      <DawnDivider />
      <Languages />
      <DawnDivider />
      <References />
      <DawnDivider />
      <Contact />
      {/* La niebla cierra: la página sube hacia el cielo del que bajó */}
      <DawnDivider variant="fog" />
    </main>
  );
}
