import { AboutSection } from "@/components/about/AboutSection";
import { SiteFooter } from "@/components/footer/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { MarketsSection } from "@/components/markets/MarketsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { WhySection } from "@/components/why/WhySection";

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <MarketsSection />
        <WhySection />
        <AboutSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  );
}
