import { isPathLocale, isSupportedLocale, pathLocaleToLocale, type Locale } from "./config";
import { normalizeLocale } from "./normalizeLocale";

export function getSavedLocale(value: string | null | undefined): Locale | undefined {
  if (!value) {
    return undefined;
  }

  if (isSupportedLocale(value)) {
    return value;
  }

  if (isPathLocale(value)) {
    return pathLocaleToLocale(value);
  }

  return normalizeLocale(value) ?? undefined;
}
