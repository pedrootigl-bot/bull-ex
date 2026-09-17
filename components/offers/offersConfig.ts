export const OFFERS_PAGE_HREF = "/ofertas";

export const OFFER_IDS = ["riskFree", "saldoPromo", "tickets", "box", "tech"] as const;

export type OfferId = (typeof OFFER_IDS)[number];

/** Ofertas com landing publicada (navegação anterior/próxima). */
export const PUBLISHED_OFFER_IDS = ["riskFree", "saldoPromo", "tickets"] as const;

export type PublishedOfferId = (typeof PUBLISHED_OFFER_IDS)[number];

export const OFFER_IMAGES: Record<OfferId, string> = {
  riskFree: "/images/prizes/risk-free.webp",
  saldoPromo: "/images/prizes/saldopromo-card.webp",
  tickets: "/images/prizes/tickets-card.webp",
  box: "/images/prizes/trader-top-box.webp",
  tech: "/images/prizes/trader-top.webp",
};

/** Landings publicadas sob /ofertas/{slug}/. null = listada como "em breve". */
export const OFFER_HREFS: Record<OfferId, string | null> = {
  riskFree: "/ofertas/riskfree",
  saldoPromo: "/ofertas/saldopromo",
  tickets: "/ofertas/tickets",
  box: null,
  tech: null,
};

export const RISKFREE_PAGE_HREF = OFFER_HREFS.riskFree!;
export const SALDOPROMO_PAGE_HREF = OFFER_HREFS.saldoPromo!;
export const TICKETS_OFFER_PAGE_HREF = OFFER_HREFS.tickets!;

export function offerHref(id: OfferId): string | null {
  return OFFER_HREFS[id];
}

export function isPublishedOfferId(value: string): value is PublishedOfferId {
  return (PUBLISHED_OFFER_IDS as readonly string[]).includes(value);
}

export function getOfferNeighbors(currentId: PublishedOfferId): {
  prev: PublishedOfferId;
  next: PublishedOfferId;
  others: PublishedOfferId[];
} {
  const index = PUBLISHED_OFFER_IDS.indexOf(currentId);
  const total = PUBLISHED_OFFER_IDS.length;
  const prev = PUBLISHED_OFFER_IDS[(index - 1 + total) % total];
  const next = PUBLISHED_OFFER_IDS[(index + 1) % total];
  const others = PUBLISHED_OFFER_IDS.filter((id) => id !== currentId);

  return { prev, next, others };
}
