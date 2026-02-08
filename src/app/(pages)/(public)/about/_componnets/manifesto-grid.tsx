"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Brain, Plus } from "lucide-react";

export default function ManifestoGrid() {
  const pillars = [
    {
      label: "PRIVACY_PROTOCOL",
      title: "Silence by Design",
      desc: "Your thoughts are a closed loop. We use zero-knowledge architecture so that not even our developers can peek inside your mind.",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      label: "AI_SYNTHESIS",
      title: "Augmented Introspection",
      desc: "We don't replace your thinking; we amplify it. Our engine looks for the threads you might miss in the chaos of daily life.",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      label: "GROWTH_LOGIC",
      title: "Intentional Evolution",
      desc: "Growth isn't a straight line. Reflecto maps your mental peaks and valleys so you can navigate your future with data, not just feelings.",
      icon: <Brain className="h-4 w-4" />,
    },
  ];

  return (
    <section className="bg-background border-border/40 relative border-t py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Metadata */}
        <div className="border-border/40 mb-24 flex items-center justify-between border-b pb-8">
          <div className="flex items-center gap-4">
            <Plus className="text-primary h-4 w-4" />
            <span className="font-mono text-[10px] font-bold tracking-[0.4em] uppercase">
              Core_Manifesto.v1
            </span>
          </div>
          <span className="text-muted-foreground/30 font-mono text-[10px]">
            AUTH_REQUIRED // 001-003
          </span>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-x-12 md:gap-y-0">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group md:border-border/40 flex flex-col items-start space-y-8 md:border-r md:pr-12 md:last:border-r-0"
            >
              {/* Icon & ID */}
              <div className="border-border/60 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full border transition-colors">
                {pillar.icon}
              </div>

              <div className="space-y-6">
                <div className="text-primary font-mono text-[9px] font-bold tracking-[0.3em] uppercase">
                  {pillar.label}
                </div>

                <h3 className="text-foreground font-serif text-4xl leading-tight italic transition-all group-hover:translate-x-2">
                  {pillar.title}
                </h3>

                <p className="text-muted-foreground text-base leading-relaxed antialiased opacity-80 group-hover:opacity-100">
                  {pillar.desc}
                </p>
              </div>

              {/* Decorative Terminal-style Footer for each card */}
              <div className="mt-auto pt-8">
                <div className="text-muted-foreground/20 group-hover:text-primary/40 flex items-center gap-2 font-mono text-[9px] transition-colors">
                  <span className="h-1 w-1 rounded-full bg-current" />
                  STATUS: OPERATIONAL
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
