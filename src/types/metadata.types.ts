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
  atmosphere?: string;
  clarity?: string;
};

// Highlight metadata
export type HighlightMetadata = {
  linked_entry_id?: string;
  importance?: "high" | "medium" | "low";
};

// Idea metadata
export type IdeaMetadata = {
  status?: "Contemplating" | "Seed" | "Reflecting" | "Draft" | (string & {});
};

// Wisdom metadata
export type WisdomMetadata = {
  wisdom_type?: "quote" | "thought" | "fact" | "excerpt" | "lesson";
  author?: string;
  source?: string;
};

// Note metadata
export type NoteMetadata = {
  is_pinned?: boolean;
  color?: string;
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
