export const SUPPORTED_LOCALES = ["pt-BR", "en", "es", "ru", "th", "vi"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const PATH_LOCALES = ["pt-br", "en", "es", "ru", "th", "vi"] as const;

export type PathLocale = (typeof PATH_LOCALES)[number];

export const DEFAULT_PATH_LOCALE: PathLocale = "en";

export const LOCALE_COOKIE = "locale";

export const LOCALE_COOKIE_MAX_AGE = 31536000;

export const HTML_LANG: Record<Locale, string> = {
  "pt-BR": "pt-BR",
  en: "en",
  es: "es",
  ru: "ru",
  th: "th",
  vi: "vi",
};

const PATH_BY_LOCALE: Record<Locale, PathLocale> = {
  "pt-BR": "pt-br",
  en: "en",
  es: "es",
  ru: "ru",
  th: "th",
  vi: "vi",
};

const LOCALE_BY_PATH: Record<PathLocale, Locale> = {
  "pt-br": "pt-BR",
  en: "en",
  es: "es",
  ru: "ru",
  th: "th",
  vi: "vi",
};

export function isSupportedLocale(value: unknown): value is Locale {
  return typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function isPathLocale(value: unknown): value is PathLocale {
  return typeof value === "string" && (PATH_LOCALES as readonly string[]).includes(value);
}

export function localeToPathLocale(locale: Locale): PathLocale {
  return PATH_BY_LOCALE[locale];
}

export function pathLocaleToLocale(pathLocale: PathLocale): Locale {
  return LOCALE_BY_PATH[pathLocale];
}
