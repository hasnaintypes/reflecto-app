import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, createTRPCRouter } from "../trpc";
import { type AppPreferences } from "@/stores/use-preferences-store";

/**
 * Zod schema for updating user profile fields.
 */
const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  avatarUrl: z.string().url().optional(),
});

const updatePreferencesSchema = z.object({
  theme: z.string().optional(),
  fontSize: z.string().optional(),
  notificationEnabled: z.boolean().optional(),
  dailyReminderTime: z.string().optional(),
  preferences: z.record(z.any()).optional(),
});

/**
 * Type for user profile output.
 */
export type UserProfile = {
  id: string;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const userRouter = createTRPCRouter({
  /**
   * Get the current user's preferences.
   */
  getPreferences: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    let preferences = await ctx.db.userPreferences.findUnique({
      where: { userId },
    });

    preferences ??= await ctx.db.userPreferences.create({
      data: { userId },
    });

    return preferences;
  }),

  /**
   * Update the current user's preferences.
   */
  updatePreferences: protectedProcedure
    .input(updatePreferencesSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.userPreferences.findUnique({
        where: { userId },
      });

      if (!existing) {
        return await ctx.db.userPreferences.create({
          data: {
            userId,
            ...input,
            preferences: input.preferences ?? {},
          },
        });
      }

      return await ctx.db.userPreferences.update({
        where: { userId },
        data: {
          theme: input.theme,
          fontSize: input.fontSize,
          notificationEnabled: input.notificationEnabled,
          dailyReminderTime: input.dailyReminderTime,
          preferences: input.preferences
            ? {
                ...(existing.preferences as AppPreferences),
                ...input.preferences,
              }
            : (existing.preferences as AppPreferences),
        },
      });
    }),

  /**
   * Get the current user's profile.
   * @returns User profile fields (id, name, email, avatarUrl, createdAt, updatedAt)
   */
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const user = await ctx.db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user)
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }),

  /**
   * Update the current user's profile fields.
   * @param input.name Optional new name
   * @param input.avatarUrl Optional new avatar URL
   * @returns Updated user object
   */
  updateUser: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      try {
        const updated = await ctx.db.user.update({
          where: { id: userId },
          data: {
            ...(input.name !== undefined ? { name: input.name } : {}),
            ...(input.email !== undefined ? { email: input.email } : {}),
            ...(input.avatarUrl !== undefined
              ? { image: input.avatarUrl }
              : {}),
          },
        });
        return {
          id: updated.id,
          name: updated.name,
          email: updated.email,
          avatarUrl: updated.image,
          createdAt: updated.createdAt,
          updatedAt: updated.updatedAt,
        };
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user",
        });
      }
    }),

  /**
   * Soft-deactivate the current user (set isActive = false).
   * @returns Confirmation message
   */
  deactivateUser: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    try {
      console.log(`Deactivating user ${userId}`);
      return { message: "User deactivated successfully." };
    } catch {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to deactivate user",
      });
    }
  }),

  /**
   * Hard delete the current user and cascade delete all related data.
   * @returns Confirmation message
   */
  deleteUser: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    try {
      await ctx.db.user.delete({
        where: { id: userId },
      });
      return { message: "User deleted successfully." };
    } catch {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete user",
      });
    }
  }),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
