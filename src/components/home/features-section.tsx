"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Lock,
  Mail,
  Zap,
  Fingerprint,
  Activity,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export default function EnhancedFeatures() {
  return (
    <section
      id="features"
      className="bg-[#fafafa] py-24 transition-colors duration-500 lg:py-32 dark:bg-[#050505]"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* --- Section Header --- */}
        <div className="border-primary/20 relative mb-20 flex flex-col items-start gap-4 border-l-2 pl-8">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-primary font-mono text-xs font-bold tracking-[0.4em] uppercase"
          >
            {"// System_Modules.v1"}
          </motion.span>
          <h2 className="text-foreground max-w-3xl text-5xl font-medium tracking-tight md:text-7xl">
            Mindfulness of a journal. <br />
            <span className="text-muted-foreground/40 font-serif italic">
              Power of an engine.
            </span>
          </h2>
        </div>

        {/* --- Features Bento Grid --- */}
        <div className="bg-border/40 border-border grid grid-cols-1 gap-px overflow-hidden rounded-3xl border shadow-2xl md:grid-cols-12">
          {/* 01. Deep Insights - Large Feature */}
          <FeatureCard className="bg-card group md:col-span-7">
            <div className="flex h-full flex-col justify-between p-8 lg:p-10">
              <div className="space-y-4">
                <div className="text-primary flex items-center gap-2">
                  <Activity size={18} className="animate-pulse" />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                    Biometric_Rhythms
                  </span>
                </div>
                <h3 className="text-3xl font-medium tracking-tight">
                  Deep Pattern Insights
                </h3>
                <p className="text-muted-foreground max-w-md text-base leading-relaxed">
                  Automatic sentiment heatmaps uncover the unspoken rhythms of
                  your life. We don&apos;t just store words; we map your mental
                  landscape.
                </p>
              </div>

              {/* Data Visualization Hook */}
              <div className="bg-secondary/20 border-border/50 relative mt-12 overflow-hidden rounded-2xl border p-6 backdrop-blur-sm">
                <div className="mb-6 flex h-24 items-end gap-2">
                  {[40, 70, 45, 90, 65, 80, 30, 50, 85, 40, 60, 75].map(
                    (h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{
                          delay: i * 0.05,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className="bg-primary/30 group-hover:bg-primary/60 flex-1 rounded-t-md transition-colors"
                      />
                    ),
                  )}
                </div>
                <div className="text-muted-foreground flex justify-between font-mono text-[10px] font-bold">
                  <span>PHASE_START</span>
                  <span className="text-primary decoration-primary/30 animate-pulse underline underline-offset-4">
                    PEAK_CLARITY_DETECTED
                  </span>
                  <span>PHASE_END</span>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* 02. Security - Medium Feature */}
          <FeatureCard className="bg-card border-border border-l md:col-span-5">
            <div className="flex h-full flex-col justify-between p-8 lg:p-10">
              <div className="space-y-4">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Fingerprint size={18} />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                    Vault_Security
                  </span>
                </div>
                <h3 className="text-3xl font-medium tracking-tight">
                  Privacy by Architecture
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Zero-knowledge encryption. Your inner thoughts are never used
                  for model training. Your data is yours, period.
                </p>
              </div>

              <div className="relative mt-12 flex items-center justify-center py-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="border-primary/10 h-40 w-40 rounded-full border-2 border-dashed"
                  />
                </div>
                <div className="bg-primary shadow-primary/20 relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl shadow-2xl">
                  <Lock className="text-primary-foreground" size={32} />
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* 03. Multi-Modal - Medium Feature */}
          <FeatureCard className="bg-card border-border border-t md:col-span-5">
            <div className="flex h-full flex-col justify-between p-8 lg:p-10">
              <div className="space-y-6">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Layers size={18} />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                    Input_Channels
                  </span>
                </div>
                <h3 className="text-3xl font-medium tracking-tight">
                  Capture Anywhere
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Mail, label: "Email" },
                    { icon: Zap, label: "Shortcuts" },
                    { icon: Check, label: "Tasks" },
                    { icon: Activity, label: "Health" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-secondary/50 border-border hover:border-primary/30 group/item flex items-center gap-3 rounded-xl border p-3 transition-all"
                    >
                      <item.icon
                        size={18}
                        className="text-muted-foreground group-hover/item:text-primary transition-colors"
                      />
                      <span className="text-xs font-semibold">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mt-8 text-sm">
                Record your subconscious via voice, mail, or Slack the moment it
                speaks.
              </p>
            </div>
          </FeatureCard>

          {/* 04. Stats - Large Feature */}
          <FeatureCard className="bg-card border-border border-t border-l md:col-span-7">
            <div className="flex h-full flex-col justify-between p-8 lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-4">
                  <span className="text-primary decoration-primary/30 font-mono text-[10px] font-bold tracking-[0.2em] uppercase underline underline-offset-4">
                    System_Impact
                  </span>
                  <h3 className="text-5xl font-medium tracking-tighter">
                    98.2% Clarity
                  </h3>
                  <p className="text-muted-foreground max-w-xs text-base">
                    Significant decrease in mental fog within the first 14 days
                    of reflection.
                  </p>
                </div>

                <div className="hidden sm:block">
                  <div className="bg-primary/10 text-primary flex items-center justify-center rounded-full p-4">
                    <ArrowUpRight size={32} />
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <div className="text-muted-foreground flex justify-between font-mono text-xs font-bold tracking-widest uppercase">
                  <span>Synthesis Progress</span>
                  <span className="text-primary">Complete</span>
                </div>
                <div className="bg-muted relative h-4 w-full overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="bg-primary relative h-full w-full"
                  >
                    <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)]" />
                  </motion.div>
                </div>
              </div>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

// Custom wrapper for card hover effects
function FeatureCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative cursor-pointer overflow-hidden ${className}`}
    >
      {/* Background Spotlight Effect */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(var(--primary-rgb),0.05)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
