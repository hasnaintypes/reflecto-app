import type { PrismaClient } from "@prisma/client";
import { entryService } from "./entry.service";
import type { EntryWithRelations } from "@/server/types/entry.types";

/**
 * Idea Service
 * Handles idea-specific business logic
 */
export class IdeaService {
  async listIdeas(
    db: PrismaClient,
    userId: string,
    filters: {
      status?: string;
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
        status: filters.status,
      },
    });
  }
}

export const ideaService = new IdeaService();
