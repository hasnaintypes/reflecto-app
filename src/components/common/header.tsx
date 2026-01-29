"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import {
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  Sun,
  Moon,
  ArrowRight,
  Circle,
  Command as CommandIcon,
  PlusCircle,
  Sparkles,
  Tag,
  History,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/common";

export default function Header() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 lg:px-10">
          {/* --- Left: Branding --- */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Logo size="sm" />
            <span className="text-xl font-bold tracking-tight text-foreground">Reflecto</span>
          </Link>

          {/* --- Right: Actions --- */}
          <div className="flex items-center gap-3">
            {/* Improved Search Bar Trigger */}
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="relative h-9 w-40 justify-start rounded-md border-input bg-muted/50 px-3 text-sm font-normal text-muted-foreground shadow-none hover:bg-muted hover:text-foreground md:w-64"
            >
              <Search className="mr-2 h-4 w-4 text-primary" />
              <span>Search reflections...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs text-primary">⌘</span>K
              </kbd>
            </Button>


            {/* Notifications with Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-primary">
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-primary" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 border-border bg-popover p-0 shadow-2xl" align="end">
                <div className="border-b border-border p-4">
                  <h3 className="font-semibold text-foreground text-sm">Recent Activity</h3>
                </div>
                <div className="max-h-[300px] overflow-auto p-4 flex flex-col items-center justify-center min-h-[100px]">
                  <Sparkles className="h-8 w-8 text-primary/40 mb-2" />
                  <p className="text-center text-xs text-muted-foreground">No new notifications. Start writing to see updates!</p>
                </div>
              </PopoverContent>
            </Popover>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative ml-1 h-8 w-8 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/50"
                >
                  <Avatar className="h-8 w-8 border border-border grayscale transition-all hover:grayscale-0">
                    <AvatarImage src={session?.user?.image ?? ""} />
                    <AvatarFallback className="bg-primary/10 text-primary">{session?.user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-border bg-popover" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-foreground">{session?.user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="text-muted-foreground focus:bg-accent focus:text-accent-foreground">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground focus:bg-accent focus:text-accent-foreground">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* --- Reflecto Command Palette --- */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
          <CommandInput
            placeholder="Search entries, tags, prompts..."
            className="h-14 border-none text-foreground focus:ring-0"
          />
          <CommandList className="max-h-[450px]">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">No results found.</CommandEmpty>

            <CommandGroup heading="Actions" className="px-2 text-primary">
              <CommandItem className="flex items-center gap-3 py-3 text-foreground/80 focus:bg-accent focus:text-accent-foreground">
                <PlusCircle className="h-4 w-4" />
                <span className="font-medium">New Journal Entry</span>
              </CommandItem>
              <CommandItem className="flex items-center gap-3 py-3 text-foreground/80 focus:bg-accent focus:text-accent-foreground">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Get Daily Prompt</span>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Quick Explore" className="px-2 text-primary">
              <CommandItem className="flex items-center gap-3 py-3 text-foreground/80 focus:bg-accent focus:text-accent-foreground">
                <History className="h-4 w-4" />
                <span className="font-medium">View Reflection History</span>
              </CommandItem>
              <CommandItem className="flex items-center gap-3 py-3 text-foreground/80 focus:bg-accent focus:text-accent-foreground">
                <Tag className="h-4 w-4" />
                <span className="font-medium">Browse by Tags</span>
              </CommandItem>
            </CommandGroup>
            
            <CommandGroup heading="Navigate" className="px-2 text-primary">
              <CommandItem className="flex items-center gap-3 py-3 text-foreground/80 focus:bg-accent focus:text-accent-foreground">
                <ArrowRight className="h-4 w-4" />
                <span className="font-medium">Dashboard</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>

          {/* Footer - Project Specific */}
          <div className="flex items-center justify-between border-t border-border bg-muted/50 px-4 py-3 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-background px-1 text-primary">↵</kbd> Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="flex items-center rounded border border-border bg-background px-1 text-primary">
                  esc
                </kbd>{" "}
                Close
              </span>
            </div>
            <div className="hidden sm:block text-primary/60 font-medium">
              Reflecto App v0.1.0
            </div>
          </div>
        </div>
      </CommandDialog>

    </>
  );
}
