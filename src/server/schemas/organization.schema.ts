import { z } from "zod";

export const updateTagSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  color: z.string().nullable().optional(),
  group: z.string().nullable().optional(),
});

export const deleteTagSchema = z.object({
  id: z.string(),
});

export const updatePersonSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  group: z.string().nullable().optional(),
});

export const deletePersonSchema = z.object({
  id: z.string(),
});
