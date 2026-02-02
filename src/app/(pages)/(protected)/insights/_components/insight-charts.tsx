"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const wordCountData = [
  { month: "apr", count: 2800 },
  { month: "may", count: 3200 },
  { month: "jun", count: 5100 },
  { month: "jul", count: 4800 },
  { month: "aug", count: 3500 },
  { month: "sep", count: 3200 },
  { month: "oct", count: 2900 },
  { month: "nov", count: 3100 },
  { month: "dec", count: 3300 },
  { month: "jan", count: 3000 },
  { month: "feb", count: 3500 },
];

const daytimeData = [
  { hour: "6am", energy: 40 },
  { hour: "9am", energy: 70 },
  { hour: "12pm", energy: 30 },
  { hour: "3pm", energy: 45 },
  { hour: "6pm", energy: 60 },
  { hour: "9pm", energy: 55 },
  { hour: "12am", energy: 20 },
];

export function InsightCharts() {
  return (
    <div className="space-y-24 py-12">
      {/* Word Count Area Chart */}
      <div className="space-y-8">
        <div className="border-border/40 flex items-end justify-between border-b pb-4">
          <div className="space-y-1">
            <h3 className="text-foreground font-serif text-2xl font-medium italic">
              Word count
            </h3>
            <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
              Volume per month
            </p>
          </div>
          <span className="font-mono text-xs text-zinc-500 italic">
            avg. 3,245
          </span>
        </div>

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={wordCountData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeOpacity={0.1}
                strokeDasharray="0"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: string) => value.toUpperCase()}
                tick={{
                  fontSize: 9,
                  fill: "var(--muted-foreground)",
                  fontWeight: 700,
                }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 9,
                  fill: "var(--muted-foreground)",
                  opacity: 0.5,
                }}
              />
              <Tooltip
                cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="var(--primary)"
                fillOpacity={1}
                fill="url(#colorWords)"
                strokeWidth={1.5}
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daytime Distribution Bar Chart */}
      <div className="space-y-8">
        <div className="border-border/40 flex items-end justify-between border-b pb-4">
          <div className="space-y-1">
            <h3 className="text-foreground font-serif text-2xl font-medium italic">
              Daytime distribution
            </h3>
            <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
              Writing energy peaks
            </p>
          </div>
        </div>

        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={daytimeData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: string) => value.toUpperCase()}
                tick={{
                  fontSize: 9,
                  fill: "var(--muted-foreground)",
                  fontWeight: 700,
                }}
                dy={15}
              />
              <Bar dataKey="energy" radius={[2, 2, 0, 0]} barSize={32}>
                {daytimeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.energy > 60 ? "var(--primary)" : "var(--muted)"}
                    className="transition-all duration-500 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
