import { HTML_LANG, isPathLocale, localeToPathLocale, pathLocaleToLocale } from "@/i18n/config";
import { getMoneyMessageParams } from "@/i18n/formatMoney";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { BlogNavigationProvider } from "@/components/blog/BlogNavigationContext";

const LegalNotice = dynamic(() =>
  import("@/components/legal/LegalNotice").then((mod) => mod.LegalNotice),
);
const BackToTop = dynamic(() =>
  import("@/components/ui/BackToTop").then((mod) => mod.BackToTop),
);

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
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
      return [HTML_LANG[canonical], `/${item}`];
    }),
  );

  return {
    title: t("title"),
    description: t("description", moneyParams),
    alternates: {
      canonical: `/${pathLocale}`,
      languages: {
        ...languages,
        "x-default": `/${localeToPathLocale("en")}`,
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

  return (
    <NextIntlClientProvider messages={messages}>
      <BlogNavigationProvider>
        {children}
        <LegalNotice />
        <BackToTop />
      </BlogNavigationProvider>
    </NextIntlClientProvider>
  );
}
