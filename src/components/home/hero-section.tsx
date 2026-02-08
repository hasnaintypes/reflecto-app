"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function CenteredHero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#fafafa] py-12 dark:bg-[#050505]">
      {/* --- Ambient Background Visuals --- */}
      <div className="absolute inset-0 z-0">
        {/* Main Pulsing Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="bg-primary absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        />

        {/* Floating Insight Fragments (Repositioned to frame the center) */}
        {[
          { text: "Pattern: Resilience", top: "20%", left: "15%", delay: 0 },
          { text: "Growth: +12%", top: "70%", left: "20%", delay: 1 },
          { text: "Subconscious: High", top: "75%", left: "70%", delay: 2 },
          { text: "Clarity: Restored", top: "25%", left: "75%", delay: 1.5 },
        ].map((fragment, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: fragment.delay,
              ease: "easeInOut",
            }}
            style={{ top: fragment.top, left: fragment.left }}
            className="bg-background/40 border-border absolute hidden items-center gap-2 rounded-full border px-4 py-2 whitespace-nowrap shadow-sm backdrop-blur-md md:flex"
          >
            <div className="bg-primary h-1.5 w-1.5 rounded-full" />
            <span className="font-mono text-[10px] tracking-tight">
              {fragment.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* --- Content --- */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="group border-primary/20 bg-primary/5 text-primary mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
            Reflection Engine v1.0
            <div className="bg-primary/20 ml-2 h-3 w-px" />
            <span className="font-bold">Live Beta</span>
          </div>

          {/* Headline */}
          <h1 className="text-foreground mb-3 text-5xl leading-[1.1] font-medium tracking-tight md:text-8xl">
            Reflection that <br />
            <span className="text-muted-foreground/60 relative font-serif italic">
              whispers back.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 1 }}
                  d="M1 10.5C50 3.5 150 3.5 299 10.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-primary/30"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mb-6 max-w-2xl text-lg leading-relaxed md:text-xl">
            Not just a journal. A mirror for your mind. Capture thoughts, track
            subconscious patterns, and let AI reveal the{" "}
            <span className="text-foreground decoration-primary/30 font-medium underline underline-offset-4">
              wisdom between the lines.
            </span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/auth/sign-up">
              <button className="bg-primary text-primary-foreground hover:shadow-primary/25 group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-10 py-5 text-sm font-semibold transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                Start Your Sanctuary
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <button
              onClick={() =>
                toast.info("Coming soon: Our cinematic film is being rendered.")
              }
              className="group text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-3 px-8 py-5 text-sm font-semibold transition-all"
            >
              <div className="bg-secondary/50 ring-border/20 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-primary/20 flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-all group-hover:scale-110 group-hover:shadow-lg">
                <div className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
              </div>
              <span>Watch Film</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="border-border/50 mt-8 flex flex-col items-center gap-4 border-t pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  src={`/images/avatars/avatar-${i}.png`}
                  alt={`User ${i}`}
                  width={36}
                  height={36}
                  className="border-background bg-muted h-9 w-9 cursor-pointer rounded-full border-2 object-cover transition-transform hover:scale-110"
                />
              ))}
            </div>
            <p className="text-muted-foreground text-[13px] font-medium">
              Joined by <span className="text-foreground">1,200+</span>{" "}
              conscious thinkers this week.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-muted-foreground/40 absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
