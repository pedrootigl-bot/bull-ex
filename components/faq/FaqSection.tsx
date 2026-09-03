"use client";

import { useFormatMoney } from "@/hooks/useFormatMoney";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { FAQ_COPY, FAQ_ITEMS, type FaqItemId } from "./faqConfig";
import styles from "./faq.module.css";

export function FaqSection() {
  const t = useTranslations("faq");
  const { moneyParams } = useFormatMoney();
  const baseId = useId();
  const reducedMotion = useReducedMotion();
  const [openItems, setOpenItems] = useState<Partial<Record<FaqItemId, boolean>>>({});

  function toggle(item: FaqItemId) {
    setOpenItems((current) => ({
      ...current,
      [item]: !current[item],
    }));
  }

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
            const isOpen = Boolean(openItems[item]);
            const panelId = `${baseId}-${item}-panel`;
            const buttonId = `${baseId}-${item}-button`;

            return (
              <div
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""} ${reducedMotion ? styles.motionStatic : ""}`}
                key={item}
              >
                <h3 className={styles.heading}>
                  <button
                    className={styles.summary}
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item)}
                  >
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
                  </button>
                </h3>

                <div
                  className={styles.panel}
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{t(`items.${item}.a`, moneyParams)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
