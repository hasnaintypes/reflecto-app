"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ShieldCheck, Globe } from "lucide-react";
import { toast } from "sonner";

export default function PricingSection() {
  const tiers = [
    {
      name: "Seeker",
      price: "0",
      description: "For those just beginning their journey into mindfulness.",
      features: [
        "30 Reflections / mo",
        "Basic Sentiment Analysis",
        "7-day History",
        "Web Access",
      ],
      cta: "Start Free",
      highlight: false,
      icon: <Globe size={18} />,
    },
    {
      name: "Foundry",
      price: "12",
      description: "Our most popular engine for deep subconscious mapping.",
      features: [
        "Unlimited Reflections",
        "Deep Insight Heatmaps",
        "Dream Analysis Engine",
        "Multi-device Sync",
        "Lifetime Memory Vault",
      ],
      cta: "Join the Foundry",
      highlight: true,
      icon: <Sparkles size={18} />,
    },
    {
      name: "Sanctum",
      price: "29",
      description:
        "Maximum privacy and advanced psychological pattern matching.",
      features: [
        "Everything in Foundry",
        "Zero-Knowledge Encryption",
        "Biometric Mood Sync",
        "Priority Model Access",
        "Personal Growth Coach AI",
      ],
      cta: "Enter the Sanctum",
      highlight: false,
      icon: <ShieldCheck size={18} />,
    },
  ];

  return (
    <section id="pricing" className="bg-[#fafafa] py-24 dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6">
        {/* --- Header (Centered & Distinct) --- */}
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="border-primary/20 bg-primary/5 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="text-primary h-3.5 w-3.5" />
            <span className="text-primary font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
              Investment Models
            </span>
          </motion.div>

          <h2 className="text-foreground max-w-4xl text-5xl font-medium tracking-tight md:text-7xl lg:text-8xl">
            Invest in your <br />
            <span className="text-muted-foreground/30 font-serif italic">
              self-growth.
            </span>
          </h2>

          {/* Subtle badges centered */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="border-primary/10 bg-primary/5 rotate-[-1deg] rounded-xl border px-4 py-2 backdrop-blur-sm transition-transform hover:rotate-0">
              <span className="text-primary/70 font-mono text-[11px] font-bold tracking-tight">
                ◆ FOUNDERS_FREE_TRIAL
              </span>
            </div>
            <div className="border-primary/10 bg-primary/5 rotate-[1deg] rounded-xl border px-4 py-2 backdrop-blur-sm transition-transform hover:rotate-0">
              <span className="text-primary/70 font-mono text-[11px] font-bold tracking-tight">
                ◆ SECURE_CHECKOUT
              </span>
            </div>
          </div>
        </div>

        {/* --- Pricing Cards --- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative flex cursor-pointer flex-col justify-between rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                tier.highlight
                  ? "bg-card border-primary shadow-primary/10 shadow-2xl"
                  : "bg-card/50 border-border hover:border-primary/30"
              }`}
            >
              {tier.highlight && (
                <div className="bg-primary text-primary-foreground absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 font-mono text-[10px] font-bold tracking-widest uppercase">
                  ◆ Recommended
                </div>
              )}

              <div>
                <div className="mb-8 flex items-center justify-between">
                  <div
                    className={`rounded-2xl p-3 ${tier.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                  >
                    {tier.icon}
                  </div>
                  <span className="text-muted-foreground font-mono text-[11px] font-bold tracking-widest uppercase">
                    {tier.name}
                  </span>
                </div>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-foreground font-serif text-6xl font-medium italic">
                    ${tier.price}
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">
                    /mo
                  </span>
                </div>

                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  {tier.description}
                </p>

                <div className="mb-10 space-y-4">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${tier.highlight ? "border-primary/30 bg-primary/10" : "border-border"}`}
                      >
                        <Check
                          className={`h-3 w-3 ${tier.highlight ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <span className="text-foreground/80 text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  toast.info(
                    "Coming soon: Pricing models are currently being finalized.",
                  )
                }
                className={`w-full cursor-pointer rounded-2xl py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  tier.highlight
                    ? "bg-primary text-primary-foreground shadow-primary/20 shadow-lg hover:scale-[1.02] active:scale-95"
                    : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground border-border"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
