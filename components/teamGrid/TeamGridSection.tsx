"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { HERO_COPY } from "@/components/hero/heroConfig";
import { TEAM_GRID_IMAGE } from "@/components/highlights/highlightsConfig";
import { useFormatMoney } from "@/hooks/useFormatMoney";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TEAM_GRID_STATS, type TeamGridStatId } from "./teamGridConfig";
import styles from "./teamGrid.module.css";

function StatIcon({ id }: { id: TeamGridStatId }) {
  switch (id) {
    case "deposit":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="7" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5 7v4.5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M5 11.5V16c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-4.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M12 9.5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "investment":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 18h16M7 16V11M12 16V8M17 16V6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

function StatCard({
  id,
  eyebrow,
  lead,
  value,
}: {
  id: TeamGridStatId;
  eyebrow: string;
  lead: string;
  value: string;
}) {
  return (
    <article className={styles.statCard}>
      <div className={styles.statCopy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <p className={styles.lead}>{lead}</p>
        <p className={styles.value}>{value}</p>
      </div>
      <div className={styles.statIconWrap}>
        <StatIcon id={id} />
      </div>
    </article>
  );
}

export function TeamGridSection() {
  const t = useTranslations("teamGrid");
  const tNav = useTranslations("navigation");
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
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const motionClass = reducedMotion ? styles.motionStatic : "";
  const revealClass = visible ? styles.revealIn : "";
  const fadeClass = `${styles.fadeIn} ${visible ? styles.in : ""} ${motionClass}`;

  const statValues: Record<TeamGridStatId, string> = {
    deposit: moneyParams.minDeposit,
    investment: moneyParams.minInvestment,
  };

  return (
    <section className={styles.section} ref={sectionRef} aria-label={t("aria")}>
      <div className={styles.inner}>
        <div className={styles.leftSide}>
          <header className={`${styles.leftHeader} ${fadeClass} ${styles.fadeHeader}`}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleStrong}>{t("titleStrong")}</span>
              <span className={styles.titleLight}>{t("titleLight")}</span>
            </h2>
            <p className={styles.sectionSubtitle}>{t("subtitle")}</p>
          </header>

          <div className={styles.statGrid}>
            {TEAM_GRID_STATS.map((id, index) => (
              <div
                key={id}
                className={`${fadeClass} ${styles.fadeCard} ${index === 1 ? styles.fadeCardSecond : ""}`}
              >
                <StatCard
                  id={id}
                  eyebrow={t(`cards.${id}.eyebrow`)}
                  lead={t(`cards.${id}.lead`)}
                  value={statValues[id]}
                />
              </div>
            ))}
          </div>

          <a
            className={`${styles.enterBtn} ${fadeClass} ${styles.fadeButton}`}
            href={HERO_COPY.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.enterBtnInner}>
              {tNav("login")}
              <span className={styles.enterBtnIcon} aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1.5 5h7M5.5 2l3 3-3 3"
                    stroke="#111"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </a>
        </div>

        <div className={`${styles.mediaPanel} ${revealClass} ${motionClass}`}>
          <div className={styles.mediaReveal}>
            <Image
              className={styles.mediaImage}
              src={TEAM_GRID_IMAGE}
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 900px) 56vw, 640px"
              quality={90}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
