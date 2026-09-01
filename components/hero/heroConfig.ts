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
  headline:
    "Negocie ações, criptomoedas e produtos de câmbio de forma simplificada!",
  subheadline:
    "Cadastre-se e ganhe US$ 10.000 em sua conta demo para aprender a investir.",
  cta: "ABRA SUA CONTA GRATUITA",
  ctaHref: "https://trade.bull-ex.com/pt/register",
  stats: [
    { value: "US$ 10.000", label: "Saldo inicial na demo" },
    { value: "0 taxas", label: "Para abrir sua conta" },
    { value: "24/7", label: "Mercados globais" },
  ],
} as const;

export const NAV_COPY = {
  brand: "Bull-ex",
  links: [
    { href: "#sobre", label: "Sobre" },
    { href: "#mercados", label: "Mercados" },
    { href: "#precos", label: "Preços" },
    { href: "#faq", label: "FAQ" },
  ],
  login: "Entrar",
} as const;
