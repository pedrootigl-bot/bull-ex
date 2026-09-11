import { LiteModeBoot } from "@/components/LiteModeBoot";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import type { Viewport } from "next";
import "./globals.css";
import "./lite.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-thai",
  adjustFontFallback: true,
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

/**
 * Next.js 16 exige <html> e <body> no layout raiz.
 * O locale (lang + providers) fica em app/[locale]/layout.tsx.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} ${notoSansThai.variable}`}>
        <LiteModeBoot />
        {children}
      </body>
    </html>
  );
}
