"use client";

import React from "react";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSharedEditor } from "@/components/journal-editor";
import { EditorToolbar } from "@/components/shared/toolbar";
import { UserDropdown } from "@/components/shared/user-dropdown";
import { useEntryStore } from "@/stores/use-entry-store";
import { useImageUpload } from "@/hooks/use-image-upload";

import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
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
} from "lucide-react";

export function Header() {
  const { editor, isCentered, setIsCentered } = useSharedEditor();
  const { currentEntry } = useEntryStore();
  const { uploadImage } = useImageUpload(editor, currentEntry?.id);
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  const showToolbar =
    pathname === "/write" ||
    pathname.startsWith("/dreams/") ||
    pathname.startsWith("/highlights/") ||
    pathname.startsWith("/ideas/") ||
    pathname.startsWith("/wisdom/") ||
    pathname.startsWith("/notes/") ||
    pathname.startsWith("/journal/") ||
    (pathname.startsWith("/reflect/") && pathname !== "/reflect");

  const navigationItems = [
    { icon: Feather, label: "Write", href: "/write" },
    { icon: Book, label: "Journal", href: "/journal" },
    { icon: RotateCcw, label: "Reflect", href: "/reflect" },
    { icon: BarChart3, label: "Insights", href: "/insights" },
    { icon: Moon, label: "Dreams", href: "/dreams" },
    { icon: Heart, label: "Highlights", href: "/highlights" },
    { icon: Hash, label: "Tags", href: "/tags" },
    { icon: AtSign, label: "People", href: "/people" },
    { icon: Pin, label: "Notes", href: "/notes" },
    { icon: Gem, label: "Wisdom", href: "/wisdom" },
    { icon: Lightbulb, label: "Ideas", href: "/ideas" },
  ];

  return (
    <div className="flex shrink-0 items-center justify-between px-8 py-6">
      <div className="flex-1" />

      <div className="flex-initial">
        {showToolbar ? (
          <EditorToolbar
            editor={editor}
            isCentered={isCentered}
            onToggleAlignment={() => setIsCentered(!isCentered)}
            addImage={uploadImage}
          />
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="group border-border/40 bg-muted/50 hover:bg-muted/80 flex w-[300px] items-center gap-3 rounded-full border px-4 py-2 transition-all"
          >
            <Search
              size={16}
              className="text-zinc-500 group-hover:text-zinc-300"
            />
            <span className="flex-1 text-left text-sm text-zinc-500 group-hover:text-zinc-300">
              Search journal...
            </span>
            <div className="flex items-center gap-1">
              <span className="rounded border border-white/5 bg-zinc-950 px-1.5 py-0.5 text-[10px] font-bold text-zinc-600">
                ⌘
              </span>
              <span className="rounded border border-white/5 bg-zinc-950 px-1.5 py-0.5 text-[10px] font-bold text-zinc-600">
                K
              </span>
            </div>
          </button>
        )}
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => router.push(item.href))}
                className="flex items-center gap-2"
              >
                <item.icon size={16} className="text-muted-foreground" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/profile"))}
            >
              Profile
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/settings"))}
            >
              Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <div className="flex flex-1 justify-end">
        <UserDropdown />
      </div>
    </div>
  );
}
