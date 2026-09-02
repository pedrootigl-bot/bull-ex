import { NextRequest, NextResponse } from "next/server";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, type Locale } from "./config";

function toNextResponse(response: Response): NextResponse {
  return response instanceof NextResponse ? response : new NextResponse(response.body, response);
}

export function applyLocaleCookie(response: Response, locale: Locale, request: NextRequest): NextResponse {
  const nextResponse = toNextResponse(response);
  nextResponse.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  return nextResponse;
}
