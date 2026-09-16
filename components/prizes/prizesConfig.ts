import { OFFERS_PAGE_HREF } from "@/components/offers/offersConfig";

export const PRIZES_COPY = {
  id: "ofertas",
  pageHref: OFFERS_PAGE_HREF,
} as const;

export const PRIZE_POINTS = ["points", "redeem", "safe"] as const;

export const FEATURED_PRIZE = "riskFree" as const;

export const ROW_PRIZES = ["box", "tech"] as const;

export const PRIZE_CARDS = [FEATURED_PRIZE, ...ROW_PRIZES] as const;

export type PrizeId = (typeof PRIZE_CARDS)[number];

/** Caminho em /public quando a imagem do card chegar. */
export const PRIZE_IMAGES: Record<PrizeId, string | null> = {
  riskFree: "/images/prizes/risk-free.webp",
  box: "/images/prizes/trader-top-box.webp",
  tech: "/images/prizes/trader-top.webp",
};
