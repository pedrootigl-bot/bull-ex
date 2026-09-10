import { LiteModeBoot } from "@/components/LiteModeBoot";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import Script from "next/script";
import type { Viewport } from "next";
import "./globals.css";
import "./lite.css";

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
        <Script id="lite-boot" strategy="beforeInteractive">
          {`(function(){try{var c=navigator.connection||navigator.mozConnection||navigator.webkitConnection;var reduce=window.matchMedia("(prefers-reduced-motion:reduce)").matches;var bad=false;if(c){var t=(c.effectiveType||"").toLowerCase();var d=typeof c.downlink==="number"?c.downlink:null;var r=typeof c.rtt==="number"?c.rtt:null;bad=!!c.saveData||t==="slow-2g"||t==="2g"||(d!==null&&d>0&&d<0.4)||(r!==null&&r>=1500)||(t==="3g"&&((d!==null&&d>0&&d<0.7)||(r!==null&&r>=900)));}if(bad||reduce)document.documentElement.classList.add("lite-experience");}catch(e){}})();`}
        </Script>
        <LiteModeBoot />
        {children}
      </body>
    </html>
  );
}
