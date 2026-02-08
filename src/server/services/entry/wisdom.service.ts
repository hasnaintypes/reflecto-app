import type { PrismaClient } from "@prisma/client";
import { entryService } from "./entry.service";
import type { EntryWithRelations } from "@/server/types/entry.types";

/**
 * Wisdom Service
 * Handles wisdom-specific business logic
 */
export class WisdomService {
  async listWisdom(
    db: PrismaClient,
    userId: string,
    filters: {
      wisdom_type?: string;
      author?: string;
      limit?: number;
      cursor?: string;
    },
  ): Promise<{
    entries: EntryWithRelations[];
    nextCursor?: string;
  }> {
    return entryService.list(db, userId, {
      type: "wisdom",
      limit: filters.limit ?? 20,
      cursor: filters.cursor,
      metadata: {
        wisdom_type: filters.wisdom_type,
        author: filters.author,
      },
    });
  }
}

export const wisdomService = new WisdomService();
