"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./blog.module.css";

export function BlogHeader() {
  const t = useTranslations("blog");

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href="/">
          <Image
            src="/images/bullex-logo.webp"
            alt="Bullex"
            width={755}
            height={330}
            className={styles.brandLogo}
            priority
          />
        </Link>
        <Link className={styles.backLink} href="/#gentileza">
          {t("backSection")}
        </Link>
      </div>
    </header>
  );
}
