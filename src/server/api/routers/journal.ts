import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { journalFiltersSchema } from "@/server/schemas/workspace.schema";
import { journalService } from "@/server/services/entry/journal.service";

export const journalRouter = createTRPCRouter({
  list: protectedProcedure
    .input(journalFiltersSchema)
    .query(async ({ ctx, input }) => {
      return journalService.listJournal(ctx.db, ctx.session.user.id!, input);
    }),
});
