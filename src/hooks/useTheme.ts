// src/hooks/useTheme.ts
"use client";
import { useCallback, useEffect, useState } from "react";

export type Pref = "system" | "light" | "dark";

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

  const [pref, setPref] = useState<Pref>("system");

  useEffect(() => {
    // Leer preferencia guardada
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    setPref(stored || "system");

    const onChange = () => {
      const t = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      setThemeState(t);
    };
    
    onChange();
    window.addEventListener("themechange", onChange as EventListener);
    return () => window.removeEventListener("themechange", onChange as EventListener);
  }, []);

  const toggle = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    window.__setTheme?.(next);
    setPref(next);
  }, []);

  const setTheme = useCallback((next: Pref) => {
    window.__setTheme?.(next);
    setPref(next);
  }, []);

  return { theme, pref, toggle, setTheme };
}