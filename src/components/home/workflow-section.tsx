"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mic, Search, LineChart, Wind, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function WorkflowSection() {
  const steps = [
    {
      number: "01",
      title: "Capture",
      tag: "INPUT_STREAM",
      description: "One messy thought. Or a voice note while you walk.",
      icon: <Mic className="h-6 w-6" />,
    },
    {
      number: "02",
      title: "Reflect",
      tag: "CORE_PROCESS",
      description: "AI helps you drill deeper into why you feel this way.",
      icon: <Search className="h-6 w-6" />,
    },
    {
      number: "03",
      title: "Synthesize",
      tag: "DATA_MERGE",
      description: "Patterns emerge. Your subconscious becomes conscious.",
      icon: <LineChart className="h-6 w-6" />,
    },
    {
      number: "04",
      title: "Grow",
      tag: "OUTPUT_ACTION",
      description: "Turn insights into action. One day at a time.",
      icon: <Wind className="h-6 w-6" />,
    },
  ];

  return (
    <section className="bg-background border-border/40 relative overflow-hidden border-t py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* --- Header Section (Compliments EnhancedFeatures) --- */}
        <div className="border-primary/20 relative mb-24 flex flex-col items-start gap-4 border-l-2 pl-8">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-xs font-bold tracking-[0.4em] uppercase"
          >
            {"// Workflow_Engine.v1"}
          </motion.span>
          <h2 className="text-foreground max-w-3xl font-serif text-5xl leading-tight italic md:text-7xl">
            From chaos <br />
            <span className="text-muted-foreground/40">
              to complete clarity.
            </span>
          </h2>
        </div>

        {/* --- Workflow Grid --- */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {/* Desktop Connecting Line with Pulse Effect */}
          <div className="bg-border/50 absolute top-12 left-0 -z-10 hidden h-[1px] w-full md:block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="bg-primary relative h-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            >
              <div className="bg-primary absolute top-1/2 right-0 h-2 w-2 -translate-y-1/2 animate-ping rounded-full" />
            </motion.div>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative flex flex-col items-start"
            >
              {/* Visual Indicator (Compliments Bento Cards) */}
              <div className="relative mb-8">
                <div className="bg-card border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-primary/10 relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {step.icon}

                  {/* Subtle Number Overlay */}
                  <span className="absolute right-2 bottom-2 font-mono text-[10px] opacity-20 transition-opacity group-hover:opacity-100">
                    {step.number}
                  </span>
                </div>

                {/* Floating Tag (Compliments System_Modules vibe) */}
                <div className="bg-primary text-primary-foreground absolute -top-3 -right-3 z-20 rounded-md px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-tighter uppercase">
                  {step.tag}
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <h3 className="text-foreground group-hover:text-primary font-serif text-2xl font-medium italic transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed antialiased md:pr-4">
                  {step.description}
                </p>
              </div>

              {/* Interaction Hint (Matches CTA/Bento styles) */}
              <motion.button
                onClick={() =>
                  toast.success(
                    `Module Active: ${step.title} protocols initiated.`,
                    {
                      description:
                        "Workflow documentation is now available in your dashboard.",
                    },
                  )
                }
                className="mt-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 transition-all group-hover:opacity-100 hover:gap-3"
              >
                <span className="text-primary">Initialize</span>
                <ArrowRight size={12} className="text-primary" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Blur (Matches Hero/Bento bg) */}
      <div className="bg-primary/5 absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full blur-[120px]" />
    </section>
  );
}
