import {
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
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
import { Sparkles } from "lucide-react";
import {
  type ComprehensiveEntry,
  type Tag,
  type Person,
} from "@/types/entry.types";

interface InsightChartsProps {
  entries: ComprehensiveEntry[];
}

export function InsightCharts({ entries }: InsightChartsProps) {
  const hasEnoughData = entries.length >= 5;

  if (!hasEnoughData) {
    return (
      <div className="border-border/40 bg-muted/5 flex flex-col items-center justify-center space-y-4 rounded-3xl border border-dashed py-24 text-center">
        <div className="bg-primary/10 text-primary rounded-full p-4">
          <Sparkles size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="text-foreground font-serif text-2xl font-medium italic">
            Gathering insights...
          </h3>
          <p className="text-muted-foreground max-w-xs text-sm">
            We need at least 5 entries to generate meaningful analysis. Keep
            writing to unlock these charts.
          </p>
        </div>
        <div className="text-muted-foreground/40 font-mono text-[10px] tracking-widest uppercase">
          Progress: {entries.length}/5 entries
        </div>
      </div>
    );
  }

  // Calculate Word Count Data for the last 12 months
  const now = new Date();
  const wordCountData = Array.from({ length: 12 }).map((_, i) => {
    const monthDate = subMonths(now, 11 - i);
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);

    const monthEntries = entries.filter((e) => {
      const date = new Date(e.createdAt);
      return isWithinInterval(date, { start, end });
    });

    const count = monthEntries.reduce((acc, e) => {
      const text =
        (e.title ?? "") + " " + (e.content ?? "").replace(/<[^>]*>/g, " ");
      return acc + text.trim().split(/\s+/).length;
    }, 0);

    return {
      month: format(monthDate, "MMM").toLowerCase(),
      count,
    };
  });

  const avgWordCount = Math.round(
    wordCountData.reduce((acc, d) => acc + d.count, 0) /
      wordCountData.filter((d) => d.count > 0).length || 0,
  );

  // Calculate Daytime Distribution
  // Group by 3-hour blocks
  const hourlyData = [
    { hour: "3am", energy: 0, range: [3, 4, 5] },
    { hour: "6am", energy: 0, range: [6, 7, 8] },
    { hour: "9am", energy: 0, range: [9, 10, 11] },
    { hour: "12pm", energy: 0, range: [12, 13, 14] },
    { hour: "3pm", energy: 0, range: [15, 16, 17] },
    { hour: "6pm", energy: 0, range: [18, 19, 20] },
    { hour: "9pm", energy: 0, range: [21, 22, 23] },
    { hour: "12am", energy: 0, range: [0, 1, 2] },
  ];

  entries.forEach((e) => {
    const hour = new Date(e.createdAt).getHours();
    const block = hourlyData.find((b) => b.range.includes(hour));
    if (block) block.energy++;
  });

  const maxEnergy = Math.max(...hourlyData.map((d) => d.energy), 1);
  const daytimeData = hourlyData.map((d) => ({
    hour: d.hour,
    energy: (d.energy / maxEnergy) * 100, // Normalize to 100
    rawCount: d.energy,
  }));

  // Calculate Top Tags and Top People
  const tagCounts: Record<string, number> = {};
  const personCounts: Record<string, number> = {};

  entries.forEach((e) => {
    e.tags?.forEach((t: Tag) => {
      tagCounts[t.name] = (tagCounts[t.name] ?? 0) + 1;
    });
    e.people?.forEach((p: Person) => {
      personCounts[p.name] = (personCounts[p.name] ?? 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  const sortedPeople = Object.entries(personCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  return (
    <div className="space-y-24 py-12">
      {/* Summary Charts Grid */}
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
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
              avg. {avgWordCount.toLocaleString()}
            </span>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={wordCountData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="50%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.15}
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: string) => value.toUpperCase()}
                  tick={{
                    fontSize: 9,
                    fill: "hsl(var(--muted-foreground))",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 9,
                    fill: "hsl(var(--muted-foreground))",
                    opacity: 0.5,
                  }}
                />
                <Tooltip
                  cursor={{
                    stroke: "hsl(var(--primary))",
                    strokeWidth: 2,
                    strokeOpacity: 0.2,
                  }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    padding: "8px 12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  itemStyle={{ color: "hsl(var(--primary))", fontWeight: 600 }}
                  labelStyle={{
                    color: "hsl(var(--foreground))",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                />
                <Area
                  type="natural"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorWords)"
                  strokeWidth={2.5}
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

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={daytimeData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="hour"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: string) => value.toUpperCase()}
                  tick={{
                    fontSize: 9,
                    fill: "hsl(var(--muted-foreground))",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                  dy={15}
                />
                <Tooltip
                  cursor={{
                    fill: "hsl(var(--primary))",
                    opacity: 0.08,
                    radius: 8,
                  }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    padding: "8px 12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(
                    value: number,
                    name: string,
                    item: { payload?: { rawCount: number } },
                  ) => {
                    const count = item.payload?.rawCount ?? 0;
                    return [`${count} entries`, "Activity"];
                  }}
                  labelStyle={{
                    color: "hsl(var(--foreground))",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                />
                <Bar dataKey="energy" radius={[6, 6, 0, 0]} barSize={32}>
                  {daytimeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="url(#barGradient)"
                      fillOpacity={Math.max(entry.energy / 100, 0.15)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mentions Grid */}
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {/* Top Tags */}
        <div className="space-y-8">
          <div className="border-border/40 flex items-end justify-between border-b pb-4">
            <div className="space-y-1">
              <h3 className="text-foreground font-serif text-2xl font-medium italic">
                Common themes
              </h3>
              <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
                Most frequent tags
              </p>
            </div>
            <span className="font-mono text-xs text-zinc-500 italic">
              {sortedTags.length} active
            </span>
          </div>

          <div className="space-y-4">
            {sortedTags.length > 0 ? (
              sortedTags.map((tag) => (
                <div
                  key={tag.name}
                  className="group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold">
                      #
                    </div>
                    <span className="text-foreground text-sm font-medium">
                      {tag.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-muted h-1 w-32 overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full transition-all duration-1000"
                        style={{
                          width: `${sortedTags[0] ? (tag.count / sortedTags[0].count) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-muted-foreground w-8 text-right font-mono text-xs">
                      {tag.count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground py-8 text-center text-sm italic">
                No tags tracked yet.
              </p>
            )}
          </div>
        </div>

        {/* Top People */}
        <div className="space-y-8">
          <div className="border-border/40 flex items-end justify-between border-b pb-4">
            <div className="space-y-1">
              <h3 className="text-foreground font-serif text-2xl font-medium italic">
                Social circle
              </h3>
              <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
                Most mentioned people
              </p>
            </div>
            <span className="font-mono text-xs text-zinc-500 italic">
              {sortedPeople.length} active
            </span>
          </div>

          <div className="space-y-4">
            {sortedPeople.length > 0 ? (
              sortedPeople.map((person) => (
                <div
                  key={person.name}
                  className="group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-xs font-bold text-emerald-400">
                      @
                    </div>
                    <span className="text-foreground text-sm font-medium">
                      {person.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-muted h-1 w-32 overflow-hidden rounded-full">
                      <div
                        className="h-full bg-emerald-400 transition-all duration-1000"
                        style={{
                          width: `${sortedPeople[0] ? (person.count / sortedPeople[0].count) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-muted-foreground w-8 text-right font-mono text-xs">
                      {person.count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground py-8 text-center text-sm italic">
                No people mentioned yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
