"use client";

import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const sizeMap = {
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-10 w-10",
  xl: "h-14 w-14",
};

const textMap = {
  xs: "text-[12px] tracking-[0.2em]",
  sm: "text-[13px] tracking-[0.25em]",
  md: "text-[15px] tracking-[0.3em]",
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
        "group inline-flex cursor-pointer items-center gap-3 select-none",
        className,
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "border-primary relative flex shrink-0 items-center justify-center rounded-sm border-2 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)] transition-all duration-500 group-hover:scale-110",
          sizeMap[size],
        )}
      >
        <span
          className={cn(
            "text-primary font-mono leading-none font-bold",
            size === "xs" && "text-[8px]",
            size === "sm" && "text-[11px]",
            size === "md" && "text-xs",
            size === "lg" && "text-2xl",
            size === "xl" && "text-4xl",
          )}
        >
          R
        </span>

        {/* Dynamic Glow on hover */}
        <div className="bg-primary/20 absolute inset-0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {showText && (
        <span
          className={cn(
            "text-foreground/90 group-hover:text-foreground font-serif font-semibold tracking-tight transition-colors duration-500",
            textMap[size],
          )}
        >
          Reflecto
        </span>
      )}
    </div>
  );
}
