export type MarketChange = "positive" | "negative";

export type MarketItem = {
  ticker: string;
  name: string;
  priceAmount: number;
  change: string;
  direction: MarketChange;
  series: readonly number[];
  logo: "apple" | "tesla" | "nvidia" | "microsoft" | "amazon" | "google" | "meta" | "bitcoin" | "ethereum" | "petrobras";
};

export const MARKETS_COPY = {
  id: "mercados",
} as const;

export const MARKET_ITEMS: readonly MarketItem[] = [
  {
    ticker: "AAPL",
    name: "Apple",
    priceAmount: 227.4,
    change: "+1,84%",
    direction: "positive",
    series: [18, 20, 19, 22, 21, 24, 26, 25, 28, 31],
    logo: "apple",
  },
  {
    ticker: "TSLA",
    name: "Tesla",
    priceAmount: 248.12,
    change: "-2,16%",
    direction: "negative",
    series: [30, 28, 29, 26, 27, 24, 22, 23, 20, 18],
    logo: "tesla",
  },
  {
    ticker: "NVDA",
    name: "NVIDIA",
    priceAmount: 131.8,
    change: "+3,42%",
    direction: "positive",
    series: [12, 14, 13, 16, 18, 17, 21, 23, 22, 26],
    logo: "nvidia",
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    priceAmount: 428.9,
    change: "+0,67%",
    direction: "positive",
    series: [20, 21, 20, 22, 21, 23, 24, 23, 25, 26],
    logo: "microsoft",
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    priceAmount: 186.55,
    change: "-0,94%",
    direction: "negative",
    series: [24, 25, 23, 22, 24, 21, 20, 19, 18, 17],
    logo: "amazon",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet",
    priceAmount: 172.1,
    change: "+1,12%",
    direction: "positive",
    series: [16, 17, 16, 18, 19, 18, 20, 21, 22, 24],
    logo: "google",
  },
  {
    ticker: "META",
    name: "Meta",
    priceAmount: 512.3,
    change: "-1,48%",
    direction: "negative",
    series: [28, 27, 29, 26, 25, 24, 22, 23, 21, 19],
    logo: "meta",
  },
  {
    ticker: "BTC",
    name: "Bitcoin",
    priceAmount: 64820,
    change: "+2,73%",
    direction: "positive",
    series: [10, 12, 11, 15, 14, 18, 17, 21, 23, 27],
    logo: "bitcoin",
  },
  {
    ticker: "ETH",
    name: "Ethereum",
    priceAmount: 3412,
    change: "-1,05%",
    direction: "negative",
    series: [22, 21, 23, 20, 19, 18, 17, 16, 15, 14],
    logo: "ethereum",
  },
  {
    ticker: "PETR4",
    name: "Petrobras",
    priceAmount: 38.26,
    change: "+0,88%",
    direction: "positive",
    series: [14, 15, 14, 16, 15, 17, 18, 17, 19, 20],
    logo: "petrobras",
  },
] as const;
