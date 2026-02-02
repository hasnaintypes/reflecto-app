"use client";

import React from "react";
import { FileText, PenLine, Star, ArrowUpDown } from "lucide-react";

export default function PeoplePage() {
  const people = [];
  const hasPeople = people.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      {/* Header Section */}
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#34D399] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
            People
          </h1>
        </div>

        {/* Header Utilities from reference */}
        <div className="text-muted-foreground/60 mb-2 flex items-center gap-6">
          <Star
            size={20}
            className="hover:text-foreground cursor-pointer transition-colors"
          />
          <ArrowUpDown
            size={20}
            className="hover:text-foreground cursor-pointer transition-colors"
          />
        </div>
      </header>

      {/* Content Area */}
      <div className="mt-16">
        {hasPeople ? (
          <div className="space-y-8">
            {/* List of people would render here */}
          </div>
        ) : (
          /* Empty State - Matching the 'People' reference strictly */
          <div className="max-w-2xl space-y-6">
            <div className="text-muted-foreground space-y-4 text-lg leading-relaxed tracking-tight">
              <p>
                Use <span className="text-[#34D399]">@name</span> in your
                entries to mention someone. Journalistic will automatically keep
                track of different people and generate insights about your
                social circle.
              </p>

              <div className="py-2">
                <p className="text-muted-foreground/60 font-mono text-sm">
                  e.g.
                </p>
                <p className="border-border/60 text-muted-foreground/60 mt-2 ml-4 border-l pl-4 italic">
                  &quot;Lunch w/ <span className="text-[#34D399]">@Jeremy</span>
                  .&quot;
                </p>
              </div>

              <p className="text-muted-foreground/60 text-sm">
                Note: mentions are private, only you can see them here.
              </p>
            </div>

            {/* Links Section */}
            <div className="border-border space-y-3 border-t pt-4">
              <div className="text-muted-foreground/80 flex items-center gap-1.5 text-sm">
                <span className="lowercase">More info in the</span>
                <a
                  href="#"
                  className="group text-muted-foreground decoration-border/60 flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-[#34D399] hover:decoration-[#34D399]/40"
                >
                  <FileText size={14} className="opacity-70" />
                  <span className="lowercase">documentation.</span>
                </a>
              </div>

              <div className="text-muted-foreground/80 flex items-center gap-1.5 text-sm">
                <span className="lowercase">Try it out in</span>
                <a
                  href="#"
                  className="group text-muted-foreground decoration-border/60 flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-[#34D399] hover:decoration-[#34D399]/40"
                >
                  <PenLine
                    size={14}
                    className="opacity-70 transition-transform group-hover:-rotate-12"
                  />
                  <span className="lowercase">write.</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
