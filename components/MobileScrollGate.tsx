"use client";

import { type ReactNode, useEffect, useState } from "react";
import styles from "./mobileScrollGate.module.css";

const MOBILE_QUERY = "(max-width: 640px)";
const LOCK_CLASS = "hero-scroll-lock";

type MobileScrollGateProps = {
  children: ReactNode;
};

/**
 * No mobile, só monta o resto do site após scroll/idle —
 * evita baixar JS/imagens pesadas no first paint (3G).
 */
export function MobileScrollGate({ children }: MobileScrollGateProps) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);

    if (!media.matches) {
      setUnlocked(true);
      setReady(true);
      return;
    }

    setReady(true);
    const html = document.documentElement;
    html.classList.add(LOCK_CLASS);

    let done = false;
    const unlock = () => {
      if (done) {
        return;
      }
      done = true;
      html.classList.remove(LOCK_CLASS);
      setUnlocked(true);
      cleanup();
    };

    let touchStartY = 0;

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        unlock();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? 0;
      if (touchStartY - currentY > 12) {
        unlock();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        unlock();
      }
    };

    const idleTimer = window.setTimeout(unlock, 4500);

    function cleanup() {
      window.clearTimeout(idleTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.classList.remove(LOCK_CLASS);
      cleanup();
    };
  }, []);

  if (!ready || !unlocked) {
    return null;
  }

  return <div className={`${styles.root} ${styles.unlocked}`}>{children}</div>;
}
