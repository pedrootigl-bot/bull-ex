import { BlogPageReady } from "@/components/blog/BlogPageReady";
import { SiteFooter } from "@/components/footer/Footer";
import { OffersHeader } from "@/components/offers/OffersHeader";
import { OffersIndex } from "@/components/offers/OffersIndex";
import styles from "@/components/offers/offers.module.css";
import { isPathLocale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type OffersRouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: OffersRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "offers" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function OffersRoute({ params }: OffersRouteProps) {
  const { locale } = await params;
  if (!isPathLocale(locale) || !hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className={styles.page}>
      <BlogPageReady />
      <OffersHeader />
      <OffersIndex />
      <SiteFooter />
    </div>
  );
}
