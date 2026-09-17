"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useState } from "react";

export type PairScenePhase = "enter" | "idle" | "exit";

/** Tempo total da saída (stagger + duração) — deve bater com o CSS. */
export const PAIR_SCENE_EXIT_MS = 900;

/** Após a última entrada, libera a pulsação idle. */
const PAIR_SCENE_ENTER_SETTLE_MS = 1000;

export function usePairScenePhase(leaving: boolean): PairScenePhase {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<PairScenePhase>(reducedMotion ? "idle" : "enter");

  useEffect(() => {
    if (reducedMotion) {
      setPhase("idle");
      return;
    }

    if (leaving) {
      setPhase("exit");
      return;
    }

    setPhase("enter");
    const timer = window.setTimeout(() => setPhase("idle"), PAIR_SCENE_ENTER_SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [leaving, reducedMotion]);

  return phase;
}

export function pairPhaseClass(
  phase: PairScenePhase,
  styles: {
    readonly pairEnter: string;
    readonly pairIdle: string;
    readonly pairExit: string;
    readonly pairStatic: string;
  },
  reducedMotion: boolean,
): string {
  if (reducedMotion) {
    return styles.pairStatic;
  }

  switch (phase) {
    case "enter":
      return styles.pairEnter;
    case "idle":
      return styles.pairIdle;
    case "exit":
      return styles.pairExit;
    default: {
      const exhaustive: never = phase;
      return exhaustive;
    }
  }
}
