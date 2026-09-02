import { NextRequest } from "next/server";

const BLOCKED_COUNTRY_CODES = new Set(["", "XX", "T1", "ZZ"]);

function readHeaderCountry(request: NextRequest): string | null {
  const candidates = [
    request.headers.get("x-vercel-ip-country"),
    request.headers.get("cf-ipcountry"),
    request.headers.get("cloudfront-viewer-country"),
    request.headers.get("x-country-code"),
  ];

  for (const value of candidates) {
    const code = value?.trim().toUpperCase();
    if (code && !BLOCKED_COUNTRY_CODES.has(code)) {
      return code;
    }
  }

  const geoCountry = request.headers.get("x-geo-country");
  if (geoCountry && !BLOCKED_COUNTRY_CODES.has(geoCountry.trim().toUpperCase())) {
    return geoCountry.trim().toUpperCase();
  }

  return null;
}

export function getCountryFromRequest(request: NextRequest): string | null {
  if (process.env.NODE_ENV !== "production") {
    const simulated = process.env.DEV_COUNTRY?.trim().toUpperCase();
    if (simulated && !BLOCKED_COUNTRY_CODES.has(simulated)) {
      return simulated;
    }
  }

  return readHeaderCountry(request);
}
