import { SiteFooter } from "@/components/footer/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { PlatformSection } from "@/components/platform/PlatformSection";
import { TeamGridSection } from "@/components/teamGrid/TeamGridSection";
import { AppToMarketsScrollStack } from "@/components/scrollStack/AppToMarketsScrollStack";
import dynamic from "next/dynamic";
import styles from "./home.module.css";

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

export default function HomePage() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.slotHero}>
          <HeroSection />
        </div>
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
      </main>
      <SiteFooter />
    </>
  );
}
