"use client";

import { useSyncExternalStore } from "react";

export type ViewportTier = "mobile" | "tablet" | "desktop";

function readViewportTier(): ViewportTier {
  if (window.matchMedia("(max-width: 640px)").matches) {
    return "mobile";
  }

  if (window.matchMedia("(max-width: 1024px)").matches) {
    return "tablet";
  }

  return "desktop";
}

function subscribe(onStoreChange: () => void) {
  const mobile = window.matchMedia("(max-width: 640px)");
  const tablet = window.matchMedia("(max-width: 1024px)");

  mobile.addEventListener("change", onStoreChange);
  tablet.addEventListener("change", onStoreChange);

  return () => {
    mobile.removeEventListener("change", onStoreChange);
    tablet.removeEventListener("change", onStoreChange);
  };
}

function getServerSnapshot(): ViewportTier {
  return "desktop";
}

export function useViewportTier(): ViewportTier {
  return useSyncExternalStore(subscribe, readViewportTier, getServerSnapshot);
}
