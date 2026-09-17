"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { DIGITAL_SCENE_ASSETS } from "./marketCategoriesConfig";
import styles from "./marketCategories.module.css";
import { pairPhaseClass, usePairScenePhase } from "./usePairScenePhase";

const COIN_STAGGER_MS = 110;
const CARD_START_MS = 380;
const CARD_STAGGER_MS = 130;
const EXIT_STAGGER_MS = 90;

type DigitalAssetsSceneProps = {
  leaving?: boolean;
};

export function DigitalAssetsScene({ leaving = false }: DigitalAssetsSceneProps) {
  const t = useTranslations("marketCategories.scenes.digital");
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
  const itemCount = DIGITAL_SCENE_ASSETS.coins.length;

  return (
    <div className={styles.scene}>
      <div className={`${styles.digitalScene} ${phaseClass}`} aria-label={t("primaryPair")}>
        {DIGITAL_SCENE_ASSETS.coins.map((coin, index) => {
          const card = DIGITAL_SCENE_ASSETS.cards[index];
          const exitOrder = itemCount - 1 - index;

          return (
            <div key={coin.id} className={styles.digitalCol}>
              <div
                className={styles.digitalCoin}
                style={
                  {
                    "--enter-delay": `${index * COIN_STAGGER_MS}ms`,
                    "--exit-delay": `${exitOrder * EXIT_STAGGER_MS}ms`,
                    "--pulse-delay": `${index * 180}ms`,
                  } as CSSProperties
                }
                aria-hidden="true"
              >
                <Image
                  className={styles.digitalCoinImg}
                  src={coin.src}
                  alt=""
                  width={512}
                  height={512}
                  sizes="(max-width: 900px) 28vw, 130px"
                  quality={95}
                  priority
                />
              </div>

              <div
                className={styles.digitalCard}
                style={
                  {
                    "--enter-delay": `${CARD_START_MS + index * CARD_STAGGER_MS}ms`,
                    "--exit-delay": `${(exitOrder + itemCount) * EXIT_STAGGER_MS}ms`,
                    "--pulse-delay": `${220 + index * 200}ms`,
                  } as CSSProperties
                }
              >
                <Image
                  className={styles.digitalCardImg}
                  src={card.src}
                  alt={t(card.altKey)}
                  width={640}
                  height={360}
                  sizes="(max-width: 900px) 30vw, 200px"
                  quality={95}
                  priority={index === 0}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
