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
      atmosphere?: string;
      clarity?: string;
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
      metadata: {
        atmosphere: filters.atmosphere,
        clarity: filters.clarity,
      },
    });
  }
}

export const dreamService = new DreamService();
