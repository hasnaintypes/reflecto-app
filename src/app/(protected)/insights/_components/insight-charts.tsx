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
  { month: "Apr", count: 2800 },
  { month: "May", count: 3200 },
  { month: "Jun", count: 5100 },
  { month: "Jul", count: 4800 },
  { month: "Aug", count: 3500 },
  { month: "Sep", count: 3200 },
  { month: "Oct", count: 2900 },
  { month: "Nov", count: 3100 },
  { month: "Dec", count: 3300 },
  { month: "Jan", count: 3000 },
  { month: "Feb", count: 3500 },
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
    <div className="space-y-16 py-12">
      {/* Word Count Area Chart */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-zinc-100">Word count</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={wordCountData}>
              <defs>
                <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#71717a" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#71717a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#27272a" strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "#71717a" }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "#71717a" }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px" }}
                itemStyle={{ color: "#f4f4f5" }}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#52525b" 
                fillOpacity={1} 
                fill="url(#colorWords)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daytime Distribution Bar Chart */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-zinc-100">Daytime distribution</h3>
        <div className="h-[150px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={daytimeData}>
              <CartesianGrid vertical={false} stroke="transparent" />
              <XAxis 
                dataKey="hour" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "#71717a" }}
                dy={10}
              />
              <Bar 
                dataKey="energy" 
                fill="#27272a" 
                radius={[4, 4, 0, 0]}
                barSize={40}
              >
                {daytimeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 1 ? "#52525b" : "#27272a"} 
                    className="hover:fill-zinc-600 transition-colors"
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
