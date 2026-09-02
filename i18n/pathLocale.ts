import { isPathLocale, localeToPathLocale, type Locale, type PathLocale } from "./config";

export function getPathLocaleFromPathname(pathname: string): PathLocale | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isPathLocale(segment) ? segment : null;
}

export function replaceLocaleInPathname(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/");
  const maybeLocale = parts[1];

  if (isPathLocale(maybeLocale)) {
    parts[1] = localeToPathLocale(nextLocale);
    const nextPath = parts.join("/") || `/${localeToPathLocale(nextLocale)}`;
    return nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  }

  const prefix = localeToPathLocale(nextLocale);
  if (!pathname || pathname === "/") {
    return `/${prefix}`;
  }

  return `/${prefix}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
