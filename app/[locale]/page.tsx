import { SiteFooter } from "@/components/footer/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { MobileScrollGate } from "@/components/MobileScrollGate";
import { isPathLocale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import styles from "./home.module.css";

const PlatformSection = dynamic(() =>
  import("@/components/platform/PlatformSection").then((mod) => mod.PlatformSection),
);
const TeamGridSection = dynamic(() =>
  import("@/components/teamGrid/TeamGridSection").then((mod) => mod.TeamGridSection),
);
const AppToMarketsScrollStack = dynamic(() =>
  import("@/components/scrollStack/AppToMarketsScrollStack").then(
    (mod) => mod.AppToMarketsScrollStack,
  ),
);
const WhySection = dynamic(() =>
  import("@/components/why/WhySection").then((mod) => mod.WhySection),
);
const PrizesSection = dynamic(() =>
  import("@/components/prizes/PrizesSection").then((mod) => mod.PrizesSection),
);
const KindnessSection = dynamic(() =>
  import("@/components/kindness/KindnessSection").then((mod) => mod.KindnessSection),
);
const AccountStepsSection = dynamic(() =>
  import("@/components/accountSteps/AccountStepsSection").then((mod) => mod.AccountStepsSection),
);
const TestimonialsSection = dynamic(() =>
  import("@/components/testimonials/TestimonialsSection").then((mod) => mod.TestimonialsSection),
);
const FaqSection = dynamic(() =>
  import("@/components/faq/FaqSection").then((mod) => mod.FaqSection),
);

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
    <>
      <main className={styles.main}>
        <div className={styles.slotHero}>
          <HeroSection />
        </div>
        <MobileScrollGate>
          <div className={styles.slotPlatform}>
            <PlatformSection />
          </div>
          <div className={styles.slotTeam}>
            <TeamGridSection />
          </div>
          <AppToMarketsScrollStack
            groupClassName={styles.stackGroup}
            mobileAppClassName={styles.slotMobileApp}
            marketsClassName={styles.slotMarkets}
          />
          <div className={styles.slotTestimonials}>
            <TestimonialsSection />
          </div>
          <div className={styles.slotWhy}>
            <WhySection />
          </div>
          <div className={styles.slotPrizes}>
            <PrizesSection />
          </div>
          <div className={styles.slotKindness}>
            <KindnessSection />
          </div>
          <div className={styles.slotAccount}>
            <AccountStepsSection />
          </div>
          <div className={styles.slotFaq}>
            <FaqSection />
          </div>
          <div className={styles.slotFooter}>
            <SiteFooter />
          </div>
        </MobileScrollGate>
      </main>
    </>
  );
}
