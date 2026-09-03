"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./platform.module.css";

export function PlatformSection() {
  const t = useTranslations("platform");
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const node = stageRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section className={styles.section} aria-label={t("aria")}>
      <div className={styles.inner}>
        <div
          className={`${styles.stage} ${visible ? styles.stageVisible : ""} ${reducedMotion ? styles.stageStatic : ""}`}
          ref={stageRef}
        >
          <Image
            className={styles.image}
            src="/images/bullex-platform-devices.webp"
            alt={t("imageAlt")}
            width={1024}
            height={682}
            sizes="(max-width: 900px) 100vw, min(1180px, 91vw)"
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
