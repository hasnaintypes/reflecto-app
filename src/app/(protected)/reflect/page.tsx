import { Button } from "@/components/ui/button";
import { format, subDays } from "date-fns";
import { ArrowRight, Plus, ListFilter, Info, Pin, Clock } from "lucide-react";
import Link from "next/link";

export default function ReflectPage() {
  const yesterday = subDays(new Date(), 1);
  const formattedYesterday = format(yesterday, "EEEE, MMM dd");


  return (
    <div className="max-w-6xl relative pb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Sticky Header Wrapper - SOLID Background */}
      <div className="sticky top-0 z-30 bg-[#080808] -mx-8 px-8 py-6 mb-4 border-b border-white/[0.03]">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-white tracking-tight">Reflect</h1>
          <button className="text-zinc-500 hover:text-white transition-colors">
            <ListFilter size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-16">


      {/* Intro Text */}
      <p className="text-zinc-500 italic font-serif text-lg">
        Nothing here yet... you'll find highlights, new tags/mentions, gems and ideas of this week here, once there are any.
      </p>

      {/* Yesterday Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Yesterday</h2>
          <p className="text-zinc-500 text-sm font-medium">{formattedYesterday}</p>
        </div>
        
        <p className="text-zinc-500 italic font-serif">
          There is no entry for {format(yesterday, "MMM dd")} yet.
        </p>

        <Link href="/write" className="inline-block">
          <Button variant="outline" className="gap-2 bg-zinc-900/50 border-white/5 hover:bg-zinc-800 hover:border-white/10 transition-all text-zinc-300">
            <Plus size={14} />
            Write entry
          </Button>
        </Link>
      </section>

      {/* This Week Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">This week</h2>
          <p className="text-zinc-500 text-sm font-medium">Monday, Jan 26 → Today</p>
        </div>

        <p className="text-zinc-500 italic font-serif">
          Nothing here yet... you'll find highlights, new tags/mentions, gems and ideas of this week here, once there are any.
        </p>
      </section>

      {/* More / Less Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white tracking-tight">More / Less</h2>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-800/50 rounded text-[10px] font-bold tracking-wider text-zinc-400 border border-white/5">
            PRO
            <Info size={10} />
          </div>
        </div>
        <p className="text-zinc-500 text-sm font-medium">Evolution of your aspirations</p>
        
        <p className="text-zinc-500 italic font-serif">
          You didn't flag any tags as "do more" or "do less" yet. Click on a tag and open the "Details" tab in order to do so.
        </p>
      </section>

      {/* Pins Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">Pins</h2>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-800/50 rounded text-[10px] font-bold tracking-wider text-zinc-400 border border-white/5">
              PRO
              <Info size={10} />
            </div>
          </div>
          <button className="text-zinc-600 hover:text-zinc-400 transition-colors">
            <Pin size={16} />
          </button>
        </div>
        <p className="text-zinc-500 text-sm font-medium">Tag- and Group 30-day view</p>
        
        <p className="text-zinc-500 italic font-serif">
          No pins yet, click on the pencil to add pins...
        </p>
      </section>

      {/* Memory Lane Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Memory lane</h2>
        
        <p className="text-zinc-500 italic font-serif">
          Throwbacks will show up here once you have created 10 or more entries, otherwise it would be quite boring...
        </p>
      </section>
    </div>
    </div>
  );
}
