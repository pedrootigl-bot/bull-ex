"use client";

import { type ReactNode, useEffect, useState } from "react";
import styles from "./mobileScrollGate.module.css";

const MOBILE_QUERY = "(max-width: 640px)";
const LOCK_CLASS = "hero-scroll-lock";

type MobileScrollGateProps = {
  children: ReactNode;
};

export function MobileScrollGate({ children }: MobileScrollGateProps) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    if (!media.matches) {
      setUnlocked(true);
      return;
    }

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

    function cleanup() {
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

  return (
    <div
      className={`${styles.root} ${unlocked ? styles.unlocked : styles.locked}`}
      aria-hidden={unlocked ? undefined : true}
    >
      {children}
    </div>
  );
}
