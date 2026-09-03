import type { Locale } from "@/i18n/config";

export const HERO_THEME = {
  /** Cor de destaque (glow, wireframe, partículas, gradiente do título). */
  accent: "#00ff55",
  accentRgb: "0, 255, 85",
  /** Escala do objeto 3D (1 = padrão). */
  globeScale: 1,
  /** Quantidade de partículas na superfície. */
  particleCountDesktop: 240,
  particleCountTablet: 160,
  particleCountMobile: 80,
  /** Intensidade do glow CSS (0–1). */
  glowIntensity: 0.32,
  /** Rotação em radianos por segundo. 0 desliga a rotação 3D. */
  rotationSpeed: 0.035,
  /** false desliga glow pulse, pontos orbitais e rotação (além de reduced-motion). */
  enableAnimation: true,
} as const;

export const HERO_COPY = {
  id: "inicio",
  ctaHref: "https://trade.bull-ex.com/pt/register",
} as const;

export const TRADE_SITE_ORIGIN = "https://trade.bull-ex.com";

const TRADE_REGISTER_PATH_BY_LOCALE: Record<Locale, string> = {
  "pt-BR": "pt",
  en: "en",
  es: "es",
  ru: "ru",
  th: "th",
  vi: "vi",
};

/** URL de cadastro em pt-BR com parâmetros de rastreamento. */
export const TRADE_REGISTER_HREF_PT_BR =
  "https://trade.bull-ex.com/pt/register?_gl=1*ipbqt7*_gcl_au*NDY2OTQ1MTAwLjE3ODYzODM5ODYuLS4tLjE3ODgyODcwODkuNjE5ODc1OTA3LjE3ODg0NDcxNDguMTc4ODQ2ODUyMg..*_ga*OTg4ODAwMTY3LjE3ODYzODM5ODY.*_ga_PGJQVPEHRW*czE3ODg0Njg1MTkkbzExJGcwJHQxNzg4NDY4NTIxJGo1OCRsMCRoMTEwMzg4MDM1Ng..*_ga_FG1N23SDHQ*czE3ODg0Njc2MjkkbzEyJGcxJHQxNzg4NDY4NTI0JGo1NSRsMCRoMTg3NjIzMzc4Mg..";

export function bullexRegisterHref(locale: Locale): string {
  if (locale === "pt-BR") {
    return TRADE_REGISTER_HREF_PT_BR;
  }

  const path = TRADE_REGISTER_PATH_BY_LOCALE[locale];
  return `${TRADE_SITE_ORIGIN}/${path}/register`;
}

export const NAV_COPY = {
  links: [
    { href: "#mercados", labelKey: "markets", icon: "markets" },
    { href: "#por-que-bullex", labelKey: "why", icon: "why" },
    { href: "#premios", labelKey: "prizes", icon: "prizes" },
    { href: "#faq", labelKey: "faq", icon: "faq" },
  ],
} as const;
