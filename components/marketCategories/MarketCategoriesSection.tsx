"use client";

import { bullexRegisterHref } from "@/components/hero/heroConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLocale, useTranslations } from "next-intl";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  MARKET_CATEGORIES_COPY,
  MARKET_CATEGORY_IDS,
  MARKET_CATEGORY_META,
  type IndicatorIcon,
  type MarketCategoryId,
} from "./marketCategoriesConfig";
import { MarketScene } from "./MarketScene";
import styles from "./marketCategories.module.css";

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span className={styles.itemToggle} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {!open ? (
          <path d="M7 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        ) : null}
      </svg>
    </span>
  );
}

function IndicatorGlyph({ icon }: { icon: IndicatorIcon }) {
  switch (icon) {
    case "globe":
    case "nodes":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M4 12h16M12 4c2.5 2.4 3.8 5 3.8 8S14.5 17.6 12 20c-2.5-2.4-3.8-5-3.8-8S9.5 6.4 12 4Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "bolt":
    case "flash":
    case "zap":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M13 3 5.5 13.5h5.2L10.2 21 18.5 10.2h-5.3L13 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chart":
    case "pulse":
    case "index":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 18V9M10 18V6M16 18v-5M22 18V8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "clock":
    case "timer":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="13" r="7" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 10v3.5l2 1.5M9 4h6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "basket":
    case "layers":
    case "spread":
    case "commodity":
    case "more":
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 8h16M6 8l1.5 11h9L18 8M9 8V6.5A3 3 0 0 1 15 6.5V8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    default: {
      const exhaustive: never = icon;
      return exhaustive;
    }
  }
}

export function MarketCategoriesSection() {
  const t = useTranslations("marketCategories");
  const locale = useLocale();
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<MarketCategoryId | null>("digital");
  const [lastActive, setLastActive] = useState<MarketCategoryId>("digital");
  const [preview, setPreview] = useState<MarketCategoryId | null>(null);
  const [visible, setVisible] = useState(reducedMotion);
  const [sceneKey, setSceneKey] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const displayed = preview ?? active ?? lastActive;

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    setSceneKey((key) => key + 1);
  }, [displayed]);

  function selectCategory(id: MarketCategoryId) {
    if (active === id) {
      setActive(null);
    } else {
      setActive(id);
      setLastActive(id);
    }
    setPreview(null);
  }

  function handleStageMove(event: MouseEvent<HTMLDivElement>) {
    if (reducedMotion || !stageRef.current) {
      return;
    }
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2.4;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -1.8;
    setTilt({ x, y });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section
      className={`${styles.section} ${visible ? styles.sectionIn : ""} ${reducedMotion ? styles.motionStatic : ""}`}
      ref={sectionRef}
      id={MARKET_CATEGORIES_COPY.id}
      aria-labelledby={`${baseId}-title`}
    >
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgGlow} />
        <div className={styles.bgGrid} />
        <div className={styles.bgMist} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h2 className={styles.title} id={`${baseId}-title`}>
            <span className={styles.titleLine}>{t("titleLine1")}</span>
            <span className={styles.titleLine}>
              {t("titleLine2")}{" "}
              <em className={styles.titleHighlight}>{t("titleHighlight")}</em>
            </span>
          </h2>
          <div className={styles.headerRow}>
            <p className={styles.body}>{t("body")}</p>
            <a
              className={styles.cta}
              href={bullexRegisterHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t("cta")}</span>
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </header>

        <div className={styles.workspace}>
          <div className={styles.rail}>
            <div className={styles.nav} role="list">
              {MARKET_CATEGORY_IDS.map((id, index) => {
                const meta = MARKET_CATEGORY_META[id];
                const isActive = active === id;
                const isPreview = preview === id && !isActive;
                const panelId = `${baseId}-panel-${id}`;
                const buttonId = `${baseId}-btn-${id}`;

                return (
                  <div
                    className={styles.navItem}
                    key={id}
                    role="listitem"
                    style={{ "--i": index } as CSSProperties}
                  >
                    <button
                      type="button"
                      id={buttonId}
                      className={`${styles.item} ${isActive ? styles.itemActive : ""} ${isPreview ? styles.itemPreview : ""}`}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => selectCategory(id)}
                      onMouseEnter={() => {
                        if (!reducedMotion) {
                          setPreview(id);
                        }
                      }}
                      onMouseLeave={() => setPreview(null)}
                      onFocus={() => {
                        if (!reducedMotion) {
                          setPreview(id);
                        }
                      }}
                      onBlur={() => setPreview(null)}
                    >
                      <span className={styles.itemIndex}>{meta.index}</span>
                      <span className={styles.itemMain}>
                        <span className={styles.itemTitleRow}>
                          <span className={styles.itemTitleBlock}>
                            <span className={styles.itemTitle}>{t(`items.${id}.label`)}</span>
                            <span className={styles.itemTag}>{t(`items.${id}.tag`)}</span>
                          </span>
                          <PlusMinus open={isActive} />
                        </span>
                        <span className={styles.itemDetails} id={panelId}>
                          <span className={styles.itemDescription}>
                            {t(`items.${id}.description`)}
                          </span>
                          <span className={styles.itemMeta}>
                            {meta.indicators.map((indicator, i) => (
                              <span className={styles.metaBit} key={indicator.key}>
                                {i > 0 ? (
                                  <span className={styles.metaSep} aria-hidden="true">
                                    ·
                                  </span>
                                ) : null}
                                <IndicatorGlyph icon={indicator.icon} />
                                {t(`items.${id}.indicators.${indicator.key}`)}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                    </button>

                    <div
                      className={`${styles.mobileScene} ${isActive ? styles.mobileSceneActive : ""}`}
                      aria-hidden={!isActive}
                    >
                      {isActive ? <MarketScene category={id} /> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.right}>
            <div
              className={styles.stage}
              ref={stageRef}
              onMouseMove={handleStageMove}
              onMouseLeave={resetTilt}
              style={
                reducedMotion
                  ? undefined
                  : {
                      transform: `perspective(1600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                    }
              }
            >
              <div className={styles.stageAura} aria-hidden="true" />
              <div className={styles.stageRing} aria-hidden="true" />
              <div className={styles.stageFloor} aria-hidden="true" />
              <div className={styles.sceneFrame} key={sceneKey}>
                <MarketScene category={displayed} />
              </div>
              <div className={styles.stageCaption} key={`cap-${displayed}`}>
                <span className={styles.stageIndex}>
                  {MARKET_CATEGORY_META[displayed].index}
                </span>
                <div className={styles.stageCaptionText}>
                  <strong>{t(`items.${displayed}.label`)}</strong>
                  <span>{t(`items.${displayed}.tag`)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.sectionNote}>{t("footer")}</p>
    </section>
  );
}
