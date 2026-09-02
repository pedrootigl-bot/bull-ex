import { SiteFooter } from "@/components/footer/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { HighlightsSection } from "@/components/highlights/HighlightsSection";
import { PlatformSection } from "@/components/platform/PlatformSection";
import { AppToMarketsScrollStack } from "@/components/scrollStack/AppToMarketsScrollStack";
import dynamic from "next/dynamic";

const WhySection = dynamic(() =>
  import("@/components/why/WhySection").then((mod) => mod.WhySection),
);
const PrizesSection = dynamic(() =>
  import("@/components/prizes/PrizesSection").then((mod) => mod.PrizesSection),
);
const AboutSection = dynamic(() =>
  import("@/components/about/AboutSection").then((mod) => mod.AboutSection),
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
        <HighlightsSection />
        <AppToMarketsScrollStack />
        <WhySection />
        <PrizesSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
