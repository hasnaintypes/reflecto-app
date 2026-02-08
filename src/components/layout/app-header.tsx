"use client";
import React from "react";
import Link from "next/link";
import { Logo } from "./index";

export default function AppHeader() {
  return (
    <header className="bg-background/70 border-border/20 sticky top-0 z-50 border-b backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex">
          {[
            { name: "Features", href: "#features" },
            { name: "Pricing", href: "#pricing" },
            { name: "About", href: "/about" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full px-4 py-2 text-sm font-medium transition-all"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/sign-in"
            className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-colors sm:block"
          >
            Log in
          </Link>
          <Link href="/auth/sign-up">
            <button className="bg-primary text-primary-foreground hover:shadow-primary/20 group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95">
              <span>Get Started</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
