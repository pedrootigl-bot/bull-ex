"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { FOREX_SCENE_ASSETS } from "./marketCategoriesConfig";
import styles from "./marketCategories.module.css";
import { pairPhaseClass, usePairScenePhase } from "./usePairScenePhase";

const CARD_STAGGER_MS = 140;
const EXIT_STAGGER_MS = 100;

type ForexAssetsSceneProps = {
  leaving?: boolean;
};

export function ForexAssetsScene({ leaving = false }: ForexAssetsSceneProps) {
  const t = useTranslations("marketCategories.scenes.forex");
  const reducedMotion = useReducedMotion();
  const phase = usePairScenePhase(leaving);
  const phaseClass = pairPhaseClass(
    phase,
    {
      pairEnter: styles.pairEnter,
      pairIdle: styles.pairIdle,
      pairExit: styles.pairExit,
      pairStatic: styles.pairStatic,
    },
    reducedMotion,
  );

  const top = FOREX_SCENE_ASSETS.top;
  const bottom = FOREX_SCENE_ASSETS.bottom;

  return (
    <div className={styles.scene}>
      <div
        className={`${styles.forexScene} ${phaseClass}`}
        aria-label={t("primaryPair")}
      >
        <div className={styles.forexTop}>
          <div
            className={`${styles.digitalCard} ${styles.forexCardTop}`}
            style={
              {
                "--enter-delay": `0ms`,
                "--exit-delay": `${2 * EXIT_STAGGER_MS}ms`,
                "--pulse-delay": `0ms`,
              } as CSSProperties
            }
          >
            <Image
              className={styles.digitalCardImg}
              src={top.src}
              alt={t(top.altKey)}
              width={640}
              height={360}
              sizes="(max-width: 900px) 42vw, 240px"
              quality={95}
              priority
            />
          </div>
        </div>

        <div className={styles.forexBottom}>
          {bottom.map((card, index) => (
            <div
              key={card.id}
              className={`${styles.digitalCard} ${styles.forexCardBottom}`}
              style={
                {
                  "--enter-delay": `${(index + 1) * CARD_STAGGER_MS}ms`,
                  "--exit-delay": `${(1 - index) * EXIT_STAGGER_MS}ms`,
                  "--pulse-delay": `${(index + 1) * 220}ms`,
                } as CSSProperties
              }
            >
              <Image
                className={styles.digitalCardImg}
                src={card.src}
                alt={t(card.altKey)}
                width={640}
                height={360}
                sizes="(max-width: 900px) 38vw, 210px"
                quality={95}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
