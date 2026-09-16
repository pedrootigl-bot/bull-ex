export const OFFERS_PAGE_HREF = "/ofertas";

export const OFFER_IDS = ["riskFree", "saldoPromo", "tickets", "box", "tech"] as const;

export type OfferId = (typeof OFFER_IDS)[number];

export const OFFER_IMAGES: Record<OfferId, string> = {
  riskFree: "/images/prizes/risk-free.webp",
  saldoPromo: "/images/prizes/saldopromo-card.webp",
  tickets: "/images/prizes/tickets-card.webp",
  box: "/images/prizes/trader-top-box.webp",
  tech: "/images/prizes/trader-top.webp",
};

/** Ofertas sem landing própria ainda ficam listadas como "em breve". */
export const OFFER_HREFS: Record<OfferId, string | null> = {
  riskFree: "/riskfree",
  saldoPromo: "/saldopromo",
  tickets: "/tickets",
  box: null,
  tech: null,
};

export function offerHref(id: OfferId): string | null {
  return OFFER_HREFS[id];
}
