import { DEFAULT_LOCALE, isSupportedLocale, type Locale } from "./config";
import { localeFromCountry } from "./localeFromCountry";
import { normalizeLocale } from "./normalizeLocale";

type ResolveLocaleInput = {
  savedLocale?: string | null;
  country?: string | null;
  browserLocale?: string | null;
};

export function resolveLocale({ savedLocale, country, browserLocale }: ResolveLocaleInput): Locale {
  if (isSupportedLocale(savedLocale)) {
    return savedLocale;
  }

  const fromCountry = localeFromCountry(country);
  if (fromCountry) {
    return fromCountry;
  }

  const fromBrowser = normalizeLocale(browserLocale);
  if (fromBrowser) {
    return fromBrowser;
  }

  return DEFAULT_LOCALE;
}
