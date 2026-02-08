import type { EntryType } from "@prisma/client";
import type { EntryMetadata } from "./metadata.types";

export interface SharedEntry {
  id: string;
  type: EntryType;
  title: string | null;
  content: string | null;
  isStarred: boolean;
  metadata: EntryMetadata | null;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: string | null;
}

export interface Person {
  id: string;
  name: string;
}

export interface Attachment {
  id: string;
  fileUrl: string;
  fileType: string;
  thumbnailUrl: string | null;
}

export interface ComprehensiveEntry extends SharedEntry {
  tags: Tag[];
  people: Person[];
  attachments: Attachment[];
}

export type WorkspaceType = EntryType | "all";
