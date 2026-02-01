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
import { User, Settings, Keyboard, BookOpen, Zap, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function UserDropdown() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative focus:outline-none">
          <Avatar className="h-8 w-8 border border-white/10 transition-colors group-hover:border-white/20">
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback className="bg-zinc-900 text-[10px] font-bold text-zinc-400">
              U
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-52 border-zinc-800 bg-zinc-950 p-1 shadow-2xl"
        align="end"
        sideOffset={10}
      >
        <DropdownMenuLabel className="mb-1 px-2 py-2">
          <div className="flex flex-col">
            <span className="text-[13px] leading-tight font-semibold text-zinc-100">
              Account
            </span>
            <span className="text-[11px] leading-tight font-normal text-zinc-500">
              user@reflecto.app
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="mx-1 bg-zinc-800/50" />

        <DropdownMenuGroup className="py-1">
          {[
            { icon: User, label: "Profile" },
            { icon: Settings, label: "Settings" },
            { icon: Keyboard, label: "Shortcuts" },
          ].map((item) => (
            <DropdownMenuItem
              key={item.label}
              className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-1.5 text-zinc-400 transition-colors focus:bg-zinc-800 focus:text-zinc-100"
            >
              <item.icon size={14} className="opacity-70" />
              <span className="text-[12px]">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-1 bg-zinc-800/50" />

        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-1.5 text-zinc-400 focus:bg-zinc-800 focus:text-zinc-100">
            <BookOpen size={14} className="opacity-70" />
            <span className="text-[12px]">Docs</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-1.5 text-zinc-400 focus:bg-zinc-800 focus:text-zinc-100">
            <Zap size={14} className="opacity-70" />
            <span className="text-[12px]">Updates</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-1 bg-zinc-800/50" />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="mt-1 flex cursor-pointer items-center gap-2.5 rounded-sm px-2 py-1.5 text-red-400/80 focus:bg-red-500/10 focus:text-red-400"
        >
          <LogOut size={14} />
          <span className="text-[12px] font-medium">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
