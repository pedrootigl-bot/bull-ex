import { useTranslations } from "next-intl";
import { FAQ_COPY, FAQ_ITEMS } from "./faqConfig";
import styles from "./faq.module.css";

export function FaqSection() {
  const t = useTranslations("faq");

  return (
    <section className={styles.section} id={FAQ_COPY.id} aria-labelledby="faq-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2 className={styles.title} id="faq-title">
            {t("title")}
          </h2>
        </header>

        <div className={styles.list}>
          {FAQ_ITEMS.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");

            return (
              <details className={styles.item} key={item}>
                <summary className={styles.summary}>
                  <span className={styles.number}>{number}.</span>
                  <span className={styles.question}>{t(`items.${item}.q`)}</span>
                  <span className={styles.chevron} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path
                        d="M3.2 5.1 7 8.9l3.8-3.8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className={styles.answer}>{t(`items.${item}.a`)}</p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
