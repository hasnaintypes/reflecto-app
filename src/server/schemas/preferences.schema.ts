import { z } from "zod";

export const updatePreferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).optional(),
  language: z.enum(["en", "es", "fr", "de", "pt", "ja", "ko", "zh"]).optional(),
  fontSize: z.enum(["small", "medium", "large"]).optional(),
  fontFamily: z.enum(["sans-serif", "serif", "monospace", "system-ui"]).optional(),
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  reminderTime: z.string().nullable().optional(), // HH:mm format
  weeklyDigest: z.boolean().optional(),
});
