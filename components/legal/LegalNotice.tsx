"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./legalNotice.module.css";

export function LegalNotice() {
  const t = useTranslations("legalNotice");
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.bar} role="status">
      <p className={styles.text}>{t("text")}</p>
      <button
        className={styles.close}
        type="button"
        onClick={() => setVisible(false)}
        aria-label={t("close")}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
