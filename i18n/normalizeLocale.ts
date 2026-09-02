import { isSupportedLocale, type Locale } from "./config";

const LANGUAGE_TO_LOCALE: Record<string, Locale> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
  ru: "ru",
  th: "th",
  vi: "vi",
};

export function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) {
    return null;
  }

  const tag = value.trim().replaceAll("_", "-");
  if (!tag) {
    return null;
  }

  if (isSupportedLocale(tag)) {
    return tag;
  }

  const lower = tag.toLowerCase();
  if (lower === "pt-br") {
    return "pt-BR";
  }

  const language = lower.split("-")[0];
  return LANGUAGE_TO_LOCALE[language] ?? null;
}
