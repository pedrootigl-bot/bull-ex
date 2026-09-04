import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogIndex } from "@/components/blog/BlogIndex";
import styles from "@/components/blog/blog.module.css";
import { SiteFooter } from "@/components/footer/Footer";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type BlogIndexPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: BlogIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: `${t("indexTitle")} | Bullex`,
    description: t("indexSubtitle"),
  };
}

export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className={styles.page}>
      <BlogHeader />
      <BlogIndex />
      <SiteFooter />
    </div>
  );
}
