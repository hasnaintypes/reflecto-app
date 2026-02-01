"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
  {
    key: "system",
    icon: Monitor,
    label: "System",
  },
  {
    key: "light",
    icon: Sun,
    label: "Light",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark",
  },
] as const;

export type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "bg-muted h-8 w-24 animate-pulse rounded-full",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "bg-secondary/50 ring-border/50 relative flex h-8 items-center rounded-full p-1 ring-1 backdrop-blur-sm",
        className,
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            key={key}
            aria-label={label}
            className={cn(
              "focus-visible:ring-primary relative flex h-6 w-8 items-center justify-center rounded-full transition-colors focus-visible:ring-1 focus-visible:outline-none",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setTheme(key)}
            type="button"
          >
            {isActive && (
              <motion.div
                layoutId="theme-pill"
                className="bg-background absolute inset-0 rounded-full shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon className="relative z-10 h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
};
