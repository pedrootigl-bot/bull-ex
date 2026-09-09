import { HeroSection } from "@/components/hero/HeroSection";
import { HomeBelowFold } from "@/components/home/HomeBelowFold";
import { isPathLocale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import styles from "./home.module.css";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isPathLocale(locale) || !hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main className={styles.main}>
      <div className={styles.slotHero}>
        <HeroSection />
      </div>
      <HomeBelowFold />
    </main>
  );
}
