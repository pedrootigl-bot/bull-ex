"use client";

import { useTranslations } from "next-intl";
import styles from "./blogLoading.module.css";

type BlogLoadingModalProps = {
  open: boolean;
  title?: string;
  subtitle?: string;
};

export function BlogLoadingModal({ open, title, subtitle }: BlogLoadingModalProps) {
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
          {title ?? t("loadingTitle")}
        </p>
        <p className={styles.subtitle} id="blog-loading-description">
          {subtitle ?? t("loadingSubtitle")}
        </p>
      </div>
    </div>
  );
}
