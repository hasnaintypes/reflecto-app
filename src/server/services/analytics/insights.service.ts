import type { PrismaClient } from "@prisma/client";
import { activityService } from "./activity.service";
import { streakService } from "./streak.service";

export class InsightsService {
  /**
   * Aggregates various insights for the user dashboard
   */
  async getDashboardSummary(db: PrismaClient, userId: string) {
    const [streak, stats, recentActivity] = await Promise.all([
      streakService.getStreakInfo(db, userId),
      db.entry.groupBy({
        by: ["type"],
        where: { userId, deletedAt: null },
        _count: true,
      }),
      activityService.getHeatmapData(
        db,
        userId,
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        new Date(),
      ),
    ]);

    return {
      streak,
      stats,
      recentActivity,
    };
  }
}

export const insightsService = new InsightsService();
