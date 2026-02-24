import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { highlightFiltersSchema } from "@/server/schemas/workspace.schema";
import { highlightService } from "@/server/services/entry/highlight.service";

export const highlightRouter = createTRPCRouter({
  list: protectedProcedure
    .input(highlightFiltersSchema)
    .query(async ({ ctx, input }) => {
      return highlightService.listHighlights(
        ctx.db,
        ctx.session.user.id,
        input,
      );
    }),
});
