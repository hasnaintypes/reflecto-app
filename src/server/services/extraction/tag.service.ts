import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export class TagService {
  /**
   * List all tags for a user with entry counts
   */
  async listTags(db: PrismaClient, userId: string) {
    return db.tag.findMany({
      where: { userId },
      include: {
        _count: {
          select: { entries: true },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  /**
   * Update tag (e.g., color)
   */
  async updateTag(
    db: PrismaClient,
    userId: string,
    tagId: string,
    data: { name?: string; color?: string | null },
  ) {
    const tag = await db.tag.findFirst({
      where: { id: tagId, userId },
    });

    if (!tag) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tag not found",
      });
    }

    return db.tag.update({
      where: { id: tagId },
      data,
    });
  }

  /**
   * Delete tag if unused (or force)
   */
  async deleteTag(db: PrismaClient, userId: string, tagId: string) {
    const tag = await db.tag.findFirst({
      where: { id: tagId, userId },
    });

    if (!tag) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tag not found",
      });
    }

    return db.tag.delete({
      where: { id: tagId },
    });
  }

  /**
   * Search tags by name
   */
  async searchTags(db: PrismaClient, userId: string, query: string) {
    return db.tag.findMany({
      where: {
        userId,
        name: {
          contains: query.toLowerCase(),
          mode: "insensitive",
        },
      },
      take: 10,
      orderBy: { name: "asc" },
    });
  }
}

export const tagService = new TagService();
