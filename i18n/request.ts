import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { pathLocaleToLocale } from "./config";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const pathLocale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const messagesLocale = pathLocaleToLocale(pathLocale);

  return {
    locale: pathLocale,
    messages: (await import(`../messages/${messagesLocale}.json`)).default,
  };
});
