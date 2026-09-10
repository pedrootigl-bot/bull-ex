import { HTML_LANG, isPathLocale, localeToPathLocale, pathLocaleToLocale } from "@/i18n/config";
import { getMoneyMessageParams } from "@/i18n/formatMoney";
import { routing } from "@/i18n/routing";
import { withBasePath } from "@/lib/basePath";
import { BlogNavigationProvider } from "@/components/blog/BlogNavigationContext";
import { HtmlLang } from "@/components/HtmlLang";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const LegalNotice = dynamic(() =>
  import("@/components/legal/LegalNotice").then((mod) => mod.LegalNotice),
);
const PromoPopup = dynamic(() =>
  import("@/components/promo/PromoPopup").then((mod) => mod.PromoPopup),
);
const BackToTop = dynamic(() =>
  import("@/components/ui/BackToTop").then((mod) => mod.BackToTop),
);

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const pathLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const appLocale = pathLocaleToLocale(pathLocale);
  const moneyParams = getMoneyMessageParams(appLocale);
  const t = await getTranslations({ locale: pathLocale, namespace: "meta" });
  const languages = Object.fromEntries(
    routing.locales.map((item) => {
      const canonical = pathLocaleToLocale(item);
      return [HTML_LANG[canonical], withBasePath(`/${item}/`)];
    }),
  );

  return {
    title: t("title"),
    description: t("description", moneyParams),
    alternates: {
      canonical: withBasePath(`/${pathLocale}/`),
      languages: {
        ...languages,
        "x-default": withBasePath(`/${localeToPathLocale("en")}/`),
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isPathLocale(locale) || !hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const htmlLang = HTML_LANG[pathLocaleToLocale(locale)];

  return (
    <NextIntlClientProvider messages={messages}>
      <BlogNavigationProvider>
        <HtmlLang lang={htmlLang} />
        {children}
        <PromoPopup />
        <LegalNotice />
        <BackToTop />
      </BlogNavigationProvider>
    </NextIntlClientProvider>
  );
}
