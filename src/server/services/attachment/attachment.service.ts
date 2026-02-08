import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { storageService } from "./storage.service";

export class AttachmentService {
  /**
   * Register a new attachment in the database
   */
  async createAttachment(
    db: PrismaClient,
    userId: string,
    data: {
      entryId: string;
      fileUrl: string;
      fileType: string;
      fileSize: number;
      thumbnailUrl?: string;
    },
  ) {
    // Verify entry ownership
    const entry = await db.entry.findFirst({
      where: { id: data.entryId, userId },
    });

    if (!entry) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Entry not found",
      });
    }

    return db.attachment.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  /**
   * Delete an attachment and its file from storage
   */
  async deleteAttachment(
    db: PrismaClient,
    userId: string,
    attachmentId: string,
  ) {
    const attachment = await db.attachment.findFirst({
      where: { id: attachmentId, userId },
    });

    if (!attachment) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Attachment not found",
      });
    }

    // 1. Delete from storage
    await storageService.deleteFile(attachment.fileUrl).catch((err) => {
      console.error("Failed to delete file from storage:", err);
    });

    // 2. Delete from database
    return db.attachment.delete({
      where: { id: attachmentId },
    });
  }

  /**
   * List attachments for an entry
   */
  async listByEntry(db: PrismaClient, userId: string, entryId: string) {
    return db.attachment.findMany({
      where: { entryId, userId },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const attachmentService = new AttachmentService();
