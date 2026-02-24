import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ideaFiltersSchema } from "@/server/schemas/workspace.schema";
import { ideaService } from "@/server/services/entry/idea.service";

export const ideaRouter = createTRPCRouter({
  list: protectedProcedure
    .input(ideaFiltersSchema)
    .query(async ({ ctx, input }) => {
      return ideaService.listIdeas(ctx.db, ctx.session.user.id, input);
    }),
});
