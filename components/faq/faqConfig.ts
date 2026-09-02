export const FAQ_COPY = {
  id: "faq",
} as const;

export const FAQ_ITEMS = ["unique", "trust", "start", "instruments", "security", "education"] as const;

export type FaqItemId = (typeof FAQ_ITEMS)[number];
