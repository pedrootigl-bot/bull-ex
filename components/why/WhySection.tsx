"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { WhyIcon } from "./WhyIcon";
import { WHY_COPY } from "./whyConfig";
import styles from "./why.module.css";

type CardIcon = (typeof WHY_COPY.features)[number] | (typeof WHY_COPY.bars)[number];

const CAROUSEL_CARDS: { icon: CardIcon; group: "features" | "bars" }[] = [
  ...WHY_COPY.features.map((icon) => ({ icon, group: "features" as const })),
  ...WHY_COPY.bars.map((icon) => ({ icon, group: "bars" as const })),
];

export function WhySection() {
  const t = useTranslations("why");
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

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
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const updateActive = () => {
      const slides = carousel.querySelectorAll<HTMLElement>("[data-carousel-slide]");
      if (!slides.length) {
        return;
      }

      const mid = carousel.scrollLeft + carousel.clientWidth / 2;
      let closest = 0;
      let closestDist = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = index;
        }
      });

      setActiveSlide(closest);
    };

    updateActive();
    carousel.addEventListener("scroll", updateActive, { passive: true });
    return () => carousel.removeEventListener("scroll", updateActive);
  }, []);

  const motionClass = reducedMotion ? styles.motionStatic : "";
  const textClass = `${styles.fromLeft} ${visible ? styles.in : ""} ${motionClass}`;
  const imageClass = `${styles.fromRight} ${visible ? styles.in : ""} ${motionClass}`;
  const slideCount = CAROUSEL_CARDS.length;
  const canGoPrev = activeSlide > 0;
  const canGoNext = activeSlide < slideCount - 1;

  function scrollToSlide(index: number) {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const slides = carousel.querySelectorAll<HTMLElement>("[data-carousel-slide]");
    const targetIndex = Math.max(0, Math.min(index, slides.length - 1));
    const target = slides[targetIndex];
    if (!target) {
      return;
    }

    const left = target.offsetLeft - (carousel.clientWidth - target.offsetWidth) / 2;
    carousel.scrollTo({
      left,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  function goToPrevSlide() {
    scrollToSlide(activeSlide - 1);
  }

  function goToNextSlide() {
    scrollToSlide(activeSlide + 1);
  }

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      id={WHY_COPY.id}
      aria-labelledby="why-title"
    >
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.leftCol}>
            <div className={`${styles.intro} ${textClass}`}>
              <p className={styles.eyebrow}>{t("eyebrow")}</p>
              <h2 className={styles.title} id="why-title">
                {t("titleBefore")}
                <span className={styles.highlight}>{t("titleHighlight")}</span>
              </h2>
              <p className={styles.subtitle}>{t("subtitle")}</p>
            </div>

            <div className={styles.features}>
              {WHY_COPY.features.map((icon) => (
                <article
                  className={`${styles.feature} ${styles.fromDown} ${visible ? styles.in : ""} ${motionClass}`}
                  key={icon}
                >
                  <div className={styles.iconWrap}>
                    <WhyIcon name={icon} />
                  </div>
                  <div>
                    <h3>{t(`features.${icon}.title`)}</h3>
                    <p>{t(`features.${icon}.text`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={`${styles.visual} ${imageClass}`}>
            <Image
              className={styles.photo}
              src="/images/bullex-why-trader.webp"
              alt={t("photoAlt")}
              width={682}
              height={1024}
              sizes="(max-width: 980px) 70vw, 360px"
              quality={90}
            />
          </div>

          <div className={`${styles.bar} ${textClass} ${styles.delayBar}`}>
            {WHY_COPY.bars.map((icon) => (
              <article className={styles.barItem} key={icon}>
                <div className={styles.iconWrap}>
                  <WhyIcon name={icon} />
                </div>
                <div>
                  <h3>{t(`bars.${icon}.title`)}</h3>
                  <p>{t(`bars.${icon}.text`)}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.carouselBlock}>
            <div className={styles.carouselShell}>
              <button
                className={styles.carouselArrow}
                type="button"
                onClick={goToPrevSlide}
                disabled={!canGoPrev}
                aria-label={t("carouselPrev")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M10 3.5 5.5 8 10 12.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={styles.carousel}
                ref={carouselRef}
                tabIndex={0}
                aria-label={t("carouselLabel")}
                aria-roledescription="carousel"
              >
                {CAROUSEL_CARDS.map(({ icon, group }, index) => (
                  <article
                    className={group === "features" ? styles.feature : styles.barItem}
                    data-carousel-slide
                    aria-hidden={index !== activeSlide}
                    key={`carousel-${group}-${icon}`}
                  >
                    <div className={styles.iconWrap}>
                      <WhyIcon name={icon} />
                    </div>
                    <div>
                      <h3>{t(`${group}.${icon}.title`)}</h3>
                      <p>{t(`${group}.${icon}.text`)}</p>
                    </div>
                  </article>
                ))}
              </div>

              <button
                className={styles.carouselArrow}
                type="button"
                onClick={goToNextSlide}
                disabled={!canGoNext}
                aria-label={t("carouselNext")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M6 3.5 10.5 8 6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className={styles.carouselDots} aria-hidden="true">
              {CAROUSEL_CARDS.map(({ icon, group }, index) => (
                <span
                  key={`dot-${group}-${icon}`}
                  className={`${styles.carouselDot} ${index === activeSlide ? styles.carouselDotActive : ""}`}
                />
              ))}
            </div>
          </div>

          <p className={`${styles.callout} ${textClass} ${styles.delayCallout}`}>
            <WhyIcon name="bull" />
            <span>
              {t.rich("callout", {
                highlight: (chunks) => <span className={styles.highlight}>{chunks}</span>,
              })}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.divider} aria-hidden="true" />
    </section>
  );
}
