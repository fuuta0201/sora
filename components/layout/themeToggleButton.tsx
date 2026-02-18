"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

type ThemeType = "light" | "dark";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<ThemeType>("light");

  const handleThemeChange = () => {
    const htmlTag = document.querySelector("html");
    if (!htmlTag) return;

    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme || currentTheme === "light") {
      // light -> dark
      setTheme("dark");
      htmlTag.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      // dark -> light
      setTheme("light");
      htmlTag.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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
