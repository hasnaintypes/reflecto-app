"use client";

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
import {
  User,
  Settings,
  Keyboard,
  BookOpen,
  Zap,
  LogOut,
  Sparkles,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function UserDropdown() {
  const { data: session } = useSession();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="group relative outline-none focus:outline-none">
          {/* Subtle Glow Effect behind Avatar */}
          <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

          <Avatar className="relative z-10 h-9 w-9 border border-white/5 bg-[#080808] transition-all duration-300 group-hover:scale-105 group-hover:border-white/20">
            <AvatarImage
              src={session?.user?.image ?? ""}
              className="grayscale transition-all duration-700 hover:grayscale-0"
            />
            <AvatarFallback className="bg-zinc-950 text-[10px] font-bold tracking-tighter text-zinc-500">
              {session?.user?.name?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="animate-in fade-in zoom-in-95 w-56 border-white/[0.04] bg-[#0A0A0A]/90 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl duration-300"
        align="end"
        sideOffset={12}
      >
        <DropdownMenuLabel className="px-3 py-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="font-serif text-[11px] font-bold tracking-widest text-white uppercase italic">
                {session?.user?.name ?? "Explorer"}
              </span>
              <Sparkles size={10} className="text-[#FB923C] opacity-80" />
            </div>
            <span className="text-[10px] font-medium tracking-tight text-zinc-600">
              {session?.user?.email ?? "user@reflecto.app"}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="mx-1 bg-white/[0.03]" />

        <DropdownMenuGroup className="py-1">
          {[
            { icon: User, label: "Profile" },
            { icon: Settings, label: "Settings" },
            { icon: Keyboard, label: "Shortcuts" },
          ].map((item) => (
            <DropdownMenuItem
              key={item.label}
              className="group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-zinc-500 transition-all focus:bg-white/[0.03] focus:text-white"
            >
              <item.icon
                size={14}
                className="opacity-40 transition-opacity group-focus:opacity-100"
              />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
                {item.label}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-1 bg-white/[0.03]" />

        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem className="group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-zinc-500 focus:bg-white/[0.03] focus:text-white">
            <BookOpen
              size={14}
              className="opacity-40 group-focus:opacity-100"
            />
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
              Library
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-zinc-500 focus:bg-white/[0.03] focus:text-white">
            <Zap
              size={14}
              className="text-[#FB923C] opacity-40 group-focus:opacity-100"
            />
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
              Changelog
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-1 bg-white/[0.03]" />

        <DropdownMenuItem
          onClick={() => signOut()}
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
