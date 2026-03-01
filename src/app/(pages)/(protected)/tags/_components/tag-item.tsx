import { Hash, MoreVertical, Pencil } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { type SharedTag } from "@/types/tag.types";

interface TagItemProps {
  tag: SharedTag;
  onEditName: (tag: SharedTag) => void;
  onDelete: (tag: SharedTag) => void;
}

export function TagItem({ tag, onEditName, onDelete }: TagItemProps) {
  return (
    <div className="group/item border-border/10 hover:bg-muted/30 flex items-center justify-between border-b px-2 py-4 transition-all duration-200">
      <Link
        href={`/tags/${tag.name}`}
        className="flex flex-1 items-center gap-4 outline-none"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#60A5FA]/10 text-[#60A5FA] transition-transform group-hover/item:scale-110">
          <Hash size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-foreground text-[15px] leading-none font-medium">
            {tag.name}
          </span>
          <span className="text-muted-foreground/40 mt-1.5 text-[10px] font-bold tracking-[0.05em] uppercase">
            {tag._count.entries}{" "}
            {tag._count.entries === 1 ? "entry" : "entries"}
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
          <DropdownMenuContent
            align="end"
            className="bg-card border-border w-44 rounded-xl shadow-xl"
          >
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2 py-2.5"
              onClick={() => onEditName(tag)}
            >
              <Pencil size={14} className="opacity-60" />
              <span>Edit Name</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/40" />
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2 py-2.5"
              onClick={() => onDelete(tag)}
            >
              <Pencil size={14} className="rotate-12 opacity-60" />
              <span>Delete Tag</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
