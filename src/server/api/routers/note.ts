import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { noteFiltersSchema } from "@/server/schemas/workspace.schema";
import { noteService } from "@/server/services/entry/note.service";

export const noteRouter = createTRPCRouter({
  list: protectedProcedure
    .input(noteFiltersSchema)
    .query(async ({ ctx, input }) => {
      return noteService.listNotes(ctx.db, ctx.session.user.id, input);
    }),
});
