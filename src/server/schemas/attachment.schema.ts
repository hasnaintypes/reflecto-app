import { z } from "zod";

export const generatePresignedUrlSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
  entryId: z.string().optional(),
});

export const createAttachmentSchema = z.object({
  entryId: z.string(),
  fileUrl: z.string().url(),
  fileType: z.string(),
  fileSize: z.number(),
  thumbnailUrl: z.string().url().optional(),
});

export const deleteAttachmentSchema = z.object({
  id: z.string(),
});
