import { Footer } from "@/components/common";
import React from 'react'
import { CTASection , HeroSection , TestimonialsSection, NavBar } from "./_components";
import { heroContent } from "@/constants";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030303]">
      <NavBar />
      <HeroSection
        badge={heroContent.badge}
        title1={heroContent.title1}
        title2={heroContent.title2}
      />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

