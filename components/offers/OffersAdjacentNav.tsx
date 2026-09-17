"use client";

import { BlogNavLink } from "@/components/blog/BlogNavLink";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  getOfferNeighbors,
  OFFER_IMAGES,
  offerHref,
  OFFERS_PAGE_HREF,
  type PublishedOfferId,
} from "./offersConfig";
import styles from "./offersAdjacent.module.css";

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {direction === "prev" ? (
        <path
          d="M12.5 8H3.5M6.8 4.8 3 8l3.8 3.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M3.5 8h9M9.2 4.8 13 8l-3.8 3.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function OffersAdjacentNav({ currentId }: { currentId: PublishedOfferId }) {
  const t = useTranslations("offers");
  const { prev, next, others } = getOfferNeighbors(currentId);
  const prevHref = offerHref(prev);
  const nextHref = offerHref(next);

  if (!prevHref || !nextHref) {
    return null;
  }

  return (
    <aside className={styles.adjacent} aria-labelledby="offers-adjacent-title">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title} id="offers-adjacent-title">
            {t("adjacentTitle")}
          </h2>
          <BlogNavLink
            className={styles.allLink}
            href={OFFERS_PAGE_HREF}
            loadingTitle={t("loadingTitle")}
            loadingSubtitle={t("loadingSubtitle", { offer: t("indexTitle") })}
          >
            {t("adjacentAll")}
            <ArrowIcon direction="next" />
          </BlogNavLink>
        </div>

        <nav className={styles.pager} aria-label={t("adjacentNavLabel")}>
          <BlogNavLink
            className={`${styles.pagerBtn} ${styles.pagerPrev}`}
            href={prevHref}
            loadingTitle={t("loadingTitle")}
            loadingSubtitle={t("loadingSubtitle", { offer: t(`items.${prev}.title`) })}
          >
            <span className={styles.pagerMeta}>
              <ArrowIcon direction="prev" />
              {t("adjacentPrev")}
            </span>
            <strong className={styles.pagerName}>{t(`items.${prev}.title`)}</strong>
            <span className={styles.pagerTag}>{t(`items.${prev}.tag`)}</span>
          </BlogNavLink>

          <BlogNavLink
            className={`${styles.pagerBtn} ${styles.pagerNext}`}
            href={nextHref}
            loadingTitle={t("loadingTitle")}
            loadingSubtitle={t("loadingSubtitle", { offer: t(`items.${next}.title`) })}
          >
            <span className={styles.pagerMeta}>
              {t("adjacentNext")}
              <ArrowIcon direction="next" />
            </span>
            <strong className={styles.pagerName}>{t(`items.${next}.title`)}</strong>
            <span className={styles.pagerTag}>{t(`items.${next}.tag`)}</span>
          </BlogNavLink>
        </nav>

        <ul className={styles.cardList}>
          {others.map((id) => {
            const href = offerHref(id);
            if (!href) {
              return null;
            }

            return (
              <li key={id}>
                <BlogNavLink
                  className={styles.card}
                  href={href}
                  loadingTitle={t("loadingTitle")}
                  loadingSubtitle={t("loadingSubtitle", { offer: t(`items.${id}.title`) })}
                >
                  <div className={styles.cardMedia}>
                    <Image
                      src={OFFER_IMAGES[id]}
                      alt={t(`items.${id}.imageAlt`)}
                      fill
                      sizes="(max-width: 720px) 100vw, 320px"
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardTag}>{t(`items.${id}.tag`)}</span>
                    <span className={styles.cardTitle}>{t(`items.${id}.title`)}</span>
                    <span className={styles.cardExcerpt}>{t(`items.${id}.excerpt`)}</span>
                    <span className={styles.cardAction}>
                      {t("seeOffer")}
                      <ArrowIcon direction="next" />
                    </span>
                  </div>
                </BlogNavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
