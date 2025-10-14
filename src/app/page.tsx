import React from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Informacion from "@/components/Informacion";
import References from "@/components/References";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Projects />
      <Informacion />
      <References />
      <Contact />
    </main>
  );
}
