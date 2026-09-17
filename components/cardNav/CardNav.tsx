"use client";

import { Link } from "@/i18n/navigation";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./cardNav.module.css";

export type CardNavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
  /** Abre em nova aba (links de trade). */
  external?: boolean;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

type CardNavProps = {
  logo: string;
  logoAlt?: string;
  logoHref: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  navAriaLabel: string;
  openLabel: string;
  closeLabel: string;
  /** Espaco para o seletor de idioma. */
  children?: ReactNode;
};

function LinkArrow() {
  return (
    <svg
      className={styles.cardLinkIcon}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 11 11 5M6.2 5H11v4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const COLLAPSED_HEIGHT = 62;
const DESKTOP_HEIGHT = 268;

export function CardNav({
  logo,
  logoAlt = "Logo",
  logoHref,
  items,
  className = "",
  ease = "power3.out",
  baseColor,
  menuColor,
  buttonBgColor,
  buttonTextColor,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  navAriaLabel,
  openLabel,
  closeLabel,
  children,
}: CardNavProps) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const visibleItems = items.slice(0, 3);

  useEffect(() => {
    const calculateHeight = () => {
      const navEl = navRef.current;
      if (!navEl) {
        return DESKTOP_HEIGHT;
      }

      if (window.matchMedia("(max-width: 768px)").matches) {
        const contentEl = navEl.querySelector<HTMLElement>(`.${styles.content}`);
        if (contentEl) {
          const wasVisibility = contentEl.style.visibility;
          const wasPointerEvents = contentEl.style.pointerEvents;
          const wasPosition = contentEl.style.position;
          const wasHeight = contentEl.style.height;

          contentEl.style.visibility = "visible";
          contentEl.style.pointerEvents = "auto";
          contentEl.style.position = "static";
          contentEl.style.height = "auto";

          const contentHeight = contentEl.scrollHeight;

          contentEl.style.visibility = wasVisibility;
          contentEl.style.pointerEvents = wasPointerEvents;
          contentEl.style.position = wasPosition;
          contentEl.style.height = wasHeight;

          return COLLAPSED_HEIGHT + contentHeight + 16;
        }
      }

      return DESKTOP_HEIGHT;
    };

    const createTimeline = () => {
      const navEl = navRef.current;
      if (!navEl) {
        return null;
      }

      gsap.set(navEl, { height: COLLAPSED_HEIGHT, overflow: "hidden" });
      gsap.set(cardsRef.current, { y: 40, opacity: 0 });

      const timeline = gsap.timeline({ paused: true });
      timeline.to(navEl, { height: calculateHeight, duration: 0.4, ease });
      timeline.to(
        cardsRef.current,
        { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
        "-=0.1",
      );

      return timeline;
    };

    tlRef.current = createTimeline();

    const handleResize = () => {
      const wasExpanded = tlRef.current ? tlRef.current.progress() > 0 : false;
      tlRef.current?.kill();
      const timeline = createTimeline();
      if (timeline && wasExpanded) {
        timeline.progress(1);
      }
      tlRef.current = timeline;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  const closeMenu = () => {
    const timeline = tlRef.current;
    if (!timeline || !isExpanded) {
      return;
    }
    setIsHamburgerOpen(false);
    timeline.eventCallback("onReverseComplete", () => setIsExpanded(false));
    timeline.reverse();
  };

  const toggleMenu = () => {
    const timeline = tlRef.current;
    if (!timeline) {
      return;
    }

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      timeline.play(0);
      return;
    }

    closeMenu();
  };

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  const renderLink = (link: CardNavLink, index: number) => {
    const content = (
      <>
        <LinkArrow />
        {link.label}
      </>
    );

    if (link.external || link.href.startsWith("http")) {
      return (
        <a
          className={styles.cardLink}
          href={link.href}
          aria-label={link.ariaLabel ?? link.label}
          key={`${link.label}-${index}`}
          onClick={closeMenu}
          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }

    if (link.href.startsWith("#")) {
      return (
        <a
          className={styles.cardLink}
          href={link.href}
          aria-label={link.ariaLabel ?? link.label}
          key={`${link.label}-${index}`}
          onClick={closeMenu}
        >
          {content}
        </a>
      );
    }

    const hashIndex = link.href.indexOf("#");
    if (hashIndex >= 0) {
      const hash = link.href.slice(hashIndex + 1);
      return (
        <Link
          className={styles.cardLink}
          href={{ pathname: "/", hash }}
          aria-label={link.ariaLabel ?? link.label}
          key={`${link.label}-${index}`}
          onClick={closeMenu}
          prefetch={false}
        >
          {content}
        </Link>
      );
    }

    return (
      <Link
        className={styles.cardLink}
        href={link.href}
        aria-label={link.ariaLabel ?? link.label}
        key={`${link.label}-${index}`}
        onClick={closeMenu}
        prefetch={false}
      >
        {content}
      </Link>
    );
  };

  return (
    <div className={`${styles.container} ${className}`.trim()}>
      <nav
        ref={navRef}
        className={`${styles.nav} ${isExpanded ? styles.navOpen : ""}`.trim()}
        aria-label={navAriaLabel}
        style={{ backgroundColor: baseColor } as CSSProperties}
      >
        <div className={styles.top}>
          <button
            type="button"
            className={`${styles.hamburger} ${isHamburgerOpen ? styles.hamburgerOpen : ""}`.trim()}
            onClick={toggleMenu}
            aria-label={isExpanded ? closeLabel : openLabel}
            aria-expanded={isExpanded}
            style={{ color: menuColor } as CSSProperties}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>

          {logoHref.startsWith("#") || logoHref.startsWith("http") ? (
            <a className={styles.logoLink} href={logoHref} onClick={closeMenu}>
              <Image
                src={logo}
                alt={logoAlt}
                width={200}
                height={87}
                className={styles.logo}
                priority
                sizes="120px"
              />
            </a>
          ) : (
            <Link className={styles.logoLink} href={logoHref} onClick={closeMenu} prefetch={false}>
              <Image
                src={logo}
                alt={logoAlt}
                width={200}
                height={87}
                className={styles.logo}
                priority
                sizes="120px"
              />
            </Link>
          )}

          <div className={styles.actions}>
            {children}
            {secondaryLabel && secondaryHref ? (
              <a
                className={styles.secondaryCta}
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {secondaryLabel}
              </a>
            ) : null}
            <a
              className={styles.cta}
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              style={
                {
                  backgroundColor: buttonBgColor,
                  color: buttonTextColor,
                } as CSSProperties
              }
            >
              {ctaLabel}
            </a>
          </div>
        </div>

        <div className={styles.content} aria-hidden={!isExpanded}>
          {visibleItems.map((item, index) => (
            <div
              className={styles.card}
              key={`${item.label}-${index}`}
              ref={setCardRef(index)}
              style={{ backgroundColor: item.bgColor, color: item.textColor } as CSSProperties}
            >
              <div className={styles.cardLabel}>{item.label}</div>
              <div className={styles.cardLinks}>{item.links.map(renderLink)}</div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
