import CTASection from "./_components/(public)/home/cta-section";
import FeaturesSection from "./_components/(public)/home/features-section";
import Footer from "./_components/(public)/home/footer";
import Header from "./_components/(public)/home/header";
import HeroSection from "./_components/(public)/home/hero-section";
import PricingSection from "./_components/(public)/home/pricing-section";
import TestimonialsSection from "./_components/(public)/home/testimonials-section";
import WorkflowSection from "./_components/(public)/home/workflow-section";
export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <HeroSection />
      <WorkflowSection />
      <FeaturesSection />
      <PricingSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
      <Footer />
    </main>
  );
}
