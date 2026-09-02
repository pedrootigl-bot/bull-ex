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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setOpen(true);
      return;
    }

    const node = stageRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section className={styles.section} aria-label={t("aria")}>
      <div className={styles.inner}>
        <div className={styles.stage} ref={stageRef}>
          <div className={styles.laptop}>
            <div className={`${styles.lid} ${open ? styles.lidOpen : ""} ${reducedMotion ? styles.lidStatic : ""}`}>
              <div className={styles.lidBack} aria-hidden="true" />
              <div className={styles.bezel}>
                <span className={styles.camera} aria-hidden="true" />
                <Image
                  className={styles.image}
                  src="/images/bullex-platform.webp"
                  alt={t("imageAlt")}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 900px) 100vw, min(1180px, 91vw)"
                  quality={100}
                  unoptimized
                />
              </div>
            </div>
            <div className={styles.base} aria-hidden="true">
              <span className={styles.hinge} />
              <span className={styles.deck} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
