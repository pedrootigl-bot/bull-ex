export type MarketChange = "positive" | "negative";

export type MarketItem = {
  ticker: string;
  name: string;
  price: string;
  change: string;
  direction: MarketChange;
  series: readonly number[];
  logo: "apple" | "tesla" | "nvidia" | "microsoft" | "amazon" | "google" | "meta" | "bitcoin" | "ethereum" | "petrobras";
};

export const MARKETS_COPY = {
  id: "mercados",
  badge: "+ 250 opções",
  title: "Mais de 200 ativos para investir de forma descomplicada.",
  subtitle: "Escolha um dos ativos e comece a investir com apenas alguns cliques.",
} as const;

export const MARKET_ITEMS: readonly MarketItem[] = [
  {
    ticker: "AAPL",
    name: "Apple",
    price: "US$ 227,40",
    change: "+1,84%",
    direction: "positive",
    series: [18, 20, 19, 22, 21, 24, 26, 25, 28, 31],
    logo: "apple",
  },
  {
    ticker: "TSLA",
    name: "Tesla",
    price: "US$ 248,12",
    change: "-2,16%",
    direction: "negative",
    series: [30, 28, 29, 26, 27, 24, 22, 23, 20, 18],
    logo: "tesla",
  },
  {
    ticker: "NVDA",
    name: "NVIDIA",
    price: "US$ 131,80",
    change: "+3,42%",
    direction: "positive",
    series: [12, 14, 13, 16, 18, 17, 21, 23, 22, 26],
    logo: "nvidia",
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    price: "US$ 428,90",
    change: "+0,67%",
    direction: "positive",
    series: [20, 21, 20, 22, 21, 23, 24, 23, 25, 26],
    logo: "microsoft",
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    price: "US$ 186,55",
    change: "-0,94%",
    direction: "negative",
    series: [24, 25, 23, 22, 24, 21, 20, 19, 18, 17],
    logo: "amazon",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet",
    price: "US$ 172,10",
    change: "+1,12%",
    direction: "positive",
    series: [16, 17, 16, 18, 19, 18, 20, 21, 22, 24],
    logo: "google",
  },
  {
    ticker: "META",
    name: "Meta",
    price: "US$ 512,30",
    change: "-1,48%",
    direction: "negative",
    series: [28, 27, 29, 26, 25, 24, 22, 23, 21, 19],
    logo: "meta",
  },
  {
    ticker: "BTC",
    name: "Bitcoin",
    price: "US$ 64.820",
    change: "+2,73%",
    direction: "positive",
    series: [10, 12, 11, 15, 14, 18, 17, 21, 23, 27],
    logo: "bitcoin",
  },
  {
    ticker: "ETH",
    name: "Ethereum",
    price: "US$ 3.412",
    change: "-1,05%",
    direction: "negative",
    series: [22, 21, 23, 20, 19, 18, 17, 16, 15, 14],
    logo: "ethereum",
  },
  {
    ticker: "PETR4",
    name: "Petrobras",
    price: "R$ 38,26",
    change: "+0,88%",
    direction: "positive",
    series: [14, 15, 14, 16, 15, 17, 18, 17, 19, 20],
    logo: "petrobras",
  },
] as const;
