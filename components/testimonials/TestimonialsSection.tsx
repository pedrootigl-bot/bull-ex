"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS, TESTIMONIALS_COPY, type TestimonialStars } from "./testimonialsConfig";
import styles from "./testimonials.module.css";

function StarRow({ count, label }: { count: TestimonialStars; label: string }) {
  return (
    <div className={styles.stars} aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < count;
        return (
          <svg
            key={index}
            className={filled ? styles.starOn : styles.starOff}
            width="15"
            height="15"
            viewBox="0 0 15 15"
            aria-hidden="true"
          >
            <path d="M7.5 1.2 9.2 5l4.1.4-3.1 2.7.9 4-3.6-2.1-3.6 2.1.9-4L1.7 5.4 5.8 5 7.5 1.2Z" />
          </svg>
        );
      })}
    </div>
  );
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(TESTIMONIALS.length);
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
        setVisibleCount((count) => (count === 0 ? 1 : count));
        observer.disconnect();
      },
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  function handlePopEnd(index: number) {
    if (reducedMotion) {
      return;
    }
    if (index !== visibleCount - 1) {
      return;
    }
    if (visibleCount >= TESTIMONIALS.length) {
      return;
    }
    setVisibleCount((count) => count + 1);
  }

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      id={TESTIMONIALS_COPY.id}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2 className={styles.title} id="testimonials-title">
            {t("title")}
          </h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        <ul className={styles.grid}>
          {TESTIMONIALS.map((item, index) => {
            const isVisible = index < visibleCount;

            return (
              <li
                key={item.id}
                className={`${styles.card} ${isVisible ? styles.cardPop : styles.cardHidden} ${reducedMotion ? styles.motionStatic : ""}`}
                onAnimationEnd={(event) => {
                  if (event.target !== event.currentTarget) {
                    return;
                  }
                  handlePopEnd(index);
                }}
              >
                <div className={styles.cardTop}>
                  <Image
                    className={styles.photo}
                    src={item.photo}
                    alt={t(`items.${item.id}.photoAlt`)}
                    width={72}
                    height={72}
                    sizes="72px"
                    quality={85}
                  />
                  <div>
                    <p className={styles.name}>{item.name}</p>
                    <StarRow count={item.stars} label={t("stars", { count: item.stars })} />
                  </div>
                </div>
                <p className={styles.quote}>{t(`items.${item.id}.quote`)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
