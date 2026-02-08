import type { EntryType } from "@prisma/client";
import type { ZodSchema } from "zod";
import {
  journalMetadataSchema,
  dreamMetadataSchema,
  highlightMetadataSchema,
  ideaMetadataSchema,
  wisdomMetadataSchema,
  noteMetadataSchema,
} from "../schemas/entry.schema";
import { TRPCError } from "@trpc/server";

import type { EntryMetadata } from "@/types/metadata.types";

/**
 * Validates metadata based on entry type
 */
export const validateMetadata = (
  type: EntryType,
  metadata: unknown,
): EntryMetadata => {
  if (!metadata) return {};

  let schema: ZodSchema;
  switch (type) {
    case "journal":
      schema = journalMetadataSchema;
      break;
    case "dream":
      schema = dreamMetadataSchema;
      break;
    case "highlight":
      schema = highlightMetadataSchema;
      break;
    case "idea":
      schema = ideaMetadataSchema;
      break;
    case "wisdom":
      schema = wisdomMetadataSchema;
      break;
    case "note":
      schema = noteMetadataSchema;
      break;
    default:
      return metadata as EntryMetadata;
  }

  const result = schema.safeParse(metadata);
  if (!result.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Invalid metadata for type ${type}`,
      cause: result.error,
    });
  }

  return result.data as EntryMetadata;
};
