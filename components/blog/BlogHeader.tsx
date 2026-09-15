"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./blog.module.css";

export function BlogHeader() {
  const t = useTranslations("blog");

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href="/" prefetch={false}>
          <Image
            src="/images/bullex-logo.webp"
            alt="Bullex"
            width={755}
            height={330}
            className={styles.brandLogo}
            priority
          />
        </Link>
        <div className={styles.headerActions}>
          <LanguageSwitcher />
          <Link className={styles.backHomeBtn} href="/" prefetch={false}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10.2 3.5 5.7 8l4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t("backToSite")}
          </Link>
        </div>
      </div>
    </header>
  );
}
