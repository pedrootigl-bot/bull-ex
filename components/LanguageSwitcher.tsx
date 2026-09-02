"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { localeCookieString } from "@/i18n/localeCookieString";
import {
  isPathLocale,
  localeToPathLocale,
  pathLocaleToLocale,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/i18n/config";
import { getSavedLocale } from "@/i18n/getSavedLocale";
import { usePathname, useRouter } from "@/i18n/navigation";
import styles from "./languageSwitcher.module.css";

function currentCanonical(pathLocale: string): Locale {
  return isPathLocale(pathLocale) ? pathLocaleToLocale(pathLocale) : "en";
}

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const pathLocale = useLocale();
  const current = currentCanonical(pathLocale);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function selectLocale(next: Locale) {
    const valid = getSavedLocale(next);
    if (!valid) {
      return;
    }

    document.cookie = localeCookieString(valid, window.location.protocol === "https:");
    const hash = window.location.hash;
    router.replace(`${pathname}${hash}`, { locale: localeToPathLocale(valid) });
    setOpen(false);
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        className={styles.trigger}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("label")}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">🌐</span>
        <span>{current.toUpperCase()}</span>
      </button>
      {open ? (
        <ul className={styles.menu} role="listbox">
          {SUPPORTED_LOCALES.map((locale) => (
            <li key={locale}>
              <button
                className={locale === current ? styles.optionActive : styles.option}
                type="button"
                role="option"
                aria-selected={locale === current}
                onClick={() => selectLocale(locale)}
              >
                {t(locale)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
