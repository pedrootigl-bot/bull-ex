export const SUPPORT_EMAIL = "support@bull-ex.com";

export const FOOTER_COPY = {
  brand: "Bullex",
  tagline: "Onde tecnologia e mercado se encontram.",
  cta: "Abra sua conta gratuita",
  ctaHref: "https://trade.bull-ex.com/pt/register",
  columns: [
    {
      title: "Plataforma",
      links: [
        { href: "#mercados", label: "Mercados" },
        { href: "#por-que-bullex", label: "Por que Bullex" },
        { href: "#premios", label: "Prêmios" },
        { href: "#sobre", label: "Quem somos" },
        { href: "#faq", label: "FAQ" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { href: "#faq", label: "FAQ" },
        { href: `mailto:${SUPPORT_EMAIL}`, label: SUPPORT_EMAIL },
        { href: "https://trade.bull-ex.com/pt/register", label: "Abrir conta" },
        { href: "https://trade.bull-ex.com/pt/register", label: "Entrar" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "#", label: "Termos de uso" },
        { href: "#", label: "Privacidade" },
        { href: "#", label: "Avisos de risco" },
      ],
    },
  ],
  legal:
    "Negociação de ativos envolve risco. Operar com capital que você pode perder. Conteúdo educacional, sem recomendação de investimento.",
  copyright: "© 2026 Bullex. Todos os direitos reservados.",
} as const;
