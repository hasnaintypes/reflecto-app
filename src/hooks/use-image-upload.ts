"use client";

import type { Editor } from "@tiptap/react";
import { api } from "@/trpc/react";

export function useImageUpload(editor: Editor | null, entryId?: string) {
  const uploadImageMutation = api.attachment.uploadImage.useMutation();

  const uploadImage = async () => {
    if (!editor) {
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif,image/webp";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Insert placeholder
      editor
        .chain()
        .focus()
        .insertContent({
          type: "resizableImage",
          attrs: {
            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2318181b'/%3E%3C/svg%3E",
            alt: "Uploading...",
            status: "uploading",
            progress: 0,
          },
        })
        .run();

      try {
        // Convert file to base64
        const fileData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1];
            resolve(base64 ?? result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        // Upload via server
        const uploadData = await uploadImageMutation.mutateAsync({
          fileData,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          entryId,
        });

        // Find the skeleton
        const { state } = editor;
        let skeletonPos: number | null = null;

        state.doc.descendants((node, pos) => {
          if (
            node.type.name === "resizableImage" &&
            node.attrs.alt === "Uploading..."
          ) {
            skeletonPos = pos;
            return false;
          }
        });

        if (skeletonPos !== null) {
          editor
            .chain()
            .focus()
            .setNodeSelection(skeletonPos)
            .updateAttributes("resizableImage", {
              src: uploadData.url ?? "",
              alt: file.name,
              status: "complete",
              fileId: uploadData.fileId,
            })
            .run();
        }
      } catch (error) {
        // Remove skeleton on error
        const { state } = editor;
        let skeletonPos: number | null = null;

        state.doc.descendants((node, pos) => {
          if (
            node.type.name === "resizableImage" &&
            node.attrs.alt === "Uploading..."
          ) {
            skeletonPos = pos;
            return false;
          }
        });

        if (skeletonPos !== null) {
          editor
            .chain()
            .focus()
            .setNodeSelection(skeletonPos)
            .deleteSelection()
            .run();
        }

        console.error(error);
      }
    };

    input.click();
  };

  return { uploadImage };
}
