"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, Plus, LayoutGrid, Layers, Loader2 } from "lucide-react";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TagList } from "./_components/tag-list";
import { GroupList } from "./_components/group-list";
import { CreateGroupDialog } from "./_components/create-group-dialog";

export default function TagsPage() {
  const utils = api.useUtils();
  const { data: tags, isLoading } = api.tag.list.useQuery();

  const [editingTag, setEditingTag] = useState<any | null>(null);
  const [newGroupValue, setNewGroupValue] = useState("");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const updateMutation = api.tag.update.useMutation({
    onSuccess: () => {
      utils.tag.list.invalidate();
      setEditingTag(null);
      setIsCreateGroupOpen(false);
    },
  });

  const handleEditGroup = (tag: any) => {
    setEditingTag(tag);
    setNewGroupValue(tag.group || "");
  };

  const handleSaveGroup = () => {
    if (!editingTag) return;
    updateMutation.mutate({
      id: editingTag.id,
      group: newGroupValue.trim() || null,
    });
  };

  const handleBulkCreateGroup = async (groupName: string, tagIds: string[]) => {
    for (const tagId of tagIds) {
      await updateMutation.mutateAsync({
        id: tagId,
        group: groupName.trim(),
      });
    }
  };

  const { tagsByGroup, sortedGroups } = useMemo(() => {
    if (!tags) return { tagsByGroup: {}, sortedGroups: [] };
    const groups = tags.reduce(
      (acc, tag) => {
        const group = tag.group || "Ungrouped";
        if (!acc[group]) acc[group] = [];
        acc[group].push(tag);
        return acc;
      },
      {} as Record<string, any[]>,
    );

    const sorted = Object.keys(groups).sort((a, b) => {
      if (a === "Ungrouped") return 1;
      if (b === "Ungrouped") return -1;
      return a.localeCompare(b);
    });

    return { tagsByGroup: groups, sortedGroups: sorted };
  }, [tags]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-3xl px-6 pt-20 pb-24 duration-1000">
      {/* Header Section */}
      <header className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#60A5FA] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-5xl font-medium tracking-tight italic">
            Tags
          </h1>
        </div>

        <div className="text-muted-foreground/40 mb-2 flex items-center gap-4">
          <ArrowUpDown
            size={18}
            className="hover:text-foreground cursor-pointer transition-colors"
          />
        </div>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-10 border-b border-border/40 w-full justify-start rounded-none h-auto p-0 bg-transparent gap-8" variant="line">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:border-primary border-b-2 border-transparent px-0 py-4 flex items-center gap-2 rounded-none transition-all"
          >
            <LayoutGrid size={14} />
            <span className="text-sm font-medium">All Tags</span>
          </TabsTrigger>
          <TabsTrigger
            value="groups"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:border-primary border-b-2 border-transparent px-0 py-4 flex items-center gap-2 rounded-none transition-all"
          >
            <Layers size={14} />
            <span className="text-sm font-medium">Groups</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0 focus-visible:outline-none">
          <TagList
            tags={tags}
            isLoading={isLoading}
            onEditGroup={handleEditGroup}
          />
        </TabsContent>

        <TabsContent value="groups" className="mt-0 focus-visible:outline-none space-y-8">
          <div className="flex justify-end">
            <Button
              onClick={() => setIsCreateGroupOpen(true)}
              variant="outline"
              className="border-border/40 hover:bg-muted/50 rounded-xl px-4 flex items-center gap-2 h-9 text-xs font-medium"
            >
              <Plus size={14} />
              <span>New Group</span>
            </Button>
          </div>

          <GroupList
            tagsByGroup={tagsByGroup}
            sortedGroups={sortedGroups}
            isLoading={isLoading}
            onEditGroup={handleEditGroup}
          />
        </TabsContent>
      </Tabs>

      {/* Bulk Create Group Dialog */}
      <CreateGroupDialog
        isOpen={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
        tags={tags}
        onConfirm={handleBulkCreateGroup}
        isPending={updateMutation.isPending}
      />

      {/* Edit Single Group Dialog */}
      <Dialog
        open={!!editingTag}
        onOpenChange={(open) => !open && setEditingTag(null)}
      >
        <DialogContent className="border-border/40 bg-card rounded-2xl shadow-2xl sm:max-w-[400px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pt-8 pb-4">
            <DialogTitle className="font-serif text-2xl font-medium tracking-tight italic">
              Group <span className="text-[#60A5FA]">#{editingTag?.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="px-6 pb-8 space-y-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Organize your tags into custom groups. Leave blank to keep ungrouped.
            </p>
            <div className="space-y-2">
              <Label htmlFor="group" className="text-muted-foreground/80 text-xs font-medium uppercase tracking-wider">
                Group Name
              </Label>
              <Input
                id="group"
                placeholder="e.g. Health"
                value={newGroupValue}
                onChange={(e) => setNewGroupValue(e.target.value)}
                autoComplete="off"
                className="bg-muted/30 border-border/40 h-12 rounded-xl focus-visible:ring-primary/20"
              />
            </div>
          </div>

          <DialogFooter className="bg-muted/30 border-t border-border/40 p-6 flex flex-row gap-3 sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => setEditingTag(null)}
              className="hover:bg-muted/50 flex-1 rounded-xl sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveGroup}
              disabled={updateMutation.isPending}
              className="bg-[#60A5FA] text-white hover:opacity-90 flex-1 rounded-xl sm:flex-none min-w-[100px]"
            >
              {updateMutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
