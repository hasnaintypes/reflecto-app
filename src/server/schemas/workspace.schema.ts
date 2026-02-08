import { z } from "zod";

/**
 * Journal specific schemas
 */
export const journalFiltersSchema = z.object({
  category: z.string().optional(),
  mood: z.number().min(1).max(5).optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

/**
 * Dream specific schemas
 */
export const dreamFiltersSchema = z.object({
  atmosphere: z.string().optional(),
  clarity: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

/**
 * Highlight specific schemas
 */
export const highlightFiltersSchema = z.object({
  importance: z.enum(["high", "medium", "low"]).optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

/**
 * Idea specific schemas
 */
export const ideaFiltersSchema = z.object({
  status: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

/**
 * Wisdom specific schemas
 */
export const wisdomFiltersSchema = z.object({
  wisdom_type: z
    .enum(["quote", "thought", "fact", "excerpt", "lesson"])
    .optional(),
  author: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

/**
 * Note specific schemas
 */
export const noteFiltersSchema = z.object({
  is_pinned: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
});
