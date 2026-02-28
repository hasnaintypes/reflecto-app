import { TagItem } from "./tag-item";
import { Loader2 } from "lucide-react";

interface TagListProps {
  tags: any[] | undefined;
  isLoading: boolean;
  onEditGroup: (tag: any) => void;
}

export function TagList({ tags, isLoading, onEditGroup }: TagListProps) {
  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!tags || tags.length === 0) {
    return (
      <div className="text-muted-foreground py-20 text-center">
        <p className="text-lg">No tags found yet.</p>
        <p className="text-sm opacity-60">Try tagging an entry with #tag.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} onEditGroup={onEditGroup} />
      ))}
    </div>
  );
}
