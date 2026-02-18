"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

type Theme = "light" | "dark";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState<boolean>(false);

  const getCurrentTheme = (): Theme => {
    if (typeof window === "undefined") return "light";

    const stored = localStorage.getItem(
      "theme"
    ) as Theme | null;
    if (stored === "light" || stored === "dark")
      return stored;

    return window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement; // <html>
    root.classList.toggle("dark", theme === "dark");
  };

  const handleThemeChange = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
  };

  useEffect(() => {
    const t = getCurrentTheme();
    applyTheme(t);
    setTimeout(() => {
      setTheme(t);
      setMounted(true);
    }, 0);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      size="icon"
      variant="default"
      className="ml-auto mr-2"
      onClick={handleThemeChange}
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
