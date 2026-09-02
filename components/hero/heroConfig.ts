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
  glowIntensity: 0.55,
  /** Rotação em radianos por segundo. 0 desliga a rotação 3D. */
  rotationSpeed: 0.035,
  /** false desliga glow pulse, pontos orbitais e rotação (além de reduced-motion). */
  enableAnimation: true,
} as const;

export const HERO_COPY = {
  ctaHref: "https://trade.bull-ex.com/pt/register",
} as const;

export const NAV_COPY = {
  links: [
    { href: "#sobre", labelKey: "about", icon: "about" },
    { href: "#mercados", labelKey: "markets", icon: "markets" },
    { href: "#precos", labelKey: "pricing", icon: "pricing" },
    { href: "#faq", labelKey: "faq", icon: "faq" },
  ],
} as const;
