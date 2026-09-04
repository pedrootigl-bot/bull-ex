"use client";

import { BlogNavLink } from "@/components/blog/BlogNavLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  KINDNESS_BLOG_HREFS,
  KINDNESS_CARD_IMAGES,
  KINDNESS_CARDS,
  KINDNESS_COPY,
  type KindnessCardId,
} from "./kindnessConfig";
import styles from "./kindness.module.css";

function CardArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8h9M9.2 4.8 13 8l-3.8 3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KindnessCard({ id }: { id: KindnessCardId }) {
  const t = useTranslations("kindness");
  const index = String(KINDNESS_CARDS.indexOf(id) + 1).padStart(2, "0");

  return (
    <BlogNavLink className={styles.card} href={KINDNESS_BLOG_HREFS[id]}>
      <div className={styles.cardMedia}>
        <Image
          className={styles.cardImage}
          src={KINDNESS_CARD_IMAGES[id]}
          alt={t(`cards.${id}.imageAlt`)}
          fill
          sizes="(max-width: 900px) 100vw, 340px"
          quality={85}
        />
        <span className={styles.cardIndex} aria-hidden="true">
          {index}
        </span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{t(`cards.${id}.title`)}</h3>
        <p className={styles.cardText}>{t(`cards.${id}.text`)}</p>
        <span className={styles.cardAction}>
          {t("readMore")}
          <CardArrow />
        </span>
      </div>
    </BlogNavLink>
  );
}

export function KindnessSection() {
  const t = useTranslations("kindness");
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
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
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const motionClass = reducedMotion ? styles.motionStatic : "";
  const revealClass = visible ? styles.revealIn : "";

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      id={KINDNESS_COPY.id}
      aria-labelledby="kindness-title"
    >
      <div className={`${styles.slideOverlay} ${revealClass} ${motionClass}`} aria-hidden="true" />
      <div className={`${styles.slidePanel} ${revealClass} ${motionClass}`}>
        <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title} id="kindness-title">
            {t("title")}
          </h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        <div className={styles.grid}>
          {KINDNESS_CARDS.map((id) => (
            <KindnessCard key={id} id={id} />
          ))}
        </div>

        <div className={styles.closingWrap}>
          <p className={styles.closing}>{t("closing")}</p>
        </div>
        </div>
      </div>
    </section>
  );
}
