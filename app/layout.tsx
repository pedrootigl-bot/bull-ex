import { HTML_LANG, pathLocaleToLocale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestedLocale = await getLocale();
  const pathLocale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const htmlLang = HTML_LANG[pathLocaleToLocale(pathLocale)];

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body className={`${inter.className} ${notoSansThai.variable}`}>{children}</body>
    </html>
  );
}
