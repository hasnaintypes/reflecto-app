"use client";

import React from "react";
import { Plus, Moon, FileText } from "lucide-react";

export default function DreamsPage() {
  // Toggle for empty state
  const dreams = [];
  const hasDreams = dreams.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      {/* Minimalist Header - Matching the high-end typography style */}
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
            Journal
          </p>
          <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
            Dreams
          </h1>
        </div>

        <button className="group text-primary hover:text-primary/80 flex items-center gap-2 transition-colors">
          <div className="border-primary/30 group-hover:bg-primary group-hover:text-background rounded-full border p-2 transition-all">
            <Plus size={20} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase">
            Record
          </span>
        </button>
      </header>

      {/* Content Area - Clean and Card-free */}
      <div className="mt-16">
        {hasDreams ? (
          <div className="space-y-12">
            {/* List items would render here similarly to the Ideas page */}
          </div>
        ) : (
          /* Empty State - Styled based on your provided screenshot */
          <div className="max-w-2xl space-y-6">
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xl tracking-tight">
              <span>Your dreams</span>
              <Moon
                size={20}
                className="fill-primary/20 text-primary inline-block animate-pulse"
              />
              <span>
                will show up here once you start adding them to your entries...
              </span>
            </div>

            <div className="text-muted-foreground/80 flex items-center gap-2 text-sm">
              <span>More info in our</span>
              <a
                href="#"
                className="group text-muted-foreground hover:text-primary hover:decoration-primary/50 inline-flex items-center gap-1.5 transition-all"
              >
                <FileText
                  size={14}
                  className="transition-transform group-hover:-rotate-12"
                />
                documentation
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
