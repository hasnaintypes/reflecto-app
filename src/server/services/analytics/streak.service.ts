import type { Prisma, PrismaClient } from "@prisma/client";

type DbClient = Prisma.TransactionClient | PrismaClient;

export class StreakService {
  /**
   * Get streak info for a user
   */
  async getStreakInfo(db: DbClient, userId: string) {
    const streak = await db.streak.findFirst({
      where: { userId, isActive: true },
      orderBy: { createdAt: "desc" },
    });

    if (!streak) {
      return {
        currentStreak: 0,
        longestStreak: 0,
      };
    }

    // Calculate total length from all streaks or just return max length?
    // The schema has length: Int.
    const allStreaks = await db.streak.findMany({
      where: { userId },
    });

    const longest = Math.max(...allStreaks.map((s) => s.length), 0);

    return {
      currentStreak: streak.isActive ? streak.length : 0,
      longestStreak: longest,
    };
  }

  /**
   * Update streak info after an entry is created
   */
  async updateStreak(db: DbClient, userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Find the most recent active streak
    const activeStreak = await db.streak.findFirst({
      where: { userId, isActive: true },
      orderBy: { startDate: "desc" },
    });

    if (!activeStreak) {
      // Create new streak
      return db.streak.create({
        data: {
          userId,
          startDate: today,
          endDate: today,
          length: 1,
          isActive: true,
        },
      });
    }

    const lastDate = activeStreak.endDate ?? activeStreak.startDate;
    lastDate.setHours(0, 0, 0, 0);

    if (lastDate.getTime() === today.getTime()) {
      // Already posted today, no change
      return activeStreak;
    }

    if (lastDate.getTime() === yesterday.getTime()) {
      // Consecutive day! Extend streak
      return db.streak.update({
        where: { id: activeStreak.id },
        data: {
          endDate: today,
          length: activeStreak.length + 1,
        },
      });
    } else {
      // Streak broken. Deactivate old one, start new one
      await db.streak.update({
        where: { id: activeStreak.id },
        data: { isActive: false },
      });

      return db.streak.create({
        data: {
          userId,
          startDate: today,
          endDate: today,
          length: 1,
          isActive: true,
        },
      });
    }
  }
}

export const streakService = new StreakService();
