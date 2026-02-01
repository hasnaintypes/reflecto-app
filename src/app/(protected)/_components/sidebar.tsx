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

const NavItem = ({ icon: Icon, label, href, isCollapsed, isActive, color }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center",
        isCollapsed ? "h-9 w-full justify-center" : "h-9 w-full px-3 gap-3"
      )}
    >
      {/* Active State Indicator */}
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className={cn(
            "absolute inset-0 z-0 bg-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.03)]",
            isCollapsed ? "rounded-full" : "rounded-lg"
          )}
          initial={false}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      )}

      <div className="relative z-10 flex shrink-0 items-center justify-center w-6 h-6">
        <Icon 
          size={18} 
          style={{ color: isActive ? (color || "#fff") : (color || "currentColor") }}
          className={cn(
            "transition-all duration-300",
            isActive ? "opacity-100 scale-110" : "text-neutral-500 group-hover:text-neutral-200 group-hover:scale-110"
          )} 
        />
      </div>

      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className={cn(
              "relative z-10 text-sm font-medium whitespace-nowrap",
              isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-200"
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      
      {isCollapsed && (
        <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-neutral-900 text-white text-[11px] font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-[100] border border-white/10 shadow-2xl backdrop-blur-xl">
          {label}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-neutral-900" />
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
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-20 bottom-0 flex flex-col bg-[#080808] border-none z-[100]"
    >
      {/* Nav List */}
      <div className="flex-1 flex flex-col px-3.5 gap-1 overflow-visible no-scrollbar mt-6">
        {primaryNav.map((item) => (
          <NavItem 
            key={item.label} 
            {...item} 
            isCollapsed={isCollapsed} 
            isActive={pathname === item.href}
          />
        ))}

        <div className="h-[1px] bg-white/5 my-2 mx-3 shrink-0" />

        {secondaryNav.map((item) => (
          <NavItem 
            key={item.label} 
            {...item} 
            isCollapsed={isCollapsed} 
            isActive={pathname.includes(item.href) || pathname === item.href}
          />
        ))}
      </div>

      {/* Toggle Button */}
      <div className="p-4 mt-auto">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          {isCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}
