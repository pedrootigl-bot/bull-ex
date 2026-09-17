"use client";

import { useAllowHeavyVisuals } from "@/hooks/useLiteExperience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useFormatMoney } from "@/hooks/useFormatMoney";
import { MONEY_AMOUNTS } from "@/i18n/moneyAmounts";
import { useViewportTier } from "@/hooks/useViewportTier";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { HERO_COPY, HERO_THEME } from "./heroConfig";
import { HeroGlow } from "./HeroGlow";
import styles from "./hero.module.css";

const FinancialGlobe = dynamic(
  () => import("./FinancialGlobe").then((mod) => mod.FinancialGlobe),
  { ssr: false },
);

const OrbitalLines = dynamic(
  () => import("./OrbitalLines").then((mod) => mod.OrbitalLines),
  { ssr: false },
);

const FREQ_HEIGHTS = [
  18, 34, 22, 48, 28, 62, 40, 20, 54, 36, 70, 26, 44, 16, 58, 32, 50, 24, 66, 38,
  18, 46, 30, 60, 22, 42, 14, 52, 28, 64, 36, 20, 48, 26, 56, 18, 40, 72, 30, 44,
  22, 58,
];

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const allowHeavy = useAllowHeavyVisuals();
  const lite = !allowHeavy;
  const tier = useViewportTier();
  const rgb = HERO_THEME.accentRgb;
  const tHero = useTranslations("hero");
  const { formatMoney, moneyParams } = useFormatMoney();
  const contentRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
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

  // Modo leve: libera o hero na hora (sem esperar WebGL/GSAP)
  useEffect(() => {
    if (!lite && !reducedMotion) {
      return;
    }
    const hero = heroRef.current;
    if (!hero) {
      return;
    }
    hero.classList.remove(styles.heroPending);
    hero.classList.add(styles.heroEntered);
    setGlobeReady(true);
  }, [lite, reducedMotion]);

  useEffect(() => {
    if (lite || reducedMotion || globeReady) {
      return;
    }
    const timer = window.setTimeout(() => setGlobeReady(true), 1200);
    return () => window.clearTimeout(timer);
  }, [globeReady, reducedMotion, lite]);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content || lite || reducedMotion) {
      return;
    }

    if (!globeReady || entrancePlayedRef.current) {
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      if (cancelled) {
        return;
      }

      const intro = content.querySelectorAll<HTMLElement>("[data-hero-intro]");
      const visuals = hero.querySelectorAll<HTMLElement>("[data-hero-visual]");
      const riseItems = gsap.utils.toArray<HTMLElement>(
        content.querySelectorAll(`[data-hero-rise]`),
      );
      const freq = hero.querySelector<HTMLElement>(`.${styles.freq}`);
      const revealItems = [...riseItems, ...(freq ? [freq] : [])];

      ctx = gsap.context(() => {
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
          { autoAlpha: 1, scale: 1, duration: 0.85, ease: "power1.out" },
          0,
        );

        introTimeline.fromTo(
          intro,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power2.out" },
          ">+=0.2",
        );

        introTimeline.fromTo(
          revealItems,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          ">+=0.1",
        );
      }, hero);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reducedMotion, globeReady, lite]);

  return (
    <header
      ref={heroRef}
      id={HERO_COPY.id}
      className={`${styles.hero} ${lite || reducedMotion ? styles.heroEntered : styles.heroPending}`}
      style={{ ["--hero-accent" as string]: HERO_THEME.accent }}
    >
      <div className={styles.heroStage}>
        <div className={styles.background} />
        {!lite ? (
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
        ) : null}

        <div className={styles.heroVisuals} data-hero-visual>
          <HeroGlow reducedMotion={reducedMotion || lite} />
          {allowHeavy ? (
            <>
              <FinancialGlobe
                reducedMotion={reducedMotion}
                tier={tier}
                onReadyChange={setGlobeReady}
              />
              <OrbitalLines reducedMotion={reducedMotion} dense={tier === "desktop"} />
            </>
          ) : null}
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
                {tHero.rich("headline", {
                  br: () => <br />,
                })}
              </h1>
            </div>
            <p className={styles.subheadline} data-hero-intro>
              {tHero("subheadline", moneyParams)}
            </p>
            <a
              className={styles.cta}
              href={HERO_COPY.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              data-hero-rise
            >
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

          <div className={styles.contentRise}>
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

        {!lite ? (
          <div className={styles.freq} aria-hidden="true">
            {FREQ_HEIGHTS.map((height, index) => (
              <i key={`${height}-${index}`} style={{ height }} />
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
