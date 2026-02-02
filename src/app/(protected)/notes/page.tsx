"use client";

import React from "react";
import { FileText, Plus, Star, ArrowUpDown } from "lucide-react";

export default function NotesPage() {
  const notes = [];
  const hasNotes = notes.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      {/* Header Section */}
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#A78BFA] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-6xl font-medium tracking-tight italic">
            Notes
          </h1>
        </div>

        {/* Utility Icons from reference */}
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
        {hasNotes ? (
          <div className="space-y-12">{/* Notes list would render here */}</div>
        ) : (
          /* Empty State - Matching the 'Notes' reference strictly */
          <div className="max-w-2xl space-y-8">
            <div className="text-muted-foreground space-y-6 text-lg leading-relaxed tracking-tight">
              <p>
                Notes help you capture thoughts in more detail. They can be
                completely independent of dates or augment entries in your daily
                log.
              </p>

              <p>
                Here you can collect anything, from weekly / monthly / annual
                summaries, over &quot;lessons learned&quot;, to thought
                experiments and more.
              </p>
            </div>

            {/* Documentation Link */}
            <div className="text-muted-foreground/80 flex items-center gap-1.5 pt-2 text-sm">
              <span className="lowercase">More info in the</span>
              <a
                href="#"
                className="group text-muted-foreground decoration-border/60 flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-[#A78BFA] hover:decoration-[#A78BFA]/40"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">documentation.</span>
              </a>
            </div>

            {/* Custom Styled Add Button from reference */}
            <div className="pt-6">
              <button className="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-all active:scale-95">
                <Plus size={16} className="text-[#A78BFA]" />
                <span>Add note</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
