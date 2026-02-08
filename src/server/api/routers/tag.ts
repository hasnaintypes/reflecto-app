import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { tagService } from "@/server/services/extraction/tag.service";
import {
  updateTagSchema,
  deleteTagSchema,
} from "@/server/schemas/organization.schema";

export const tagRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return tagService.listTags(ctx.db, ctx.session.user.id!);
  }),

  update: protectedProcedure
    .input(updateTagSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return tagService.updateTag(ctx.db, ctx.session.user.id!, id, data);
    }),

  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      return tagService.searchTags(ctx.db, ctx.session.user.id!, input.query);
    }),

  delete: protectedProcedure
    .input(deleteTagSchema)
    .mutation(async ({ ctx, input }) => {
      return tagService.deleteTag(ctx.db, ctx.session.user.id!, input.id);
    }),
});
