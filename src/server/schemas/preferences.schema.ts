import { z } from "zod";

export const updatePreferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).optional(),
  language: z.string().optional(),
  fontSize: z.enum(["small", "medium", "large"]).optional(),
  fontFamily: z.string().optional(),
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  reminderTime: z.string().nullable().optional(), // HH:mm format
  weeklyDigest: z.boolean().optional(),
});
