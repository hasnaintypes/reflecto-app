import { Hash, MoreVertical, FolderPlus } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface TagItemProps {
  tag: {
    id: string;
    name: string;
    group: string | null;
    _count: { entries: number };
  };
  onEditGroup: (tag: any) => void;
}

export function TagItem({ tag, onEditGroup }: TagItemProps) {
  return (
    <div className="group/item border-border/10 hover:bg-muted/30 flex items-center justify-between border-b px-2 py-4 transition-all duration-200">
      <Link
        href={`/tags/${tag.name}`}
        className="flex flex-1 items-center gap-4 outline-none"
      >
        <div className="bg-[#60A5FA]/10 text-[#60A5FA] flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover/item:scale-110">
          <Hash size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-foreground text-[15px] font-medium leading-none">
            {tag.name}
          </span>
          <span className="text-muted-foreground/40 mt-1.5 text-[10px] font-bold tracking-[0.05em] uppercase">
            {tag._count.entries} {tag._count.entries === 1 ? "entry" : "entries"}
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-muted text-muted-foreground/40 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors outline-none">
              <MoreVertical size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border w-44 rounded-xl shadow-xl">
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer py-2.5"
              onClick={() => onEditGroup(tag)}
            >
              <FolderPlus size={14} className="opacity-60" />
              <span>Change Group</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
