import { TagItem } from "./tag-item";
import { Loader2, Layers } from "lucide-react";
import { type SharedTag } from "@/types/tag.types";

interface GroupListProps {
  tagsByGroup: Record<string, SharedTag[]>;
  sortedGroups: string[];
  isLoading: boolean;
  onEditName: (tag: SharedTag) => void;
  onDelete: (tag: SharedTag) => void;
}

export function GroupList({
  tagsByGroup,
  sortedGroups,
  isLoading,
  onEditName,
  onDelete,
}: GroupListProps) {
  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (sortedGroups.length === 0) {
    return (
      <div className="text-muted-foreground space-y-4 py-20 text-center">
        <div className="bg-muted/30 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <Layers size={32} className="opacity-20" />
        </div>
        <p className="text-lg">You didn&apos;t create any groups yet.</p>
        <p className="text-sm opacity-60">
          Group your tags for better organization.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {sortedGroups.map((group) => (
        <div key={group} className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-foreground font-serif text-xl font-medium italic">
              {group}
            </h2>
            <div className="bg-border/40 h-[1px] flex-1" />
            <span className="text-muted-foreground/40 font-mono text-[10px] tracking-wider uppercase">
              {tagsByGroup[group]!.length}{" "}
              {tagsByGroup[group]!.length === 1 ? "tag" : "tags"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {tagsByGroup[group]!.map((tag) => (
              <TagItem
                key={tag.id}
                tag={tag}
                onEditName={onEditName}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
