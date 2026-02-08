import type { EntryMetadata } from "./metadata.types";
import type { EntryType } from "@prisma/client";

/**
 * Entry with relations
 */
export type EntryWithRelations = {
  id: string;
  userId: string;
  type: EntryType;
  title: string | null;
  content: string | null;
  isStarred: boolean;
  metadata: EntryMetadata | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  tags: Array<{
    id: string;
    name: string;
    color: string | null;
  }>;
  people: Array<{
    id: string;
    name: string;
  }>;
  attachments: Array<{
    id: string;
    fileUrl: string;
    fileType: string;
    thumbnailUrl: string | null;
  }>;
};

/**
 * Entry list filters
 */
export type EntryFilters = {
  isStarred?: boolean;
  type?: EntryType;
  search?: string;
  tagIds?: string[];
  personIds?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  limit?: number;
  cursor?: string;
};

/**
 * Extracted mentions
 */
export type ExtractedMentions = {
  tags: string[];
  people: string[];
};
