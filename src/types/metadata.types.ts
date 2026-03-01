/**
 * Entry metadata types for different entry types
 */

// Journal metadata
export type JournalMetadata = {
  category?:
    | "THOUGHTS"
    | "INVOLVED ME"
    | "AROUND ME"
    | "MEMORIES"
    | "GRATITUDE"
    | "REFLECTIONS"
    | "TINY WINS"
    | "DAILY LOG"
    | "VENTING"
    | (string & {});
  tags?: string[];
  mood?: number; // 1-5
  bullets?: number;
};

// Dream metadata
export type DreamMetadata = {
  bullets?: number;
};

// Highlight metadata
export type HighlightMetadata = {
  linked_entry_id?: string;
  importance?: "high" | "medium" | "low";
  bullets?: number;
};

// Idea metadata
export type IdeaMetadata = {
  status?: "Contemplating" | "Seed" | "Reflecting" | "Draft" | (string & {});
  bullets?: number;
};

// Wisdom metadata
export type WisdomMetadata = {
  wisdom_type?: "quote" | "thought" | "fact" | "excerpt" | "lesson";
  author?: string;
  source?: string;
  bullets?: number;
};

// Note metadata
export type NoteMetadata = {
  is_pinned?: boolean;
  color?: string;
  bullets?: number;
};

/**
 * Union type for all metadata
 */
export type EntryMetadata =
  | JournalMetadata
  | DreamMetadata
  | HighlightMetadata
  | IdeaMetadata
  | WisdomMetadata
  | NoteMetadata;
