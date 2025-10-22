"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      title="Tema"
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow hover:bg-neutral-100 transition
                 dark:bg-neutral-800 dark:hover:bg-neutral-700"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
