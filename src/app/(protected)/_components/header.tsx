"use client";

import React from "react";
import { Search } from "lucide-react";
import { UserDropdown } from "./user-dropdown";
import { useSharedEditor } from "./editor-context";
import { EditorToolbar } from "./toolbar";
import { usePathname } from "next/navigation";

export function Header() {
  const { editor, isCentered, setIsCentered } = useSharedEditor();
  const pathname = usePathname();

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const showToolbar =
    pathname === "/write" ||
    (pathname.startsWith("/reflect/") && pathname !== "/reflect");

  return (
    <div className="flex shrink-0 items-center justify-between px-8 py-6">
      {/* Left: Spacer to keep toolbar centered */}
      <div className="flex-1" />

      {/* Center: Toolbar or Search */}
      <div className="flex-initial">
        {showToolbar ? (
          <EditorToolbar
            editor={editor}
            isCentered={isCentered}
            onToggleAlignment={() => setIsCentered(!isCentered)}
            addImage={addImage}
          />
        ) : (
          <button className="group flex w-[300px] items-center gap-3 rounded-full border border-white/5 bg-zinc-900/50 px-4 py-2 transition-all hover:bg-zinc-800/80">
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

      {/* Right: User Section */}
      <div className="flex flex-1 justify-end">
        <UserDropdown />
      </div>
    </div>
  );
}
