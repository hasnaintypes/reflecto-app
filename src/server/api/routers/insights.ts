import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { activityService } from "@/server/services/analytics/activity.service";
import { streakService } from "@/server/services/analytics/streak.service";

export const insightsRouter = createTRPCRouter({
  /**
   * Get heatmap data for the last year
   */
  getHeatmap: protectedProcedure
    .input(
      z.object({
        from: z.date().optional(),
        to: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const to = input.to ?? new Date();
      const from =
        input.from ??
        new Date(new Date().setFullYear(new Date().getFullYear() - 1));

      return activityService.getHeatmapData(
        ctx.db,
        ctx.session.user.id,
        from,
        to,
      );
    }),

  /**
   * Get current and longest streak
   */
  getStreak: protectedProcedure.query(async ({ ctx }) => {
    return streakService.getStreakInfo(ctx.db, ctx.session.user.id);
  }),

  /**
   * Get entry stats (count by type)
   */
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const stats = await ctx.db.entry.groupBy({
      by: ["type"],
      where: { userId: ctx.session.user.id, deletedAt: null },
      _count: true,
    });
    return stats;
  }),
});
