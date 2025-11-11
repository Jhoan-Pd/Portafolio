import React from 'react';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Contact from '@/components/Contact';
import Languages from '@/components/Languages';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Projects />
      <AboutSection />
      <Languages />
      <TestimonialsSection />
      <Contact />
    </main>
  );
}
