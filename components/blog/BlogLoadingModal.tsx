"use client";

import { useTranslations } from "next-intl";
import styles from "./blogLoading.module.css";

type BlogLoadingModalProps = {
  open: boolean;
};

export function BlogLoadingModal({ open }: BlogLoadingModalProps) {
  const t = useTranslations("blog");

  if (!open) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-loading-title"
      aria-describedby="blog-loading-description"
    >
      <div className={styles.panel}>
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.title} id="blog-loading-title">
          {t("loadingTitle")}
        </p>
        <p className={styles.subtitle} id="blog-loading-description">
          {t("loadingSubtitle")}
        </p>
      </div>
    </div>
  );
}
