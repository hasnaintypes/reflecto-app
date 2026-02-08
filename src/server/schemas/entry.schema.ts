import { z } from "zod";

/**
 * Entry type enum schema
 */
export const entryTypeSchema = z.enum([
  "journal",
  "dream",
  "highlight",
  "idea",
  "wisdom",
  "note",
]);

/**
 * Base metadata schemas for each entry type
 */
export const journalMetadataSchema = z
  .object({
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    mood: z.number().min(1).max(5).optional(),
  })
  .optional();

export const dreamMetadataSchema = z
  .object({
    atmosphere: z.string().optional(),
    clarity: z.string().optional(),
  })
  .optional();

export const highlightMetadataSchema = z
  .object({
    linked_entry_id: z.string().optional(),
    importance: z.enum(["high", "medium", "low"]).optional(),
  })
  .optional();

export const ideaMetadataSchema = z
  .object({
    status: z.string().optional(),
  })
  .optional();

export const wisdomMetadataSchema = z
  .object({
    wisdom_type: z
      .enum(["quote", "thought", "fact", "excerpt", "lesson"])
      .optional(),
    author: z.string().optional(),
    source: z.string().optional(),
  })
  .optional();

export const noteMetadataSchema = z
  .object({
    is_pinned: z.boolean().optional(),
    color: z.string().optional(),
  })
  .optional();

/**
 * Create entry input schema
 */
export const createEntrySchema = z.object({
  type: entryTypeSchema,
  title: z.string().max(200).optional(),
  content: z.string().max(50000).optional(),
  isStarred: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Update entry input schema
 */
export const updateEntrySchema = z.object({
  title: z.string().max(200).optional(),
  content: z.string().max(50000).optional(),
  isStarred: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * List entries input schema
 */
export const listEntriesSchema = z.object({
  isStarred: z.boolean().optional(),
  type: entryTypeSchema.optional(),
  limit: z.number().min(1).max(1000).default(20),
  cursor: z.string().optional(),
  search: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  personIds: z.array(z.string()).optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Get entry by ID schema
 */
export const getEntrySchema = z.object({
  id: z.string(),
});

/**
 * Delete entry schema
 */
export const deleteEntrySchema = z.object({
  id: z.string(),
});

/**
 * Type exports
 */
export type CreateEntryInput = z.infer<typeof createEntrySchema>;
export type UpdateEntryInput = z.infer<typeof updateEntrySchema>;
export type ListEntriesInput = z.infer<typeof listEntriesSchema>;
export type GetEntryInput = z.infer<typeof getEntrySchema>;
export type DeleteEntryInput = z.infer<typeof deleteEntrySchema>;
