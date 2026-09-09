"use client";

import { useEffect } from "react";
import { useLiteExperience } from "@/hooks/useLiteExperience";

const LITE_CLASS = "lite-experience";

/** Marca <html> cedo para CSS desligar animações pesadas em 3G/mobile. */
export function LiteModeBoot() {
  const lite = useLiteExperience();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(LITE_CLASS, lite);
    return () => {
      root.classList.remove(LITE_CLASS);
    };
  }, [lite]);

  return null;
}
