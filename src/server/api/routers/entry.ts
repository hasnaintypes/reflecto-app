import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createEntrySchema,
  updateEntrySchema,
  listEntriesSchema,
  getEntrySchema,
  deleteEntrySchema,
} from "@/server/schemas/entry.schema";
import { entryService } from "@/server/services/entry/entry.service";

/**
 * Entry Router
 * Handles all entry-related tRPC procedures
 */
export const entryRouter = createTRPCRouter({
  /**
   * Create a new entry
   */
  create: protectedProcedure
    .input(createEntrySchema)
    .mutation(async ({ ctx, input }) => {
      return entryService.create(ctx.db, ctx.session.user.id, input);
    }),

  /**
   * Get entry by ID
   */
  getById: protectedProcedure
    .input(getEntrySchema)
    .query(async ({ ctx, input }) => {
      return entryService.getById(ctx.db, ctx.session.user.id, input.id);
    }),

  /**
   * List entries with filters and pagination
   */
  list: protectedProcedure
    .input(listEntriesSchema)
    .query(async ({ ctx, input }) => {
      return entryService.list(ctx.db, ctx.session.user.id, input);
    }),

  /**
   * Update an entry
   */
  update: protectedProcedure
    .input(
      getEntrySchema.merge(updateEntrySchema), // { id, ...updateFields }
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      return entryService.update(ctx.db, ctx.session.user.id, id, updateData);
    }),

  /**
   * Soft delete an entry
   */
  delete: protectedProcedure
    .input(deleteEntrySchema)
    .mutation(async ({ ctx, input }) => {
      return entryService.delete(ctx.db, ctx.session.user.id, input.id);
    }),
  /**
   * Count entries with filters
   */
  count: protectedProcedure
    .input(listEntriesSchema)
    .query(async ({ ctx, input }) => {
      return entryService.count(ctx.db, ctx.session.user.id, input);
    }),

  /**
   * Get insights stats (server-side aggregation)
   */
  getInsightsStats: protectedProcedure
    .query(async ({ ctx }) => {
      return entryService.getInsightsStats(ctx.db, ctx.session.user.id);
    }),

  /**
   * Get a random old entry for memory lane
   */
  getRandomOldEntry: protectedProcedure
    .query(async ({ ctx }) => {
      return entryService.getRandomOldEntry(ctx.db, ctx.session.user.id);
    }),
});
