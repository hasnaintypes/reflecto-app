import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { dreamFiltersSchema } from "@/server/schemas/workspace.schema";
import { dreamService } from "@/server/services/entry/dream.service";

export const dreamRouter = createTRPCRouter({
  list: protectedProcedure
    .input(dreamFiltersSchema)
    .query(async ({ ctx, input }) => {
      return dreamService.listDreams(ctx.db, ctx.session.user.id!, input);
    }),
});
