import React from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Informacion from "@/components/Informacion";
import References from "@/components/References";
import Contact from "@/components/Contact";
import Languages from "@/components/Languages";
import DawnBackdrop from "@/components/DawnBackdrop";
import DawnDivider from "@/components/DawnDivider";

export default function Home() {
  return (
    <main className="relative flex flex-col overflow-x-hidden">
      {/* Las franjas del amanecer, por detrás de todo.
          Las secciones ya no pintan fondo: el crema lo pone layout.tsx. */}
      <DawnBackdrop />

      <Hero />
      <Projects />
      <Informacion />
      <Languages />
      <References />
      <Contact />

      {/* La niebla cierra: la página sube hacia el cielo del que bajó */}
      <DawnDivider variant="fog" />
    </main>
  );
}
