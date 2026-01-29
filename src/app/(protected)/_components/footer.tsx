"use client";

import { Command } from "lucide-react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useEffect, useState } from "react";
import { Logo } from "@/components/common";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="w-full border-t border-border/40 bg-background/80 py-2 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 lg:px-10">
        {/* Left: Brand & Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" className="opacity-80 hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-foreground/80 uppercase">Reflecto</span>
          </div>
          <div className="hidden h-3 w-[1px] bg-border md:block" />
          <div className="hidden items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase md:flex">
            <div className="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>Operational</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase lg:flex">
            <Command size={10} className="opacity-50" />
            <span>⌘+K Search</span>
          </div>
          <div className="h-3 w-[1px] bg-border hidden md:block" />
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-widest text-muted-foreground/60 uppercase">v1.0.0</span>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}

