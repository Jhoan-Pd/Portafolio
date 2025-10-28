// src/components/ThemeGuard.tsx
"use client";
import { useEffect } from "react";

export default function ThemeGuard() {
  useEffect(() => {
    const apply = () => {
      const stored = localStorage.getItem("theme"); // 'light' | 'dark' | null
      const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const mode = (stored ?? (sysDark ? "dark" : "light")) as "light" | "dark";

      const html = document.documentElement;
      const body = document.body;

      // 1) Normaliza: quitar 'dark' de todo excepto html (lo decidimos abajo)
      document.querySelectorAll(".dark").forEach((el) => {
        if (el !== html) el.classList.remove("dark");
      });

      // 2) Aplica solo en html
      html.classList.toggle("dark", mode === "dark");
      // por si alguien puso 'dark' en body
      body.classList.remove("dark");
    };

    apply();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") apply();
    };
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onSys = () => {
      // Solo seguir el sistema si NO hay preferencia guardada
      if (!localStorage.getItem("theme")) apply();
    };

    window.addEventListener("storage", onStorage);
    mql.addEventListener ? mql.addEventListener("change", onSys) : mql.addListener(onSys);

    return () => {
      window.removeEventListener("storage", onStorage);
      mql.removeEventListener ? mql.removeEventListener("change", onSys) : mql.removeListener(onSys);
    };
  }, []);

  return null;
}
