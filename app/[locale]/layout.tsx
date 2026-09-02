import { HTML_LANG, isPathLocale, localeToPathLocale, pathLocaleToLocale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const LegalNotice = dynamic(() =>
  import("@/components/legal/LegalNotice").then((mod) => mod.LegalNotice),
);
const BackToTop = dynamic(() =>
  import("@/components/ui/BackToTop").then((mod) => mod.BackToTop),
);

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "vietnamese"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-thai",
  adjustFontFallback: true,
});

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
  const t = await getTranslations({ locale: pathLocale, namespace: "meta" });
  const languages = Object.fromEntries(
    routing.locales.map((item) => {
      const canonical = pathLocaleToLocale(item);
      return [HTML_LANG[canonical], `/${item}`];
    }),
  );

  return {
    title: t("title"),
    description: t("description"),
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
  const htmlLang = HTML_LANG[pathLocaleToLocale(locale)];

  return (
    <html lang={htmlLang}>
      <body className={`${inter.className} ${notoSansThai.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <LegalNotice />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
