import { BlogPageReady } from "@/components/blog/BlogPageReady";
import { SaldoPromoPage } from "@/components/saldopromo/SaldoPromoPage";
import { isPathLocale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type SaldoPromoRouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: SaldoPromoRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "saldoPromo" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function SaldoPromoRoute({ params }: SaldoPromoRouteProps) {
  const { locale } = await params;
  if (!isPathLocale(locale) || !hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <BlogPageReady />
      <SaldoPromoPage />
    </>
  );
}
