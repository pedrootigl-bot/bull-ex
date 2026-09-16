import { BlogPageReady } from "@/components/blog/BlogPageReady";
import { TicketsPage } from "@/components/tickets/TicketsPage";
import { isPathLocale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type TicketsRouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TicketsRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "tickets" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function TicketsRoute({ params }: TicketsRouteProps) {
  const { locale } = await params;
  if (!isPathLocale(locale) || !hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <BlogPageReady />
      <TicketsPage />
    </>
  );
}
