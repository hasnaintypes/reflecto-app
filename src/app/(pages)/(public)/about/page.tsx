"use client";
import React from "react";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/app-header";
import OriginHero from "./_componnets/origin-header";
import ManifestoGrid from "./_componnets/manifesto-grid";
import EngineArchitecture from "./_componnets/engine-architecture";
import JourneyTimeline from "./_componnets/journey-timeline";

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
