"use client";

import dynamic from "next/dynamic";
import { HERO_COPY, HERO_THEME, NAV_COPY } from "./heroConfig";
import { HeroGlow } from "./HeroGlow";
import { OrbitalLines } from "./OrbitalLines";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useViewportTier } from "@/hooks/useViewportTier";
import styles from "./hero.module.css";

const FinancialGlobe = dynamic(
  () => import("./FinancialGlobe").then((mod) => mod.FinancialGlobe),
  { ssr: false },
);

const FREQ_HEIGHTS = [
  18, 34, 22, 48, 28, 62, 40, 20, 54, 36, 70, 26, 44, 16, 58, 32, 50, 24, 66, 38,
  18, 46, 30, 60, 22, 42, 14, 52, 28, 64, 36, 20, 48, 26, 56, 18, 40, 72, 30, 44,
  22, 58,
];

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const tier = useViewportTier();
  const rgb = HERO_THEME.accentRgb;

  return (
    <header
      className={styles.hero}
      style={{ ["--hero-accent" as string]: HERO_THEME.accent }}
    >
      <div className={styles.background} />
      <svg className={styles.marketMarks} viewBox="0 0 1440 900" aria-hidden="true">
        <path
          d="M80 720 l18 -22 14 10 22 -28 12 8 26 -34"
          fill="none"
          stroke={`rgba(${rgb}, 0.9)`}
          strokeWidth="1.2"
        />
        <path
          d="M1180 640 l12 16 20 -24 10 8 28 -20"
          fill="none"
          stroke={`rgba(${rgb}, 0.9)`}
          strokeWidth="1.2"
        />
      </svg>

      <HeroGlow reducedMotion={reducedMotion} />
      <FinancialGlobe reducedMotion={reducedMotion} tier={tier} />
      <OrbitalLines reducedMotion={reducedMotion} dense={tier === "desktop"} />

      <nav className={styles.nav} aria-label="Principal">
        <a className={styles.brand} href="/">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M4 16.5 11 4.5l7 12" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M7.2 16.5h7.6" stroke={HERO_THEME.accent} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {NAV_COPY.brand}
        </a>
        <ul className={styles.navLinks}>
          {NAV_COPY.links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a className={styles.navCta} href={HERO_COPY.ctaHref} target="_blank" rel="noopener noreferrer">
          {NAV_COPY.login}
          <span className={styles.navCtaIcon} aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 5h7M5.5 2l3 3-3 3"
                stroke="#fff"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </nav>

      <section className={styles.content}>
        <h1 className={styles.headline}>{HERO_COPY.headline}</h1>
        <p className={styles.subheadline}>{HERO_COPY.subheadline}</p>
        <a className={styles.cta} href={HERO_COPY.ctaHref} target="_blank" rel="noopener noreferrer">
          {HERO_COPY.cta}
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
        </a>
        <div className={styles.stats}>
          {HERO_COPY.stats.map((stat, index) => (
            <div key={stat.label} style={{ display: "contents" }}>
              {index > 0 ? <div className={styles.divider} aria-hidden="true" /> : null}
              <div className={styles.stat}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.freq} aria-hidden="true">
        {FREQ_HEIGHTS.map((height, index) => (
          <i key={`${height}-${index}`} style={{ height }} />
        ))}
      </div>
    </header>
  );
}
