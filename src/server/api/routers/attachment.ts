import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  generatePresignedUrlSchema,
  createAttachmentSchema,
  deleteAttachmentSchema,
} from "@/server/schemas/attachment.schema";
import { attachmentService } from "@/server/services/attachment/attachment.service";
import { storageService } from "@/server/services/attachment/storage.service";

export const attachmentRouter = createTRPCRouter({
  /**
   * Get a presigned URL for direct client-to-storage upload
   */
  getPresignedUrl: protectedProcedure
    .input(generatePresignedUrlSchema)
    .mutation(async ({ ctx, input }) => {
      return storageService.getPresignedUrl(
        ctx.session.user.id!,
        input.fileName,
        input.fileType,
      );
    }),

  /**
   * Register a successfully uploaded file
   */
  registerAttachment: protectedProcedure
    .input(createAttachmentSchema)
    .mutation(async ({ ctx, input }) => {
      return attachmentService.createAttachment(
        ctx.db,
        ctx.session.user.id!,
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
        ctx.session.user.id!,
        input.id,
      );
    }),
});
