"use client";

import React from "react";
import { Plus, Lightbulb, FileText, Search } from "lucide-react";

export default function IdeasPage() {
  const ideas = [];
  const hasIdeas = ideas.length > 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl px-6 pt-20 pb-24 duration-1000">
      {/* Header Section */}
      <header className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">
            Workspace
          </p>
          <h1 className="font-serif text-6xl font-medium tracking-tight text-foreground italic">
            Ideas
          </h1>
        </div>

        {/* Utility Icons matching the reference style */}
        <div className="mb-2 flex items-center gap-6 text-muted-foreground/60">
          <Search
            size={20}
            className="cursor-pointer transition-colors hover:text-foreground"
          />
          <Plus
            size={20}
            className="cursor-pointer transition-colors hover:text-foreground"
          />
        </div>
      </header>

      {/* Content Area */}
      <div className="mt-16">
        {hasIdeas ? (
          <div className="space-y-12">
            {/* List of ideas would render here */}
          </div>
        ) : (
          /* Simple Empty State - Matching the Ideas reference strictly */
          <div className="max-w-2xl space-y-6">
            <div className="space-y-4 text-lg leading-relaxed tracking-tight text-muted-foreground">
              <p>
                Save all your ideas in one place so that they don&apos;t get
                lost.{" "}
                <span className="text-primary underline decoration-primary/30 underline-offset-4">
                  Reflect
                </span>{" "}
                will bring them back up occasionally for contemplation.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground/80">
              <span className="lowercase">More info in our</span>
              <a
                href="#"
                className="group flex items-center gap-1 text-muted-foreground underline decoration-border/60 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/40"
              >
                <FileText size={14} className="opacity-70" />
                <span className="lowercase">documentation.</span>
              </a>
            </div>

            {/* Custom Styled Add Button from reference */}
            <div className="pt-6">
              <button className="flex items-center gap-2 rounded bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95">
                <Lightbulb size={16} className="text-primary" />
                <span>Add idea</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
