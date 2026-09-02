import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { applyLocaleCookie } from "./i18n/cookie";
import { pathLocaleToLocale, localeToPathLocale } from "./i18n/config";
import { getBrowserLocaleFromHeaders } from "./i18n/getBrowserLocaleFromHeaders";
import { getCountryFromRequest } from "./i18n/getCountryFromRequest";
import { getSavedLocale } from "./i18n/getSavedLocale";
import { getPathLocaleFromPathname } from "./i18n/pathLocale";
import { resolveLocale } from "./i18n/resolveLocale";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathLocale = getPathLocaleFromPathname(pathname);

  if (pathLocale) {
    const response = (await handleI18n(request)) ?? NextResponse.next();
    return applyLocaleCookie(response, pathLocaleToLocale(pathLocale), request);
  }

  const locale = resolveLocale({
    savedLocale: getSavedLocale(request.cookies.get("locale")?.value),
    country: getCountryFromRequest(request),
    browserLocale: getBrowserLocaleFromHeaders(request.headers.get("accept-language")),
  });

  const url = request.nextUrl.clone();
  const prefix = localeToPathLocale(locale);
  url.pathname = pathname === "/" ? `/${prefix}` : `/${prefix}${pathname}`;

  const response = NextResponse.redirect(url);
  return applyLocaleCookie(response, locale, request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
