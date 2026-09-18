export const MARKET_CATEGORIES_COPY = {
  id: "mercados",
} as const;

export const MARKET_CATEGORY_IDS = ["digital", "forex", "etf", "blitz", "other"] as const;

export type MarketCategoryId = (typeof MARKET_CATEGORY_IDS)[number];

export const MARKET_FEATURES = ["secure", "speed", "markets"] as const;

export type MarketFeatureId = (typeof MARKET_FEATURES)[number];

export const MARKET_GLOBE_TAGS = ["forex", "crypto", "indices", "commodities", "stocks"] as const;

export type MarketQuote = {
  id: string;
  pairKey: string;
  valueKey?: string;
  changeKey: string;
  negative?: boolean;
};

export const MARKET_CATEGORY_META: Record<
  MarketCategoryId,
  {
    index: string;
    cover: string;
    coverWidth: number;
    coverHeight: number;
    quotes: readonly MarketQuote[];
  }
> = {
  digital: {
    index: "01",
    cover: "/images/markets/cards/digital.png",
    coverWidth: 1024,
    coverHeight: 1024,
    quotes: [
      { id: "btc", pairKey: "btc", valueKey: "btcValue", changeKey: "btcChange" },
      { id: "eth", pairKey: "eth", valueKey: "ethValue", changeKey: "ethChange" },
      { id: "sol", pairKey: "sol", valueKey: "solValue", changeKey: "solChange" },
    ],
  },
  forex: {
    index: "02",
    cover: "/images/markets/cards/forex.png",
    coverWidth: 1024,
    coverHeight: 1024,
    quotes: [
      { id: "eur", pairKey: "eur", valueKey: "eurValue", changeKey: "eurChange" },
      { id: "gbp", pairKey: "gbp", valueKey: "gbpValue", changeKey: "gbpChange" },
      { id: "jpy", pairKey: "jpy", valueKey: "jpyValue", changeKey: "jpyChange", negative: true },
    ],
  },
  etf: {
    index: "03",
    cover: "/images/markets/cards/etf.png",
    coverWidth: 1024,
    coverHeight: 1024,
    quotes: [
      { id: "spy", pairKey: "spy", valueKey: "spyValue", changeKey: "spyChange" },
      { id: "qqq", pairKey: "qqq", valueKey: "qqqValue", changeKey: "qqqChange" },
      { id: "ivv", pairKey: "ivv", valueKey: "ivvValue", changeKey: "ivvChange" },
    ],
  },
  blitz: {
    index: "04",
    cover: "/images/markets/cards/blitz.png",
    coverWidth: 1024,
    coverHeight: 1024,
    quotes: [
      { id: "eur", pairKey: "eur", valueKey: "eurSide", changeKey: "eurPayout" },
      { id: "gbp", pairKey: "gbp", valueKey: "gbpSide", changeKey: "gbpPayout", negative: true },
      { id: "btc", pairKey: "btc", valueKey: "btcSide", changeKey: "btcPayout" },
      { id: "timer", pairKey: "timer", valueKey: "timerValue", changeKey: "timerStatus" },
    ],
  },
  other: {
    index: "05",
    cover: "/images/markets/cards/other.png",
    coverWidth: 1024,
    coverHeight: 1024,
    quotes: [
      { id: "gold", pairKey: "gold", valueKey: "goldValue", changeKey: "goldChange" },
      { id: "oil", pairKey: "oil", valueKey: "oilValue", changeKey: "oilChange" },
      { id: "coffee", pairKey: "coffee", valueKey: "coffeeValue", changeKey: "coffeeChange", negative: true },
      { id: "wheat", pairKey: "wheat", valueKey: "wheatValue", changeKey: "wheatChange" },
    ],
  },
};

export const MARKET_HERO = {
  globe: "/images/markets/hero/globe.png",
  globeWidth: 1024,
  globeHeight: 1024,
} as const;
