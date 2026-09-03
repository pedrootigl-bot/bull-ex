import { isPathLocale, pathLocaleToLocale, type Locale } from "./config";
import { MONEY_AMOUNTS } from "./moneyAmounts";

const LOCALE_CURRENCY: Record<Locale, string> = {
  "pt-BR": "BRL",
  en: "USD",
  es: "USD",
  ru: "USD",
  th: "USD",
  vi: "USD",
};

export type FormatMoneyOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function resolveLocaleFromPath(pathLocale: string): Locale {
  return isPathLocale(pathLocale) ? pathLocaleToLocale(pathLocale) : "en";
}

export function getCurrencyForLocale(locale: Locale): string {
  return LOCALE_CURRENCY[locale];
}

export function formatMoney(locale: Locale, amount: number, options?: FormatMoneyOptions): string {
  const currency = getCurrencyForLocale(locale);
  const hasDecimals = !Number.isInteger(amount);
  const minimumFractionDigits = options?.minimumFractionDigits ?? (hasDecimals ? 2 : 0);
  const maximumFractionDigits = options?.maximumFractionDigits ?? (hasDecimals ? 2 : 0);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

export function getMoneyMessageParams(locale: Locale) {
  return {
    demoBalance: formatMoney(locale, MONEY_AMOUNTS.demoBalance, { maximumFractionDigits: 0 }),
    minDeposit: formatMoney(locale, MONEY_AMOUNTS.minDeposit, { maximumFractionDigits: 0 }),
    minInvestment: formatMoney(locale, MONEY_AMOUNTS.minInvestment, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  };
}
