import type { PrismaClient } from "@prisma/client";
import { entryService } from "./entry.service";
import type { EntryWithRelations } from "@/server/types/entry.types";

/**
 * Journal Service
 * Handles journal-specific business logic
 */
export class JournalService {
  /**
   * List journal entries Grouped by date or with specific category filters
   */
  async listJournal(
    db: PrismaClient,
    userId: string,
    filters: {
      category?: string;
      mood?: number;
      limit?: number;
      cursor?: string;
    },
  ): Promise<{
    entries: EntryWithRelations[];
    nextCursor?: string;
  }> {
    return entryService.list(db, userId, {
      type: "journal",
      limit: filters.limit ?? 20,
      cursor: filters.cursor,
      metadata: {
        category: filters.category,
        mood: filters.mood,
      },
    });
  }

  /**
   * Specific logic for journal entries can go here
   * (e.g., mood aggregation, category stats)
   */
}

export const journalService = new JournalService();
