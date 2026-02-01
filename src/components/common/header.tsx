"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  ArrowRight,
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
      <header className="border-border/50 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 lg:px-10">
          {/* --- Left: Branding --- */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Logo size="sm" />
            <span className="text-foreground text-xl font-bold tracking-tight">
              Reflecto
            </span>
          </Link>

          {/* --- Right: Actions --- */}
          <div className="flex items-center gap-3">
            {/* Improved Search Bar Trigger */}
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="border-input bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground relative h-9 w-40 justify-start rounded-md px-3 text-sm font-normal shadow-none md:w-64"
            >
              <Search className="text-primary mr-2 h-4 w-4" />
              <span>Search reflections...</span>
              <kbd className="border-border bg-muted pointer-events-none absolute top-2 right-1.5 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
                <span className="text-primary text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Notifications with Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary relative h-9 w-9"
                >
                  <Bell className="h-4 w-4" />
                  <span className="bg-primary absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="border-border bg-popover w-80 p-0 shadow-2xl"
                align="end"
              >
                <div className="border-border border-b p-4">
                  <h3 className="text-foreground text-sm font-semibold">
                    Recent Activity
                  </h3>
                </div>
                <div className="flex max-h-[300px] min-h-[100px] flex-col items-center justify-center overflow-auto p-4">
                  <Sparkles className="text-primary/40 mb-2 h-8 w-8" />
                  <p className="text-muted-foreground text-center text-xs">
                    No new notifications. Start writing to see updates!
                  </p>
                </div>
              </PopoverContent>
            </Popover>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="ring-offset-background hover:ring-primary/50 relative ml-1 h-8 w-8 rounded-full transition-all hover:ring-2"
                >
                  <Avatar className="border-border h-8 w-8 border grayscale transition-all hover:grayscale-0">
                    <AvatarImage src={session?.user?.image ?? ""} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {session?.user?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="border-border bg-popover w-56"
                align="end"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-foreground text-sm font-medium">
                      {session?.user?.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
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
        <div className="border-border bg-popover flex flex-col overflow-hidden rounded-xl border shadow-2xl">
          <CommandInput
            placeholder="Search entries, tags, prompts..."
            className="text-foreground h-14 border-none focus:ring-0"
          />
          <CommandList className="max-h-[450px]">
            <CommandEmpty className="text-muted-foreground py-6 text-center text-sm">
              No results found.
            </CommandEmpty>

            <CommandGroup heading="Actions" className="text-primary px-2">
              <CommandItem className="text-foreground/80 focus:bg-accent focus:text-accent-foreground flex items-center gap-3 py-3">
                <PlusCircle className="h-4 w-4" />
                <span className="font-medium">New Journal Entry</span>
              </CommandItem>
              <CommandItem className="text-foreground/80 focus:bg-accent focus:text-accent-foreground flex items-center gap-3 py-3">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Get Daily Prompt</span>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Quick Explore" className="text-primary px-2">
              <CommandItem className="text-foreground/80 focus:bg-accent focus:text-accent-foreground flex items-center gap-3 py-3">
                <History className="h-4 w-4" />
                <span className="font-medium">View Reflection History</span>
              </CommandItem>
              <CommandItem className="text-foreground/80 focus:bg-accent focus:text-accent-foreground flex items-center gap-3 py-3">
                <Tag className="h-4 w-4" />
                <span className="font-medium">Browse by Tags</span>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Navigate" className="text-primary px-2">
              <CommandItem className="text-foreground/80 focus:bg-accent focus:text-accent-foreground flex items-center gap-3 py-3">
                <ArrowRight className="h-4 w-4" />
                <span className="font-medium">Dashboard</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>

          {/* Footer - Project Specific */}
          <div className="border-border bg-muted/50 text-muted-foreground flex items-center justify-between border-t px-4 py-3 text-[11px]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="border-border bg-background text-primary rounded border px-1">
                  ↵
                </kbd>{" "}
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="border-border bg-background text-primary flex items-center rounded border px-1">
                  esc
                </kbd>{" "}
                Close
              </span>
            </div>
            <div className="text-primary/60 hidden font-medium sm:block">
              Reflecto App v0.1.0
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
