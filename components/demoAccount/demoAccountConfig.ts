export const DEMO_ACCOUNT_COPY = {
  id: "conta-demo",
} as const;

export const DEMO_ACCOUNT_CARDS = ["balance", "access", "refill", "difference"] as const;

export type DemoAccountCardId = (typeof DEMO_ACCOUNT_CARDS)[number];
