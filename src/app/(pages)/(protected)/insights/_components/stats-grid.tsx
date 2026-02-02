"use client";

import React from "react";
import { Heart, Hash, AtSign, TrendingUp, Zap, Calendar } from "lucide-react";

export function StatsGrid() {
  const stats = [
    {
      label: "Highlights",
      value: "257",
      icon: Heart,
      color: "text-red-400",
      trend: "+12%",
    },
    {
      label: "Tags",
      value: "4,451",
      icon: Hash,
      color: "text-blue-400",
      trend: "+5.2k",
    },
    {
      label: "People",
      value: "1,575",
      icon: AtSign,
      color: "text-emerald-400",
      trend: "Active",
    },
  ];

  const metrics = [
    { label: "Journal age", value: "1,195", unit: "days", icon: Calendar },
    { label: "Writing frequency", value: "7.0", unit: "per week", icon: Zap },
    { label: "Word count", value: "100.9k", unit: "total", icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-3">
      {/* Primary Hero Card */}
      <div className="group border-border/40 bg-muted/40 hover:bg-muted/60 relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 transition-all md:col-span-2">
        <div className="relative z-10">
          <p className="mb-2 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
            Total Volume
          </p>
          <h2 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
            100,937{" "}
            <span className="font-sans text-2xl text-zinc-500 not-italic">
              words
            </span>
          </h2>
        </div>

        <div className="relative z-10 mt-12 flex gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="flex items-center gap-2 text-zinc-500">
                <stat.icon size={12} className={stat.color} />
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  {stat.label}
                </span>
              </div>
              <p className="text-foreground/90 text-xl font-medium">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative Abstract Shape */}
        <div className="bg-primary/10 group-hover:bg-primary/20 pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 rounded-full blur-[100px] transition-colors" />
      </div>

      {/* Secondary Metric Cards Stack */}
      <div className="flex flex-col gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="group border-border/40 bg-muted/40 hover:border-border/60 flex flex-1 items-center justify-between rounded-2xl border p-5 transition-all"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                {metric.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-foreground text-xl font-semibold">
                  {metric.value}
                </span>
                <span className="text-[10px] font-medium text-zinc-600">
                  {metric.unit}
                </span>
              </div>
            </div>
            <div className="bg-background/40 text-muted-foreground group-hover:text-foreground rounded-xl p-2 transition-colors">
              <metric.icon size={18} strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
