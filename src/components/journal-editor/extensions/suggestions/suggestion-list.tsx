"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import type { SuggestionItem } from "../../core/types";

export interface SuggestionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
  selectItem: (index: number) => void;
}

import type { Editor } from "@tiptap/react";

export interface SuggestionListProps {
  items: SuggestionItem[];
  command: (props: SuggestionItem) => void;
  editor: Editor;
}

export const SuggestionList = forwardRef<
  SuggestionListRef,
  SuggestionListProps
>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command({ id: item.id, label: item.label ?? "" });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length,
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        if (props.items.length > 0) {
          enterHandler();
          return true;
        }
        return false;
      }

      return false;
    },
    selectItem,
  }));

  return (
    <div className="bg-background border-border relative z-50 min-w-[160px] overflow-hidden rounded-xl border p-1 shadow-2xl backdrop-blur-md">
      {props.items.length > 0 ? (
        <div className="flex flex-col">
          {props.items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => selectItem(index)}
              className={cn(
                "hover:bg-muted/50 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                index === selectedIndex ? "bg-muted" : "bg-transparent",
              )}
            >
              <span className="text-foreground/80 font-medium">
                {item.isNew
                  ? `+ Create "${item.label}"`
                  : item.label}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground px-3 py-2 text-xs">
          No results found
        </div>
      )}
    </div>
  );
});

SuggestionList.displayName = "SuggestionList";
