"use client";

import { SiteFooter } from "@/components/footer/Footer";
import { GhostFibers } from "@/components/ghostFibers/GhostFibers";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { bullexLoginHref, bullexRegisterHref } from "@/components/hero/heroConfig";
import { OFFERS_PAGE_HREF } from "@/components/offers/offersConfig";
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

const WHAT_SECTION_ID = "riskfree-what";

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

function useReveal<T extends HTMLElement>(className = "", delay = 0) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<T | null>(null);
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
      { threshold: 0.25, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return {
    ref,
    className: `${className} ${styles.reveal} ${visible ? styles.revealIn : ""}`.trim(),
    style: { transitionDelay: `${delay}s` },
  };
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

function RiskFreeHeader() {
  const t = useTranslations("riskFree");
  const nav = useTranslations("navigation");
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
          <Link href={OFFERS_PAGE_HREF} prefetch={false}>
            {nav("prizes")}
          </Link>
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
  onComplete,
}: {
  text: string;
  className?: string;
  cycleDelay?: number;
  onComplete?: () => void;
}) {
  return (
    <SplitFlapText
      className={`${styles.heroSplitFlap} ${className}`.trim()}
      onComplete={onComplete}
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

const HERO_MARQUEE_ROWS = 5;

function HeroMarquee({ words }: { words: string[] }) {
  if (words.length === 0) {
    return null;
  }

  return (
    <div className={styles.heroMarquee} aria-hidden="true">
      {Array.from({ length: HERO_MARQUEE_ROWS }, (_, row) => {
        const offset = row % words.length;
        const line = `${[...words.slice(offset), ...words.slice(0, offset)].join(" • ")} • `;

        return (
          <div className={styles.heroMarqueeRow} key={row}>
            <div className={styles.heroMarqueeTrack}>
              <span className={styles.heroMarqueeGroup}>{line}</span>
              <span className={styles.heroMarqueeGroup}>{line}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Rede de seguranca: libera o restante do hero mesmo se o callback do split-flap nao chegar. */
const HERO_TITLE_FALLBACK_MS = 3500;

function HeroSection() {
  const t = useTranslations("riskFree");
  const { register } = useTradeHrefs();
  const reducedMotion = useReducedMotion();
  const [titleDone, setTitleDone] = useState(false);
  const marqueeWords = t("hero.marquee")
    .split("•")
    .map((word) => word.trim())
    .filter(Boolean);
  const titleLine1 = t("hero.titleLine1");
  const titleLine2 = t("hero.titleLine2");
  const titleHighlight = t("hero.titleHighlight");

  useEffect(() => {
    if (reducedMotion) {
      setTitleDone(true);
      return;
    }

    const fallback = setTimeout(() => setTitleDone(true), HERO_TITLE_FALLBACK_MS);
    return () => clearTimeout(fallback);
  }, [reducedMotion]);

  const revealClass = (delayClass: string) =>
    titleDone ? `${styles.heroFadeItem} ${delayClass}` : styles.heroPending;

  return (
    <section className={`${styles.hero} ${styles.sectionBlend} ${styles.sectionBlendTop}`} aria-labelledby="riskfree-h1">
      <div className={styles.heroBg} aria-hidden="true">
        <HeroMarquee words={marqueeWords} />
        <div className={styles.heroOverlay} />
        <svg className={styles.heroPanel} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="rf-panel-outer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#04120a" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#010703" stopOpacity="0.24" />
            </linearGradient>
            <linearGradient id="rf-panel-inner" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#0b1b0e" stopOpacity="0.97" />
              <stop offset="60%" stopColor="#020803" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#010500" stopOpacity="0.88" />
            </linearGradient>
            <linearGradient id="rf-panel-haze" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7cff3a" stopOpacity="0.24" />
              <stop offset="70%" stopColor="#7cff3a" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#7cff3a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rf-panel-edge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eaffe0" stopOpacity="0.62" />
              <stop offset="35%" stopColor="#9dff6a" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#7cff3a" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <polygon fill="url(#rf-panel-outer)" points="-5,0 76,0 57,105 -5,105" />
          <polygon fill="url(#rf-panel-haze)" points="-5,-5 68,-5 68,0 -5,15" />
          <polygon fill="url(#rf-panel-inner)" points="-5,15 68,0 49,105 -5,105" />
          <path className={styles.heroPanelEdgeSoft} d="M 76 0 L 57 105" />
          <path className={styles.heroPanelGlow} d="M -5 15 L 68 0 L 49 105" />
          <path className={styles.heroPanelEdge} d="M -5 15 L 68 0 L 49 105" />
        </svg>
        <div className={styles.heroTicket}>
          <Image
            src={RISKFREE_COPY.heroTicket}
            alt=""
            width={729}
            height={431}
            priority
            quality={90}
            sizes="(max-width: 960px) 78vw, 46vw"
            className={styles.heroTicketImage}
          />
        </div>
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={`${styles.heroEyebrow} ${revealClass(styles.heroFadeDelay0)}`}>
            {t("hero.eyebrow")}
          </p>
          <h1 className={styles.heroTitle} id="riskfree-h1">
            <span className={styles.heroTitleSr}>{t("hero.title")}</span>
            <span className={styles.heroTitleStack} aria-hidden="true">
              <HeroTitleLine text={titleLine1} cycleDelay={280} />
              <HeroTitleLine text={titleLine2} cycleDelay={520} />
              <HeroTitleLine
                text={titleHighlight}
                className={styles.heroTitleHighlight}
                cycleDelay={760}
                onComplete={() => setTitleDone(true)}
              />
            </span>
          </h1>
          <p className={`${styles.heroBody} ${revealClass(styles.heroFadeDelay1)}`}>
            {t("hero.body")}
          </p>
          {/* Versao em fluxo do ticket: so aparece no mobile, entre o texto e os botoes. */}
          <div className={styles.heroTicketInline} aria-hidden="true">
            <Image
              src={RISKFREE_COPY.heroTicket}
              alt=""
              width={729}
              height={431}
              quality={90}
              sizes="82vw"
              loading="eager"
              className={styles.heroTicketImage}
            />
          </div>
          <div className={styles.heroActions}>
            <div className={`${styles.heroCtaRow} ${revealClass(styles.heroFadeDelay2)}`}>
              <PrimaryCta label={t("hero.cta")} href={register} solid />
              <a className={styles.heroPlayLink} href={`#${WHAT_SECTION_ID}`}>
                <span className={styles.heroPlayIcon} aria-hidden="true">
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                    <path d="M1.6 1.4 9.8 6.5 1.6 11.6V1.4Z" fill="currentColor" />
                  </svg>
                </span>
                {t("hero.howItWorks")}
              </a>
            </div>
            <p className={`${styles.finePrint} ${revealClass(styles.heroFadeDelay3)}`}>
              {t("hero.finePrint")}
            </p>
          </div>
        </div>
      </div>

      <ul className={`${styles.heroBar} ${revealClass(styles.heroFadeDelay3)}`}>
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
  const eyebrowReveal = useReveal<HTMLParagraphElement>(styles.eyebrow);
  const bodyReveal = useReveal<HTMLParagraphElement>(styles.sectionBody, 0.08);
  const ctaReveal = useReveal<HTMLSpanElement>(styles.revealInline, 0.16);
  const faqReveal = useReveal<HTMLDivElement>(`${styles.inner} ${styles.whatFaq}`, 0.08);

  return (
    <section
      className={`${styles.section} ${styles.sectionBlend}`}
      id={WHAT_SECTION_ID}
      aria-labelledby="what-title"
    >
      <div className={`${styles.inner} ${styles.whatSplit}`}>
        <header className={styles.whatHead}>
          <p {...eyebrowReveal}>{t("what.eyebrow")}</p>
          <FadeTitle className={styles.sectionTitle} id="what-title">
            {t("what.title")}
          </FadeTitle>
          <p {...bodyReveal}>{t("what.body")}</p>
          <span {...ctaReveal}>
            <PrimaryCta label={t("what.cta")} href={register} solid />
          </span>
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

      <div className={styles.pointCarousel} aria-label={t("what.title")}>
        <ul className={styles.pointCarouselTrack} tabIndex={0}>
          {WHAT_IS_POINTS.map((id, index) => (
            <WhatPointCard id={id} index={index} key={id} />
          ))}
        </ul>
      </div>

      <div {...faqReveal}>
        <h3 className={styles.whatFaqTitle}>{t("what.faqTitle")}</h3>
        <p className={styles.whatFaqBody}>{t("what.faqBody")}</p>
      </div>
    </section>
  );
}

function HowProgressItem({
  id,
  index,
  isActive,
  isDone,
  onSelect,
}: {
  id: (typeof HOW_STEPS)[number];
  index: number;
  isActive: boolean;
  isDone: boolean;
  onSelect: () => void;
}) {
  const t = useTranslations("riskFree");
  const itemReveal = useReveal<HTMLLIElement>("", 0.3 + index * 0.07);

  return (
    <li {...itemReveal}>
      <button
        type="button"
        className={`${styles.howProgressItem} ${isActive ? styles.howProgressItemActive : ""} ${isDone ? styles.howProgressItemDone : ""}`}
        aria-current={isActive ? "step" : undefined}
        onClick={onSelect}
      >
        <span className={styles.howProgressIndex}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.howProgressLabel}>{t(`how.steps.${id}.title`)}</span>
      </button>
    </li>
  );
}

function HowSection() {
  const t = useTranslations("riskFree");
  const { register } = useTradeHrefs();
  const reducedMotion = useReducedMotion();
  const eyebrowReveal = useReveal<HTMLParagraphElement>(styles.eyebrow);
  const leadReveal = useReveal<HTMLParagraphElement>(styles.sectionLead, 0.08);
  const noteReveal = useReveal<HTMLParagraphElement>(styles.sectionBody, 0.16);
  const metaReveal = useReveal<HTMLDivElement>(styles.howProgressMeta, 0.24);
  const actionsReveal = useReveal<HTMLDivElement>(styles.sectionActions, 0.5);
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
          <p {...eyebrowReveal}>{t("how.eyebrow")}</p>
          <FadeTitle className={styles.sectionTitle} id="how-title">
            {t("how.title")}
          </FadeTitle>
          <p {...leadReveal}>{t("how.lead")}</p>
          <p {...noteReveal}>{t("how.note")}</p>

          <nav className={styles.howProgress} aria-label={t("how.title")}>
            <div {...metaReveal}>
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
              {HOW_STEPS.map((id, index) => (
                <HowProgressItem
                  key={id}
                  id={id}
                  index={index}
                  isActive={index === activeStep}
                  isDone={index < activeStep || revealed[index]}
                  onSelect={() => scrollToStep(index)}
                />
              ))}
            </ol>
          </nav>

          <div {...actionsReveal}>
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
  const eyebrowReveal = useReveal<HTMLParagraphElement>(styles.eyebrow);
  const bodyReveal = useReveal<HTMLParagraphElement>(styles.sectionBody, 0.08);
  const comingSoonReveal = useReveal<HTMLParagraphElement>(styles.ecoComingSoonText, 0.16);

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
          <p {...eyebrowReveal}>{t("ecosystem.eyebrow")}</p>
          <FadeTitle className={styles.sectionTitle} id="eco-title">
            {t("ecosystem.title")}
          </FadeTitle>
          <p {...bodyReveal}>{t("ecosystem.body")}</p>
        </div>

        <p {...comingSoonReveal} role="status">
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
        setVisible(entry.isIntersecting);
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

function AboutPointItem({
  id,
  index,
}: {
  id: (typeof ABOUT_POINTS)[number];
  index: number;
}) {
  const t = useTranslations("riskFree");
  const itemReveal = useReveal<HTMLLIElement>(styles.aboutListItem, index * 0.09);

  return (
    <li {...itemReveal}>
      <span className={styles.aboutListIcon} aria-hidden="true">
        <AboutPointIcon id={id} />
      </span>
      <div className={styles.aboutCardCopy}>
        <h3 className={styles.aboutCardTitle}>{t(`about.points.${id}.title`)}</h3>
        <p className={styles.aboutCardText}>{t(`about.points.${id}.text`)}</p>
      </div>
    </li>
  );
}

function AboutSection() {
  const t = useTranslations("riskFree");
  const eyebrowReveal = useReveal<HTMLParagraphElement>(
    `${styles.eyebrow} ${styles.aboutEyebrow}`,
  );
  const bodyReveal = useReveal<HTMLParagraphElement>(styles.aboutBody, 0.08);
  const actionsReveal = useReveal<HTMLDivElement>(styles.sectionActions, 0.16);

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
          <p {...eyebrowReveal}>{t("about.eyebrow")}</p>
          <FadeTitle className={styles.aboutTitle} id="about-title">
            {t("about.title")}
          </FadeTitle>
          <p {...bodyReveal}>{t("about.body")}</p>
          <div {...actionsReveal}>
            <PrimaryCta label={t("about.cta")} href="/" solid />
          </div>
        </div>

        <ul className={styles.aboutList}>
          {ABOUT_POINTS.map((id, index) => (
            <AboutPointItem id={id} index={index} key={id} />
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
