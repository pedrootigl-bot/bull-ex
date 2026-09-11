"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { withBasePath } from "@/lib/basePath";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  chunkTestimonials,
  TESTIMONIAL_ITEMS,
  TESTIMONIALS_COPY,
  type PhotoTestimonial,
  type TestimonialItem,
  type TextTestimonial,
  type VideoTestimonial,
} from "./testimonialsConfig";
import styles from "./testimonials.module.css";

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function VideoTestimonialCard({ item }: { item: VideoTestimonial }) {
  const t = useTranslations("testimonials");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const videoSrc = item.videoSrc ? withBasePath(item.videoSrc) : null;

  function handlePlay() {
    if (!videoSrc) {
      return;
    }

    setPlaying(true);
    void videoRef.current?.play();
  }

  return (
    <article className={styles.card}>
      <Image
        className={styles.videoMedia}
        src={item.poster}
        alt={t(`items.${item.id}.posterAlt`)}
        fill
        sizes="(max-width: 640px) 90vw, 380px"
        quality={85}
        priority={false}
      />

      {videoSrc ? (
        <video
          ref={videoRef}
          className={styles.videoMedia}
          src={videoSrc}
          playsInline
          preload="none"
          controls={playing}
          style={playing ? undefined : { opacity: 0 }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      ) : null}

      {!playing && videoSrc ? (
        <>
          <div className={styles.photoOverlay}>
            <div className={styles.videoCaption}>
              <p className={styles.videoName}>{t(`items.${item.id}.name`)}</p>
              <p className={styles.videoMeta}>{t(`items.${item.id}.meta`)}</p>
            </div>
          </div>
          <button
            type="button"
            className={styles.playButton}
            aria-label={t("playVideo")}
            onClick={handlePlay}
          >
            <PlayIcon />
          </button>
        </>
      ) : null}

      {!videoSrc ? (
        <div className={styles.photoOverlay}>
          <div className={styles.videoCaption}>
            <p className={styles.videoName}>{t(`items.${item.id}.name`)}</p>
            <p className={styles.videoMeta}>{t(`items.${item.id}.meta`)}</p>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function TextTestimonialCard({ item }: { item: TextTestimonial }) {
  const t = useTranslations("testimonials");

  return (
    <article className={`${styles.card} ${styles.textCard}`}>
      <div className={styles.textInner}>
        <div className={styles.rating} aria-label={t("starsLabel", { count: item.stars })}>
          <StarIcon />
          <span>{t("starsLabel", { count: item.stars })}</span>
        </div>

        <div className={styles.textBody}>
          <h3 className={styles.cardTitle}>{t(`items.${item.id}.title`)}</h3>
          <p className={styles.cardQuote}>{t(`items.${item.id}.quote`)}</p>
        </div>

        <div className={styles.author}>
          <Image
            className={styles.authorPhoto}
            src={item.photo}
            alt={t(`items.${item.id}.photoAlt`)}
            width={40}
            height={40}
            sizes="40px"
            quality={85}
          />
          <div>
            <p className={styles.authorName}>{t(`items.${item.id}.name`)}</p>
            <p className={styles.authorMeta}>{t(`items.${item.id}.meta`)}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function PhotoTestimonialCard({ item }: { item: PhotoTestimonial }) {
  const t = useTranslations("testimonials");

  return (
    <article className={styles.card}>
      <Image
        className={styles.videoMedia}
        src={item.image}
        alt={t(`items.${item.id}.imageAlt`)}
        fill
        sizes="(max-width: 640px) 90vw, 380px"
        quality={85}
      />
      <div className={styles.photoOverlay}>
        <div className={styles.videoCaption}>
          <p className={styles.videoName}>{t(`items.${item.id}.name`)}</p>
          <p className={styles.videoMeta}>{t(`items.${item.id}.meta`)}</p>
        </div>
      </div>
    </article>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={expanded ? styles.chevronExpanded : styles.chevron}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

type TestimonialSlide = {
  key: string;
  item: TestimonialItem;
};

function itemToSlide(item: TestimonialItem, index: number): TestimonialSlide {
  return { key: `${item.kind}-${item.id}-${index}`, item };
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  switch (item.kind) {
    case "video":
      return <VideoTestimonialCard item={item} />;
    case "text":
      return <TextTestimonialCard item={item} />;
    case "photo":
      return <PhotoTestimonialCard item={item} />;
    default: {
      const exhaustive: never = item;
      return exhaustive;
    }
  }
}

function TestimonialRow({
  items,
  animated,
  animationIndex,
}: {
  items: readonly TestimonialItem[];
  animated?: boolean;
  animationIndex?: number;
}) {
  const rowStyle =
    animated && animationIndex !== undefined
      ? ({ "--row-delay": `${animationIndex * 0.12}s` } as CSSProperties)
      : undefined;

  return (
    <div
      className={`${styles.row} ${animated ? styles.rowAnimated : ""}`}
      style={rowStyle}
    >
      {items.map((item, index) => (
        <div className={styles.rowItem} key={`${item.kind}-${item.id}-${index}`}>
          <TestimonialCard item={item} />
        </div>
      ))}
    </div>
  );
}

function TestimonialsMobileCarousel({ slides }: { slides: TestimonialSlide[] }) {
  const t = useTranslations("testimonials");
  const reducedMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const ignoreScrollSyncRef = useRef(false);
  const activeSlideRef = useRef(activeSlide);
  const prevSlideRef = useRef(0);
  const swipeStartRef = useRef<{ x: number; y: number; slideIndex: number } | null>(null);

  activeSlideRef.current = activeSlide;

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const previous = prevSlideRef.current;
    prevSlideRef.current = activeSlide;

    // Loop último↔primeiro: mesmo salto das setas, sem animar todos os cards no meio
    const isWrapJump =
      (previous === slides.length - 1 && activeSlide === 0) ||
      (previous === 0 && activeSlide === slides.length - 1 && slides.length > 1);

    ignoreScrollSyncRef.current = true;
    scrollToSlideIndex(carousel, activeSlide, reducedMotion || isWrapJump);

    const release = window.setTimeout(
      () => {
        ignoreScrollSyncRef.current = false;
      },
      reducedMotion || isWrapJump ? 80 : 420,
    );

    return () => window.clearTimeout(release);
  }, [activeSlide, reducedMotion, slides.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const syncFromScroll = () => {
      if (ignoreScrollSyncRef.current) {
        return;
      }

      const width = carousel.clientWidth;
      if (width <= 0) {
        return;
      }

      const nextIndex = Math.max(
        0,
        Math.min(slides.length - 1, Math.round(carousel.scrollLeft / width)),
      );

      setActiveSlide((current) => (current === nextIndex ? current : nextIndex));
    };

    carousel.addEventListener("scroll", syncFromScroll, { passive: true });
    carousel.addEventListener("scrollend", syncFromScroll);
    return () => {
      carousel.removeEventListener("scroll", syncFromScroll);
      carousel.removeEventListener("scrollend", syncFromScroll);
    };
  }, [slides.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || slides.length < 2) {
      return;
    }

    const SWIPE_THRESHOLD_PX = 56;
    const lastIndex = slides.length - 1;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }
      swipeStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        slideIndex: activeSlideRef.current,
      };
    };

    const clearSwipe = () => {
      swipeStartRef.current = null;
    };

    const onPointerUp = (event: PointerEvent) => {
      const start = swipeStartRef.current;
      swipeStartRef.current = null;
      if (!start) {
        return;
      }

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) <= Math.abs(dy)) {
        return;
      }

      // Só no extremo: mesmo efeito das setas (próximo / anterior com loop)
      if (dx < 0 && start.slideIndex === lastIndex) {
        setActiveSlide((current) => (current + 1) % slides.length);
        return;
      }

      if (dx > 0 && start.slideIndex === 0) {
        setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
      }
    };

    carousel.addEventListener("pointerdown", onPointerDown, { passive: true });
    carousel.addEventListener("pointerup", onPointerUp, { passive: true });
    carousel.addEventListener("pointercancel", clearSwipe, { passive: true });
    return () => {
      carousel.removeEventListener("pointerdown", onPointerDown);
      carousel.removeEventListener("pointerup", onPointerUp);
      carousel.removeEventListener("pointercancel", clearSwipe);
    };
  }, [slides.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const syncHeight = () => {
      const slideElements = carousel.querySelectorAll<HTMLElement>("[data-testimonial-slide]");
      const active = slideElements[activeSlide];
      if (!active) {
        return;
      }

      carousel.style.height = `${active.offsetHeight}px`;
    };

    syncHeight();

    const frame = window.requestAnimationFrame(syncHeight);
    window.addEventListener("resize", syncHeight);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncHeight);
    };
  }, [activeSlide, slides.length, reducedMotion]);

  function scrollToSlideIndex(
    carousel: HTMLDivElement,
    index: number,
    prefersReducedMotion: boolean,
  ) {
    const slideElements = carousel.querySelectorAll<HTMLElement>("[data-testimonial-slide]");
    const targetIndex = Math.max(0, Math.min(index, slideElements.length - 1));
    const target = slideElements[targetIndex];
    if (!target) {
      return;
    }

    const left = target.offsetLeft - (carousel.clientWidth - target.offsetWidth) / 2;
    carousel.scrollTo({
      left,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <div className={styles.mobileCarouselBlock}>
      <div
        className={styles.mobileCarousel}
        ref={carouselRef}
        role="region"
        aria-label={t("carouselLabel")}
        aria-roledescription="carousel"
        aria-live="polite"
      >
        {slides.map((slide, index) => (
          <div
            className={styles.mobileSlide}
            data-testimonial-slide
            key={slide.key}
            aria-hidden={index !== activeSlide}
          >
            <TestimonialCard item={slide.item} />
          </div>
        ))}
      </div>

      <div className={styles.mobileCarouselMeta}>
        <p className={styles.mobileCounter}>
          {t("carouselCounter", { current: activeSlide + 1, total: slides.length })}
        </p>
        <p className={styles.mobileSwipeHint}>{t("swipeHint")}</p>
      </div>
    </div>
  );
}

const DESKTOP_ROWS = chunkTestimonials(TESTIMONIAL_ITEMS, 3);
const VISIBLE_ROW = DESKTOP_ROWS[0] ?? [];
const HIDDEN_ROWS = DESKTOP_ROWS.slice(1);
const ALL_MOBILE_SLIDES = TESTIMONIAL_ITEMS.map(itemToSlide);

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      className={styles.section}
      id={TESTIMONIALS_COPY.id}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.badge}>{t("eyebrow")}</span>
          <h2 className={styles.title} id="testimonials-title">
            {t("title")}
          </h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        <TestimonialsMobileCarousel slides={ALL_MOBILE_SLIDES} />

        <div className={styles.desktopStack}>
          <TestimonialRow items={VISIBLE_ROW} />

          <div
            className={`${styles.expandable} ${expanded ? styles.expandableOpen : ""}`}
            aria-hidden={!expanded}
          >
            <div className={styles.expandableInner}>
              {HIDDEN_ROWS.map((row, index) => (
                <TestimonialRow
                  key={`row-${index}`}
                  items={row}
                  animated={expanded}
                  animationIndex={index}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.moreWrap} ${styles.moreWrapDesktop}`}>
          <button
            type="button"
            className={styles.moreButton}
            aria-expanded={expanded}
            onClick={() => setExpanded((open) => !open)}
          >
            {expanded ? t("lessReviews") : t("moreReviews")}
            <ChevronIcon expanded={expanded} />
          </button>
        </div>
      </div>
    </section>
  );
}
