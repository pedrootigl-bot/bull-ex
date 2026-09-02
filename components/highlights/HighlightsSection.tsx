import { useTranslations } from "next-intl";
import { HighlightMark } from "./HighlightMark";
import { HIGHLIGHT_ITEMS } from "./highlightsConfig";
import styles from "./highlights.module.css";

export function HighlightsSection() {
  const t = useTranslations("highlights");

  return (
    <section className={styles.section} aria-label={t("aria")}>
      <div className={styles.inner}>
        {HIGHLIGHT_ITEMS.map((item) => (
          <article className={styles.card} key={item}>
            <HighlightMark name={item} />
            <h3 className={styles.title}>{t(`items.${item}.title`)}</h3>
            <p className={styles.text}>{t(`items.${item}.text`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
