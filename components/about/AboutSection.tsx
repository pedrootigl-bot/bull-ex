"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ABOUT_COPY } from "./aboutConfig";
import styles from "./about.module.css";

export function AboutSection() {
  const t = useTranslations("about");
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
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const fadeClass = `${styles.fade} ${visible ? styles.fadeIn : ""} ${reducedMotion ? styles.motionStatic : ""}`;

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      id={ABOUT_COPY.id}
      aria-labelledby="about-title"
    >
      <div className={styles.grid}>
        <div className={`${styles.media} ${fadeClass} ${styles.fadeMedia}`}>
          <Image
            className={styles.image}
            src="/images/bull-quem-somos.webp"
            alt={t("imageAlt")}
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            quality={85}
          />
          <div className={styles.mediaFade} aria-hidden="true" />
        </div>

        <div className={`${styles.copy} ${fadeClass} ${styles.fadeCopy}`}>
          <h2 className={styles.title} id="about-title">
            {t("title")}
          </h2>
          <div className={styles.paragraphs}>
            <p className={styles.lead}>{t("lead")}</p>
            <p>{t("body")}</p>
            <p className={styles.tagline}>{t("tagline")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
