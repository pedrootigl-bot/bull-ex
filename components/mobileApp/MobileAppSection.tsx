"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { PLAY_STORE_HREF } from "./mobileAppConfig";
import styles from "./mobileApp.module.css";

export function MobileAppSection() {
  const t = useTranslations("mobileApp");
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section className={styles.section} ref={sectionRef} aria-labelledby="mobile-app-title">
      <div className={styles.inner}>
        <div
          className={`${styles.visual} ${visible ? styles.visualIn : ""} ${reducedMotion ? styles.motionStatic : ""}`}
        >
          <Image
            className={styles.photo}
            src="/images/bullex-mobile-app.webp"
            alt={t("photoAlt")}
            width={900}
            height={1100}
            sizes="(max-width: 820px) 78vw, 420px"
            quality={85}
          />
        </div>

        <div
          className={`${styles.copy} ${visible ? styles.copyIn : ""} ${reducedMotion ? styles.motionStatic : ""}`}
        >
          <h2 className={styles.title} id="mobile-app-title">
            {t("titleBefore")}
            <span className={styles.highlight}>{t("titleHighlight")}</span>
          </h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
          <a
            className={styles.store}
            href={PLAY_STORE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("storeAria")}
          >
            <svg className={styles.playIcon} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path fill="#00F076" d="M3.6 2.4 14.2 12 3.6 21.6V2.4Z" />
              <path fill="#FFCE00" d="M14.2 12 17.3 9.2 6.1 1.1 3.6 2.4 14.2 12Z" />
              <path fill="#FF3A44" d="M14.2 12 3.6 21.6l2.5 1.3 11.2-8.1L14.2 12Z" />
              <path fill="#00D2FF" d="m17.3 9.2-3.1 2.8 3.1 2.8 3.5-1.9v-1.8l-3.5-1.9Z" />
            </svg>
            <span className={styles.storeCopy}>
              <small>{t("storeEyebrow")}</small>
              <strong>{t("storeName")}</strong>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
