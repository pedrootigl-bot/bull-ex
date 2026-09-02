import Image from "next/image";
import { useTranslations } from "next-intl";
import { ABOUT_COPY } from "./aboutConfig";
import styles from "./about.module.css";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section className={styles.section} id={ABOUT_COPY.id} aria-labelledby="about-title">
      <div className={styles.grid}>
        <div className={styles.media}>
          <Image
            className={styles.image}
            src="/images/bull-quem-somos.jpg"
            alt={t("imageAlt")}
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            quality={100}
            unoptimized
            priority
          />
          <div className={styles.mediaFade} aria-hidden="true" />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title} id="about-title">
            {t("title")}
          </h2>
          <div className={styles.paragraphs}>
            <p className={styles.lead}>{t("lead")}</p>
            <p>{t("body")}</p>
            <p className={styles.tagline}>{t("tagline")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
