"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Network,
  Fingerprint,
  Activity,
  type LucideIcon,
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  span: string;
  bg: string;
}

export default function EngineArchitecture() {
  const modules = [
    {
      id: "MODULE_01",
      title: "Neural Synergy",
      desc: "Vector embeddings transform natural language into geometric patterns for deep synthesis.",
      icon: Cpu,
      span: "md:col-span-2",
      bg: "bg-primary/[0.03] dark:bg-primary/[0.01]",
    },
    {
      id: "MODULE_02",
      title: "Iron Vault",
      desc: "AES-256 local-first encryption architecture.",
      icon: ShieldCheck,
      span: "md:col-span-1",
      bg: "bg-secondary/40",
    },
    {
      id: "MODULE_03",
      title: "Temporal Mesh",
      desc: "Graph-based memory retrieval systems.",
      icon: Network,
      span: "md:col-span-1",
      bg: "bg-secondary/40",
    },
    {
      id: "MODULE_04",
      title: "Bio-Logic",
      desc: "System-level pattern matching across years of data, revealing the evolution of your subconscious self.",
      icon: Fingerprint,
      span: "md:col-span-2",
      bg: "bg-primary/[0.03] dark:bg-primary/[0.01]",
    },
  ];

  return (
    <section className="bg-background relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* --- Header: Matches OriginHero Style --- */}
        <div className="border-primary/20 mb-20 flex flex-col items-start gap-4 border-l-2 pl-8 md:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary flex items-center gap-3 font-mono text-[10px] font-bold tracking-[0.4em] uppercase"
          >
            <Activity size={12} className="animate-pulse" />
            <span>{"// System_Architecture.v2"}</span>
          </motion.div>
          <h2 className="text-foreground max-w-2xl font-serif text-5xl leading-tight italic md:text-6xl">
            The technical pulse of <br />
            <span className="text-muted-foreground/40">human reflection.</span>
          </h2>
        </div>

        {/* --- Bento Grid --- */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {modules.map((mod, i) => (
            <ArchitectureCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureCard({ mod, index }: { mod: Module; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className={`group border-border/50 hover:border-primary/40 relative flex flex-col justify-between overflow-hidden rounded-[2rem] border p-8 transition-all duration-500 ${mod.span} ${mod.bg}`}
    >
      {/* --- Spotlight Effect --- */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--primary-rgb), 0.06), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary h-1.5 w-1.5 animate-ping rounded-full" />
            <span className="text-primary/70 font-mono text-[9px] font-bold tracking-[0.3em] uppercase">
              {mod.id}
            </span>
          </div>
          <div className="text-muted-foreground group-hover:text-primary transition-all duration-500 group-hover:scale-110">
            <mod.icon size={20} />
          </div>
        </div>

        <h3 className="text-foreground group-hover:text-primary mb-4 font-serif text-3xl tracking-tight italic transition-colors">
          {mod.title}
        </h3>
        <p className="text-muted-foreground max-w-[300px] text-sm leading-relaxed opacity-80 transition-opacity group-hover:opacity-100">
          {mod.desc}
        </p>
      </div>

      {/* Decorative Large Background Icon */}
      <div className="text-foreground/[0.03] group-hover:text-primary/[0.05] absolute -right-6 -bottom-6 transition-all duration-700 group-hover:scale-110">
        <mod.icon size={160} strokeWidth={1} />
      </div>

      {/* Grid Lines Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03]" />
    </motion.div>
  );
}
