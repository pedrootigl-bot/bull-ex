"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { useLiteExperience } from "@/hooks/useLiteExperience";
import styles from "./promoPopup.module.css";

const PROMO_REGISTER_HREF = "https://trade.bull-ex.com/pt/register";
const STORAGE_KEY = "bullex-promo-dismissed-v1";

export function PromoPopup() {
  const t = useTranslations("promoPopup");
  const titleId = useId();
  const lite = useLiteExperience();
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        return;
      }
    } catch {
      // ignore
    }

    // Adia o popup para não competir com LCP/CSS no 3G
    const delayMs = lite ? 5000 : 2200;
    const timer = window.setTimeout(() => setOpen(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [lite]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const enterFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setEntered(true));
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(enterFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className={`${styles.overlay} ${entered ? styles.overlayEntered : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={dismiss}
    >
      <div
        className={`${styles.dialog} ${entered ? styles.dialogEntered : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className={styles.srOnly} id={titleId}>
          {t("title")}
        </h2>

        <button
          type="button"
          className={`${styles.close} ${entered ? styles.closeEntered : ""}`}
          aria-label={t("close")}
          onClick={dismiss}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 3l8 8M11 3 3 11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <a
          className={styles.link}
          href={PROMO_REGISTER_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}
        >
          <Image
            className={styles.image}
            src="/images/promo-megahaval.webp"
            alt={t("imageAlt")}
            width={480}
            height={776}
            sizes="(max-width: 640px) 62vw, 280px"
            loading="lazy"
            quality={60}
          />
        </a>
      </div>
    </div>
  );
}
