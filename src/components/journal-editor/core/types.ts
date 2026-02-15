// No imports needed currently

export interface JournalEditorProps {
  id?: string;
  initialType?: string;
}

export interface MentionNodeAttributes {
  id: string | null;
  label?: string | null;
}

export interface TrpcResponse<T> {
  result: {
    data: {
      json: T;
    };
  };
}

export interface SuggestionItem {
  id: string | null;
  label?: string | null;
  isNew?: boolean;
}
