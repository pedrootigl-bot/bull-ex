"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  TESTIMONIAL_TRIPLETS,
  TESTIMONIALS_COPY,
  type PhotoTestimonial,
  type TestimonialTriplet,
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

  function handlePlay() {
    if (!item.videoSrc) {
      return;
    }

    setPlaying(true);
    void videoRef.current?.play();
  }

  return (
    <article className={styles.card}>
      {item.videoSrc ? (
        <video
          ref={videoRef}
          className={styles.videoMedia}
          src={item.videoSrc}
          poster={item.poster}
          playsInline
          preload="none"
          controls={playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <Image
          className={styles.videoMedia}
          src={item.poster}
          alt={t(`items.${item.id}.posterAlt`)}
          fill
          sizes="(max-width: 640px) 86vw, 320px"
          quality={85}
        />
      )}

      {!playing && (
        <button
          type="button"
          className={styles.videoOverlay}
          aria-label={t("playVideo")}
          onClick={handlePlay}
          disabled={!item.videoSrc}
        >
          <span className={styles.playButton}>
            <PlayIcon />
          </span>
          <div className={styles.videoCaption}>
            <p className={styles.videoName}>{t(`items.${item.id}.name`)}</p>
            <p className={styles.videoMeta}>{t(`items.${item.id}.meta`)}</p>
          </div>
        </button>
      )}
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
        sizes="(max-width: 640px) 86vw, 320px"
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

type TestimonialSlide =
  | { key: string; kind: "video"; item: VideoTestimonial }
  | { key: string; kind: "text"; item: TextTestimonial }
  | { key: string; kind: "photo"; item: PhotoTestimonial };

function tripletToSlides(triplet: TestimonialTriplet): TestimonialSlide[] {
  return [
    { key: `${triplet.id}-video`, kind: "video", item: triplet.video },
    { key: `${triplet.id}-text`, kind: "text", item: triplet.text },
    { key: `${triplet.id}-photo`, kind: "photo", item: triplet.photo },
  ];
}

function slidesFromTriplets(triplets: readonly TestimonialTriplet[]) {
  return triplets.flatMap(tripletToSlides);
}

function TestimonialSlideCard({ slide }: { slide: TestimonialSlide }) {
  switch (slide.kind) {
    case "video":
      return <VideoTestimonialCard item={slide.item} />;
    case "text":
      return <TextTestimonialCard item={slide.item} />;
    case "photo":
      return <PhotoTestimonialCard item={slide.item} />;
    default: {
      const exhaustive: never = slide;
      return exhaustive;
    }
  }
}

function TestimonialRow({
  triplet,
  animated,
  animationIndex,
}: {
  triplet: TestimonialTriplet;
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
      <div className={styles.rowItem}>
        <VideoTestimonialCard item={triplet.video} />
      </div>
      <div className={styles.rowItem}>
        <TextTestimonialCard item={triplet.text} />
      </div>
      <div className={styles.rowItem}>
        <PhotoTestimonialCard item={triplet.photo} />
      </div>
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
    setActiveSlide((current) => Math.max(0, current - 1));
  }

  function goToNext() {
    setActiveSlide((current) => Math.min(slides.length - 1, current + 1));
  }

  const canGoPrev = activeSlide > 0;
  const canGoNext = activeSlide < slides.length - 1;

  return (
    <div className={styles.mobileCarouselBlock}>
      <div className={styles.mobileCarouselShell}>
        <button
          type="button"
          className={styles.mobileCarouselArrow}
          aria-label={t("carouselPrev")}
          disabled={!canGoPrev}
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
              <TestimonialSlideCard slide={slide} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.mobileCarouselArrow} ${styles.mobileCarouselArrowNext}`}
          aria-label={t("carouselNext")}
          disabled={!canGoNext}
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

const VISIBLE_TRIPLET = TESTIMONIAL_TRIPLETS[0];
const HIDDEN_TRIPLETS = TESTIMONIAL_TRIPLETS.slice(1);
const ALL_MOBILE_SLIDES = slidesFromTriplets(TESTIMONIAL_TRIPLETS);

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
          <TestimonialRow triplet={VISIBLE_TRIPLET} />

          <div
            className={`${styles.expandable} ${expanded ? styles.expandableOpen : ""}`}
            aria-hidden={!expanded}
          >
            <div className={styles.expandableInner}>
              {HIDDEN_TRIPLETS.map((triplet, index) => (
                <TestimonialRow
                  key={triplet.id}
                  triplet={triplet}
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
