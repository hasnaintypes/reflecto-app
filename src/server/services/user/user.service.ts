import type { Prisma, PrismaClient } from "@prisma/client";

export class UserService {
  /**
   * Get user preferences
   */
  async getPreferences(db: PrismaClient, userId: string) {
    let preferences = await db.userPreferences.findUnique({
      where: { userId },
    });

    preferences ??= await db.userPreferences.create({
      data: {
        userId,
        theme: "system",
        fontSize: "medium",
      },
    });

    return preferences;
  }

  /**
   * Update user preferences
   */
  async updatePreferences(
    db: PrismaClient,
    userId: string,
    data: Prisma.UserPreferencesUpdateInput,
  ) {
    return db.userPreferences.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        theme: "system",
        fontSize: "medium",
        ...data,
      } as Prisma.UserPreferencesCreateInput,
    });
  }
}

export const userService = new UserService();
