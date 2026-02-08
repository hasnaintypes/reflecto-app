import type { Prisma, PrismaClient, EntryType } from "@prisma/client";

type DbClient = Prisma.TransactionClient | PrismaClient;

export class ActivityService {
  /**
   * Log an activity for today
   */
  async logActivity(db: DbClient, userId: string, entryType: EntryType) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get current activity log for today
    const current = await db.activityLog.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    if (current) {
      // Update existing log
      const entryTypes = (current.entryTypes as Record<string, number>) ?? {};
      entryTypes[entryType] = (entryTypes[entryType] ?? 0) + 1;

      return db.activityLog.update({
        where: { id: current.id },
        data: {
          entryCount: { increment: 1 },
          entryTypes,
        },
      });
    } else {
      // Create new log for today
      return db.activityLog.create({
        data: {
          userId,
          date: today,
          entryCount: 1,
          entryTypes: { [entryType]: 1 },
        },
      });
    }
  }

  /**
   * Get activity logs for a date range (for heatmap)
   */
  async getHeatmapData(db: DbClient, userId: string, from: Date, to: Date) {
    return db.activityLog.findMany({
      where: {
        userId,
        date: {
          gte: from,
          lte: to,
        },
      },
      orderBy: { date: "asc" },
    });
  }
}

export const activityService = new ActivityService();
