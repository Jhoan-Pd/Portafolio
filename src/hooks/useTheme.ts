// src/hooks/useTheme.ts
"use client";
import { useCallback, useEffect, useState } from "react";

type Pref = "system" | "light" | "dark";

declare global {
  interface Window {
    __setTheme?: (next: Pref) => void;
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const onChange = () => {
      const t = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      setThemeState(t);
    };
    // Inicial
    onChange();
    // Escuchar evento global del layout
    window.addEventListener("themechange", onChange as EventListener);
    return () => window.removeEventListener("themechange", onChange as EventListener);
  }, []);

  const toggle = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    window.__setTheme?.(isDark ? "light" : "dark");
  }, []);

  const setTheme = useCallback((next: Pref) => {
    window.__setTheme?.(next);
  }, []);

  return { theme, toggle, setTheme };
}
