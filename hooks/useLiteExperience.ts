"use client";

import { useSyncExternalStore } from "react";

export type NetworkHint = {
  saveData: boolean;
  effectiveType: string;
};

function readNetwork(): NetworkHint {
  const connection =
    typeof navigator !== "undefined"
      ? (
          navigator as Navigator & {
            connection?: { saveData?: boolean; effectiveType?: string };
            mozConnection?: { saveData?: boolean; effectiveType?: string };
            webkitConnection?: { saveData?: boolean; effectiveType?: string };
          }
        ).connection ||
        (
          navigator as Navigator & {
            mozConnection?: { saveData?: boolean; effectiveType?: string };
          }
        ).mozConnection ||
        (
          navigator as Navigator & {
            webkitConnection?: { saveData?: boolean; effectiveType?: string };
          }
        ).webkitConnection
      : undefined;

  return {
    saveData: Boolean(connection?.saveData),
    effectiveType: connection?.effectiveType ?? "unknown",
  };
}

function isSlowNetwork(hint: NetworkHint): boolean {
  if (hint.saveData) {
    return true;
  }
  return /^(slow-2g|2g|3g)$/i.test(hint.effectiveType);
}

/**
 * Experiência leve: mobile/tablet, rede lenta, save-data ou reduced-motion.
 * Snapshot do servidor = true (não carrega Three/GSAP até provar que pode).
 */
function readLite(): boolean {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compact = window.matchMedia("(max-width: 1024px)").matches;
  return reduce || compact || isSlowNetwork(readNetwork());
}

function subscribe(onChange: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const compact = window.matchMedia("(max-width: 1024px)");
  const connection =
    (
      navigator as Navigator & {
        connection?: EventTarget;
      }
    ).connection ?? null;

  reduce.addEventListener("change", onChange);
  compact.addEventListener("change", onChange);
  connection?.addEventListener?.("change", onChange);

  return () => {
    reduce.removeEventListener("change", onChange);
    compact.removeEventListener("change", onChange);
    connection?.removeEventListener?.("change", onChange);
  };
}

export function useLiteExperience(): boolean {
  return useSyncExternalStore(subscribe, readLite, () => true);
}

export function useAllowHeavyVisuals(): boolean {
  return !useLiteExperience();
}
