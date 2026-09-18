"use client";

import { bullexLoginHref } from "@/components/hero/heroConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import {
  MARKET_CATEGORIES_COPY,
  MARKET_CATEGORY_IDS,
  MARKET_CATEGORY_META,
  MARKET_FEATURES,
  MARKET_GLOBE_TAGS,
  MARKET_HERO,
  type MarketCategoryId,
  type MarketFeatureId,
  type MarketQuote,
} from "./marketCategoriesConfig";
import styles from "./marketCategories.module.css";

function FeatureIcon({ id }: { id: MarketFeatureId }) {
  switch (id) {
    case "secure":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 5 6.2v5.1c0 4.3 2.9 8.2 7 9.7 4.1-1.5 7-5.4 7-9.7V6.2L12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="m9.2 12.1 1.9 1.9 3.8-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "speed":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M13 3 5.5 13.5h5.2L10.2 21 18.5 10.2h-5.3L13 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "markets":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 18V9M10 18V6M16 18v-5M22 18V8"
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

function CardArrow() {
  return (
    <span className={styles.cardArrow} aria-hidden="true">
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path
          d="M4.2 9.8 9.8 4.2M5.5 4.2h4.3v4.3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function QuoteList({
  categoryId,
  quotes,
}: {
  categoryId: MarketCategoryId;
  quotes: readonly MarketQuote[];
}) {
  const translate = useTranslations(
    `marketCategories.quotes.${categoryId}`,
  ) as unknown as (key: string) => string;

  return (
    <ul className={styles.quoteList}>
      {quotes.map((quote) => (
        <li key={quote.id} className={styles.quoteRow}>
          <span className={styles.quotePair}>{translate(quote.pairKey)}</span>
          {quote.valueKey ? (
            <span className={styles.quoteValue}>{translate(quote.valueKey)}</span>
          ) : null}
          <span
            className={`${styles.quoteChange} ${quote.negative ? styles.quoteDown : styles.quoteUp}`}
          >
            {translate(quote.changeKey)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function globeTagClass(tag: (typeof MARKET_GLOBE_TAGS)[number]): string {
  switch (tag) {
    case "forex":
      return styles.globeTagForex;
    case "crypto":
      return styles.globeTagCrypto;
    case "indices":
      return styles.globeTagIndices;
    case "commodities":
      return styles.globeTagCommodities;
    case "stocks":
      return styles.globeTagStocks;
    default: {
      const exhaustive: never = tag;
      return exhaustive;
    }
  }
}

export function MarketCategoriesSection() {
  const t = useTranslations("marketCategories");
  const locale = useLocale();
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(reducedMotion);
  const [featured, setFeatured] = useState<MarketCategoryId>("digital");
  const loginHref = bullexLoginHref(locale);

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
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  function renderCards(options: { inert?: boolean }) {
    return MARKET_CATEGORY_IDS.map((id, index) => {
      const meta = MARKET_CATEGORY_META[id];
      const isFeatured = featured === id;

      return (
        <a
          key={`${options.inert ? "dup" : "main"}-${id}`}
          href={loginHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.card} ${isFeatured ? styles.cardFeatured : ""}`}
          role="listitem"
          tabIndex={options.inert ? -1 : undefined}
          style={{ "--i": index } as CSSProperties}
          onMouseEnter={() => setFeatured(id)}
          onFocus={() => setFeatured(id)}
        >
          <div className={styles.cardHead}>
            <span className={styles.cardIndex}>{meta.index}</span>
            <div className={styles.cardTitles}>
              <strong className={styles.cardTitle}>{t(`items.${id}.label`)}</strong>
              <span className={styles.cardTag}>{t(`items.${id}.tag`)}</span>
            </div>
            <CardArrow />
          </div>

          <div className={styles.cardVisual}>
            <Image
              className={styles.cardVisualImg}
              src={meta.cover}
              alt=""
              width={meta.coverWidth}
              height={meta.coverHeight}
              sizes="(max-width: 900px) 70vw, 220px"
            />
          </div>

          {meta.quotes.length > 0 ? (
            <QuoteList categoryId={id} quotes={meta.quotes} />
          ) : null}

          <p className={styles.cardBlurb}>{t(`items.${id}.blurb`)}</p>
        </a>
      );
    });
  }

  return (
    <section
      className={`${styles.section} ${visible ? styles.sectionIn : ""} ${reducedMotion ? styles.motionStatic : ""}`}
      ref={sectionRef}
      id={MARKET_CATEGORIES_COPY.id}
      aria-labelledby={`${baseId}-title`}
    >
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.hero}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h2 className={styles.title} id={`${baseId}-title`}>
              <span className={styles.titleLine}>{t("titleLine1")}</span>
              <span className={styles.titleLine}>
                {t("titleLine2")}{" "}
                <em className={styles.titleHighlight}>{t("titleHighlight")}</em>
              </span>
            </h2>
            <p className={styles.body}>{t("body")}</p>
            <a
              className={styles.cta}
              href={loginHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t("cta")}</span>
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </a>
            <ul className={styles.features}>
              {MARKET_FEATURES.map((feature) => (
                <li key={feature} className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <FeatureIcon id={feature} />
                  </span>
                  <span>{t(`features.${feature}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.globePanel} aria-hidden="true">
            <div className={styles.globeWrap}>
              <Image
                className={styles.globeImg}
                src={MARKET_HERO.globe}
                alt=""
                width={MARKET_HERO.globeWidth}
                height={MARKET_HERO.globeHeight}
                sizes="(max-width: 900px) 70vw, 380px"
                priority
              />
              <p className={styles.globeCaption}>
                <span className={styles.globeCaptionLead}>{t("globeCaptionLead")}</span>
                <span className={styles.globeCaptionAccent}>{t("globeCaptionAccent")}</span>
              </p>
            </div>
            {MARKET_GLOBE_TAGS.map((tag) => (
              <span key={tag} className={`${styles.globeTag} ${globeTagClass(tag)}`}>
                {t(`globeTags.${tag}`)}
              </span>
            ))}
            <div className={styles.tradersCard}>
              <span className={styles.tradersLabel}>{t("tradersLabel")}</span>
              <strong className={styles.tradersValue}>{t("tradersValue")}</strong>
            </div>
          </div>
        </div>

        <div className={styles.cardsViewport}>
          <div className={styles.cardsTrack}>
            <div className={styles.cardsSet} role="list">
              {renderCards({})}
            </div>
            <div className={styles.cardsSetDup} aria-hidden="true">
              {renderCards({ inert: true })}
            </div>
          </div>
        </div>

        <div className={styles.footerBar}>
          <span>{t("footerLeft")}</span>
          <span className={styles.footerRight}>{t("footerRight")}</span>
        </div>
      </div>
    </section>
  );
}
