"use client";

import { useSyncExternalStore } from "react";

type NetworkConnection = {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

function getConnection(): NetworkConnection | undefined {
  if (typeof navigator === "undefined") {
    return undefined;
  }
  const nav = navigator as Navigator & {
    connection?: NetworkConnection;
    mozConnection?: NetworkConnection;
    webkitConnection?: NetworkConnection;
  };
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}

/**
 * Só corta animações com sinal muito ruim:
 * save-data, 2G/slow-2G, downlink baixíssimo ou RTT altíssimo.
 * 3G/4G/Wi‑Fi bons mantêm animações (inclusive no mobile).
 */
export function isVeryBadNetwork(connection = getConnection()): boolean {
  if (!connection) {
    return false;
  }

  if (connection.saveData) {
    return true;
  }

  const type = (connection.effectiveType || "").toLowerCase();
  if (type === "slow-2g" || type === "2g") {
    return true;
  }

  const downlink = connection.downlink;
  if (typeof downlink === "number" && downlink > 0 && downlink < 0.4) {
    return true;
  }

  const rtt = connection.rtt;
  if (typeof rtt === "number" && rtt >= 1500) {
    return true;
  }

  // 3G só entra no modo leve se também estiver fraco
  if (type === "3g") {
    if (typeof downlink === "number" && downlink > 0 && downlink < 0.7) {
      return true;
    }
    if (typeof rtt === "number" && rtt >= 900) {
      return true;
    }
  }

  return false;
}

function readLite(): boolean {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return reduce || isVeryBadNetwork();
}

function subscribe(onChange: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = getConnection();

  reduce.addEventListener("change", onChange);
  connection?.addEventListener?.("change", onChange);

  return () => {
    reduce.removeEventListener("change", onChange);
    connection?.removeEventListener?.("change", onChange);
  };
}

/** true = cortar animações pesadas. Snapshot SSR = false (assume rede ok). */
export function useLiteExperience(): boolean {
  return useSyncExternalStore(subscribe, readLite, () => false);
}

export function useAllowHeavyVisuals(): boolean {
  return !useLiteExperience();
}
