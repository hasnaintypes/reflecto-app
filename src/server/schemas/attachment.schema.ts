import { z } from "zod";

export const generatePresignedUrlSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
  entryId: z.string().optional(),
});

export const uploadImageSchema = z.object({
  fileData: z.string().min(1, "File data is required"), // base64 encoded file
  fileName: z.string().min(1),
  fileType: z.string().regex(/^image\/(jpeg|png|gif|webp)$/),
  fileSize: z
    .number()
    .max(10 * 1024 * 1024, "File size must be less than 10MB"),
  entryId: z.string().optional(), // Optional: register attachment to entry immediately
});

export const createAttachmentSchema = z.object({
  entryId: z.string(),
  fileUrl: z.string().url(),
  fileType: z.string(),
  fileSize: z.number(),
  thumbnailUrl: z.string().url().optional(),
});

export const createImageAttachmentSchema = z.object({
  entryId: z.string(),
  fileUrl: z.string().url(),
  filePath: z.string().min(1),
  fileType: z.string(),
  fileSize: z.number(),
});

export const deleteAttachmentSchema = z.object({
  id: z.string(),
});
