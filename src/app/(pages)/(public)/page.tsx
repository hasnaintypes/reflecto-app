import {
  CTASection,
  FeaturesSection,
  HeroSection,
  PricingSection,
  WorkflowSection,
} from "@/components/home";
import { Footer, AppHeader } from "@/components/layout";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <AppHeader />
      <HeroSection />
      <WorkflowSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
