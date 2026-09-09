import { HTML_LANG, isPathLocale, localeToPathLocale, pathLocaleToLocale } from "@/i18n/config";
import { getMoneyMessageParams } from "@/i18n/formatMoney";
import { routing } from "@/i18n/routing";
import { withBasePath } from "@/lib/basePath";
import { BlogNavigationProvider } from "@/components/blog/BlogNavigationContext";
import { LiteModeBoot } from "@/components/LiteModeBoot";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import "../lite.css";

const LegalNotice = dynamic(() =>
  import("@/components/legal/LegalNotice").then((mod) => mod.LegalNotice),
);
const PromoPopup = dynamic(() =>
  import("@/components/promo/PromoPopup").then((mod) => mod.PromoPopup),
);
const BackToTop = dynamic(() =>
  import("@/components/ui/BackToTop").then((mod) => mod.BackToTop),
);

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-thai",
  adjustFontFallback: true,
  preload: false,
});

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
    <html lang={htmlLang} suppressHydrationWarning>
      <body className={`${inter.className} ${notoSansThai.variable}`}>
        <Script id="lite-boot" strategy="beforeInteractive">
          {`(function(){try{var c=navigator.connection||navigator.mozConnection||navigator.webkitConnection;var slow=c&&(c.saveData||/2g|3g|slow-2g/i.test(c.effectiveType||""));var compact=window.matchMedia("(max-width:1024px)").matches;var reduce=window.matchMedia("(prefers-reduced-motion:reduce)").matches;if(slow||compact||reduce)document.documentElement.classList.add("lite-experience");}catch(e){document.documentElement.classList.add("lite-experience");}})();`}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <BlogNavigationProvider>
            <LiteModeBoot />
            {children}
            <PromoPopup />
            <LegalNotice />
            <BackToTop />
          </BlogNavigationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
