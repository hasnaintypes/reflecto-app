"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function OriginHero() {
  return (
    <section className="bg-background relative overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-24">
      {/* --- Aesthetic Layer: Grain & Ambience --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle noise texture to break the digital flatness */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

        {/* Floating "Thought" Orbs */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="bg-primary absolute top-20 right-1/4 h-[500px] w-[500px] rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* --- Left Column: The Narrative Hook --- */}
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group text-primary flex items-center gap-4 font-mono text-[10px] font-bold tracking-[0.5em] uppercase"
            >
              <div className="bg-primary/30 group-hover:bg-primary h-[1px] w-12 transition-all duration-500 group-hover:w-20" />
              <span>{"// Entry_Log.001"}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-foreground font-serif text-5xl leading-[1.05] tracking-tight italic md:text-7xl lg:text-8xl"
            >
              We build <br />
              for the <br />
              <span className="text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-700">
                unquiet mind.
              </span>
            </motion.h1>
          </div>

          {/* --- Right Column: The Philosophical Core --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex-1 lg:pt-16"
          >
            <div className="border-border/60 relative border-l pl-10 lg:pl-16">
              {/* Vertical Accent Line with Pulse */}
              <div className="from-primary absolute top-0 left-[-1px] h-24 w-[1px] bg-gradient-to-b to-transparent" />

              <p className="text-muted-foreground font-serif text-2xl leading-relaxed italic md:text-3xl lg:max-w-lg">
                &quot;Reflecto wasn&apos;t built to be another productivity
                tool. It was built to{" "}
                <span className="text-foreground">solve the noise.</span> We
                believe clarity isn&apos;t found by doing more, but by
                understanding what you&apos;ve already done.&quot;
              </p>

              <motion.div
                whileHover={{ x: 5 }}
                className="mt-8 flex cursor-default items-center gap-5"
              >
                <div className="border-border/50 bg-secondary/50 relative h-14 w-14 overflow-hidden rounded-2xl border p-1 backdrop-blur-sm">
                  <Image
                    src="/images/avatars/avatar-1.png"
                    alt="Founder"
                    fill
                    className="rounded-xl object-cover grayscale transition-all duration-500 hover:grayscale-0"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-foreground font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
                    Founder_Origin
                  </p>
                  <p className="text-muted-foreground/60 font-mono text-[9px] tracking-widest uppercase">
                    Reflecto Labs // Protocol_v1.0
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
