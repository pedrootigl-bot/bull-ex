"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useFormatMoney } from "@/hooks/useFormatMoney";
import { MONEY_AMOUNTS } from "@/i18n/moneyAmounts";
import { useViewportTier } from "@/hooks/useViewportTier";
import gsap from "gsap";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Locale } from "@/i18n/config";
import { HERO_COPY, HERO_THEME, NAV_COPY, bullexRegisterHref } from "./heroConfig";
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
    case "markets":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 12.5 5.5 8l2.6 2.4L14 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "why":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4.2 11.2 8 3.8l3.8 7.4H4.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M6.2 9.4h3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "prizes":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M5.2 7.2V4.6h5.6v2.6c0 1.7-1.2 3-2.8 3s-2.8-1.3-2.8-3Z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5.2 4.6H3.6c-.7 0-1.2.6-1.1 1.3.2 1.2 1.2 2 2.4 2.1M10.8 4.6h1.6c.7 0 1.2.6 1.1 1.3-.2 1.2-1.2 2-2.4 2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M6.4 13.2h3.2M8 10.2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
  const locale = useLocale() as Locale;
  const registerHref = bullexRegisterHref(locale);
  const { formatMoney, moneyParams } = useFormatMoney();
  const contentRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  const entrancePlayedRef = useRef(false);
  const stats = [
    {
      value: formatMoney(MONEY_AMOUNTS.demoBalance, { maximumFractionDigits: 0 }),
      label: tHero("stats.demoLabel"),
    },
    { value: tHero("stats.feesValue"), label: tHero("stats.feesLabel") },
    { value: tHero("stats.hoursValue"), label: tHero("stats.hoursLabel") },
  ];

  useEffect(() => {
    const update = () => setNavScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) {
      return;
    }

    if (reducedMotion) {
      hero.classList.remove(styles.heroPending);
      hero.classList.add(styles.heroEntered);
      return;
    }

    if (!globeReady || entrancePlayedRef.current) {
      return;
    }

    const intro = content.querySelectorAll<HTMLElement>("[data-hero-intro]");
    const visuals = hero.querySelectorAll<HTMLElement>("[data-hero-visual]");
    const nav = navRef.current;
    const riseItems = gsap.utils.toArray<HTMLElement>(
      content.querySelectorAll(`[data-hero-rise]`),
    );
    const freq = hero.querySelector<HTMLElement>(`.${styles.freq}`);
    const revealItems = [...(nav ? [nav] : []), ...riseItems, ...(freq ? [freq] : [])];

    const ctx = gsap.context(() => {
      gsap.set(intro, { autoAlpha: 0, y: 18 });
      gsap.set(revealItems, { autoAlpha: 0, y: 20 });

      const introTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          entrancePlayedRef.current = true;
          hero.classList.remove(styles.heroPending);
          hero.classList.add(styles.heroEntered);
          gsap.set(visuals, { clearProps: "all" });
          gsap.set(intro, { clearProps: "opacity,visibility,transform" });
          gsap.set(revealItems, { clearProps: "all" });
        },
      });

      introTimeline.fromTo(
        visuals,
        { autoAlpha: 0, scale: 0.98, transformOrigin: "50% 38%" },
        { autoAlpha: 1, scale: 1, duration: 1.05, ease: "power1.out" },
        0,
      );

      introTimeline.fromTo(
        intro,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08, ease: "power2.out" },
        ">+=0.4",
      );

      introTimeline.fromTo(
        revealItems,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power2.out" },
        ">+=0.15",
      );
    }, hero);

    return () => ctx.revert();
  }, [reducedMotion, globeReady]);

  return (
    <header
      ref={heroRef}
      id={HERO_COPY.id}
      className={`${styles.hero} ${styles.heroPending}`}
      style={{ ["--hero-accent" as string]: HERO_THEME.accent }}
    >
      <nav
        ref={navRef}
        className={`${styles.nav} ${navScrolled ? styles.navScrolled : ""} ${menuOpen ? styles.navMenuOpen : ""}`}
        aria-label={tNav("aria")}
      >
        <div className={styles.navShell}>
          <div className={styles.navInner}>
            <a className={styles.brand} href={`#${HERO_COPY.id}`} onClick={() => setMenuOpen(false)}>
              <Image
                src="/images/bullex-logo.webp"
                alt={tNav("brand")}
                width={755}
                height={330}
                className={styles.brandLogo}
                priority
              />
            </a>

            <ul className={styles.navLinks}>
              {NAV_COPY.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setMenuOpen(false)}>
                    <NavLinkIcon name={link.icon} />
                    <span>{tNav(link.labelKey)}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.navEnd}>
              <LanguageSwitcher />
              <a
                className={styles.navRegister}
                href={registerHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tNav("register")}
              </a>
              <a className={styles.navCta} href={HERO_COPY.ctaHref} target="_blank" rel="noopener noreferrer">
                <span className={styles.beam} aria-hidden="true" />
                <span className={styles.navCtaInner}>
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
                </span>
              </a>
              <button
                className={styles.menuToggle}
                type="button"
                aria-expanded={menuOpen}
                aria-controls="hero-mobile-nav"
                aria-label={menuOpen ? tNav("menuClose") : tNav("menuOpen")}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className={styles.menuToggleBars} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </button>
            </div>
          </div>

          <div className={styles.mobilePanel} id="hero-mobile-nav" hidden={!menuOpen}>
            <a
              className={styles.mobileRegister}
              href={registerHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              {tNav("register")}
            </a>
            <ul className={styles.mobileLinks}>
              {NAV_COPY.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setMenuOpen(false)}>
                    <NavLinkIcon name={link.icon} />
                    <span>{tNav(link.labelKey)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className={styles.heroStage}>
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

        <div className={styles.heroVisuals} data-hero-visual>
          <HeroGlow reducedMotion={reducedMotion} />
          <FinancialGlobe
            reducedMotion={reducedMotion}
            tier={tier}
            onReadyChange={setGlobeReady}
          />
          <OrbitalLines reducedMotion={reducedMotion} dense={tier === "desktop"} />
        </div>

        <section className={styles.content} ref={contentRef}>
          <div className={styles.contentIntro}>
            <div className={styles.headlineWrap}>
              <div className={styles.menuCard} data-hero-rise>
                <span className={styles.beam} aria-hidden="true" />
                <span className={styles.menuCardInner}>
                  <span className={styles.menuCardIcon} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="5" cy="4.2" r="2" stroke="currentColor" strokeWidth="1.3" />
                      <circle cx="9.4" cy="4.8" r="1.6" stroke="currentColor" strokeWidth="1.3" />
                      <path
                        d="M1.8 11.2c.5-1.7 1.9-2.6 3.2-2.6s2.7.9 3.2 2.6M8.2 8.8c.9-.2 1.9.2 2.5 1.4"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  {tHero("investorsCard")}
                </span>
              </div>
              <h1 className={styles.headline} data-hero-intro>
                {tHero("headline")}
              </h1>
            </div>
            <p className={styles.subheadline} data-hero-intro>
              {tHero("subheadline", moneyParams)}
            </p>
          </div>

          <div className={styles.contentRise}>
            <a
              className={styles.cta}
              href={HERO_COPY.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              data-hero-rise
            >
              <span className={styles.beam} aria-hidden="true" />
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
            <div className={styles.stats} data-hero-rise>
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
          </div>
        </section>

        <div className={styles.freq} aria-hidden="true">
          {FREQ_HEIGHTS.map((height, index) => (
            <i key={`${height}-${index}`} style={{ height }} />
          ))}
        </div>
      </div>
    </header>
  );
}
