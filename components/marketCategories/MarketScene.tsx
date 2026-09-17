"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  MARKET_SCENE_DIMENSIONS,
  MARKET_SCENE_IMAGES,
  type MarketCategoryId,
} from "./marketCategoriesConfig";
import { DigitalAssetsScene } from "./DigitalAssetsScene";
import { ForexAssetsScene } from "./ForexAssetsScene";
import styles from "./marketCategories.module.css";

type MarketSceneProps = {
  category: MarketCategoryId;
  leaving?: boolean;
};

export function MarketScene({ category, leaving = false }: MarketSceneProps) {
  const t = useTranslations("marketCategories");

  if (category === "digital") {
    return <DigitalAssetsScene leaving={leaving} />;
  }

  if (category === "forex") {
    return <ForexAssetsScene leaving={leaving} />;
  }

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
  const compact = category === "etf";

  return (
    <div className={styles.scene}>
      <div
        className={`${styles.sceneFloat} ${compact ? styles.sceneFloatCompact : ""} ${compact ? styles.sceneFloatPulse : ""}`}
      >
        <div className={`${styles.sceneImageWrap} ${compact ? styles.sceneImageWrapCompact : ""}`}>
          {compact ? null : <span className={styles.sceneShine} aria-hidden="true" />}
          <Image
            className={`${styles.sceneImage} ${compact ? styles.sceneImageCompact : ""}`}
            src={src}
            alt={t(`items.${category}.label`)}
            width={width}
            height={height}
            sizes={
              compact
                ? "(max-width: 900px) 55vw, min(340px, 32vw)"
                : "(max-width: 900px) 94vw, min(760px, 54vw)"
            }
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
