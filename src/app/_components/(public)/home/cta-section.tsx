"use client";
import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { typewriterWords } from "@/constants";

export default function CTASection() {
  return (
    <section className="relative bg-neutral-950/30 px-4 py-20">
      {/* Background particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-indigo-500/5 blur-3xl"></div>
        <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-purple-500/5 blur-xl"></div>
        <div className="absolute right-20 bottom-20 h-40 w-40 rounded-full bg-rose-500/5 blur-xl"></div>
      </div>

      <div className="relative z-10 flex h-[40rem] flex-col items-center justify-center">
        <p className="mb-10 text-lg font-light tracking-wide text-white/60 sm:text-xl">
          Start your journey of self-discovery today
        </p>
        <TypewriterEffect words={typewriterWords} />
        <div className="mt-10 flex flex-col space-y-4 space-x-0 md:flex-row md:space-y-0 md:space-x-4">
          <button className="h-12 w-40 rounded-3xl border-transparent bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:from-indigo-600 hover:to-purple-600 hover:shadow-xl">
            Start Reflecting
          </button>
          <button className="h-12 w-40 rounded-3xl border border-white/20 bg-transparent text-sm font-medium text-white transition-all duration-200 hover:bg-white/5">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
