import { normalizeLocale } from "./normalizeLocale";
import type { Locale } from "./config";

export function getBrowserLocaleFromHeaders(acceptLanguage: string | null | undefined): string | undefined {
  if (!acceptLanguage) {
    return undefined;
  }

  const tags = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((item) => item.trim().startsWith("q="));
      const quality = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return { tag: tag?.trim(), quality: Number.isFinite(quality) ? quality : 0 };
    })
    .filter((item) => item.tag)
    .sort((a, b) => b.quality - a.quality);

  for (const item of tags) {
    const normalized = normalizeLocale(item.tag);
    if (normalized) {
      return item.tag;
    }
  }

  return tags[0]?.tag;
}

export function localeFromAcceptLanguage(acceptLanguage: string | null | undefined): Locale | null {
  const primary = getBrowserLocaleFromHeaders(acceptLanguage);
  return normalizeLocale(primary);
}
