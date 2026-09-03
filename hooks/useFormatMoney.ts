"use client";

import { useLocale } from "next-intl";
import {
  formatMoney as formatMoneyForLocale,
  getMoneyMessageParams,
  resolveLocaleFromPath,
  type FormatMoneyOptions,
} from "@/i18n/formatMoney";
import type { Locale } from "@/i18n/config";

export function useFormatMoney() {
  const pathLocale = useLocale();
  const locale = resolveLocaleFromPath(pathLocale);

  return {
    locale,
    formatMoney: (amount: number, options?: FormatMoneyOptions) => formatMoneyForLocale(locale, amount, options),
    moneyParams: getMoneyMessageParams(locale),
  };
}

export function useAppLocale(): Locale {
  return resolveLocaleFromPath(useLocale());
}
