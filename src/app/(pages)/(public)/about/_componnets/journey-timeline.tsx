"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function JourneyTimeline() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const milestones = [
    {
      year: "2023",
      label: "INITIAL_VOID",
      title: "The Silent Scream",
      desc: "Reflecto began as a local script—a private sanctuary to process the cognitive debris of burnout.",
    },
    {
      year: "2024",
      label: "CORE_ASSEMBLY",
      title: "Neural Awakening",
      desc: "Integration of vector logic. The script evolved into an engine capable of finding the signals in the noise.",
    },
    {
      year: "2025",
      label: "LIMITLESS_GROWTH",
      title: "Reflecto v1.0",
      desc: "Opening the engine to the public. Building a global architecture for intentional self-evolution.",
    },
  ];

  return (
    <section className="bg-background border-border/40 relative overflow-hidden border-y py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* --- Header --- */}
        <div className="border-primary/20 mb-32 flex flex-col items-start border-l-2 pl-8">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-xs font-bold tracking-[0.4em] uppercase"
          >
            {"// History_Log"}
          </motion.span>
          <h2 className="text-foreground mt-4 font-serif text-5xl leading-tight italic md:text-7xl">
            A record of <br />
            <span className="text-muted-foreground/40">intentionality.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Animated Central Path */}
          <div className="bg-border/40 absolute top-0 left-[23px] h-full w-[1px] md:left-1/2">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="bg-primary h-full w-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            />
          </div>

          <div className="space-y-32">
            {milestones.map((item, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row md:items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* --- Content Card --- */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="px-12 md:w-1/2 lg:px-20"
                >
                  <div
                    className={`flex flex-col ${i % 2 === 0 ? "md:items-start" : "md:items-end md:text-right"}`}
                  >
                    <div className="bg-secondary/50 ring-border/50 mb-6 rounded-md px-2 py-1 ring-1">
                      <span className="text-primary font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
                        {item.label}
                      </span>
                    </div>
                    <h3 className="text-foreground mb-6 font-serif text-4xl leading-none italic">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>

                {/* --- Center Node (Data Stamp) --- */}
                <div className="absolute top-0 left-0 flex items-center justify-center md:left-1/2 md:-translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    className="bg-card border-primary/40 hover:border-primary flex h-12 w-12 items-center justify-center rounded-xl border-2 shadow-2xl backdrop-blur-xl transition-colors"
                  >
                    <span className="text-foreground font-mono text-[11px] font-bold">
                      &apos;{item.year.slice(-2)}
                    </span>
                  </motion.div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Gradient */}
      <div className="bg-primary/5 absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]" />
    </section>
  );
}
