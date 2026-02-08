"use client";

import { cn } from "@/lib/utils";
import { BookMarked } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const sizeMap = {
  xs: "h-4 w-4",
  sm: "h-6 w-6",
  md: "h-9 w-9",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const iconSizeMap = {
  xs: "h-2 w-2",
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-7 w-7",
  xl: "h-10 w-10",
};

const titleSizeMap = {
  xs: "text-[10px]",
  sm: "text-[14px]",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-5xl",
};

const subtitleSizeMap = {
  xs: "text-[4px]",
  sm: "text-[7px]",
  md: "text-[10px]",
  lg: "text-[14px]",
  xl: "text-[20px]",
};

export default function Logo({
  className,
  size = "md",
  showText = true,
}: LogoProps) {
  return (
    <div
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 font-sans select-none",
        className,
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "bg-primary shadow-primary/20 flex items-center justify-center rounded-xl shadow-lg",
          sizeMap[size],
        )}
      >
        <BookMarked
          className={cn("text-primary-foreground", iconSizeMap[size])}
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "text-foreground font-semibold tracking-tight",
              titleSizeMap[size],
            )}
          >
            Reflecto
          </span>
          <span
            className={cn(
              "text-primary font-bold tracking-[0.2em] uppercase",
              subtitleSizeMap[size],
            )}
          >
            App
          </span>
        </div>
      )}
    </div>
  );
}
