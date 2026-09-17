"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  MARKET_SCENE_DIMENSIONS,
  MARKET_SCENE_IMAGES,
  type MarketCategoryId,
} from "./marketCategoriesConfig";
import styles from "./marketCategories.module.css";

export function MarketScene({ category }: { category: MarketCategoryId }) {
  const t = useTranslations("marketCategories");
  const src = MARKET_SCENE_IMAGES[category];

  if (!src) {
    return (
      <div className={`${styles.scene} ${styles.scenePlaceholder}`}>
        <p className={styles.placeholderLabel}>{t(`items.${category}.label`)}</p>
        <p className={styles.placeholderHint}>{t("sceneSoon")}</p>
      </div>
    );
  }

  const { width, height } = MARKET_SCENE_DIMENSIONS[category];

  return (
    <div className={styles.scene}>
      <div className={styles.sceneFloat}>
        <div className={styles.sceneImageWrap}>
          <span className={styles.sceneShine} aria-hidden="true" />
          <Image
            className={styles.sceneImage}
            src={src}
            alt={t(`items.${category}.label`)}
            width={width}
            height={height}
            sizes="(max-width: 900px) 94vw, min(760px, 54vw)"
            quality={100}
            priority={category === "forex" || category === "digital"}
          />
        </div>
      </div>
    </div>
  );
}
