import { SiteFooter } from "@/components/footer/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { PlatformSection } from "@/components/platform/PlatformSection";
import { TeamGridSection } from "@/components/teamGrid/TeamGridSection";
import { AppToMarketsScrollStack } from "@/components/scrollStack/AppToMarketsScrollStack";
import dynamic from "next/dynamic";

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
      <main>
        <HeroSection />
        <PlatformSection />
        <TeamGridSection />
        <AppToMarketsScrollStack />
        <TestimonialsSection />
        <WhySection />
        <PrizesSection />
        <KindnessSection />
        <AccountStepsSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
