import type { PrismaClient } from "@prisma/client";
import { entryService } from "./entry.service";
import type { EntryWithRelations } from "@/server/types/entry.types";

/**
 * Highlight Service
 * Handles highlight-specific business logic
 */
export class HighlightService {
  async listHighlights(
    db: PrismaClient,
    userId: string,
    filters: {
      importance?: "high" | "medium" | "low";
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
        importance: filters.importance,
      },
    });
  }
}

export const highlightService = new HighlightService();
