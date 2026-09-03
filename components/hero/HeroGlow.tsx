"use client";

import { HERO_THEME } from "./heroConfig";
import styles from "./hero.module.css";

type HeroGlowProps = {
  reducedMotion: boolean;
};

export function HeroGlow({ reducedMotion }: HeroGlowProps) {
  const alpha = HERO_THEME.glowIntensity;
  const rgb = HERO_THEME.accentRgb;

  return (
    <div className={styles.glowLayer} aria-hidden="true">
      <div
        className={`${styles.glowOrb} ${reducedMotion || !HERO_THEME.enableAnimation ? "" : styles.glowPulse}`}
        style={{
          background: `radial-gradient(ellipse at 50% 42%, rgba(${rgb}, ${0.28 * alpha}) 0%, rgba(${rgb}, ${0.1 * alpha}) 32%, rgba(${rgb}, 0) 68%)`,
        }}
      />
      <div
        className={styles.glowRim}
        style={{
          background: `radial-gradient(ellipse at 50% 18%, rgba(${rgb}, ${0.16 * alpha}) 0%, transparent 55%)`,
        }}
      />
    </div>
  );
}
