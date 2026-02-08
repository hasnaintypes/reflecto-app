import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { wisdomFiltersSchema } from "@/server/schemas/workspace.schema";
import { wisdomService } from "@/server/services/entry/wisdom.service";

export const wisdomRouter = createTRPCRouter({
  list: protectedProcedure
    .input(wisdomFiltersSchema)
    .query(async ({ ctx, input }) => {
      return wisdomService.listWisdom(ctx.db, ctx.session.user.id!, input);
    }),
});
