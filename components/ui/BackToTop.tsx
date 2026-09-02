"use client";

import { PLAY_STORE_HREF } from "@/components/mobileApp/mobileAppConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./backToTop.module.css";

export function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <div className={`${styles.dock} ${visible ? styles.dockOpen : ""} ${reducedMotion ? styles.motionStatic : ""}`}>
      <a
        className={styles.install}
        href={PLAY_STORE_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("installApp")}
      >
        <svg className={styles.playIcon} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="#00F076" d="M3.6 2.4 14.2 12 3.6 21.6V2.4Z" />
          <path fill="#FFCE00" d="M14.2 12 17.3 9.2 6.1 1.1 3.6 2.4 14.2 12Z" />
          <path fill="#FF3A44" d="M14.2 12 3.6 21.6l2.5 1.3 11.2-8.1L14.2 12Z" />
          <path fill="#00D2FF" d="m17.3 9.2-3.1 2.8 3.1 2.8 3.5-1.9v-1.8l-3.5-1.9Z" />
        </svg>
        <span>{t("installApp")}</span>
      </a>

      <div className={styles.buttonSlot} aria-hidden={!visible}>
        <div className={styles.buttonSlotInner}>
          <button
            className={styles.button}
            type="button"
            onClick={goTop}
            tabIndex={visible ? 0 : -1}
            aria-label={t("backToTop")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M8 13V4M4.2 7.2 8 3.5l3.8 3.7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
