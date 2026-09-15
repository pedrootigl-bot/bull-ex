"use client";

import { SiteFooter } from "@/components/footer/Footer";
import { GhostFibers } from "@/components/ghostFibers/GhostFibers";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { bullexLoginHref, bullexRegisterHref } from "@/components/hero/heroConfig";
import { SplitFlapText } from "@/components/splitFlapText/SplitFlapText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Link } from "@/i18n/navigation";
import { withBasePath } from "@/lib/basePath";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, type ReactNode } from "react";
import stackStyles from "@/components/scrollStack/scrollStack.module.css";
import {
  ABOUT_POINTS,
  HERO_HIGHLIGHTS,
  HOW_STEPS,
  RISKFREE_COPY,
  WHAT_IS_POINTS,
} from "./riskfreeConfig";
import styles from "./riskfree.module.css";

function useTradeHrefs() {
  const locale = useLocale();
  return {
    login: bullexLoginHref(locale),
    register: bullexRegisterHref(locale),
  };
}

function FadeTitle({
  as: Tag = "h2",
  id,
  className = "",
  children,
}: {
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.4, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${className} ${styles.titleFade} ${visible ? styles.titleFadeIn : styles.titleFadeOut}`.trim()}
    >
      {children}
    </Tag>
  );
}

function CtaArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 7h10M8.2 3.5 12 7l-3.8 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrimaryCta({
  label,
  href,
  solid = false,
}: {
  label: string;
  href: string;
  solid?: boolean;
}) {
  const isExternal = href.startsWith("http");
  const className = solid ? styles.ctaSolid : styles.cta;
  const content = solid ? (
    <>
      {label}
      <CtaArrow />
    </>
  ) : (
    <>
      <span className={styles.ctaBeam} aria-hidden="true" />
      <span className={styles.ctaInner}>
        {label}
        <span className={styles.ctaIcon}>
          <CtaArrow />
        </span>
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href} prefetch={false}>
      {content}
    </Link>
  );
}

function SecondaryCta({ label, href }: { label: string; href: string }) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a className={styles.ctaSecondary} href={href}>
        {label}
        <CtaArrow />
      </a>
    );
  }

  if (href.includes("#")) {
    return (
      <a className={styles.ctaSecondary} href={withBasePath(href)}>
        {label}
        <CtaArrow />
      </a>
    );
  }

  return (
    <Link className={styles.ctaSecondary} href={href} prefetch={false}>
      {label}
      <CtaArrow />
    </Link>
  );
}

function TextLink({ label, href }: { label: string; href: string }) {
  if (href.startsWith("http") || href.includes("#")) {
    const resolved = href.includes("#") && !href.startsWith("http") ? withBasePath(href) : href;
    return (
      <a className={styles.textLink} href={resolved}>
        {label}
        <CtaArrow />
      </a>
    );
  }

  return (
    <Link className={styles.textLink} href={href} prefetch={false}>
      {label}
      <CtaArrow />
    </Link>
  );
}

function RiskFreeHeader() {
  const t = useTranslations("riskFree");
  const nav = useTranslations("navigation");
  const locale = useLocale();
  const { login, register } = useTradeHrefs();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href="/" prefetch={false}>
          <Image
            src="/images/bullex-logo.webp"
            alt="Bullex"
            width={755}
            height={330}
            className={styles.brandLogo}
            priority
          />
        </Link>

        <nav className={styles.headerNav} aria-label={nav("aria")}>
          <a href={withBasePath(`/${locale}/#ofertas`)}>{nav("prizes")}</a>
          <Link href="/blog" prefetch={false}>
            {nav("blog")}
          </Link>
          <Link href="/" prefetch={false}>
            {t("backToSite")}
          </Link>
        </nav>

        <div className={styles.headerActions}>
          <LanguageSwitcher />
          <a className={styles.loginLink} href={login}>
            {nav("login")}
          </a>
          <a className={styles.headerCta} href={register}>
            {nav("register")}
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroHighlightIcon({ id }: { id: (typeof HERO_HIGHLIGHTS)[number] }) {
  switch (id) {
    case "protect":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 5 6.2v5.1c0 4.2 2.8 7.1 7 8.7 4.2-1.6 7-4.5 7-8.7V6.2L12 3Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m9.3 12 1.8 1.8 3.7-3.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "trade":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 16.5 9.2 11l3.1 3.1L20 7"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 7H20v5.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "community":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="9" cy="8.5" r="2.4" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="16.2" cy="9.2" r="2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M3.8 18.2c.5-2.4 2.5-3.7 5.2-3.7s4.7 1.3 5.2 3.7M13.2 14.8c1.7.1 3.2.9 3.8 2.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "premium":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="m12 3.2 2.2 4.5 5 .7-3.6 3.5.9 5L12 14.7 7.5 16.9l.9-5L4.8 8.4l5-.7L12 3.2Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

function HeroTitleLine({
  text,
  className = "",
  cycleDelay = 320,
}: {
  text: string;
  className?: string;
  cycleDelay?: number;
}) {
  return (
    <SplitFlapText
      className={`${styles.heroSplitFlap} ${className}`.trim()}
      words={["", text]}
      flipDuration={0.06}
      stagger={0.022}
      cycleDelay={cycleDelay}
      charset="alpha"
      flipsPerChar={3}
      tileColor="transparent"
      textColor="inherit"
      tileRadius={0}
      gap={0}
      fontSize="1em"
      loop={false}
      bare
      padTo={text.length}
      style={{
        ["--split-flap-font-size" as string]: "1em",
        ["--split-flap-gap" as string]: "0px",
      }}
    />
  );
}

function HeroSection() {
  const t = useTranslations("riskFree");
  const { register } = useTradeHrefs();
  const titleLine1 = t("hero.titleLine1");
  const titleLine2 = t("hero.titleLine2");
  const titleHighlight = t("hero.titleHighlight");
  const heroTitle = `${titleLine1} ${titleLine2} ${titleHighlight}`;

  return (
    <section className={`${styles.hero} ${styles.sectionBlend} ${styles.sectionBlendTop}`} aria-labelledby="riskfree-h1">
      <div className={styles.heroBg} aria-hidden="true">
        <Image
          src={RISKFREE_COPY.heroBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={88}
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{t("hero.eyebrow")}</p>
          <h1 className={styles.heroTitle} id="riskfree-h1">
            <span className={styles.heroTitleSr}>{heroTitle}</span>
            <span className={styles.heroTitleStack} aria-hidden="true">
              <HeroTitleLine text={titleLine1} cycleDelay={280} />
              <HeroTitleLine text={titleLine2} cycleDelay={520} />
              <HeroTitleLine
                text={titleHighlight}
                className={styles.heroTitleHighlight}
                cycleDelay={760}
              />
            </span>
          </h1>
          <p className={`${styles.heroBody} ${styles.heroFadeItem} ${styles.heroFadeDelay1}`}>
            {t("hero.body")}
          </p>
          <div className={styles.heroActions}>
            <div className={`${styles.heroFadeItem} ${styles.heroFadeDelay2}`}>
              <PrimaryCta label={t("hero.cta")} href={register} solid />
            </div>
            <p className={`${styles.finePrint} ${styles.heroFadeItem} ${styles.heroFadeDelay3}`}>
              {t("hero.finePrint")}
            </p>
          </div>
        </div>
      </div>

      <ul className={styles.heroBar}>
        {HERO_HIGHLIGHTS.map((id) => (
          <li className={styles.heroBarItem} key={id}>
            <span className={styles.heroBarIcon} aria-hidden="true">
              <HeroHighlightIcon id={id} />
            </span>
            <span>{t(`hero.highlights.${id}`)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WhatPointIcon({ id }: { id: (typeof WHAT_IS_POINTS)[number] }) {
  switch (id) {
    case "protected":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 5 6.2v5.1c0 4.2 2.8 7.1 7 8.7 4.2-1.6 7-4.5 7-8.7V6.2L12 3Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m9.2 12.1 1.9 1.9 3.8-3.9"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "loss":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3v3M7.5 7.2A6.5 6.5 0 1 0 18 13.2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M16.2 8.2 18.5 6l2.2 2.3M8 16.5h8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "try":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          <path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

function WhatPointCard({
  id,
  index,
}: {
  id: (typeof WHAT_IS_POINTS)[number];
  index: number;
}) {
  const t = useTranslations("riskFree");

  return (
    <li className={styles.pointCard} style={{ animationDelay: `${index * 0.45}s` }}>
      <span className={styles.pointIcon} aria-hidden="true">
        <WhatPointIcon id={id} />
      </span>
      <h3 className={styles.pointTitle}>{t(`what.points.${id}.title`)}</h3>
      <p className={styles.pointText}>{t(`what.points.${id}.text`)}</p>
    </li>
  );
}

function WhatIsSection() {
  const t = useTranslations("riskFree");
  const { register } = useTradeHrefs();
  const reducedMotion = useReducedMotion();

  return (
    <section className={`${styles.section} ${styles.sectionBlend}`} aria-labelledby="what-title">
      <div className={`${styles.inner} ${styles.whatSplit}`}>
        <header className={styles.whatHead}>
          <p className={styles.eyebrow}>{t("what.eyebrow")}</p>
          <FadeTitle className={styles.sectionTitle} id="what-title">
            {t("what.title")}
          </FadeTitle>
          <p className={styles.sectionBody}>{t("what.body")}</p>
          <TextLink label={t("what.tagline")} href={register} />
        </header>

        <div className={styles.whatAside}>
          <div className={styles.whatVideoWrap}>
            <video
              className={styles.whatVideo}
              src={withBasePath(RISKFREE_COPY.whatVideo)}
              autoPlay={!reducedMotion}
              muted
              loop
              playsInline
              controls={reducedMotion}
              preload="metadata"
              aria-label={t("what.videoAlt")}
            />
          </div>

          <ul className={styles.pointGrid}>
            {WHAT_IS_POINTS.map((id, index) => (
              <WhatPointCard id={id} index={index} key={id} />
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`${styles.pointMarquee} ${reducedMotion ? styles.pointMarqueeStatic : ""}`}
        aria-label={t("what.title")}
      >
        <div className={styles.pointMarqueeViewport}>
          <div className={styles.pointMarqueeTrack}>
            <ul className={styles.pointMarqueeSet}>
              {WHAT_IS_POINTS.map((id, index) => (
                <WhatPointCard id={id} index={index} key={`a-${id}`} />
              ))}
            </ul>
            <ul className={styles.pointMarqueeSet} aria-hidden="true">
              {WHAT_IS_POINTS.map((id, index) => (
                <WhatPointCard id={id} index={index} key={`b-${id}`} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowSection() {
  const t = useTranslations("riskFree");
  const { register } = useTradeHrefs();
  const reducedMotion = useReducedMotion();
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [revealed, setRevealed] = useState(() =>
    HOW_STEPS.map((_, index) => reducedMotion || index === 0),
  );

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(HOW_STEPS.map(() => true));
      setActiveStep(HOW_STEPS.length - 1);
      return;
    }

    const nodes = stepRefs.current.filter((node): node is HTMLLIElement => Boolean(node));
    if (nodes.length === 0) {
      return;
    }

    const visibility = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.stepIndex);
          if (Number.isNaN(index)) {
            continue;
          }

          visibility.set(index, entry.intersectionRatio);

          if (entry.isIntersecting) {
            setRevealed((current) => {
              if (current[index]) {
                return current;
              }
              const next = [...current];
              next[index] = true;
              return next;
            });
          }
        }

        let bestIndex = 0;
        let bestRatio = -1;
        for (const [index, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        }
        if (bestRatio > 0) {
          setActiveStep(bestIndex);
        }
      },
      {
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: "-18% 0px -28% 0px",
      },
    );

    for (const node of nodes) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [reducedMotion]);

  function scrollToStep(index: number) {
    stepRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  }

  const progressRatio = (activeStep + 1) / HOW_STEPS.length;

  return (
    <section
      className={`${styles.section} ${styles.sectionAlt} ${styles.howSection}`}
      aria-labelledby="how-title"
    >
      <div className={`${styles.inner} ${styles.howLayout}`}>
        <aside className={styles.howSticky}>
          <p className={styles.eyebrow}>{t("how.eyebrow")}</p>
          <FadeTitle className={styles.sectionTitle} id="how-title">
            {t("how.title")}
          </FadeTitle>
          <p className={styles.sectionLead}>{t("how.lead")}</p>
          <p className={styles.sectionBody}>{t("how.note")}</p>

          <nav className={styles.howProgress} aria-label={t("how.title")}>
            <div className={styles.howProgressMeta}>
              <span>
                {String(activeStep + 1).padStart(2, "0")} / {String(HOW_STEPS.length).padStart(2, "0")}
              </span>
              <div
                className={styles.howProgressBar}
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={HOW_STEPS.length}
                aria-valuenow={activeStep + 1}
                aria-label={t("how.title")}
              >
                <span
                  className={styles.howProgressFill}
                  style={{ transform: `scaleX(${progressRatio})` }}
                />
              </div>
            </div>

            <ol className={styles.howProgressList}>
              {HOW_STEPS.map((id, index) => {
                const isActive = index === activeStep;
                const isDone = index < activeStep || revealed[index];
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className={`${styles.howProgressItem} ${isActive ? styles.howProgressItemActive : ""} ${isDone ? styles.howProgressItemDone : ""}`}
                      aria-current={isActive ? "step" : undefined}
                      onClick={() => scrollToStep(index)}
                    >
                      <span className={styles.howProgressIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.howProgressLabel}>
                        {t(`how.steps.${id}.title`)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className={styles.sectionActions}>
            <SecondaryCta label={t("how.cta")} href={register} />
          </div>
        </aside>

        <div className={styles.howStepsWrap}>
          <div className={styles.howStepsRail} aria-hidden="true">
            <span
              className={styles.howStepsRailFill}
              style={{
                transform: `scaleY(${HOW_STEPS.length <= 1 ? 1 : activeStep / (HOW_STEPS.length - 1)})`,
              }}
            />
          </div>

          <ol className={styles.howStepsTrack}>
            {HOW_STEPS.map((id, index) => {
              const isLit = index <= activeStep || revealed[index];
              return (
                <li
                  className={`${styles.howStepPanel} ${revealed[index] || reducedMotion ? styles.howStepPanelVisible : ""}`}
                  key={id}
                  data-step-index={index}
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                >
                  <span
                    className={`${styles.howStepMark} ${isLit ? styles.howStepMarkLit : ""}`}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <article className={styles.howStepCard}>
                    <h3 className={styles.howStepTitle}>{t(`how.steps.${id}.title`)}</h3>
                    <p className={styles.howStepText}>{t(`how.steps.${id}.text`)}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function EcosystemSection() {
  const t = useTranslations("riskFree");

  return (
    <section
      className={`${styles.section} ${styles.ecoSection} ${styles.sectionBlend} ${styles.sectionBlendBottom}`}
      aria-labelledby="eco-title"
    >
      <div className={styles.ecoSectionBg} aria-hidden="true">
        <GhostFibers
          lineColor="#054b34"
          glowColor="#10B981"
          speed={0.2}
          scale={2}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
        />
        <div className={styles.ecoSectionOverlay} />
      </div>

      <div className={`${styles.inner} ${styles.ecoSectionInner}`}>
        <div className={styles.splitCopy}>
          <p className={styles.eyebrow}>{t("ecosystem.eyebrow")}</p>
          <FadeTitle className={styles.sectionTitle} id="eco-title">
            {t("ecosystem.title")}
          </FadeTitle>
          <p className={styles.sectionBody}>{t("ecosystem.body")}</p>
        </div>

        <p className={styles.ecoComingSoonText} role="status">
          {t("ecosystem.comingSoon")}
        </p>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  const t = useTranslations("riskFree");
  const { register } = useTradeHrefs();
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
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const motionClass = reducedMotion ? styles.finalMotionStatic : "";
  const revealClass = visible ? styles.finalRevealIn : "";

  return (
    <section
      className={`${styles.final} ${styles.sectionBlend}`}
      ref={sectionRef}
      aria-labelledby="final-title"
    >
      <div
        className={`${styles.finalSlideOverlay} ${revealClass} ${motionClass}`}
        aria-hidden="true"
      />
      <div className={`${styles.finalSlidePanel} ${revealClass} ${motionClass}`}>
        <div className={styles.finalBg} aria-hidden="true">
          <Image
            src={RISKFREE_COPY.finalBackground}
            alt=""
            fill
            sizes="100vw"
            quality={88}
            className={styles.finalBgImage}
          />
          <div className={styles.finalOverlay} />
        </div>

        <div className={`${styles.inner} ${styles.finalInner}`}>
          <div className={styles.finalCopy}>
            <p className={styles.eyebrow}>{t("final.eyebrow")}</p>
            <h2 className={styles.finalTitle} id="final-title">
              {t("final.title")}
            </h2>
            <p className={styles.finalBody}>{t("final.body")}</p>
            <div className={styles.finalActions}>
              <PrimaryCta label={t("final.ctaPrimary")} href={register} solid />
              <SecondaryCta label={t("final.ctaSecondary")} href="/" />
            </div>
          </div>
          <p className={styles.finalBadge}>{t("final.visualBadge")}</p>
        </div>
      </div>
    </section>
  );
}

function AboutPointIcon({ id }: { id: (typeof ABOUT_POINTS)[number] }) {
  switch (id) {
    case "assets":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 18V9.5M9.5 18V6M15 18v-7.5M20 18V4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M3.5 18.5h17"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "demo":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="m10.2 8.8 6 3.2-6 3.2V8.8Z" fill="currentColor" />
        </svg>
      );
    case "support":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5.5 12.5v-1a6.5 6.5 0 0 1 13 0v1"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M5.5 12.8v2.4A1.8 1.8 0 0 0 7.3 17H8v-4.2H6.8A1.3 1.3 0 0 0 5.5 14.1v-1.3ZM18.5 12.8v2.4a1.8 1.8 0 0 1-1.8 1.8H16V12.8h1.2a1.3 1.3 0 0 1 1.3 1.3v-1.3Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M12 19.2v.8M10.2 20.5h3.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "mobile":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect
            x="8"
            y="3.5"
            width="8"
            height="17"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path d="M11 17.5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

function AboutSection() {
  const t = useTranslations("riskFree");

  return (
    <section
      className={`${styles.section} ${styles.aboutSection}`}
      aria-labelledby="about-title"
    >
      <div className={styles.aboutSectionBg} aria-hidden="true">
        <Image
          src={RISKFREE_COPY.aboutBackground}
          alt=""
          fill
          sizes="100vw"
          quality={85}
          className={styles.aboutSectionBgImage}
        />
        <div className={styles.aboutSectionOverlay} />
      </div>

      <div className={`${styles.inner} ${styles.aboutSplit}`}>
        <div className={`${styles.splitCopy} ${styles.aboutCopy}`}>
          <p className={`${styles.eyebrow} ${styles.aboutEyebrow}`}>{t("about.eyebrow")}</p>
          <FadeTitle className={styles.aboutTitle} id="about-title">
            {t("about.title")}
          </FadeTitle>
          <p className={styles.aboutBody}>{t("about.body")}</p>
          <div className={styles.sectionActions}>
            <PrimaryCta label={t("about.cta")} href="/" solid />
          </div>
        </div>

        <ul className={styles.aboutList}>
          {ABOUT_POINTS.map((id) => (
            <li className={styles.aboutListItem} key={id}>
              <span className={styles.aboutListIcon} aria-hidden="true">
                <AboutPointIcon id={id} />
              </span>
              <div className={styles.aboutCardCopy}>
                <h3 className={styles.aboutCardTitle}>{t(`about.points.${id}.title`)}</h3>
                <p className={styles.aboutCardText}>{t(`about.points.${id}.text`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhatAboutHowStack() {
  return (
    <>
      <div className={stackStyles.stack}>
        <div className={`${stackStyles.pin} ${styles.whatPinSticky}`}>
          <WhatIsSection />
        </div>
        <div className={`${stackStyles.cover} ${styles.aboutCover}`}>
          <AboutSection />
        </div>
      </div>
      <HowSection />
    </>
  );
}

export function RiskFreePage() {
  return (
    <div className={styles.page}>
      <RiskFreeHeader />
      <main>
        <HeroSection />
        <WhatAboutHowStack />
        <EcosystemSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
