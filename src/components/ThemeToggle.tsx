"use client";
import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

type Pref = "system" | "light" | "dark";

declare global {
  interface Window {
    __setTheme?: (next: Pref) => void;
  }
}

export default function ThemeToggle() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [pref, setPref] = useState<Pref>("system");
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as "light" | "dark" | null) ?? null;
    setPref(stored ? (stored as Pref) : "system");
  }, [theme]);

  const select = (next: Pref) => {
    setPref(next);
    window.__setTheme?.(next);
    setOpen(false);
    btnRef.current?.focus();
  };

  const resolvedIcon = theme === "dark" ? <Moon size={18} /> : <Sun size={18} />;
  const prefIcon =
    pref === "system" ? <Monitor size={16} /> : pref === "dark" ? <Moon size={16} /> : <Sun size={16} />;

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Tema"
        className="inline-flex items-center gap-2 h-10 px-3 rounded-xl bg-white shadow hover:bg-neutral-100 transition
                   dark:bg-neutral-800 dark:hover:bg-neutral-700"
      >
        {resolvedIcon}
        <span className="text-xs font-medium hidden sm:inline-flex">
          {pref === "system" ? "Sistema" : pref === "dark" ? "Oscuro" : "Claro"}
        </span>
        <span className="opacity-70 hidden sm:inline-flex">{prefIcon}</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Seleccionar tema"
          className="absolute right-0 mt-2 w-40 rounded-xl border border-black/10 bg-white shadow-lg overflow-hidden
                     dark:bg-neutral-900 dark:border-white/10 z-50"
        >
          <Item active={pref === "system"} onClick={() => select("system")} icon={<Monitor size={16} />}>
            Sistema
          </Item>
          <Item active={pref === "light"} onClick={() => select("light")} icon={<Sun size={16} />}>
            Claro
          </Item>
          <Item active={pref === "dark"} onClick={() => select("dark")} icon={<Moon size={16} />}>
            Oscuro
          </Item>
        </div>
      )}

      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-transparent"
          />
          <Esc onEsc={() => setOpen(false)} />
        </>
      )}
    </div>
  );
}

function Item({
  active,
  onClick,
  icon,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      role="menuitemradio"
      aria-checked={active}
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left transition
        ${active ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1">{children}</span>
      {active && <span className="text-[10px] opacity-70">✓</span>}
    </button>
  );
}

function Esc({ onEsc }: { onEsc: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onEsc();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onEsc]);
  return null;
}
