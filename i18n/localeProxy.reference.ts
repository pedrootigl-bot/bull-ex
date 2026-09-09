/**
 * REFERÊNCIA — proxy/middleware de locale para hosting com Node (Vercel/VPS).
 * Não é usado no deploy estático da Hostinger (`output: "export"`).
 * Para reativar em ambiente Node, renomeie este arquivo para `proxy.ts` na raiz
 * e remova `output: "export"` / `images.unoptimized` do `next.config.ts`.
 */
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { applyLocaleCookie } from "./cookie";
import { pathLocaleToLocale, localeToPathLocale } from "./config";
import { getBrowserLocaleFromHeaders } from "./getBrowserLocaleFromHeaders";
import { getCountryFromRequest } from "./getCountryFromRequest";
import { getSavedLocale } from "./getSavedLocale";
import { getPathLocaleFromPathname } from "./pathLocale";
import { resolveLocale } from "./resolveLocale";
import { routing } from "./routing";

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
