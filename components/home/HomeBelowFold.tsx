"use client";

import { SiteFooter } from "@/components/footer/Footer";
import { MobileScrollGate } from "@/components/MobileScrollGate";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "@/app/[locale]/home.module.css";

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
const MobileAppSection = dynamic(() =>
  import("@/components/mobileApp/MobileAppSection").then((mod) => mod.MobileAppSection),
);
const MarketsSection = dynamic(() =>
  import("@/components/markets/MarketsSection").then((mod) => mod.MarketsSection),
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

function DesktopSections() {
  return (
    <>
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
    </>
  );
}

/** Ordem mobile: criar conta logo antes dos depoimentos. */
function MobileSections() {
  return (
    <>
      <div className={styles.slotPlatform}>
        <PlatformSection />
      </div>
      <div className={styles.slotTeam}>
        <TeamGridSection />
      </div>
      <div className={styles.slotMarkets}>
        <MarketsSection />
      </div>
      <div className={styles.slotAccount}>
        <AccountStepsSection />
      </div>
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
      <div className={styles.slotMobileApp}>
        <MobileAppSection />
      </div>
      <div className={styles.slotFaq}>
        <FaqSection />
      </div>
      <div className={styles.slotFooter}>
        <SiteFooter />
      </div>
    </>
  );
}

export function HomeBelowFold() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  // Evita montar ordem desktop no mobile no primeiro paint
  if (isMobile === null) {
    return null;
  }

  return (
    <MobileScrollGate>{isMobile ? <MobileSections /> : <DesktopSections />}</MobileScrollGate>
  );
}
