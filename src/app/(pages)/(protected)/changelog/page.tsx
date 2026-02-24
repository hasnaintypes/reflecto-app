"use client";

import React from "react";
import { Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function ChangelogPage() {
  const updates = [
    {
      version: "0.1.0",
      date: "February 2026",
      title: "Initial Beta Launch",
      description:
        "Welcome to Reflecto App. The first version of your minimal journaling space.",
      changes: [
        "Minimalist document editor with markdown support",
        "Categorization for Dreams, Ideas, and Insights",
        "Image uploads with ImageKit integration",
        "Secure authentication via Auth.js",
        "Premium dark mode aesthetic",
      ],
    },
    {
      version: "0.1.1",
      date: "Current Update",
      title: "UI Refinement & Search",
      description: "Improving the core navigation and search experience.",
      changes: [
        "Global Command Search (⌘K) implemented",
        "Fixed editor content synchronization issues",
        "Cleaned up user dropdown for a more focused UI",
        "Added Profile and Settings foundations",
      ],
    },
  ].reverse();

  return (
    <div className="py-10">
      <div className="mb-12">
        <h1 className="font-playfair text-4xl font-bold tracking-tight">
          Changelog
        </h1>
        <p className="text-muted-foreground mt-2">
          The evolution of Reflecto and our latest refinements.
        </p>
      </div>

      <div className="relative space-y-12">
        {/* Vertical Line */}
        <div className="bg-border/20 absolute top-0 bottom-0 left-[23px] w-px" />

        {updates.map((update, idx) => (
          <div key={update.version} className="relative pl-16">
            <div
              className={cn(
                "border-background absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full border-4 shadow-xl",
                idx === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted border-border/40 text-muted-foreground",
              )}
            >
              {idx === 0 ? <Sparkles size={20} /> : <CheckCircle2 size={20} />}
            </div>

            <div className="border-border/40 bg-muted/30 rounded-3xl border p-8 backdrop-blur-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="bg-primary/10 text-primary mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    Version {update.version}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {update.title}
                  </h3>
                </div>
                <div className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
                  {update.date}
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                {update.description}
              </p>

              <ul className="space-y-3">
                {update.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <ArrowUpRight
                      size={14}
                      className="text-primary mt-1 shrink-0 opacity-40"
                    />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cn = (...classes: (string | undefined | null | boolean)[]) =>
  classes.filter(Boolean).join(" ");
