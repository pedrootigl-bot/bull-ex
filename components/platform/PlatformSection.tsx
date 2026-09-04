"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { HighlightMark } from "@/components/highlights/HighlightMark";
import {
  PLATFORM_HIGHLIGHT_ITEMS,
  type PlatformHighlightItem,
} from "@/components/highlights/highlightsConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./platform.module.css";

const MARQUEE_COPIES = 2;

function HighlightCard({
  item,
  title,
  text,
}: {
  item: PlatformHighlightItem;
  title: string;
  text: string;
}) {
  return (
    <article className={styles.highlightCard}>
      <HighlightMark name={item} />
      <h3 className={styles.highlightTitle}>{title}</h3>
      <p className={styles.highlightText}>{text}</p>
    </article>
  );
}

export function PlatformSection() {
  const t = useTranslations("platform");
  const tHighlights = useTranslations("highlights");
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(reducedMotion);
  const [marqueeActive, setMarqueeActive] = useState(false);

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

  useEffect(() => {
    if (reducedMotion) {
      setMarqueeActive(false);
      return;
    }

    const node = marqueeRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setMarqueeActive(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const motionClass = reducedMotion ? styles.stageStatic : "";
  const openClass = visible ? styles.deviceOpen : "";

  return (
    <section className={styles.section} aria-label={t("aria")}>
      <div className={styles.inner}>
        <header
          className={`${styles.header} ${visible ? styles.headerVisible : ""} ${motionClass}`}
        >
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

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
                sizes="(max-width: 640px) 92vw, min(740px, 78vw)"
                quality={90}
                priority
              />
            </div>

            <div className={styles.baseGlow} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.highlightsRow} aria-label={tHighlights("aria")}>
          {PLATFORM_HIGHLIGHT_ITEMS.map((item) => (
            <HighlightCard
              key={item}
              item={item}
              title={tHighlights(`items.${item}.title`)}
              text={tHighlights(`items.${item}.text`)}
            />
          ))}
        </div>

        <div
          className={`${styles.highlightsMarquee} ${marqueeActive ? styles.highlightsMarqueeActive : ""} ${reducedMotion ? styles.highlightsMarqueeStatic : ""}`}
          ref={marqueeRef}
          aria-label={tHighlights("aria")}
        >
          <div className={styles.highlightsTrack}>
            {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
              <div
                className={styles.highlightsGroup}
                key={`group-${copy}`}
                aria-hidden={copy > 0 || undefined}
              >
                {PLATFORM_HIGHLIGHT_ITEMS.map((item) => (
                  <div className={styles.highlightSlide} key={`${copy}-${item}`}>
                    <HighlightCard
                      item={item}
                      title={tHighlights(`items.${item}.title`)}
                      text={tHighlights(`items.${item}.text`)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
