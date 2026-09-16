"use client";

import { BlogNavLink } from "@/components/blog/BlogNavLink";
import { OFFER_IDS, OFFER_IMAGES, offerHref, type OfferId } from "@/components/offers/offersConfig";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./offers.module.css";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8h9M9.2 4.8 13 8l-3.8 3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OfferShell({
  id,
  featured,
  children,
}: {
  id: OfferId;
  featured: boolean;
  children: ReactNode;
}) {
  const t = useTranslations("offers");
  const href = offerHref(id);
  const className = featured ? styles.indexFeatured : styles.indexCard;

  if (!href) {
    return <div className={`${className} ${styles.cardSoon}`}>{children}</div>;
  }

  return (
    <BlogNavLink
      className={className}
      href={href}
      loadingTitle={t("loadingTitle")}
      loadingSubtitle={t("loadingSubtitle", { offer: t(`items.${id}.title`) })}
    >
      {children}
    </BlogNavLink>
  );
}

function OfferCard({ id, featured = false }: { id: OfferId; featured?: boolean }) {
  const t = useTranslations("offers");
  const available = offerHref(id) !== null;

  return (
    <li className={featured ? styles.indexFeaturedItem : undefined}>
      <OfferShell id={id} featured={featured}>
        <div className={featured ? styles.indexFeaturedMedia : styles.indexCardMedia}>
          <Image
            src={OFFER_IMAGES[id]}
            alt={t(`items.${id}.imageAlt`)}
            fill
            sizes={
              featured ? "(max-width: 900px) 100vw, 1100px" : "(max-width: 640px) 100vw, 360px"
            }
            className={featured ? styles.indexFeaturedImage : styles.indexCardImage}
            priority={featured}
            quality={featured ? 90 : 85}
          />
          <div className={featured ? styles.indexFeaturedShade : styles.indexCardShade} />
        </div>
        <div className={featured ? styles.indexFeaturedBody : styles.indexCardBody}>
          {featured ? (
            <span className={styles.indexFeaturedBadge}>
              {available ? t("featuredLabel") : t("soonLabel")}
            </span>
          ) : (
            <span className={available ? styles.indexCardEyebrow : styles.indexCardSoonTag}>
              {available ? t(`items.${id}.tag`) : t("soonLabel")}
            </span>
          )}
          <h3 className={featured ? styles.indexFeaturedTitle : styles.indexCardTitle}>
            {t(`items.${id}.title`)}
          </h3>
          <p className={featured ? styles.indexFeaturedExcerpt : styles.indexCardExcerpt}>
            {t(`items.${id}.excerpt`)}
          </p>
          <div className={featured ? styles.indexFeaturedMeta : styles.indexCardMetaRow}>
            {featured ? <span className={styles.indexCardMeta}>{t(`items.${id}.tag`)}</span> : null}
            {available ? (
              <span className={styles.indexCardAction}>
                {t("seeOffer")}
                <ArrowIcon />
              </span>
            ) : (
              <span className={styles.indexCardSoonAction}>{t("soonAction")}</span>
            )}
          </div>
        </div>
      </OfferShell>
    </li>
  );
}

export function OffersIndex() {
  const t = useTranslations("offers");
  const [featured, ...rest] = OFFER_IDS;

  return (
    <div className={styles.index}>
      <div className={styles.indexGlow} aria-hidden="true" />

      <header className={styles.indexHero}>
        <p className={styles.indexEyebrow}>{t("eyebrow")}</p>
        <h1 className={styles.indexTitle}>{t("indexTitle")}</h1>
        <p className={styles.indexSubtitle}>{t("indexSubtitle")}</p>
      </header>

      <section className={styles.indexSection} aria-labelledby="offers-list-title">
        <div className={styles.indexSectionHead}>
          <h2 className={styles.indexSectionTitle} id="offers-list-title">
            {t("listSection")}
          </h2>
        </div>

        <ul className={styles.indexFeaturedList}>
          <OfferCard id={featured} featured />
        </ul>

        <ul className={styles.indexList}>
          {rest.map((id) => (
            <OfferCard key={id} id={id} />
          ))}
        </ul>

        <p className={styles.indexNote}>{t("note")}</p>
      </section>
    </div>
  );
}
