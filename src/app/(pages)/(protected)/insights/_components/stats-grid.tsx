import { Heart, Hash, AtSign, TrendingUp, Zap, Calendar } from "lucide-react";
import { type ComprehensiveEntry } from "@/types/entry.types";

interface StatsGridProps {
  entries: ComprehensiveEntry[];
}

export function StatsGrid({ entries }: StatsGridProps) {
  const highlightsCount = entries.filter((e) => e.type === "highlight").length;

  // Extract unique tag IDs and people IDs
  const uniqueTags = new Set<string>();
  const uniquePeople = new Set<string>();
  let totalWordCount = 0;

  entries.forEach((e) => {
    e.tags?.forEach((t) => uniqueTags.add(t.id || t.name));
    e.people?.forEach((p) => uniquePeople.add(p.id || p.name));
    // Simple word count approximation
    const text =
      (e.title ?? "") + " " + (e.content ?? "").replace(/<[^>]*>/g, " ");
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    totalWordCount += words.length;
  });

  const oldestEntry =
    entries.length > 0
      ? new Date(
          Math.min(...entries.map((e) => new Date(e.createdAt).getTime())),
        )
      : new Date();

  const journalAge = Math.max(
    1,
    Math.ceil(
      (new Date().getTime() - oldestEntry.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );
  const writingFrequency = entries.length / Math.ceil(journalAge / 7);

  const stats = [
    {
      label: "Highlights",
      value: highlightsCount.toLocaleString(),
      icon: Heart,
      color: "text-red-400",
    },
    {
      label: "Tags",
      value: uniqueTags.size.toLocaleString(),
      icon: Hash,
      color: "text-blue-400",
    },
    {
      label: "People",
      value: uniquePeople.size.toLocaleString(),
      icon: AtSign,
      color: "text-emerald-400",
    },
  ];

  const metrics = [
    {
      label: "Journal age",
      value: journalAge.toLocaleString(),
      unit: "days",
      icon: Calendar,
    },
    {
      label: "Writing frequency",
      value: writingFrequency.toFixed(1),
      unit: "per week",
      icon: Zap,
    },
    {
      label: "Word count",
      value:
        totalWordCount > 1000
          ? `${(totalWordCount / 1000).toFixed(1)}k`
          : totalWordCount.toString(),
      unit: "total",
      icon: TrendingUp,
    },
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
            {totalWordCount.toLocaleString()}{" "}
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
