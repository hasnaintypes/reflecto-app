"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "./index";

export default function CustomFooter() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <footer className="bg-background border-border/40 border-t pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-6">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-muted-foreground/80 max-w-md font-serif text-base leading-relaxed italic">
              &quot;The unexamined life is not worth living, but the
              over-examined life is a mess. We build the bridge between the
              two.&quot;
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:ml-auto">
            <div className="space-y-3">
              <h4 className="text-primary/70 font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
                Engine
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/auth/sign-in"
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/sign-up"
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-primary/70 font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
                Spirit
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#manifesto"
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    Manifesto
                  </a>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Scroll Column */}
          <div className="hidden items-start justify-end lg:col-span-1 lg:flex">
            <button
              onClick={scrollToTop}
              className="group bg-secondary/50 hover:bg-primary hover:text-primary-foreground border-border/50 flex h-10 w-10 items-center justify-center rounded-full border transition-all active:scale-90"
            >
              <ArrowUp
                size={16}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        {/* --- Utility Bottom Bar --- */}
        <div className="border-border/20 flex flex-col items-center justify-between gap-6 border-t pt-6 md:flex-row">
          <p className="text-muted-foreground font-mono text-[9px] tracking-[0.15em] uppercase opacity-70">
            Designed in the Void • © 2026 Reflecto Labs
          </p>

          <div className="flex items-center gap-6">
            {/* Custom Docked Theme Switcher */}
            <div className="bg-secondary/40 ring-border/20 flex items-center gap-0.5 rounded-full p-0.5 ring-1">
              {[
                { id: "light", icon: <Sun size={12} /> },
                { id: "dark", icon: <Moon size={12} /> },
                { id: "system", icon: <Monitor size={12} /> },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-all ${
                    theme === t.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground/60 hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{t.icon}</span>
                  {theme === t.id && (
                    <motion.div
                      layoutId="activeTheme"
                      className="bg-primary absolute inset-0 rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.1,
                        duration: 0.5,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="text-muted-foreground/80 text-[9px] font-bold tracking-widest uppercase">
                System_Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
