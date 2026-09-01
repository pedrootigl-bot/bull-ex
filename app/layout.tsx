import { LegalNotice } from "@/components/legal/LegalNotice";
import { BackToTop } from "@/components/ui/BackToTop";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bull-ex — Negocie ações, cripto e câmbio",
  description:
    "Cadastre-se e ganhe US$ 10.000 em sua conta demo para aprender a investir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <LegalNotice />
        <BackToTop />
      </body>
    </html>
  );
}
