export const TICKETS_PAGE_HREF = "/tickets";

export const TICKETS_COPY = {
  /** Arte do hero: preencher quando a imagem da campanha estiver disponivel. */
  heroVisual: "",
} as const;

export const HERO_HIGHLIGHTS = ["seasonal", "tickets", "rules", "prizes"] as const;

export const PARTICIPATE_STEPS = ["choose", "coupon", "accumulate", "prize"] as const;

/**
 * Campanhas em destaque. `image` e `href` ficam vazios ate a arte e a pagina
 * de cada campanha existirem: o card usa o fundo decorativo e o CTA fica inativo.
 */
export const FEATURED_CAMPAIGNS = [
  {
    id: "seasonal",
    tone: "seasonal",
    status: "live",
    image: "/images/prizes/campaign-riskfree.webp",
    href: "",
    perks: ["ticket", "shield", "rules"],
  },
  {
    id: "coupon",
    tone: "coupon",
    status: "live",
    image: "/images/prizes/campaign-saldopromo.webp",
    href: "",
    perks: ["gift", "clock", "rules"],
  },
  {
    id: "rewards",
    tone: "rewards",
    status: "running",
    image: "/images/prizes/campaign-tickets.webp",
    href: "",
    perks: ["ticket", "swap", "rules"],
  },
] as const;

/** Chaves de traducao dos beneficios listados em cada card. */
export const CAMPAIGN_PERK_KEYS = ["1", "2", "3"] as const;

export type FeaturedCampaign = (typeof FEATURED_CAMPAIGNS)[number];
export type CampaignTone = FeaturedCampaign["tone"];
export type CampaignStatus = FeaturedCampaign["status"];
export type CampaignPerk = FeaturedCampaign["perks"][number];

export const FAQ_ITEMS = ["mechanics", "guarantee"] as const;
