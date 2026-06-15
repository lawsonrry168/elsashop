import { CollazenShowcase } from "@/components/CollazenShowcase";
import { SeasonalHighlights } from "@/components/SeasonalHighlights";
import { WellnessTeaser } from "@/components/WellnessTeaser";
import { HomeBento } from "@/components/premium/HomeBento";
import { HorizontalAccordion } from "@/components/premium/HorizontalAccordion";
import { ManifestoReveal } from "@/components/premium/ManifestoReveal";
import { MarqueeStrip } from "@/components/premium/MarqueeStrip";
import { PinnedTreatments } from "@/components/premium/PinnedTreatments";
import { PremiumTestimonials } from "@/components/premium/PremiumTestimonials";

export function HomePremiumSections() {
  return (
    <>
      <HomeBento />
      <ManifestoReveal />
      <HorizontalAccordion />
      <PinnedTreatments />
      <SeasonalHighlights />
      <CollazenShowcase />
      <WellnessTeaser />
      <PremiumTestimonials />
    </>
  );
}

export { MarqueeStrip };
