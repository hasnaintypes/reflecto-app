"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

// If you have a serif font configured in your Tailwind config (like Playfair or New York)
// use that instead of a standard sans.

interface LogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const sizeMap = {
  xs: "h-5 w-5",
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
};

const textMap = {
  xs: "text-[12px] tracking-[0.2em]",
  sm: "text-[14px] tracking-[0.25em]",
  md: "text-[16px] tracking-[0.3em]",
  lg: "text-2xl tracking-[0.2em]",
  xl: "text-4xl tracking-[0.1em]",
};

export default function Logo({
  className,
  size = "md",
  showText = true,
}: LogoProps) {
  return (
    <div
      className={cn(
        "group inline-flex cursor-pointer items-center gap-3",
        className,
      )}
    >
      {/* Logo Container with subtle glow */}
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105",
          sizeMap[size],
        )}
      >
        <Image
          src="/logo.png"
          alt="Reflecto Logo"
          width={120}
          height={120}
          className="h-full w-full rounded-full object-contain transition-all duration-700"
        />

        {/* Subtle radial overlay to blend the logo image */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent" />
      </div>

      {showText && (
        <span
          className={cn(
            "font-serif font-medium text-white/90 uppercase italic transition-colors duration-500 group-hover:text-white",
            textMap[size],
          )}
        >
          Reflecto
        </span>
      )}
    </div>
  );
}
