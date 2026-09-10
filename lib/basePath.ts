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
  return `${base}${normalized}`;
}
