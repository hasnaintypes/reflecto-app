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
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-8 transition-all hover:bg-zinc-900/60 md:col-span-2">
        <div className="relative z-10">
          <p className="mb-2 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
            Total Volume
          </p>
          <h2 className="font-serif text-6xl font-medium tracking-tight text-white italic">
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
              <p className="text-xl font-medium text-zinc-200">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Decorative Abstract Shape */}
        <div className="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px] transition-colors group-hover:bg-indigo-500/20" />
      </div>

      {/* Secondary Metric Cards Stack */}
      <div className="flex flex-col gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="group flex flex-1 items-center justify-between rounded-2xl border border-white/5 bg-zinc-900/40 p-5 transition-all hover:border-white/10"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                {metric.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-semibold text-white">
                  {metric.value}
                </span>
                <span className="text-[10px] font-medium text-zinc-600">
                  {metric.unit}
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.02] p-2 text-zinc-500 transition-colors group-hover:text-white">
              <metric.icon size={18} strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
