import { useTranslations } from "next-intl";
import Image from "next/image";
import { WhyIcon } from "./WhyIcon";
import { WHY_COPY } from "./whyConfig";
import styles from "./why.module.css";

export function WhySection() {
  const t = useTranslations("why");

  return (
    <section className={styles.section} id={WHY_COPY.id} aria-labelledby="why-title">
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{t("eyebrow")}</p>
            <h2 className={styles.title} id="why-title">
              {t("titleBefore")}
              <span className={styles.highlight}>{t("titleHighlight")}</span>
            </h2>
            <p className={styles.subtitle}>{t("subtitle")}</p>
          </div>

          <div className={styles.aside}>
            <div className={styles.visual}>
              <Image
                className={styles.photo}
                src="/images/bullex-why-bull.jpg"
                alt={t("photoAlt")}
                width={682}
                height={1024}
                sizes="(max-width: 980px) 70vw, 360px"
                quality={90}
              />
            </div>

            <div className={styles.bar}>
              {WHY_COPY.bars.map((icon) => (
                <article className={styles.barItem} key={icon}>
                  <div className={styles.iconWrap}>
                    <WhyIcon name={icon} />
                  </div>
                  <div>
                    <h3>{t(`bars.${icon}.title`)}</h3>
                    <p>{t(`bars.${icon}.text`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.features}>
            {WHY_COPY.features.map((icon) => (
              <article className={styles.feature} key={icon}>
                <div className={styles.iconWrap}>
                  <WhyIcon name={icon} />
                </div>
                <div>
                  <h3>{t(`features.${icon}.title`)}</h3>
                  <p>{t(`features.${icon}.text`)}</p>
                </div>
              </article>
            ))}
          </div>

          <p className={styles.callout}>
            <WhyIcon name="bull" />
            <span>
              {t.rich("callout", {
                highlight: (chunks) => <span className={styles.highlight}>{chunks}</span>,
              })}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.divider} aria-hidden="true" />
    </section>
  );
}
