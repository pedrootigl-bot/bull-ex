"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import {
  PRIZE_CARDS,
  PRIZE_IMAGES,
  PRIZE_POINTS,
  PRIZES_COPY,
  type PrizeId,
} from "./prizesConfig";
import styles from "./prizes.module.css";

function PointIcon({ item }: { item: (typeof PRIZE_POINTS)[number] }) {
  switch (item) {
    case "points":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M2 12.5 6.2 7.8l2.6 2.4L14 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "redeem":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M8 2.2 9.7 6l4.1.4-3.1 2.7.9 4L8 11.2 4.4 13.1l.9-4L2.2 6.4 6.3 6 8 2.2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
      );
    case "safe":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M8 2.4 3.4 4.2v4.1c0 3 2 4.9 4.6 5.7 2.6-.8 4.6-2.7 4.6-5.7V4.2L8 2.4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );
    default: {
      const exhaustive: never = item;
      return exhaustive;
    }
  }
}

function PrizeReveal({
  id,
  index,
  reverse,
}: {
  id: PrizeId;
  index: number;
  reverse: boolean;
}) {
  const t = useTranslations("prizes");
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const src = PRIZE_IMAGES[id];
  const number = String(index + 1).padStart(2, "0");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.42],
    ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)"],
  );
  const scale = useTransform(scrollYProgress, [0, 0.42, 1], [1.28, 1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const copyOpacity = useTransform(scrollYProgress, [0.08, 0.36], [0, 1]);
  const copyY = useTransform(scrollYProgress, [0.08, 0.36], [28, 0]);

  return (
    <article
      className={`${styles.reveal} ${reverse ? styles.revealReverse : ""}`}
      ref={ref}
    >
      <motion.div
        className={styles.revealCopy}
        style={
          reducedMotion
            ? undefined
            : {
                opacity: copyOpacity,
                y: copyY,
              }
        }
      >
        <div className={styles.copyMeta}>
          <span className={styles.index}>{number}</span>
          {id === "car" ? <span className={styles.badge}>{t("featuredBadge")}</span> : null}
        </div>

        <p className={styles.product}>{t(`cards.${id}.title`)}</p>
        <h3 className={styles.cardStatement}>{t(`cards.${id}.text`)}</h3>
      </motion.div>

      <motion.div
        className={styles.revealMask}
        style={reducedMotion ? undefined : { clipPath }}
      >
        {src ? (
          <motion.div
            className={styles.revealMedia}
            style={
              reducedMotion
                ? undefined
                : {
                    scale,
                    y: imageY,
                  }
            }
          >
            <Image
              className={styles.revealPhoto}
              src={src}
              alt={t(`cards.${id}.imageAlt`)}
              fill
              sizes="(max-width: 900px) 100vw, min(720px, 52vw)"
              quality={100}
              priority={index === 0}
            />
          </motion.div>
        ) : (
          <div className={styles.placeholder} aria-hidden="true" />
        )}
      </motion.div>
    </article>
  );
}

export function PrizesSection() {
  const t = useTranslations("prizes");

  return (
    <section className={styles.section} id={PRIZES_COPY.id} aria-labelledby="prizes-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2 className={styles.title} id="prizes-title">
            {t("title")}
          </h2>
          <p className={styles.lead}>
            {t("leadBefore")}
            <span className={styles.highlight}>{t("leadHighlight")}</span>
            {t("leadAfter")}
          </p>
          <p className={styles.body}>{t("body")}</p>

          <div className={styles.introActions}>
            <a className={styles.cta} href={PRIZES_COPY.ctaHref}>
              <span className={styles.ctaBeam} aria-hidden="true" />
              <span className={styles.ctaInner}>
                {t("cta")}
                <span className={styles.ctaIcon} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8.2 3.5 12 7l-3.8 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </a>

            <ul className={styles.points}>
              {PRIZE_POINTS.map((item) => (
                <li key={item}>
                  <span className={styles.pointIcon} aria-hidden="true">
                    <PointIcon item={item} />
                  </span>
                  {t(`points.${item}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.reveals}>
          {PRIZE_CARDS.map((id, index) => (
            <PrizeReveal id={id} index={index} key={id} reverse={index % 2 === 1} />
          ))}
        </div>

        <footer className={styles.bar}>
          <p className={styles.barNote}>{t("barNote")}</p>
          <p className={styles.barSocial}>{t("barSocial")}</p>
        </footer>
      </div>
    </section>
  );
}
