"use client";

import { useLiteExperience } from "@/hooks/useLiteExperience";
import { useServerInsertedHTML } from "next/navigation";
import { useEffect } from "react";

const LITE_CLASS = "lite-experience";

/**
 * Roda no HTML SSR (fora da árvore React no cliente) para marcar lite-experience
 * antes do paint — evita o warning do React 19 sobre <script> em componentes.
 */
const LITE_BOOT_SCRIPT = `(function(){try{var c=navigator.connection||navigator.mozConnection||navigator.webkitConnection;var reduce=window.matchMedia("(prefers-reduced-motion:reduce)").matches;var bad=false;if(c){var t=(c.effectiveType||"").toLowerCase();var d=typeof c.downlink==="number"?c.downlink:null;var r=typeof c.rtt==="number"?c.rtt:null;bad=!!c.saveData||t==="slow-2g"||t==="2g"||(d!==null&&d>0&&d<0.4)||(r!==null&&r>=1500)||(t==="3g"&&((d!==null&&d>0&&d<0.7)||(r!==null&&r>=900)));}if(bad||reduce)document.documentElement.classList.add("${LITE_CLASS}");}catch(e){}})();`;

/** Marca <html> cedo para CSS desligar animações pesadas em rede ruim / reduced-motion. */
export function LiteModeBoot() {
  const lite = useLiteExperience();

  useServerInsertedHTML(() => (
    <script
      id="lite-boot"
      dangerouslySetInnerHTML={{ __html: LITE_BOOT_SCRIPT }}
    />
  ));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(LITE_CLASS, lite);
    return () => {
      root.classList.remove(LITE_CLASS);
    };
  }, [lite]);

  return null;
}
