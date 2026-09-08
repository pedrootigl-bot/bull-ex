"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import styles from "./promoPopup.module.css";

const PROMO_REGISTER_HREF = "https://trade.bull-ex.com/pt/register";

export function PromoPopup() {
  const t = useTranslations("promoPopup");
  const titleId = useId();
  const [open, setOpen] = useState(true);
  const [entered, setEntered] = useState(false);

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
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(enterFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={`${styles.overlay} ${entered ? styles.overlayEntered : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={() => setOpen(false)}
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
          onClick={() => setOpen(false)}
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
          onClick={() => setOpen(false)}
        >
          <Image
            className={styles.image}
            src="/images/promo-megahaval.jpg"
            alt={t("imageAlt")}
            width={633}
            height={1024}
            sizes="(max-width: 640px) 68vw, 320px"
            priority
          />
        </a>
      </div>
    </div>
  );
}
