import type { Prisma, PrismaClient, EntryType } from "@prisma/client";

type DbClient = Prisma.TransactionClient | PrismaClient;

export class ActivityService {
  /**
   * Log an activity for today
   */
  async logActivity(db: DbClient, userId: string, entryType: EntryType) {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    try {
      // Try to update existing log first
      const current = await db.activityLog.findUnique({
        where: { userId_date: { userId, date: today } },
      });

      if (current) {
        const entryTypes = (current.entryTypes as Record<string, number>) ?? {};
        entryTypes[entryType] = (entryTypes[entryType] ?? 0) + 1;
        return db.activityLog.update({
          where: { id: current.id },
          data: { entryCount: { increment: 1 }, entryTypes },
        });
      } else {
        return db.activityLog.create({
          data: { userId, date: today, entryCount: 1, entryTypes: { [entryType]: 1 } },
        });
      }
    } catch {
      // On unique constraint violation, retry as update
      const existing = await db.activityLog.findUnique({
        where: { userId_date: { userId, date: today } },
      });
      if (existing) {
        const entryTypes = (existing.entryTypes as Record<string, number>) ?? {};
        entryTypes[entryType] = (entryTypes[entryType] ?? 0) + 1;
        return db.activityLog.update({
          where: { id: existing.id },
          data: { entryCount: { increment: 1 }, entryTypes },
        });
      }
      throw new Error("Failed to log activity");
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
