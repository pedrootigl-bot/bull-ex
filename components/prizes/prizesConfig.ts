export const PRIZES_COPY = {
  id: "premios",
  ctaHref: "https://trade.bull-ex.com/pt/register",
} as const;

export const PRIZE_POINTS = ["points", "redeem", "safe"] as const;

export const FEATURED_PRIZE = "car" as const;

export const ROW_PRIZES = ["box", "tech"] as const;

export const PRIZE_CARDS = [FEATURED_PRIZE, ...ROW_PRIZES] as const;

export type PrizeId = (typeof PRIZE_CARDS)[number];

/** Caminho em /public quando a imagem do card chegar. */
export const PRIZE_IMAGES: Record<PrizeId, string | null> = {
  car: "/images/prizes/car.jpg",
  box: "/images/prizes/trader-top-box.jpg",
  tech: "/images/prizes/trader-top.jpg",
};
