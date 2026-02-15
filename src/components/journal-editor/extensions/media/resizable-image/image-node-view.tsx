"use client";

import React, { useCallback, useRef, useState } from "react";
import { NodeViewWrapper, type ReactNodeViewProps } from "@tiptap/react";
import { X, Maximize2, Loader2 } from "lucide-react";
import { DeleteImageDialog } from "@/components/shared";
import type { EditorImageAttributes } from "@/types/editor-image.types";
import { cn } from "@/lib/utils";

type ResizeDirection = "n" | "s" | "e" | "w" | "nw" | "ne" | "sw" | "se";

export const ResizableImageNodeView = ({
  node,
  updateAttributes,
  deleteNode,
  selected, // We need this prop to show the border on click
}: ReactNodeViewProps) => {
  const attrs = node.attrs as unknown as EditorImageAttributes;
  const [isResizing, setIsResizing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const isUploading = attrs.status === "uploading";

  // --- Resize Logic (Same as before) ---
  const handleResizeStart = useCallback(
    (direction: ResizeDirection) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);

      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = imageRef.current?.clientWidth ?? 0;
      const startHeight = imageRef.current?.clientHeight ?? 0;
      const aspectRatio = startWidth / startHeight || 1;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        let newWidth = startWidth;
        let newHeight = startHeight;

        if (["e", "se", "ne"].includes(direction))
          newWidth = startWidth + deltaX;
        if (["w", "sw", "nw"].includes(direction))
          newWidth = startWidth - deltaX;
        if (["s", "se", "sw"].includes(direction))
          newHeight = startHeight + deltaY;
        if (["n", "ne", "nw"].includes(direction))
          newHeight = startHeight - deltaY;

        if (["nw", "ne", "sw", "se"].includes(direction)) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            newHeight = newWidth / aspectRatio;
          } else {
            newWidth = newHeight * aspectRatio;
          }
        }

        updateAttributes({
          width: Math.round(Math.max(100, newWidth)),
          height: Math.round(Math.max(50, newHeight)),
        });
      };

      const onMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [updateAttributes],
  );
  // ------------------------------------

  return (
    <NodeViewWrapper
      // Removed 'my-4' to get rid of vertical spacing
      className={cn(
        "group relative inline-block max-w-full leading-none",
        isResizing && "select-none",
      )}
    >
      {/* Main Image Container */}
      <div
        className={cn(
          "relative inline-block overflow-hidden rounded-lg leading-none transition-all duration-200",
          // Add a ring border when selected or resizing
          (selected || isResizing) && "ring-primary ring-2",
          // Add a subtle shadow on hover
          "group-hover:shadow-md",
        )}
      >
        <img
          ref={imageRef}
          src={attrs.src}
          alt={attrs.alt ?? ""}
          style={{
            width: attrs.width ? `${attrs.width}px` : "100%",
            // If we have both width and height, we use height: auto to let aspect-ratio 
            // handle the height when the width is constrained by the editor.
            height: attrs.width && attrs.height ? "auto" : (attrs.height ? `${attrs.height}px` : "auto"),
            aspectRatio: attrs.width && attrs.height ? `${attrs.width} / ${attrs.height}` : "auto",
            display: "block",
            objectFit: "cover",
          }}
          className={cn(
            "transition-opacity",
            isUploading && "opacity-50 blur-sm",
          )}
        />

        {/* Uploading Overlay */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 shadow-lg">
              <Loader2 size={14} className="text-primary animate-spin" />
              <span className="text-[10px] font-bold">
                {Math.round(attrs.progress ?? 0)}%
              </span>
            </div>
          </div>
        )}

        {!isUploading && (
          <>
            {/* Edge Resizers (Invisible hit areas) */}
            <div
              onMouseDown={handleResizeStart("n")}
              className="absolute top-0 left-0 z-20 h-2 w-full cursor-ns-resize"
            />
            <div
              onMouseDown={handleResizeStart("s")}
              className="absolute bottom-0 left-0 z-20 h-2 w-full cursor-ns-resize"
            />
            <div
              onMouseDown={handleResizeStart("w")}
              className="absolute top-0 left-0 z-20 h-full w-2 cursor-ew-resize"
            />
            <div
              onMouseDown={handleResizeStart("e")}
              className="absolute top-0 right-0 z-20 h-full w-2 cursor-ew-resize"
            />

            {/* Delete button (Top Right Overlay) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteDialogOpen(true);
              }}
              // Positioned on the image, visible on hover/selection
              className={cn(
                "hover:bg-destructive absolute top-1 right-1 z-30 flex h-6 w-6 items-center justify-center rounded-md bg-black/60 text-white opacity-0 shadow-sm backdrop-blur-sm transition-all group-hover:opacity-100",
                selected && "opacity-100",
              )}
            >
              <X size={14} />
            </button>

            {/* Corner Resizer (Bottom Right Overlay) */}
            <div
              onMouseDown={handleResizeStart("se")}
              // Positioned on the image, visible on hover/selection
              className={cn(
                "hover:bg-primary absolute right-1 bottom-1 z-30 flex h-6 w-6 cursor-nwse-resize items-center justify-center rounded-md bg-black/60 text-white opacity-0 shadow-sm backdrop-blur-sm transition-all group-hover:opacity-100",
                selected && "opacity-100",
              )}
            >
              <Maximize2 size={12} className="rotate-90" />
            </div>
          </>
        )}
      </div>

      <DeleteImageDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          deleteNode();
          setDeleteDialogOpen(false);
        }}
      />
    </NodeViewWrapper>
  );
};
