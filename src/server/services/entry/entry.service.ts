import type { PrismaClient, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import type {
  CreateEntryInput,
  UpdateEntryInput,
  ListEntriesInput,
} from "@/server/schemas/entry.schema";
import type { EntryWithRelations } from "@/server/types/entry.types";
import { tagExtractor } from "../extraction/tag-extractor";
import { personExtractor } from "../extraction/person-extractor";
import { activityService } from "../analytics/activity.service";
import { streakService } from "../analytics/streak.service";
import { validateMetadata } from "../../utils/metadata-validator";
import { handleServiceError } from "../../utils/error-handler";

/**
 * Entry Service
 * Handles all business logic for entry CRUD operations
 */
export class EntryService {
  /**
   * Create a new entry with automatic tag and people extraction
   */
  async create(
    db: PrismaClient,
    userId: string,
    input: CreateEntryInput,
  ): Promise<EntryWithRelations> {
    try {
      // 0. For journal entries, check if one already exists for the targeted date
      if (input.type === "journal") {
        const targetDate = input.createdAt
          ? new Date(input.createdAt)
          : new Date();
        targetDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const existingJournal = await db.entry.findFirst({
          where: {
            userId,
            type: "journal",
            deletedAt: null,
            createdAt: {
              gte: targetDate,
              lt: nextDay,
            },
          },
          include: {
            tags: {
              select: { id: true, name: true },
            },
            people: {
              select: { id: true, name: true },
            },
            attachments: {
              select: {
                id: true,
                fileUrl: true,
                fileType: true,
                thumbnailUrl: true,
              },
            },
          },
        });

        if (existingJournal) {
          return existingJournal as EntryWithRelations;
        }
      }

      // 1. Validate metadata
      const validatedMetadata = validateMetadata(input.type, input.metadata);

      // Create entry in transaction
      const entry = await db.$transaction(async (tx) => {
        // 1. Extract tags and people names/ids first
        let tags: { id: string; name: string }[] = [];
        let people: { id: string; name: string }[] = [];
        
        try {
          tags = await tagExtractor.syncTags(
            tx,
            userId,
            input.content ?? null,
          );
          people = await personExtractor.syncPeople(
            tx,
            userId,
            input.content ?? null,
          );
        } catch (err) {
          throw new Error(`Sync Extraction Error: ${err instanceof Error ? err.message : String(err)}`);
        }

        // 2. Prepare metadata with tags if journal
        const baseMetadata =
          input.type === "journal"
            ? { category: "General", mood: 0, ...validatedMetadata }
            : (validatedMetadata as Prisma.InputJsonObject);

        // 2.5 Prepare final metadata
        const finalMetadata: Prisma.InputJsonValue =
          input.type === "journal"
            ? ({
                ...baseMetadata,
                tags: tags.map((t) => t.name),
              } as Prisma.InputJsonValue)
            : ({
                ...(baseMetadata as Record<string, unknown>),
              } as Prisma.InputJsonValue);

        // 3. Create the entry with all relations in ONE go
        let newEntry;
        try {
          newEntry = await tx.entry.create({
            data: {
              userId,
              type: input.type,
              title: input.title,
              content: input.content,
              isStarred: input.isStarred,
              editorMode: input.editorMode,
              metadata: finalMetadata,
              createdAt: input.createdAt ?? undefined,
              tags: {
                connect: tags.map((t) => ({ id: t.id })),
              },
              people: {
                connect: people.map((p) => ({ id: p.id })),
              },
            },
          });
        } catch (err) {
          throw new Error(`Entry DB Creation Error: ${err instanceof Error ? err.message : String(err)}`);
        }

        // 4. Update activity log and streak
        try {
          await activityService.logActivity(tx, userId, input.type);
        } catch (err) {
          throw new Error(`Activity Logging Error: ${err instanceof Error ? err.message : String(err)}`);
        }

        try {
          await streakService.updateStreak(tx, userId);
        } catch (err) {
          throw new Error(`Streak Update Error: ${err instanceof Error ? err.message : String(err)}`);
        }

        // 5. Return entry with relations
        try {
          return await tx.entry.findUniqueOrThrow({
            where: { id: newEntry.id },
            include: {
              tags: {
                select: { id: true, name: true },
              },
              people: {
                select: { id: true, name: true },
              },
              attachments: {
                select: {
                  id: true,
                  fileUrl: true,
                  fileType: true,
                  thumbnailUrl: true,
                },
              },
            },
          });
        } catch (err) {
          throw new Error(`Final Fetch Error: ${err instanceof Error ? err.message : String(err)}`);
        }
      });

      return entry as EntryWithRelations;
    } catch (error) {
      if (error instanceof Error && error.message.includes(":")) {
        throw handleServiceError(error, error.message);
      }
      throw handleServiceError(error as Error, "Failed to create entry");
    }
  }

  /**
   * Get entry by ID
   */
  async getById(
    db: PrismaClient,
    userId: string,
    entryId: string,
  ): Promise<EntryWithRelations> {
    const entry = await db.entry.findFirst({
      where: {
        id: entryId,
        userId,
        deletedAt: null,
      },
      include: {
        tags: {
          select: { id: true, name: true },
        },
        people: {
          select: { id: true, name: true },
        },
        attachments: {
          select: {
            id: true,
            fileUrl: true,
            fileType: true,
            thumbnailUrl: true,
          },
        },
      },
    });

    if (!entry) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Entry not found",
      });
    }

    return entry as EntryWithRelations;
  }

  /**
   * List entries with filters and pagination
   */
  async list(
    db: PrismaClient,
    userId: string,
    filters: ListEntriesInput,
  ): Promise<{
    entries: EntryWithRelations[];
    nextCursor?: string;
  }> {
    const {
      type,
      search,
      tagIds,
      personIds,
      dateFrom,
      dateTo,
      limit = 20,
      cursor,
    } = filters;

    const where: Prisma.EntryWhereInput = {
      userId,
      deletedAt: null,
    };

    if (filters.isStarred !== undefined) {
      where.isStarred = filters.isStarred;
    }

    if (type) {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    if (tagIds && tagIds.length > 0) {
      where.tags = {
        some: {
          id: { in: tagIds },
        },
      };
    }

    if (personIds && personIds.length > 0) {
      where.people = {
        some: {
          id: { in: personIds },
        },
      };
    }

    if (dateFrom ?? dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = dateFrom;
      if (dateTo) where.createdAt.lte = dateTo;
    }

    // Query with cursor pagination
    const entries = await db.entry.findMany({
      where,
      take: limit + 1, // Take one extra to determine if there are more
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: { createdAt: "desc" },
      include: {
        tags: {
          select: { id: true, name: true },
        },
        people: {
          select: { id: true, name: true },
        },
        attachments: {
          select: {
            id: true,
            fileUrl: true,
            fileType: true,
            thumbnailUrl: true,
          },
        },
      },
    });

    let nextCursor: string | undefined = undefined;
    if (entries.length > limit) {
      const nextItem = entries.pop()!;
      nextCursor = nextItem.id;
    }

    return {
      entries: entries as EntryWithRelations[],
      nextCursor,
    };
  }

  /**
   * Update an entry
   */
  async update(
    db: PrismaClient,
    userId: string,
    entryId: string,
    input: UpdateEntryInput,
  ): Promise<EntryWithRelations> {
    // Verify ownership
    const existing = await db.entry.findFirst({
      where: { id: entryId, userId, deletedAt: null },
    });

    if (!existing) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Entry not found",
      });
    }

    // Update in transaction with increased timeout
    const entry = await db.$transaction(
      async (tx) => {
        // 1. Prepare data for single update
        const data: Prisma.EntryUpdateInput = {
          title: input.title ?? existing.title,
          content: input.content ?? existing.content,
          isStarred: input.isStarred ?? existing.isStarred,
          editorMode: input.editorMode ?? existing.editorMode,
        };

        // 2. Re-sync tags/people and update metadata if content changed
        if (input.content !== undefined) {
          const tags = await tagExtractor.syncTags(tx, userId, input.content);
          const people = await personExtractor.syncPeople(
            tx,
            userId,
            input.content,
          );

          data.tags = {
            set: tags.map((t) => ({ id: t.id })),
          };
          data.people = {
            set: people.map((p) => ({ id: p.id })),
          };

          // 3. Metadata Merge
          const existingMetadata =
            (existing.metadata as Record<string, unknown>) ?? {};
          const inputMetadata = input.metadata ?? {};

          data.metadata = {
            ...existingMetadata,
            ...inputMetadata,
            tags: tags.map((t) => t.name),
          } as Prisma.InputJsonValue;
        } else if (input.metadata !== undefined) {
          // If content didn't change but metadata did
          const existingMetadata =
            (existing.metadata as Record<string, unknown>) ?? {};
          data.metadata = {
            ...existingMetadata,
            ...input.metadata,
          } as Prisma.InputJsonValue;
        }

        // 3. Perform update with include to get relations
        return tx.entry.update({
          where: { id: entryId },
          data,
          include: {
            tags: {
              select: { id: true, name: true },
            },
            people: {
              select: { id: true, name: true },
            },
            attachments: {
              select: {
                id: true,
                fileUrl: true,
                fileType: true,
                thumbnailUrl: true,
              },
            },
          },
        });
      },
      {
        timeout: 10000, // Increase timeout to 10 seconds
      },
    );

    return entry as EntryWithRelations;
  }

  /**
   * Soft delete an entry
   */
  async delete(
    db: PrismaClient,
    userId: string,
    entryId: string,
  ): Promise<{ success: boolean }> {
    // Verify ownership
    const existing = await db.entry.findFirst({
      where: { id: entryId, userId, deletedAt: null },
    });

    if (!existing) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Entry not found",
      });
    }

    // Soft delete
    await db.entry.update({
      where: { id: entryId },
      data: {
        deletedAt: new Date(),
      },
    });

    return { success: true };
  }
}

export const entryService = new EntryService();
