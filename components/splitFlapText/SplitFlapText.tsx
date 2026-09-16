"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./splitFlapText.module.css";

const DEFAULT_WORDS = ["LAUNCH READY", "SYNC ONLINE", "SIGNAL LIVE"];

const CHARSETS = {
  alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  numeric: "0123456789",
} as const;

type CharsetKey = keyof typeof CHARSETS;

type TileState = {
  current: string;
  next: string;
  flipping: boolean;
  tick: number;
};

type FlipPlan = {
  index: number;
  from: string;
  target: string;
  sequence: string[];
  start: number;
  step: number;
  done: boolean;
};

function toCssUnit(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

function resolveCharset(charset: string) {
  if (charset in CHARSETS) {
    return CHARSETS[charset as CharsetKey];
  }
  return typeof charset === "string" && charset.length > 0 ? charset : CHARSETS.alphanumeric;
}

function normalizePhrase(phrase: string, width: number) {
  return String(phrase ?? "")
    .padEnd(width, " ")
    .slice(0, width);
}

function createTiles(phrase: string): TileState[] {
  return phrase.split("").map((char) => ({
    current: char,
    next: char,
    flipping: false,
    tick: 0,
  }));
}

function sampleChar(charset: string) {
  return charset.charAt(Math.floor(Math.random() * charset.length)) || " ";
}

function buildSequence(target: string, flips: number, charset: string) {
  const steps: string[] = [];
  for (let i = 0; i < flips; i += 1) {
    steps.push(sampleChar(charset));
  }
  steps.push(target);
  return steps;
}

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReduced(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}

export type SplitFlapTextProps = {
  words?: string[];
  text?: string;
  flipDuration?: number;
  stagger?: number;
  cycleDelay?: number;
  charset?: CharsetKey | string;
  flipsPerChar?: number;
  tileColor?: string;
  textColor?: string;
  tileRadius?: number | string;
  gap?: number | string;
  fontSize?: number | string;
  loop?: boolean;
  padTo?: number;
  bare?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Disparado quando a última frase termina de virar (apenas com loop desligado). */
  onComplete?: () => void;
};

export function SplitFlapText({
  words = DEFAULT_WORDS,
  text,
  flipDuration = 0.12,
  stagger = 0.06,
  cycleDelay = 2400,
  charset = "alphanumeric",
  flipsPerChar = 8,
  tileColor = "#111827",
  textColor = "#f8fafc",
  tileRadius = 8,
  gap = 6,
  fontSize = 52,
  loop = true,
  padTo = 12,
  bare = false,
  className = "",
  style = {},
  onComplete,
  ...props
}: SplitFlapTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  const currentTextRef = useRef("");

  const sourceWords = Array.isArray(words) && words.length > 0 ? words : DEFAULT_WORDS;
  const phrasesKey =
    typeof text === "string" ? text : sourceWords.map((word) => String(word ?? "")).join("\u001f");
  const phrases = useMemo(() => phrasesKey.split("\u001f"), [phrasesKey]);

  const width = useMemo(() => {
    const longest = phrases.reduce((max, phrase) => Math.max(max, phrase.length), 1);
    return Math.max(1, Math.ceil(Number(padTo) || 0), longest);
  }, [padTo, phrases]);

  const normalizedPhrases = useMemo(
    () => phrases.map((phrase) => normalizePhrase(phrase, width)),
    [phrases, width],
  );

  const [tiles, setTiles] = useState(() => createTiles(normalizedPhrases[0] || ""));

  useEffect(() => {
    const clearAnimation = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (cycleTimerRef.current) {
        clearTimeout(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    };

    clearAnimation();

    const firstPhrase = normalizedPhrases[0] || "";
    currentTextRef.current = firstPhrase;
    setTiles(createTiles(firstPhrase));

    if (normalizedPhrases.length <= 1 || typeof window === "undefined") {
      onCompleteRef.current?.();
      return clearAnimation;
    }

    let phraseIndex = 0;
    let cancelled = false;

    const safeFlipMs = Math.max(40, (Number(flipDuration) || 0.12) * 1000);
    const safeStaggerMs = Math.max(0, (Number(stagger) || 0) * 1000);
    const safeCycleDelay = Math.max(400, Number(cycleDelay) || 2400);
    const safeFlips = Math.max(0, Math.floor(Number(flipsPerChar) || 0));
    const activeCharset = resolveCharset(charset);

    const animateTo = (targetPhrase: string, isFinal: boolean) => {
      if (prefersReducedMotion) {
        currentTextRef.current = targetPhrase;
        setTiles(createTiles(targetPhrase));
        if (isFinal) {
          onCompleteRef.current?.();
        }
        return 0;
      }

      const fromPhrase = normalizePhrase(currentTextRef.current, width);
      const targetChars = targetPhrase.split("");

      const plans = targetChars
        .map((targetChar, index): FlipPlan | null => {
          const fromChar = fromPhrase[index] || " ";
          if (fromChar === targetChar) {
            return null;
          }

          return {
            index,
            from: fromChar,
            target: targetChar,
            sequence: buildSequence(targetChar, safeFlips, activeCharset),
            start: index * safeStaggerMs,
            step: -1,
            done: false,
          };
        })
        .filter((plan): plan is FlipPlan => plan !== null);

      if (!plans.length) {
        currentTextRef.current = targetPhrase;
        setTiles(createTiles(targetPhrase));
        if (isFinal) {
          onCompleteRef.current?.();
        }
        return 0;
      }

      const totalDuration = plans.reduce(
        (max, plan) => Math.max(max, plan.start + plan.sequence.length * safeFlipMs),
        0,
      );
      const startedAt = performance.now();

      const updateTiles = (
        updates: Array<{ index: number; current: string; next: string; done: boolean }>,
      ) => {
        setTiles((previous) => {
          const nextTiles = [...previous];
          updates.forEach((update) => {
            const tile = nextTiles[update.index];
            if (!tile) {
              return;
            }

            nextTiles[update.index] = {
              current: update.current,
              next: update.next,
              flipping: !update.done,
              tick: tile.tick + 1,
            };
          });
          return nextTiles;
        });
      };

      const tick = (now: number) => {
        if (cancelled) {
          return;
        }

        const elapsed = now - startedAt;
        const updates: Array<{ index: number; current: string; next: string; done: boolean }> = [];
        let shouldContinue = false;

        plans.forEach((plan) => {
          const localElapsed = elapsed - plan.start;

          if (localElapsed < 0) {
            shouldContinue = true;
            return;
          }

          const step = Math.floor(localElapsed / safeFlipMs);

          if (step < plan.sequence.length) {
            shouldContinue = true;

            if (step !== plan.step) {
              plan.step = step;
              updates.push({
                index: plan.index,
                current: step === 0 ? plan.from : plan.sequence[step - 1],
                next: plan.sequence[step],
                done: false,
              });
            }
          } else if (!plan.done) {
            plan.done = true;
            updates.push({
              index: plan.index,
              current: plan.target,
              next: plan.target,
              done: true,
            });
          }
        });

        if (updates.length > 0) {
          updateTiles(updates);
        }

        if (shouldContinue) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          currentTextRef.current = targetPhrase;
          rafRef.current = null;
          if (isFinal) {
            onCompleteRef.current?.();
          }
        }
      };

      rafRef.current = requestAnimationFrame(tick);
      return totalDuration;
    };

    const scheduleNext = (delay: number) => {
      cycleTimerRef.current = setTimeout(() => {
        if (cancelled) {
          return;
        }

        const nextIndex = phraseIndex + 1;

        if (nextIndex >= normalizedPhrases.length && !loop) {
          return;
        }

        phraseIndex = nextIndex % normalizedPhrases.length;
        const isFinal = !loop && phraseIndex === normalizedPhrases.length - 1;
        const animationDuration = animateTo(normalizedPhrases[phraseIndex], isFinal);
        scheduleNext(safeCycleDelay + animationDuration);
      }, delay);
    };

    scheduleNext(safeCycleDelay);

    return () => {
      cancelled = true;
      clearAnimation();
    };
  }, [
    normalizedPhrases,
    width,
    loop,
    cycleDelay,
    flipDuration,
    stagger,
    flipsPerChar,
    charset,
    prefersReducedMotion,
  ]);

  const settledText = tiles
    .map((tile) => tile.current)
    .join("")
    .trimEnd();

  const componentStyle = {
    "--split-flap-tile-color": tileColor,
    "--split-flap-text-color": textColor,
    "--split-flap-radius": toCssUnit(tileRadius),
    "--split-flap-gap": toCssUnit(gap),
    "--split-flap-font-size": toCssUnit(fontSize),
    "--split-flap-flip-duration": `${Math.max(0.04, Number(flipDuration) || 0.12)}s`,
    ...style,
  } as CSSProperties;

  return (
    <div
      className={`${styles.root} ${bare ? styles.bare : ""} ${className}`.trim()}
      style={componentStyle}
      role="text"
      aria-label={settledText || undefined}
      {...props}
    >
      {tiles.map((tile, index) => {
        const displayCurrent = tile.current === " " ? "\u00A0" : tile.current;
        const displayNext = tile.next === " " ? "\u00A0" : tile.next;
        const isSpace = tile.current === " " && tile.next === " " && !tile.flipping;

        // Bare mode: full glyphs (no half-clip tiles) so proportional display type stays readable.
        if (bare) {
          return (
            <span
              className={`${styles.tile} ${styles.bareGlyph} ${isSpace ? styles.space : ""} ${tile.flipping ? styles.bareFlipping : ""}`}
              aria-hidden="true"
              key={`${index}-${tiles.length}`}
            >
              <span className={styles.bareChar} key={`c-${index}-${tile.tick}`}>
                {tile.flipping ? displayNext : displayCurrent}
              </span>
            </span>
          );
        }

        return (
          <span
            className={`${styles.tile} ${isSpace ? styles.space : ""}`}
            aria-hidden="true"
            key={`${index}-${tiles.length}`}
          >
            <span className={`${styles.half} ${styles.halfTop}`}>
              <span className={styles.char}>{displayCurrent}</span>
            </span>
            <span className={`${styles.half} ${styles.halfBottom}`}>
              <span className={styles.char}>{tile.flipping ? displayNext : displayCurrent}</span>
            </span>

            {tile.flipping ? (
              <>
                <span className={`${styles.flap} ${styles.flapFront}`} key={`front-${index}-${tile.tick}`}>
                  <span className={styles.char}>{displayCurrent}</span>
                </span>
                <span className={`${styles.flap} ${styles.flapBack}`} key={`back-${index}-${tile.tick}`}>
                  <span className={styles.char}>{displayNext}</span>
                </span>
              </>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
