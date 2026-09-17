"use client";

import { HERO_COPY } from "@/components/hero/heroConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { WhyIcon } from "./WhyIcon";
import { WHY_COPY } from "./whyConfig";
import styles from "./why.module.css";

const FEATURES = WHY_COPY.features;

export function WhySection() {
  const t = useTranslations("why");
  const tHero = useTranslations("hero");
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

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
    if (reducedMotion || paused || !visible) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % FEATURES.length);
    }, WHY_COPY.loopIntervalMs);

    return () => window.clearInterval(timer);
  }, [reducedMotion, paused, visible]);

  const motionClass = reducedMotion ? styles.motionStatic : "";
  const textClass = `${styles.fromLeft} ${visible ? styles.in : ""} ${motionClass}`;
  const imageClass = `${styles.fromRight} ${visible ? styles.in : ""} ${motionClass}`;
  const activeId = FEATURES[activeIndex];

  function selectFeature(index: number) {
    setActiveIndex(index);
    setPaused(true);
    window.setTimeout(() => setPaused(false), WHY_COPY.loopIntervalMs * 1.4);
  }

  function goToPrev() {
    selectFeature((activeIndex - 1 + FEATURES.length) % FEATURES.length);
  }

  function goToNext() {
    selectFeature((activeIndex + 1) % FEATURES.length);
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

            <div
              className={`${styles.loop} ${styles.fromDown} ${visible ? styles.in : ""} ${motionClass}`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className={styles.loopTabs} role="tablist" aria-label={t("carouselLabel")}>
                {FEATURES.map((id, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      id={`why-tab-${id}`}
                      aria-selected={isActive}
                      aria-controls={`why-panel-${id}`}
                      className={`${styles.loopTab} ${isActive ? styles.loopTabActive : ""}`}
                      onClick={() => selectFeature(index)}
                    >
                      <span className={styles.iconWrap}>
                        <WhyIcon name={id} />
                      </span>
                      <span className={styles.loopTabLabel}>{t(`features.${id}.title`)}</span>
                    </button>
                  );
                })}
              </div>

              <div
                className={styles.loopPanel}
                role="tabpanel"
                id={`why-panel-${activeId}`}
                aria-labelledby={`why-tab-${activeId}`}
                key={activeId}
              >
                <div className={styles.loopPanelIcon}>
                  <WhyIcon name={activeId} />
                </div>
                <div>
                  <h3 className={styles.loopPanelTitle}>{t(`features.${activeId}.title`)}</h3>
                  <p className={styles.loopPanelText}>{t(`features.${activeId}.text`)}</p>
                </div>
                <div className={styles.loopProgress} aria-hidden="true">
                  {FEATURES.map((id, index) => (
                    <span
                      key={id}
                      className={`${styles.loopProgressDot} ${index === activeIndex ? styles.loopProgressDotActive : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={`${styles.ctaWrap} ${textClass} ${styles.delayCta}`}>
              <a
                className={styles.cta}
                href={HERO_COPY.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.ctaBeam} aria-hidden="true" />
                <span className={styles.ctaInner}>
                  {tHero("cta")}
                  <span className={styles.ctaIcon} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7h10M8.2 3.5 12 7l-3.8 3.5"
                        stroke="#fff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className={`${styles.visual} ${imageClass}`}>
            <Image
              className={styles.photo}
              src="/images/bullex-why-investor.webp"
              alt={t("photoAlt")}
              width={1024}
              height={921}
              sizes="(max-width: 820px) 90vw, (max-width: 980px) 70vw, 55vw"
              quality={90}
            />
          </div>

          <div
            className={styles.carouselBlock}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className={styles.carouselShell}>
              <button
                className={styles.carouselArrow}
                type="button"
                onClick={goToPrev}
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
                tabIndex={0}
                aria-label={t("carouselLabel")}
                aria-roledescription="carousel"
              >
                {FEATURES.map((id, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      type="button"
                      className={`${styles.carouselCard} ${isActive ? styles.carouselCardActive : ""}`}
                      data-carousel-slide
                      aria-current={isActive ? "true" : undefined}
                      key={`carousel-${id}`}
                      onClick={() => selectFeature(index)}
                    >
                      <div className={styles.iconWrap}>
                        <WhyIcon name={id} />
                      </div>
                      <div>
                        <h3>{t(`features.${id}.title`)}</h3>
                        <p>{t(`features.${id}.text`)}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                className={styles.carouselArrow}
                type="button"
                onClick={goToNext}
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
              {FEATURES.map((id, index) => (
                <button
                  key={`dot-${id}`}
                  type="button"
                  className={`${styles.carouselDot} ${index === activeIndex ? styles.carouselDotActive : ""}`}
                  onClick={() => selectFeature(index)}
                  aria-label={t(`features.${id}.title`)}
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
