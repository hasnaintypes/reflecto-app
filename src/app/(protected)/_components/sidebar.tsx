"use client";

import React, { useState } from "react";
import {
  Feather,
  Book,
  RotateCcw,
  BarChart3,
  Moon,
  Heart,
  Hash,
  AtSign,
  Pin,
  Gem,
  Lightbulb,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isCollapsed: boolean;
  isActive?: boolean;
  color?: string;
}

const NavItem = ({
  icon: Icon,
  label,
  href,
  isCollapsed,
  isActive,
  color,
}: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center transition-all duration-500",
        isCollapsed ? "h-9 w-full justify-center" : "h-9 w-full gap-3 px-3",
      )}
    >
      {/* Refined Active State: Glassmorphism + Accent Dot */}
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className={cn(
            "absolute inset-0 z-0 border border-white/[0.05] bg-white/[0.03]",
            isCollapsed ? "rounded-full" : "rounded-lg",
          )}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
        <Icon
          size={16}
          className={cn(
            "transition-all duration-500",
            isActive
              ? "scale-110 opacity-100"
              : "text-zinc-600 group-hover:text-zinc-300",
          )}
          style={{ color: isActive ? color : undefined }}
          strokeWidth={isActive ? 2.5 : 2}
        />
      </div>

      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            className={cn(
              "relative z-10 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300",
              isActive
                ? "text-white"
                : "text-zinc-500 group-hover:text-zinc-200",
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {isCollapsed && (
        <div className="invisible absolute left-full z-[100] ml-6 rounded border border-white/5 bg-zinc-900 px-3 py-1.5 text-[9px] font-bold tracking-widest whitespace-nowrap text-white uppercase opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
          {label}
        </div>
      )}
    </Link>
  );
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  const primaryNav = [
    { icon: Feather, label: "Write", href: "/write" },
    { icon: Book, label: "Journal", href: "/journal" },
    { icon: RotateCcw, label: "Reflect", href: "/reflect" },
    { icon: BarChart3, label: "Insights", href: "/insights" },
  ];

  const secondaryNav = [
    { icon: Moon, label: "Dreams", href: "/dreams", color: "#FACC15" },
    { icon: Heart, label: "Highlights", href: "/highlights", color: "#F87171" },
    { icon: Hash, label: "Tags", href: "/tags", color: "#60A5FA" },
    { icon: AtSign, label: "People", href: "/people", color: "#34D399" },
    { icon: Pin, label: "Notes", href: "/notes", color: "#A78BFA" },
    { icon: Gem, label: "Wisdom", href: "/wisdom", color: "#F472B6" },
    { icon: Lightbulb, label: "Ideas", href: "/ideas", color: "#FB923C" },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "72px" : "190px" }}
      transition={{ type: "spring", stiffness: 300, damping: 35 }}
      className="border-border/10 bg-background fixed top-16 bottom-0 left-0 z-[100] flex flex-col border-r"
    >
      <div className="no-scrollbar mt-10 flex flex-1 flex-col gap-1 overflow-visible px-3.5">
        {primaryNav.map((item) => (
          <NavItem
            key={item.label}
            {...item}
            isCollapsed={isCollapsed}
            isActive={pathname === item.href}
          />
        ))}

        <div className="mx-3 my-4 h-px shrink-0 bg-white/5" />

        <div className="flex flex-col gap-1">
          {!isCollapsed && (
            <p className="mb-2 px-3 text-[9px] font-bold tracking-[0.3em] text-zinc-700 uppercase">
              Categories
            </p>
          )}
          {secondaryNav.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isCollapsed={isCollapsed}
              isActive={pathname.includes(item.href) || pathname === item.href}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 transition-all duration-500 hover:bg-white/[0.03] hover:text-white"
        >
          {isCollapsed ? (
            <ChevronsRight size={16} />
          ) : (
            <ChevronsLeft size={16} />
          )}
        </button>
      </div>
    </motion.div>
  );
}
