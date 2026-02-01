"use client";

import React from "react";
import { Heart, Hash, AtSign } from "lucide-react";

export function StatsGrid() {
  const stats = [
    { label: "highlights", value: "257", icon: Heart, color: "text-red-400", bgColor: "bg-red-400/10" },
    { label: "tags", value: "4451", icon: Hash, color: "text-blue-400", bgColor: "bg-blue-400/10" },
    { label: "people", value: "1575", icon: AtSign, color: "text-emerald-400", bgColor: "bg-emerald-400/10" },
  ];

  const metrics = [
    { label: "Journal age", value: "1195 days" },
    { label: "Words", value: "100937", subValue: "84.4 / day" },
    { label: "Highlight rate", value: "22%", subValue: "of entries" },
    { label: "Writing frequency", value: "7.0", subValue: "entries / week" },
    { label: "Bullet rate", value: "5.8", subValue: "/ entry" },
  ];

  return (
    <div className="space-y-12 py-8">
      {/* Icon Stats */}
      <div className="flex flex-wrap gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-zinc-100">{stat.value}</span>
              <span className="text-sm font-medium text-zinc-500">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* List Metrics */}
      <div className="space-y-4 max-w-sm">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-baseline justify-between group">
            <span className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">{metric.label}:</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-zinc-200">{metric.value}</span>
              {metric.subValue && (
                <span className="text-[11px] text-zinc-500 font-normal">{metric.subValue}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
