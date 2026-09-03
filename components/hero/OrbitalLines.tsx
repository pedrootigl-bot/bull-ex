"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { HERO_THEME } from "./heroConfig";
import styles from "./hero.module.css";

gsap.registerPlugin(MotionPathPlugin);

type OrbitalLinesProps = {
  reducedMotion: boolean;
  dense: boolean;
};

const PATHS = [
  "M-80 210 Q 360 40 820 190 T 1520 160",
  "M-40 250 Q 420 110 880 240 T 1560 210",
  "M-120 170 Q 300 80 760 200 T 1480 140",
] as const;

export function OrbitalLines({ reducedMotion, dense }: OrbitalLinesProps) {
  const rootRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const animate = HERO_THEME.enableAnimation && !reducedMotion;
  const visiblePaths = dense ? PATHS : PATHS.slice(0, 2);

  useEffect(() => {
    if (!animate || !rootRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      visiblePaths.forEach((_, index) => {
        const dot = rootRef.current?.querySelector(`#dot-${uid}-${index}`);
        const path = rootRef.current?.querySelector(`#path-${uid}-${index}`);
        if (!dot || !path) {
          return;
        }

        gsap.to(dot, {
          motionPath: {
            path: path as SVGPathElement,
            align: path as SVGPathElement,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          duration: 22 + index * 6,
          repeat: -1,
          ease: "none",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [animate, uid, visiblePaths]);

  const rgb = HERO_THEME.accentRgb;

  return (
    <svg
      ref={rootRef}
      className={styles.orbitLayer}
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {visiblePaths.map((d, index) => (
        <g key={d}>
          <path
            id={`path-${uid}-${index}`}
            d={d}
            fill="none"
            stroke={`rgba(${rgb}, ${0.12 - index * 0.03})`}
            strokeWidth={index === 0 ? 1.1 : 0.7}
          />
          <circle
            id={`dot-${uid}-${index}`}
            r={index === 0 ? 2.4 : 1.7}
            fill={`rgba(${rgb}, 0.72)`}
            style={{ filter: `drop-shadow(0 0 4px rgba(${rgb}, 0.35))` }}
          />
        </g>
      ))}
    </svg>
  );
}
