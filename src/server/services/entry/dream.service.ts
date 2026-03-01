import type { PrismaClient } from "@prisma/client";
import { entryService } from "./entry.service";
import type { EntryWithRelations } from "@/server/types/entry.types";

/**
 * Dream Service
 * Handles dream-specific business logic
 */
export class DreamService {
  async listDreams(
    db: PrismaClient,
    userId: string,
    filters: {
      limit?: number;
      cursor?: string;
    },
  ): Promise<{
    entries: EntryWithRelations[];
    nextCursor?: string;
  }> {
    return entryService.list(db, userId, {
      limit: filters.limit ?? 20,
      cursor: filters.cursor,
      metadata: {},
    });
  }
}

export const dreamService = new DreamService();
