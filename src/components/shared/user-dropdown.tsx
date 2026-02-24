"use client";
import Link from "next/link";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, History as HistoryIcon, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function UserDropdown() {
  const { data: session } = useSession();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="group relative outline-none focus:outline-none">
          {/* Subtle Glow Effect behind Avatar */}
          <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

          <Avatar className="border-border/40 bg-background group-hover:border-border relative z-10 h-9 w-9 border transition-all duration-300 group-hover:scale-105">
            <AvatarImage
              src={session?.user?.image ?? ""}
              className="grayscale transition-all duration-700 hover:grayscale-0"
            />
            <AvatarFallback className="bg-muted text-muted-foreground text-[10px] font-bold tracking-tighter">
              {session?.user?.name?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="animate-in fade-in zoom-in-95 border-border/40 bg-popover/90 w-56 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl duration-300"
        align="end"
        sideOffset={12}
      >
        <DropdownMenuLabel className="px-3 py-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-foreground font-serif text-[11px] font-bold tracking-widest uppercase italic">
                {session?.user?.name ?? "Explorer"}
              </span>
            </div>
            {session?.user?.email ?? "user@reflecto.app"}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-border/40 mx-1" />

        <DropdownMenuGroup className="py-1">
          {[
            { icon: User, label: "Profile", href: "/profile" },
            { icon: Settings, label: "Settings", href: "/settings" },
            { icon: HistoryIcon, label: "Changelog", href: "/changelog" },
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <DropdownMenuItem className="group text-muted-foreground focus:bg-muted focus:text-foreground flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-all">
                <item.icon
                  size={14}
                  className="opacity-40 transition-opacity group-focus:opacity-100"
                />
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
                  {item.label}
                </span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border/40 mx-1" />

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-1 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-red-500/60 focus:bg-red-500/5 focus:text-red-400"
        >
          <LogOut size={14} className="opacity-60" />
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
            Sign Out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
