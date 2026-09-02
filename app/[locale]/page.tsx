import { AboutSection } from "@/components/about/AboutSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { SiteFooter } from "@/components/footer/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { HighlightsSection } from "@/components/highlights/HighlightsSection";
import { PlatformSection } from "@/components/platform/PlatformSection";
import { PrizesSection } from "@/components/prizes/PrizesSection";
import { AppToMarketsScrollStack } from "@/components/scrollStack/AppToMarketsScrollStack";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { WhySection } from "@/components/why/WhySection";

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
