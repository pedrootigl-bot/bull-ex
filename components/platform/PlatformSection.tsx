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
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
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

  const motionClass = reducedMotion ? styles.stageStatic : "";
  const openClass = visible ? styles.deviceOpen : "";

  return (
    <section className={styles.section} aria-label={t("aria")}>
      <div className={styles.inner}>
        <div
          className={`${styles.stage} ${visible ? styles.stageVisible : ""} ${motionClass}`}
          ref={stageRef}
        >
          <div className={`${styles.deviceScene} ${openClass}`}>
            <div className={styles.deviceReveal}>
              <Image
                className={styles.deviceImage}
                src="/images/bullex-platform-devices.webp"
                alt={t("imageAlt")}
                width={1024}
                height={682}
                sizes="(max-width: 900px) 100vw, min(1180px, 91vw)"
                quality={90}
                priority
              />
            </div>

            <div className={styles.baseGlow} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
