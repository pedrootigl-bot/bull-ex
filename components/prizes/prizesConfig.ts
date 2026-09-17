import { OFFERS_PAGE_HREF } from "@/components/offers/offersConfig";

export const PRIZES_COPY = {
  id: "ofertas",
  pageHref: OFFERS_PAGE_HREF,
} as const;

export const PRIZE_POINTS = ["points", "redeem", "safe"] as const;

export const FEATURED_PRIZE = "saldoPromo" as const;

export const ROW_PRIZES = ["tickets", "riskFree"] as const;

export const PRIZE_CARDS = [FEATURED_PRIZE, ...ROW_PRIZES] as const;

export type PrizeId = (typeof PRIZE_CARDS)[number];

/** Caminho em /public para a arte de cada card. */
export const PRIZE_IMAGES: Record<PrizeId, string | null> = {
  saldoPromo: "/images/prizes/saldopromo-home.webp",
  tickets: "/images/prizes/tickets-home.webp",
  riskFree: "/images/prizes/risk-free.webp",
};
