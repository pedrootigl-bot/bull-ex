"use client";

import { SiteFooter } from "@/components/footer/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { bullexLoginHref, bullexRegisterHref } from "@/components/hero/heroConfig";
import { OFFERS_PAGE_HREF } from "@/components/offers/offersConfig";
import { SplitFlapText } from "@/components/splitFlapText/SplitFlapText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  DEMO_HIGHLIGHTS,
  FAQ_ITEMS,
  HERO_HIGHLIGHTS,
  NEXT_HIGHLIGHTS,
  SALDOPROMO_COPY,
  USE_STEPS,
} from "./saldopromoConfig";
import styles from "./saldopromo.module.css";

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
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
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

function useTradeHrefs() {
  const locale = useLocale();
  return {
    login: bullexLoginHref(locale),
    register: bullexRegisterHref(locale),
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

function PrimaryCta({ label, href }: { label: string; href: string }) {
  const content = (
    <>
      {label}
      <CtaArrow />
    </>
  );

  if (href.startsWith("http")) {
    return (
      <a className={styles.ctaSolid} href={href}>
        {content}
      </a>
    );
  }

  return (
    <Link className={styles.ctaSolid} href={href} prefetch={false}>
      {content}
    </Link>
  );
}

function SaldoPromoHeader() {
  const t = useTranslations("saldoPromo");
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
    case "credit":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 8v8M8 12h8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
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
  const t = useTranslations("saldoPromo");
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
    <section
      className={`${styles.hero} ${styles.sectionBlend} ${styles.sectionBlendTop}`}
      aria-labelledby="saldopromo-h1"
    >
      <div className={styles.heroBg} aria-hidden="true">
        <HeroMarquee words={marqueeWords} />
        <div className={styles.heroOverlay} />
        <svg className={styles.heroPanel} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sp-panel-outer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#04120a" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#010703" stopOpacity="0.24" />
            </linearGradient>
            <linearGradient id="sp-panel-inner" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#0b1b0e" stopOpacity="0.97" />
              <stop offset="60%" stopColor="#020803" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#010500" stopOpacity="0.88" />
            </linearGradient>
            <linearGradient id="sp-panel-haze" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7cff3a" stopOpacity="0.24" />
              <stop offset="70%" stopColor="#7cff3a" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#7cff3a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon fill="url(#sp-panel-outer)" points="-5,0 76,0 57,105 -5,105" />
          <polygon fill="url(#sp-panel-haze)" points="-5,-5 68,-5 68,0 -5,15" />
          <polygon fill="url(#sp-panel-inner)" points="-5,15 68,0 49,105 -5,105" />
          <path className={styles.heroPanelEdgeSoft} d="M 76 0 L 57 105" />
          <path className={styles.heroPanelGlow} d="M -5 15 L 68 0 L 49 105" />
          <path className={styles.heroPanelEdge} d="M -5 15 L 68 0 L 49 105" />
        </svg>
        {SALDOPROMO_COPY.heroVisual ? (
          <div className={styles.heroTicket}>
            <Image
              src={SALDOPROMO_COPY.heroVisual}
              alt=""
              width={729}
              height={431}
              priority
              quality={90}
              sizes="(max-width: 960px) 78vw, 46vw"
              className={styles.heroTicketImage}
            />
          </div>
        ) : null}
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={`${styles.heroEyebrow} ${revealClass(styles.heroFadeDelay0)}`}>
            {t("hero.eyebrow")}
          </p>
          <h1 className={styles.heroTitle} id="saldopromo-h1">
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
          <div className={styles.heroActions}>
            <div className={`${styles.heroCtaRow} ${revealClass(styles.heroFadeDelay2)}`}>
              <PrimaryCta label={t("hero.cta")} href={register} />
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

function BlockHead({
  eyebrow,
  title,
  aside,
  titleId,
}: {
  eyebrow: string;
  title: string;
  aside: string;
  titleId: string;
}) {
  const eyebrowReveal = useReveal<HTMLParagraphElement>(styles.blockEyebrow);
  const titleReveal = useReveal<HTMLHeadingElement>(styles.blockTitle, 0.08);
  const asideReveal = useReveal<HTMLParagraphElement>(styles.blockAside, 0.16);

  return (
    <div className={styles.blockHead}>
      <div>
        <p {...eyebrowReveal}>{eyebrow}</p>
        <h2 id={titleId} {...titleReveal}>
          {title}
        </h2>
      </div>
      <p {...asideReveal}>{aside}</p>
    </div>
  );
}

function StepIcon({ id }: { id: (typeof USE_STEPS)[number] }) {
  switch (id) {
    case "offer":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.5 3.2h8.2l3.8 3.8v13.8H6.5V3.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M14.4 3.4V7.2h3.8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path
            d="M9.4 11h5.2M9.4 14.2h5.2M9.4 17.4h3.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "activate":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "trade":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M8 15.6v-3.2M12 15.6V8.4M16 15.6v-5"
            stroke="currentColor"
            strokeWidth="1.8"
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

function StepCard({ id, index }: { id: (typeof USE_STEPS)[number]; index: number }) {
  const t = useTranslations("saldoPromo");
  const cardReveal = useReveal<HTMLLIElement>(styles.stepCard, 0.1 + index * 0.1);

  return (
    <li {...cardReveal}>
      <div className={styles.stepCardTop}>
        <span className={styles.stepNumber} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={styles.stepIcon} aria-hidden="true">
          <StepIcon id={id} />
        </span>
      </div>
      <h3 className={styles.stepTitle}>{t(`steps.items.${id}.title`)}</h3>
      <p className={styles.stepText}>{t(`steps.items.${id}.text`)}</p>
    </li>
  );
}

function StepsSection() {
  const t = useTranslations("saldoPromo");

  return (
    <section className={`${styles.section} ${styles.sectionBlend}`} aria-labelledby="saldopromo-steps">
      <div className={styles.inner}>
        <BlockHead
          eyebrow={t("steps.eyebrow")}
          title={t("steps.title")}
          aside={t("steps.aside")}
          titleId="saldopromo-steps"
        />

        <ul className={styles.stepsGrid}>
          {USE_STEPS.map((id, index) => (
            <StepCard id={id} index={index} key={id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FaqCard({ id, index }: { id: (typeof FAQ_ITEMS)[number]; index: number }) {
  const t = useTranslations("saldoPromo");
  const cardReveal = useReveal<HTMLLIElement>(styles.faqCard, 0.1 + index * 0.1);

  return (
    <li {...cardReveal}>
      <div className={styles.faqCardHead}>
        <span className={styles.faqMark} aria-hidden="true">
          ?
        </span>
        <h3 className={styles.faqQuestion}>{t(`faq.items.${id}.question`)}</h3>
      </div>
      <p className={styles.faqAnswer}>{t(`faq.items.${id}.answer`)}</p>
    </li>
  );
}

function FaqSection() {
  const t = useTranslations("saldoPromo");

  return (
    <section
      className={`${styles.section} ${styles.sectionAlt} ${styles.sectionBlend}`}
      aria-labelledby="saldopromo-faq"
    >
      <div className={styles.inner}>
        <BlockHead
          eyebrow={t("faq.eyebrow")}
          title={t("faq.title")}
          aside={t("faq.aside")}
          titleId="saldopromo-faq"
        />

        <ul className={styles.faqGrid}>
          {FAQ_ITEMS.map((id, index) => (
            <FaqCard id={id} index={index} key={id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function DemoHighlightIcon({ id }: { id: (typeof DEMO_HIGHLIGHTS)[number] }) {
  switch (id) {
    case "virtual":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M8.4 9.4c1.6 0 2.1 1.1 3.6 2.6 1.5 1.5 2 2.6 3.6 2.6a2.6 2.6 0 0 0 0-5.2c-1.6 0-2.1 1.1-3.6 2.6-1.5 1.5-2 2.6-3.6 2.6a2.6 2.6 0 0 1 0-5.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "practice":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 4.4 21 8.6l-9 4.2-9-4.2 9-4.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M6.6 10.8v4.4c0 1.5 2.4 2.8 5.4 2.8s5.4-1.3 5.4-2.8v-4.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M20.4 9v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "multiplatform":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="7" y="2.8" width="10" height="18.4" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10.6 5.8h2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M10.6 18.2h2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

function DemoAccountSection() {
  const t = useTranslations("saldoPromo");
  const { register } = useTradeHrefs();
  const eyebrowReveal = useReveal<HTMLParagraphElement>(styles.eyebrow);
  const titleReveal = useReveal<HTMLHeadingElement>(styles.demoTitle, 0.08);
  const bodyReveal = useReveal<HTMLParagraphElement>(styles.demoBody, 0.16);
  const ctaReveal = useReveal<HTMLDivElement>(styles.demoActions, 0.24);
  const listReveal = useReveal<HTMLUListElement>(styles.demoHighlights, 0.32);
  const asideReveal = useReveal<HTMLParagraphElement>(styles.demoAside, 0.16);

  return (
    <section
      className={`${styles.section} ${styles.demoSection} ${styles.sectionBlend}`}
      aria-labelledby="saldopromo-demo"
    >
      <div className={styles.demoBg} aria-hidden="true">
        <Image
          src={SALDOPROMO_COPY.demoBackground}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className={styles.demoBgImage}
        />
        <div className={styles.demoOverlay} />
      </div>

      <div className={`${styles.inner} ${styles.demoInner}`}>
        <p {...asideReveal}>{t("demo.aside")}</p>

        <div className={styles.demoCopy}>
          <p {...eyebrowReveal}>{t("demo.eyebrow")}</p>
          <h2 id="saldopromo-demo" {...titleReveal}>
            {t("demo.titleLine1")}
            <span className={styles.demoTitleAccent}>{t("demo.titleLine2")}</span>
          </h2>
          <p {...bodyReveal}>{t("demo.body")}</p>
          <div {...ctaReveal}>
            <PrimaryCta label={t("demo.cta")} href={register} />
          </div>
          <ul {...listReveal}>
            {DEMO_HIGHLIGHTS.map((id) => (
              <li className={styles.demoHighlight} key={id}>
                <span className={styles.demoHighlightIcon} aria-hidden="true">
                  <DemoHighlightIcon id={id} />
                </span>
                <span className={styles.demoHighlightText}>{t(`demo.highlights.${id}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function NextHighlightIcon({ id }: { id: (typeof NEXT_HIGHLIGHTS)[number] }) {
  switch (id) {
    case "opportunities":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="13" r="7.4" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="11" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="m13.4 10.6 5.2-5.2M16.6 5.2h2.6v2.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "strategy":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5.4 19V13.4M11.8 19V6.6M18.2 19v-8.4"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "evolve":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7.4 4h9.2v5.2a4.6 4.6 0 0 1-9.2 0V4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M7.4 5.6H4.8v1.6a3 3 0 0 0 2.6 3M16.6 5.6h2.6v1.6a3 3 0 0 1-2.6 3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M12 13.8V17m-3 3h6"
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

function NextStepSection() {
  const t = useTranslations("saldoPromo");
  const { register } = useTradeHrefs();
  const asideReveal = useReveal<HTMLParagraphElement>(styles.nextAside, 0.16);
  const eyebrowReveal = useReveal<HTMLParagraphElement>(styles.eyebrow);
  const titleReveal = useReveal<HTMLHeadingElement>(styles.nextTitle, 0.08);
  const bodyReveal = useReveal<HTMLParagraphElement>(styles.nextBody, 0.16);
  const ctaReveal = useReveal<HTMLDivElement>(styles.nextActions, 0.24);
  const listReveal = useReveal<HTMLUListElement>(styles.nextHighlights, 0.32);

  return (
    <section
      className={`${styles.section} ${styles.nextSection} ${styles.sectionBlend}`}
      aria-labelledby="saldopromo-next"
    >
      <div className={styles.nextBg} aria-hidden="true">
        <Image
          src={SALDOPROMO_COPY.nextBackground}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className={styles.nextBgImage}
        />
        <div className={styles.nextOverlay} />
      </div>

      <div className={`${styles.inner} ${styles.nextInner}`}>
        <p {...asideReveal}>{t("next.aside")}</p>

        <div className={styles.nextCopy}>
          <p {...eyebrowReveal}>{t("next.eyebrow")}</p>
          <h2 id="saldopromo-next" {...titleReveal}>
            {t("next.title")}
          </h2>
          <p {...bodyReveal}>{t("next.body")}</p>
          <div {...ctaReveal}>
            <PrimaryCta label={t("next.cta")} href={register} />
          </div>
        </div>

        <ul {...listReveal}>
          {NEXT_HIGHLIGHTS.map((id) => (
            <li className={styles.nextHighlight} key={id}>
              <span className={styles.nextHighlightIcon} aria-hidden="true">
                <NextHighlightIcon id={id} />
              </span>
              <span className={styles.nextHighlightText}>{t(`next.highlights.${id}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SaldoPromoPage() {
  return (
    <div className={styles.page}>
      <SaldoPromoHeader />
      <main>
        <HeroSection />
        <StepsSection />
        <DemoAccountSection />
        <FaqSection />
        <NextStepSection />
      </main>
      <SiteFooter />
    </div>
  );
}
