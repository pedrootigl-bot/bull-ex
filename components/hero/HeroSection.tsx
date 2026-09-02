"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useViewportTier } from "@/hooks/useViewportTier";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { HERO_COPY, HERO_THEME, NAV_COPY } from "./heroConfig";
import { HeroGlow } from "./HeroGlow";
import { OrbitalLines } from "./OrbitalLines";
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

function NavLinkIcon({ name }: { name: (typeof NAV_COPY.links)[number]["icon"] }) {
  switch (name) {
    case "about":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3.4 13c.7-2.1 2.4-3.2 4.6-3.2s3.9 1.1 4.6 3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "markets":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 12.5 5.5 8l2.6 2.4L14 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pricing":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2.8 8.8 8.2 3.4a1.2 1.2 0 0 1 .9-.4h3.6v3.6c0 .3-.1.7-.4.9L7.2 13.2a1.2 1.2 0 0 1-1.8 0L2.8 10.6a1.2 1.2 0 0 1 0-1.8Z" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="11.2" cy="4.8" r="0.7" fill="currentColor" />
        </svg>
      );
    case "faq":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="5.4" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6.4 6.3c.2-.9 1-1.4 1.7-1.4.9 0 1.6.5 1.6 1.4 0 .9-.7 1.2-1.3 1.6-.4.2-.6.5-.6 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="8" cy="11.2" r="0.7" fill="currentColor" />
        </svg>
      );
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const tier = useViewportTier();
  const rgb = HERO_THEME.accentRgb;
  const tNav = useTranslations("navigation");
  const tHero = useTranslations("hero");
  const stats = [
    { value: tHero("stats.demoValue"), label: tHero("stats.demoLabel") },
    { value: tHero("stats.feesValue"), label: tHero("stats.feesLabel") },
    { value: tHero("stats.hoursValue"), label: tHero("stats.hoursLabel") },
  ];

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

      <nav className={styles.nav} aria-label={tNav("aria")}>
        <div className={styles.navInner}>
          <Link className={styles.brand} href="/">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M4 16.5 11 4.5l7 12" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M7.2 16.5h7.6" stroke={HERO_THEME.accent} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {tNav("brand")}
          </Link>
          <ul className={styles.navLinks}>
            {NAV_COPY.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>
                  <NavLinkIcon name={link.icon} />
                  <span>{tNav(link.labelKey)}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.navEnd}>
            <LanguageSwitcher />
            <a className={styles.navCta} href={HERO_COPY.ctaHref} target="_blank" rel="noopener noreferrer">
              {tNav("login")}
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
          </div>
        </div>
      </nav>

      <section className={styles.content}>
        <h1 className={styles.headline}>{tHero("headline")}</h1>
        <p className={styles.subheadline}>{tHero("subheadline")}</p>
        <a className={styles.cta} href={HERO_COPY.ctaHref} target="_blank" rel="noopener noreferrer">
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
        </a>
        <div className={styles.stats}>
          {stats.map((stat, index) => (
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
