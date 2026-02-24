import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { updatePreferencesSchema } from "@/server/schemas/preferences.schema";
import { userService } from "@/server/services/user/user.service";

export const preferencesRouter = createTRPCRouter({
  /**
   * Get current user's preferences
   */
  get: protectedProcedure.query(async ({ ctx }) => {
    return userService.getPreferences(ctx.db, ctx.session.user.id);
  }),

  /**
   * Update current user's preferences
   */
  update: protectedProcedure
    .input(updatePreferencesSchema)
    .mutation(async ({ ctx, input }) => {
      return userService.updatePreferences(ctx.db, ctx.session.user.id, input);
    }),
});
