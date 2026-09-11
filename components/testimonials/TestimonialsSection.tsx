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
        <button
          type="button"
          className={styles.videoOverlay}
          aria-label={t("playVideo")}
          onClick={handlePlay}
        >
          <span className={styles.playButton}>
            <PlayIcon />
          </span>
          <div className={styles.videoCaption}>
            <p className={styles.videoName}>{t(`items.${item.id}.name`)}</p>
            <p className={styles.videoMeta}>{t(`items.${item.id}.meta`)}</p>
          </div>
        </button>
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

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    scrollToSlideIndex(carousel, activeSlide, reducedMotion);
  }, [activeSlide, reducedMotion, slides.length]);

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

  function goToPrev() {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  }

  function goToNext() {
    setActiveSlide((current) => (current + 1) % slides.length);
  }

  return (
    <div className={styles.mobileCarouselBlock}>
      <div className={styles.mobileCarouselShell}>
        <button
          type="button"
          className={styles.mobileCarouselArrow}
          aria-label={t("carouselPrev")}
          onClick={goToPrev}
        >
          <ChevronIcon expanded={false} />
        </button>

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

        <button
          type="button"
          className={`${styles.mobileCarouselArrow} ${styles.mobileCarouselArrowNext}`}
          aria-label={t("carouselNext")}
          onClick={goToNext}
        >
          <ChevronIcon expanded={false} />
        </button>
      </div>

      <div className={styles.mobileCarouselMeta}>
        <p className={styles.mobileCounter}>
          {t("carouselCounter", { current: activeSlide + 1, total: slides.length })}
        </p>
        <p className={styles.mobileSwipeHint}>{t("arrowHint")}</p>
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
