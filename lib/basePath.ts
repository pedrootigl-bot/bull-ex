/** Base path de publicação (subpasta Hostinger). Deve bater com next.config.ts */
export function getBasePath(): string {
  const raw = process.env.BASE_PATH ?? "/bullex";
  if (!raw || raw === "/") {
    return "";
  }
  return raw.replace(/\/$/, "");
}

export function withBasePath(path: string): string {
  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
