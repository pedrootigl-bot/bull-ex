import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  FEATURED_PRIZE,
  PRIZE_IMAGES,
  PRIZE_POINTS,
  PRIZES_COPY,
  ROW_PRIZES,
  type PrizeId,
} from "./prizesConfig";
import styles from "./prizes.module.css";

function PointIcon({ item }: { item: (typeof PRIZE_POINTS)[number] }) {
  switch (item) {
    case "points":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M2 12.5 6.2 7.8l2.6 2.4L14 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "redeem":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M8 2.2 9.7 6l4.1.4-3.1 2.7.9 4L8 11.2 4.4 13.1l.9-4L2.2 6.4 6.3 6 8 2.2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
      );
    case "safe":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M8 2.4 3.4 4.2v4.1c0 3 2 4.9 4.6 5.7 2.6-.8 4.6-2.7 4.6-5.7V4.2L8 2.4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );
    default: {
      const exhaustive: never = item;
      return exhaustive;
    }
  }
}

function PrizeMedia({ id, featured }: { id: PrizeId; featured?: boolean }) {
  const t = useTranslations("prizes");
  const src = PRIZE_IMAGES[id];
  const alt = t(`cards.${id}.imageAlt`);

  if (src) {
    return (
      <Image
        className={featured ? styles.featuredPhoto : styles.photo}
        src={src}
        alt={alt}
        fill
        sizes={featured ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 900px) 100vw, 28vw"}
        quality={100}
        unoptimized
      />
    );
  }

  return <div className={styles.placeholder} aria-hidden="true" />;
}

function PrizeCard({ id, featured, number }: { id: PrizeId; featured?: boolean; number: string }) {
  const t = useTranslations("prizes");

  return (
    <article className={featured ? styles.featured : styles.card}>
      <div className={featured ? styles.featuredMedia : styles.media}>
        <PrizeMedia featured={featured} id={id} />
        <div className={styles.mediaFade} aria-hidden="true" />
      </div>
      <div className={styles.cardCopy}>
        {featured ? <p className={styles.badge}>{t("featuredBadge")}</p> : <span className={styles.index}>{number}</span>}
        <h3 className={styles.cardTitle}>
          {t(`cards.${id}.title`)}
          {featured ? <span className={styles.cardHighlight}>{t(`cards.${id}.titleHighlight`)}</span> : null}
        </h3>
        <p className={styles.cardText}>{t(`cards.${id}.text`)}</p>
      </div>
    </article>
  );
}

export function PrizesSection() {
  const t = useTranslations("prizes");

  return (
    <section className={styles.section} id={PRIZES_COPY.id} aria-labelledby="prizes-title">
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{t("eyebrow")}</p>
            <h2 className={styles.title} id="prizes-title">
              {t("title")}
            </h2>
            <p className={styles.lead}>
              {t("leadBefore")}
              <span className={styles.highlight}>{t("leadHighlight")}</span>
              {t("leadAfter")}
            </p>
            <p className={styles.body}>{t("body")}</p>
            <a className={styles.cta} href={PRIZES_COPY.ctaHref}>
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path
                  d="M3.2 9.2h11.6M9.4 3.4 15 9l-5.6 5.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("cta")}
            </a>
            <ul className={styles.points}>
              {PRIZE_POINTS.map((item) => (
                <li key={item}>
                  <span className={styles.pointIcon} aria-hidden="true">
                    <PointIcon item={item} />
                  </span>
                  {t(`points.${item}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.boards}>
            <div className={styles.gridFeatured}>
              <PrizeCard featured id={FEATURED_PRIZE} number="01" />
            </div>
            <div className={styles.gridRow}>
              {ROW_PRIZES.map((id, index) => (
                <PrizeCard id={id} key={id} number={String(index + 2).padStart(2, "0")} />
              ))}
            </div>
          </div>
        </div>

        <footer className={styles.bar}>
          <p className={styles.barNote}>{t("barNote")}</p>
          <p className={styles.barSocial}>{t("barSocial")}</p>
        </footer>
      </div>
    </section>
  );
}
