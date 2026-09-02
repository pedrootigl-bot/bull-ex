import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, type Locale } from "./config";

export function localeCookieString(locale: Locale, secure: boolean): string {
  const parts = [
    `${LOCALE_COOKIE}=${locale}`,
    "Path=/",
    `Max-Age=${LOCALE_COOKIE_MAX_AGE}`,
    "SameSite=Lax",
  ];

  if (secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}
