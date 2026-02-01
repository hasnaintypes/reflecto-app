"use client";

import React, { useState } from "react";
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

  const showToolbar = pathname === "/write" || (pathname.startsWith("/reflect/") && pathname !== "/reflect");

  return (
    <div className="shrink-0 flex items-center justify-between px-8 py-6">
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
          <button 
            className="flex items-center gap-3 px-4 py-2 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 rounded-full transition-all group w-[300px]"
          >
            <Search size={16} className="text-zinc-500 group-hover:text-zinc-300" />
            <span className="text-sm text-zinc-500 group-hover:text-zinc-300 flex-1 text-left">Search journal...</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-zinc-600 bg-zinc-950 px-1.5 py-0.5 rounded border border-white/5">⌘</span>
              <span className="text-[10px] font-bold text-zinc-600 bg-zinc-950 px-1.5 py-0.5 rounded border border-white/5">K</span>
            </div>
          </button>
        )}
      </div>

      {/* Right: User Section */}
      <div className="flex-1 flex justify-end">
        <UserDropdown />
      </div>
    </div>
  );
}
