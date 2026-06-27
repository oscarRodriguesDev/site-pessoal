"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContext {
  theme: Theme;
  toggle: () => void;
}

const Context = createContext<ThemeContext>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(Context);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  if (!mounted) {
    return <>{children}</>;
  }

  return <Context.Provider value={{ theme, toggle }}>{children}</Context.Provider>;
}
