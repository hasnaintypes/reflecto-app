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

      // Insert skeleton placeholder
      editor
        .chain()
        .focus()
        .setImage({
          src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%2364748b' font-size='16'%3EUploading...%3C/text%3E%3C/svg%3E",
          alt: "Uploading...",
        })
        .run();

      try {
        // Convert file to base64
        const fileData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
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

        // Find and replace the skeleton image with the actual uploaded image
        // We need to find the image node that was just inserted
        const { state } = editor;
        let skeletonPos: number | null = null;

        state.doc.descendants((node, pos) => {
          if (
            node.type.name === "resizableImage" &&
            node.attrs.alt === "Uploading..."
          ) {
            skeletonPos = pos;
            return false; // Stop searching
          }
        });

        if (skeletonPos !== null) {
          // Delete the skeleton and insert the real image
          editor
            .chain()
            .focus()
            .setNodeSelection(skeletonPos)
            .deleteSelection()
            .setImage({
              src: uploadData.url ?? "",
              alt: file.name,
            })
            .run();

          // Now update the image node to add the fileId attribute
          // Find the newly inserted image
          const { state } = editor;
          let imagePos: number | null = null;

          state.doc.descendants((node, pos) => {
            if (
              node.type.name === "resizableImage" &&
              node.attrs.src === uploadData.url
            ) {
              imagePos = pos;
              return false;
            }
          });

          if (imagePos !== null) {
            editor
              .chain()
              .focus()
              .setNodeSelection(imagePos)
              .updateAttributes("resizableImage", {
                fileId: uploadData.fileId,
              })
              .run();
          }
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
