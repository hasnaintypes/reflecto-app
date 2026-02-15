"use client";

import React, { useCallback } from "react";
import { NodeViewWrapper, type ReactNodeViewProps } from "@tiptap/react";
import { X } from "lucide-react";
import { DeleteImageDialog } from "@/components/shared";
import type { EditorImageAttributes } from "@/types/editor-image.types";

export const ResizableImageNodeView = ({
  node,
  updateAttributes,
  deleteNode,
}: ReactNodeViewProps) => {
  // Type assertion to ensure attrs match our expected structure
  const attrs = node.attrs as EditorImageAttributes;
  const [isResizing, setIsResizing] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      setIsDragging(true);

      const startX = e.clientX;
      const startWidth = imageRef.current?.width ?? 0;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const newWidth = Math.max(100, startWidth + deltaX);
        updateAttributes({ width: newWidth });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [updateAttributes],
  );

  const handleDelete = useCallback(async () => {
    deleteNode();
    setDeleteDialogOpen(false);
  }, [deleteNode]);

  return (
    <NodeViewWrapper className="group relative my-4 inline-block">
      <div className="relative">
        <img
          ref={imageRef}
          src={attrs.src}
          alt={attrs.alt ?? ""}
          title={attrs.title}
          style={{
            width: attrs.width ? `${attrs.width}px` : "auto",
            height: attrs.height ? `${attrs.height}px` : "auto",
            maxWidth: "100%",
            cursor: isDragging ? "ew-resize" : "default",
          }}
          className="border-border/50 rounded-lg border"
        />

        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className="bg-primary/50 absolute top-1/2 right-0 h-12 w-2 -translate-y-1/2 cursor-ew-resize rounded-l opacity-0 transition-opacity group-hover:opacity-100"
        />

        {/* Delete button */}
        <button
          onClick={() => setDeleteDialogOpen(true)}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90 absolute top-2 right-2 rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Delete image"
        >
          <X size={16} />
        </button>
      </div>

      <DeleteImageDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </NodeViewWrapper>
  );
};
