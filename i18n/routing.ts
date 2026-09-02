import { defineRouting } from "next-intl/routing";
import { DEFAULT_PATH_LOCALE, PATH_LOCALES } from "./config";

export const routing = defineRouting({
  locales: PATH_LOCALES,
  defaultLocale: DEFAULT_PATH_LOCALE,
  localePrefix: "always",
  localeDetection: false,
});
