import CTASection from "./_components/(public)/home/cta-section";
import FeaturesSection from "./_components/(public)/home/features-section";
import Footer from "../../../components/common/footer";
import Header from "../../../components/common/header";
import HeroSection from "./_components/(public)/home/hero-section";
import PricingSection from "./_components/(public)/home/pricing-section";
import WorkflowSection from "./_components/(public)/home/workflow-section";
export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <HeroSection />
      <WorkflowSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
