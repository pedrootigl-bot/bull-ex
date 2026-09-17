"use client";

import { bullexRegisterHref } from "@/components/hero/heroConfig";
import { useFormatMoney } from "@/hooks/useFormatMoney";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { DEMO_ACCOUNT_CARDS, DEMO_ACCOUNT_COPY, type DemoAccountCardId } from "./demoAccountConfig";
import styles from "./demoAccount.module.css";

function CardIcon({ id }: { id: DemoAccountCardId }) {
  switch (id) {
    case "balance":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M6.5 12h.01M17.5 12h.01"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "access":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "refill":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 12a8 8 0 1 1-2.6-5.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M20 4v4h-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "difference":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 4v16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2.5 2.8"
          />
          <path d="M4 16.5V9.5M8 16.5V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 16.5v-4M20 16.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

export function DemoAccountSection() {
  const t = useTranslations("demoAccount");
  const locale = useLocale();
  const { moneyParams } = useFormatMoney();
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
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const revealClass = `${styles.reveal} ${visible ? styles.revealIn : ""} ${reducedMotion ? styles.motionStatic : ""}`;

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      id={DEMO_ACCOUNT_COPY.id}
      aria-labelledby="demo-account-title"
    >
      <div className={styles.inner}>
        <header className={`${styles.header} ${revealClass}`}>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2 className={styles.title} id="demo-account-title">
            {t("title")}
          </h2>
          <p className={styles.subtitle}>
            {t.rich("subtitle", {
              demoBalance: moneyParams.demoBalance,
              highlight: (chunks) => (
                <span className={styles.subtitleHighlight}>{chunks}</span>
              ),
            })}
          </p>
        </header>

        <div className={styles.grid}>
          {DEMO_ACCOUNT_CARDS.map((id, index) => (
            <article
              className={`${styles.card} ${revealClass}`}
              key={id}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <span className={styles.cardIcon} aria-hidden="true">
                <CardIcon id={id} />
              </span>
              <h3 className={styles.cardTitle}>
                {t(`cards.${id}.title`, { demoBalance: moneyParams.demoBalance })}
              </h3>
              <p className={styles.cardText}>
                {t(`cards.${id}.text`, { demoBalance: moneyParams.demoBalance })}
              </p>
            </article>
          ))}
        </div>

        <div className={`${styles.actions} ${revealClass}`}>
          <a
            className={styles.cta}
            href={bullexRegisterHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("cta")}
            <span className={styles.ctaIcon} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.5 8h9M9.2 4.8 13 8l-3.8 3.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
          <p className={styles.note}>{t("note")}</p>
        </div>
      </div>
    </section>
  );
}
