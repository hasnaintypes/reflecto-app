import type { PrismaClient } from "@prisma/client";
import { entryService } from "./entry.service";
import type { EntryWithRelations } from "@/server/types/entry.types";

/**
 * Note Service
 * Handles note-specific business logic
 */
export class NoteService {
  async listNotes(
    db: PrismaClient,
    userId: string,
    filters: {
      is_pinned?: boolean;
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
        is_pinned: filters.is_pinned,
      },
    });
  }
}

export const noteService = new NoteService();
