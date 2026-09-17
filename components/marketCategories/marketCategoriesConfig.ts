export const MARKET_CATEGORIES_COPY = {
  id: "mercados",
} as const;

export const MARKET_CATEGORY_IDS = ["digital", "forex", "etf", "blitz", "other"] as const;

export type MarketCategoryId = (typeof MARKET_CATEGORY_IDS)[number];

export type IndicatorIcon = "nodes" | "flash" | "clock" | "globe" | "bolt" | "chart" | "basket" | "layers" | "spread" | "timer" | "pulse" | "zap" | "index" | "commodity" | "more";

export const MARKET_CATEGORY_META: Record<
  MarketCategoryId,
  {
    index: string;
    indicators: readonly [
      { key: "1"; icon: IndicatorIcon },
      { key: "2"; icon: IndicatorIcon },
      { key: "3"; icon: IndicatorIcon },
    ];
  }
> = {
  digital: {
    index: "01",
    indicators: [
      { key: "1", icon: "nodes" },
      { key: "2", icon: "flash" },
      { key: "3", icon: "clock" },
    ],
  },
  forex: {
    index: "02",
    indicators: [
      { key: "1", icon: "globe" },
      { key: "2", icon: "bolt" },
      { key: "3", icon: "chart" },
    ],
  },
  etf: {
    index: "03",
    indicators: [
      { key: "1", icon: "basket" },
      { key: "2", icon: "layers" },
      { key: "3", icon: "spread" },
    ],
  },
  blitz: {
    index: "04",
    indicators: [
      { key: "1", icon: "timer" },
      { key: "2", icon: "pulse" },
      { key: "3", icon: "zap" },
    ],
  },
  other: {
    index: "05",
    indicators: [
      { key: "1", icon: "index" },
      { key: "2", icon: "commodity" },
      { key: "3", icon: "more" },
    ],
  },
};

export const MARKET_CITIES = [
  "New York",
  "London",
  "Tokyo",
  "Singapore",
  "Frankfurt",
  "Sydney",
] as const;

/** Cenas visuais por categoria. null = placeholder até a arte chegar. */
export const MARKET_SCENE_IMAGES: Record<MarketCategoryId, string | null> = {
  digital: "/images/markets/digital.png",
  forex: "/images/markets/forex.png",
  etf: "/images/markets/etf.png",
  blitz: "/images/markets/blitz.png",
  other: "/images/markets/other.png",
};

/** Dimensões intrínsecas dos assets (após upscale de qualidade). */
export const MARKET_SCENE_DIMENSIONS: Record<
  MarketCategoryId,
  { width: number; height: number }
> = {
  digital: { width: 1154, height: 866 },
  forex: { width: 1154, height: 866 },
  etf: { width: 1620, height: 1215 },
  blitz: { width: 1620, height: 1215 },
  other: { width: 1296, height: 924 },
};
