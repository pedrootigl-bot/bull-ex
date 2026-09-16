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
  CAMPAIGN_PERK_KEYS,
  FAQ_ITEMS,
  FEATURED_CAMPAIGNS,
  HERO_HIGHLIGHTS,
  PARTICIPATE_STEPS,
  TICKETS_COPY,
  type CampaignPerk,
  type CampaignTone,
  type FeaturedCampaign,
} from "./ticketsConfig";
import styles from "./tickets.module.css";

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

function TicketsHeader() {
  const t = useTranslations("tickets");
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
    case "seasonal":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3.6" y="5" width="16.8" height="15.4" rx="2.6" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M8 3.2v3.4M16 3.2v3.4M3.6 10h16.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "tickets":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3.4 8.2A1.6 1.6 0 0 1 5 6.6h14a1.6 1.6 0 0 1 1.6 1.6v2a2.2 2.2 0 0 0 0 4.4v1.2A1.6 1.6 0 0 1 19 17.4H5a1.6 1.6 0 0 1-1.6-1.6v-1.2a2.2 2.2 0 0 0 0-4.4v-2Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M13.6 8.6v6.8" stroke="currentColor" strokeWidth="1.6" strokeDasharray="1.6 2" />
        </svg>
      );
    case "rules":
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
    case "prizes":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7.6 4h8.8v4.4a4.4 4.4 0 0 1-8.8 0V4Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M7.6 5.6H5.2v1.2a2.8 2.8 0 0 0 2.4 2.8M16.4 5.6h2.4v1.2a2.8 2.8 0 0 1-2.4 2.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path d="M12 12.8V16m-3.2 4h6.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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
  const t = useTranslations("tickets");
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
      aria-labelledby="tickets-h1"
    >
      <div className={styles.heroBg} aria-hidden="true">
        <HeroMarquee words={marqueeWords} />
        <div className={styles.heroOverlay} />
        <svg className={styles.heroPanel} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tk-panel-outer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#04120a" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#010703" stopOpacity="0.24" />
            </linearGradient>
            <linearGradient id="tk-panel-inner" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#0b1b0e" stopOpacity="0.97" />
              <stop offset="60%" stopColor="#020803" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#010500" stopOpacity="0.88" />
            </linearGradient>
            <linearGradient id="tk-panel-haze" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7cff3a" stopOpacity="0.24" />
              <stop offset="70%" stopColor="#7cff3a" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#7cff3a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon fill="url(#tk-panel-outer)" points="-5,0 76,0 57,105 -5,105" />
          <polygon fill="url(#tk-panel-haze)" points="-5,-5 68,-5 68,0 -5,15" />
          <polygon fill="url(#tk-panel-inner)" points="-5,15 68,0 49,105 -5,105" />
          <path className={styles.heroPanelEdgeSoft} d="M 76 0 L 57 105" />
          <path className={styles.heroPanelGlow} d="M -5 15 L 68 0 L 49 105" />
          <path className={styles.heroPanelEdge} d="M -5 15 L 68 0 L 49 105" />
        </svg>
        {TICKETS_COPY.heroVisual ? (
          <div className={styles.heroTicket}>
            <Image
              src={TICKETS_COPY.heroVisual}
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
          <h1 className={styles.heroTitle} id="tickets-h1">
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

function StepIcon({ id }: { id: (typeof PARTICIPATE_STEPS)[number] }) {
  switch (id) {
    case "choose":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3.4" y="4.6" width="17.2" height="15.8" rx="2.8" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M7.8 2.8v3.6M16.2 2.8v3.6M3.4 9.6h17.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="m8.6 14.6 2 2 4-4.2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "coupon":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 8.4a1.6 1.6 0 0 1 1.6-1.6h14.8A1.6 1.6 0 0 1 21 8.4v1.9a2.1 2.1 0 0 0 0 4.2v1.1a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 15.6v-1.1a2.1 2.1 0 0 0 0-4.2V8.4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="m9.6 13.4 1.5 1.5 3.3-3.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "accumulate":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.4 4.6h13a1.4 1.4 0 0 1 1.4 1.4v1.6a1.9 1.9 0 0 0 0 3.8v1.6a1.4 1.4 0 0 1-1.4 1.4h-13A1.4 1.4 0 0 1 5 13v-1.6a1.9 1.9 0 0 0 0-3.8V6a1.4 1.4 0 0 1 1.4-1.4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M3 10.4v6.2a2.8 2.8 0 0 0 2.8 2.8h11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M13.4 6.6v6" stroke="currentColor" strokeWidth="1.4" strokeDasharray="1.6 1.8" />
        </svg>
      );
    case "prize":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7.4 4h9.2v4.6a4.6 4.6 0 0 1-9.2 0V4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M7.4 5.6H4.8v1.3a2.9 2.9 0 0 0 2.6 2.9M16.6 5.6h2.6v1.3a2.9 2.9 0 0 1-2.6 2.9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M12 13.2v3.4M8.8 20h6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

function StepCard({ id, index }: { id: (typeof PARTICIPATE_STEPS)[number]; index: number }) {
  const t = useTranslations("tickets");
  const cardReveal = useReveal<HTMLLIElement>(styles.stepCard, 0.1 + index * 0.1);

  return (
    <li {...cardReveal}>
      <div className={styles.stepCardTop}>
        <span className={styles.stepIcon} aria-hidden="true">
          <StepIcon id={id} />
        </span>
        <span className={styles.stepNumber} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className={styles.stepTitle}>{t(`steps.items.${id}.title`)}</h3>
      <p className={styles.stepText}>{t(`steps.items.${id}.text`)}</p>
    </li>
  );
}

function StepsSection() {
  const t = useTranslations("tickets");
  const { register } = useTradeHrefs();
  const ctaReveal = useReveal<HTMLDivElement>(styles.stepsActions, 0.5);

  return (
    <section className={`${styles.section} ${styles.sectionBlend}`} aria-labelledby="tickets-steps">
      <div className={styles.inner}>
        <BlockHead
          eyebrow={t("steps.eyebrow")}
          title={t("steps.title")}
          aside={t("steps.aside")}
          titleId="tickets-steps"
        />

        <ul className={styles.stepsGrid}>
          {PARTICIPATE_STEPS.map((id, index) => (
            <StepCard id={id} index={index} key={id} />
          ))}
        </ul>

        <div {...ctaReveal}>
          <PrimaryCta label={t("steps.cta")} href={register} />
        </div>
      </div>
    </section>
  );
}

function CampaignPerkIcon({ id }: { id: CampaignPerk }) {
  switch (id) {
    case "gift":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3.4" y="9.4" width="17.2" height="11" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M2.6 9.4h18.8M12 9.4v11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path
            d="M12 9.4S10.6 4 8.2 4a2.2 2.2 0 0 0 0 5.4M12 9.4S13.4 4 15.8 4a2.2 2.2 0 0 1 0 5.4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ticket":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3.4 8.2A1.6 1.6 0 0 1 5 6.6h14a1.6 1.6 0 0 1 1.6 1.6v2a2.2 2.2 0 0 0 0 4.4v1.2A1.6 1.6 0 0 1 19 17.4H5a1.6 1.6 0 0 1-1.6-1.6v-1.2a2.2 2.2 0 0 0 0-4.4v-2Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M13.6 8.6v6.8" stroke="currentColor" strokeWidth="1.6" strokeDasharray="1.6 2" />
        </svg>
      );
    case "clock":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 7.4V12l3 1.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    case "swap":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 8.6h13.2l-3-3M20 15.4H6.8l3 3"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "rules":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 11.2v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="12" cy="8.1" r="1" fill="currentColor" />
        </svg>
      );
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

const CAMPAIGN_TONE_CLASS: Record<CampaignTone, string> = {
  seasonal: styles.campaignTagSeasonal,
  coupon: styles.campaignTagCoupon,
  rewards: styles.campaignTagRewards,
};

function CampaignCard({ campaign, index }: { campaign: FeaturedCampaign; index: number }) {
  const t = useTranslations("tickets");
  const cardReveal = useReveal<HTMLLIElement>(styles.campaignCard, 0.1 + index * 0.1);
  const ctaLabel = t("campaigns.cta");

  return (
    <li {...cardReveal}>
      <div className={styles.campaignArt} aria-hidden="true">
        {campaign.image ? (
          <Image
            src={campaign.image}
            alt=""
            width={720}
            height={540}
            quality={88}
            sizes="(max-width: 960px) 88vw, 30vw"
            className={styles.campaignArtImage}
          />
        ) : null}
      </div>

      <div className={styles.campaignBody}>
        <div className={styles.campaignBadges}>
          <span className={`${styles.campaignTag} ${CAMPAIGN_TONE_CLASS[campaign.tone]}`}>
            {t(`campaigns.items.${campaign.id}.tag`)}
          </span>
          <span className={styles.campaignStatus}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="m8.4 12.2 2.4 2.4 4.8-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t(`campaigns.status.${campaign.status}`)}
          </span>
        </div>

        <h3 className={styles.campaignTitle}>{t(`campaigns.items.${campaign.id}.title`)}</h3>
        <p className={styles.campaignText}>{t(`campaigns.items.${campaign.id}.text`)}</p>

        <ul className={styles.campaignPerks}>
          {campaign.perks.map((perk, perkIndex) => (
            <li className={styles.campaignPerk} key={perk}>
              <span className={styles.campaignPerkIcon} aria-hidden="true">
                <CampaignPerkIcon id={perk} />
              </span>
              {t(`campaigns.items.${campaign.id}.perks.${CAMPAIGN_PERK_KEYS[perkIndex]}`)}
            </li>
          ))}
        </ul>

        <div className={styles.campaignActions}>
          {campaign.href ? (
            <PrimaryCta label={ctaLabel} href={campaign.href} />
          ) : (
            <span className={`${styles.ctaSolid} ${styles.ctaPending}`} aria-disabled="true">
              {ctaLabel}
              <CtaArrow />
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

function CampaignsSection() {
  const t = useTranslations("tickets");
  const linkReveal = useReveal<HTMLDivElement>(styles.campaignsHeadLink, 0.16);

  return (
    <section className={`${styles.section} ${styles.sectionBlend}`} aria-labelledby="tickets-campaigns">
      <div className={styles.inner}>
        <div className={styles.campaignsHead}>
          <BlockHead
            eyebrow={t("campaigns.eyebrow")}
            title={t("campaigns.title")}
            aside={t("campaigns.aside")}
            titleId="tickets-campaigns"
          />
          <div {...linkReveal}>
            <Link className={styles.faqLink} href={OFFERS_PAGE_HREF} prefetch={false}>
              {t("campaigns.allLink")}
              <CtaArrow />
            </Link>
          </div>
        </div>

        <ul className={styles.campaignsGrid}>
          {FEATURED_CAMPAIGNS.map((campaign, index) => (
            <CampaignCard campaign={campaign} index={index} key={campaign.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FaqCard({ id, index }: { id: (typeof FAQ_ITEMS)[number]; index: number }) {
  const t = useTranslations("tickets");
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
  const t = useTranslations("tickets");
  const linkReveal = useReveal<HTMLParagraphElement>("", 0.3);

  return (
    <section
      className={`${styles.section} ${styles.sectionAlt} ${styles.sectionBlend}`}
      aria-labelledby="tickets-faq"
    >
      <div className={styles.inner}>
        <BlockHead
          eyebrow={t("faq.eyebrow")}
          title={t("faq.title")}
          aside={t("faq.aside")}
          titleId="tickets-faq"
        />

        <ul className={styles.faqGrid}>
          {FAQ_ITEMS.map((id, index) => (
            <FaqCard id={id} index={index} key={id} />
          ))}
        </ul>

        <p {...linkReveal}>
          <Link className={styles.faqLink} href={OFFERS_PAGE_HREF} prefetch={false}>
            {t("faq.exploreLink")}
            <CtaArrow />
          </Link>
        </p>
      </div>
    </section>
  );
}

export function TicketsPage() {
  return (
    <div className={styles.page}>
      <TicketsHeader />
      <main>
        <HeroSection />
        <StepsSection />
        <CampaignsSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
