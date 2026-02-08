"use client";
import React from "react";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import OriginHero from "../_components/(public)/about/origin-header";
import ManifestoGrid from "../_components/(public)/about/manifesto-grid";
import EngineArchitecture from "../_components/(public)/about/engine-architecture";
import JourneyTimeline from "../_components/(public)/about/journey-timeline";

export default function About() {
  return (
    <main className="bg-background min-h-screen">
      <Header />

      <OriginHero />

      <ManifestoGrid />

      <EngineArchitecture />

      <JourneyTimeline />
      <Footer />
    </main>
  );
}
