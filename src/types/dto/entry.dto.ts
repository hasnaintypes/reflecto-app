import type { EntryWithRelations } from "@/server/types/entry.types";
import type { EntryType } from "@prisma/client";

import type { EntryMetadata } from "../metadata.types";

/**
 * Entry DTO for API responses
 * Strips sensitive data and ensures consistent structure
 */
export interface EntryDTO {
  id: string;
  type: EntryType;
  title: string | null;
  content: string | null;
  metadata: EntryMetadata;
  createdAt: string; // ISO string for frontend
  updatedAt: string;
  tags: TagDTO[];
  people: PersonDTO[];
  attachments: AttachmentDTO[];
}

export interface TagDTO {
  id: string;
  name: string;
  color: string | null;
  entryCount?: number;
}

export interface PersonDTO {
  id: string;
  name: string;
  entryCount?: number;
}

export interface AttachmentDTO {
  id: string;
  fileUrl: string;
  fileType: string;
  thumbnailUrl: string | null;
}

/**
 * Mapper functions
 */
export const mapEntryToDTO = (entry: EntryWithRelations): EntryDTO => ({
  id: entry.id,
  type: entry.type,
  title: entry.title,
  content: entry.content,
  metadata: entry.metadata ?? {},
  createdAt: entry.createdAt.toISOString(),
  updatedAt: entry.updatedAt.toISOString(),
  tags: entry.tags,
  people: entry.people,
  attachments: entry.attachments,
});
