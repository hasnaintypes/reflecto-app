import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  deleteAttachmentSchema,
  uploadImageSchema,
  createImageAttachmentSchema,
} from "@/server/schemas/attachment.schema";
import { attachmentService } from "@/server/services/attachment/attachment.service";
import { uploadService } from "@/server/services/attachment/upload.service";

export const attachmentRouter = createTRPCRouter({
  /**
   * Upload an image file (server-side)
   */
  uploadImage: protectedProcedure
    .input(uploadImageSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await uploadService.uploadImage(
        ctx.session.user.id,
        input.fileData,
        input.fileName,
        input.fileType,
        input.fileSize,
      );

      // Optionally register the attachment in the database
      if (input.entryId) {
        await attachmentService.createImageAttachment(
          ctx.db,
          ctx.session.user.id,
          {
            entryId: input.entryId,
            fileUrl: result.url,
            filePath: result.filePath,
            fileType: result.fileType,
            fileSize: result.size,
          },
        );
      }

      return result;
    }),

  /**
   * Register a successfully uploaded image
   */
  registerImageAttachment: protectedProcedure
    .input(createImageAttachmentSchema)
    .mutation(async ({ ctx, input }) => {
      return attachmentService.createImageAttachment(
        ctx.db,
        ctx.session.user.id,
        input,
      );
    }),

  /**
   * Delete an attachment
   */
  delete: protectedProcedure
    .input(deleteAttachmentSchema)
    .mutation(async ({ ctx, input }) => {
      return attachmentService.deleteAttachment(
        ctx.db,
        ctx.session.user.id,
        input.id,
      );
    }),
});
