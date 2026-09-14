/** Base path de publicação — deve bater com next.config.ts */
export function getBasePath(): string {
  if (process.env.BASE_PATH !== undefined) {
    const raw = process.env.BASE_PATH;
    if (!raw || raw === "/") {
      return "";
    }
    return raw.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "";
  }

  return "/bullex";
}

export function withBasePath(path: string): string {
  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base) {
    return normalized;
  }
  // Idempotente: prepare-dist / next já podem ter prefixado o basePath no bundle
  if (normalized === base || normalized.startsWith(`${base}/`)) {
    return normalized;
  }
  return `${base}${normalized}`;
}
