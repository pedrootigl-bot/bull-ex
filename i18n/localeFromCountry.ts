import type { Locale } from "./config";

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  BR: "pt-BR",
  RU: "ru",
  MX: "es",
  AR: "es",
  CL: "es",
  CO: "es",
  PE: "es",
  ES: "es",
  US: "en",
  GB: "en",
  CA: "en",
  TH: "th",
  VN: "vi",
};

export function localeFromCountry(countryCode: string | null | undefined): Locale | null {
  if (!countryCode) {
    return null;
  }

  const mapped = COUNTRY_TO_LOCALE[countryCode.trim().toUpperCase()];
  return mapped ?? null;
}
