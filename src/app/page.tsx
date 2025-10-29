import React from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Informacion from "@/components/Informacion";
import References from "@/components/References";
import Contact from "@/components/Contact";
import Lenguajes from "@/components/lenguajes";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Projects />
      <Informacion />
      <Lenguajes />
      <References />
      <Contact />
    </main>
  );
}
