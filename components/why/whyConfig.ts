export const WHY_COPY = {
  id: "por-que-bullex",
  features: ["support", "promotions", "exclusive"] as const,
  loopIntervalMs: 3500,
} as const;

export type WhyFeatureId = (typeof WHY_COPY.features)[number];
