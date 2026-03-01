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
import { PersonList } from "./_components/person-list";
import { GroupList } from "./_components/group-list";
import { CreateGroupDialog } from "./_components/create-group-dialog";
import { toast } from "sonner";
import { type SharedPerson } from "@/types/person.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PeoplePage() {
  const utils = api.useUtils();
  const { data: people, isLoading } = api.person.list.useQuery();

  const [renamingPerson, setRenamingPerson] = useState<SharedPerson | null>(
    null,
  );
  const [deletingPerson, setDeletingPerson] = useState<SharedPerson | null>(
    null,
  );
  const [newNameValue, setNewNameValue] = useState("");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const updateMutation = api.person.update.useMutation({
    onSuccess: () => {
      void utils.person.list.invalidate();
      setIsCreateGroupOpen(false);
    },
  });

  const handleEditName = (person: SharedPerson) => {
    setRenamingPerson(person);
    setNewNameValue(person.name ?? "");
  };

  const handleDelete = (person: SharedPerson) => {
    setDeletingPerson(person);
  };

  const handleSaveName = () => {
    if (!renamingPerson) return;
    updateMutation.mutate({
      id: renamingPerson.id,
      name: newNameValue.trim(),
    });
    setRenamingPerson(null);
  };

  const deleteMutation = api.person.delete.useMutation({
    onSuccess: () => {
      void utils.person.list.invalidate();
      setDeletingPerson(null);
      toast.success("Person deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to delete person");
    },
  });

  const confirmDelete = () => {
    if (!deletingPerson) return;
    deleteMutation.mutate({ id: deletingPerson.id });
  };

  const handleBulkCreateGroup = async (
    groupName: string,
    personIds: string[],
  ) => {
    for (const personId of personIds) {
      await updateMutation.mutateAsync({
        id: personId,
        group: groupName.trim(),
      });
    }
  };

  const { peopleByGroup, sortedGroups } = useMemo(() => {
    if (!people) return { peopleByGroup: {}, sortedGroups: [] };
    const groups = people.reduce(
      (acc, person) => {
        const group = person.group ?? "Ungrouped";
        acc[group] ??= [];
        acc[group].push(person);
        return acc;
      },
      {} as Record<string, SharedPerson[]>,
    );

    const sorted = Object.keys(groups).sort((a, b) => {
      if (a === "Ungrouped") return 1;
      if (b === "Ungrouped") return -1;
      return a.localeCompare(b);
    });

    return { peopleByGroup: groups, sortedGroups: sorted };
  }, [people]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-3xl px-6 pt-20 pb-24 duration-1000">
      {/* Header Section */}
      <header className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#34D399] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-5xl font-medium tracking-tight italic">
            People
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
        <TabsList
          className="border-border/40 mb-10 h-auto w-full justify-start gap-8 rounded-none border-b bg-transparent p-0"
          variant="line"
        >
          <TabsTrigger
            value="all"
            className="data-[state=active]:text-foreground flex items-center gap-2 rounded-none border-b-2 border-transparent px-0 py-4 transition-all data-[state=active]:border-[#34D399] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <LayoutGrid size={14} />
            <span className="text-sm font-medium">All People</span>
          </TabsTrigger>
          <TabsTrigger
            value="groups"
            className="data-[state=active]:text-foreground flex items-center gap-2 rounded-none border-b-2 border-transparent px-0 py-4 transition-all data-[state=active]:border-[#34D399] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <Layers size={14} />
            <span className="text-sm font-medium">Groups</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0 focus-visible:outline-none">
          <PersonList
            people={people}
            isLoading={isLoading}
            onEditName={handleEditName}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent
          value="groups"
          className="mt-0 space-y-8 focus-visible:outline-none"
        >
          <div className="flex justify-end">
            <Button
              onClick={() => setIsCreateGroupOpen(true)}
              variant="outline"
              className="border-border/40 hover:bg-muted/50 flex h-9 items-center gap-2 rounded-xl px-4 text-xs font-medium"
            >
              <Plus size={14} />
              <span>New Group</span>
            </Button>
          </div>

          <GroupList
            peopleByGroup={peopleByGroup}
            sortedGroups={sortedGroups}
            isLoading={isLoading}
            onEditName={handleEditName}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>

      {/* Bulk Create Group Dialog */}
      <CreateGroupDialog
        isOpen={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
        people={people}
        onConfirm={handleBulkCreateGroup}
        isPending={updateMutation.isPending}
      />

      {/* Edit Single Name Dialog */}
      <Dialog
        open={!!renamingPerson}
        onOpenChange={(open) => !open && setRenamingPerson(null)}
      >
        <DialogContent className="border-border/40 bg-card overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-[400px]">
          <DialogHeader className="p-6 pt-8 pb-4">
            <DialogTitle className="font-serif text-2xl font-medium tracking-tight italic">
              Rename{" "}
              <span className="text-[#34D399]">@{renamingPerson?.name}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 px-6 pb-8">
            <div className="space-y-2">
              <Label
                htmlFor="personName"
                className="text-muted-foreground/80 text-xs font-medium tracking-wider uppercase"
              >
                New Name
              </Label>
              <Input
                id="personName"
                placeholder="e.g. John Doe"
                value={newNameValue}
                onChange={(e) => setNewNameValue(e.target.value)}
                autoComplete="off"
                className="bg-muted/30 border-border/40 focus-visible:ring-primary/20 h-12 rounded-xl"
              />
            </div>
          </div>

          <DialogFooter className="bg-muted/30 border-border/40 flex flex-row gap-3 border-t p-6 sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => setRenamingPerson(null)}
              className="hover:bg-muted/50 flex-1 rounded-xl sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveName}
              disabled={updateMutation.isPending}
              className="min-w-[100px] flex-1 rounded-xl bg-[#86A694] !bg-none text-white hover:opacity-90 sm:flex-none"
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingPerson}
        onOpenChange={(open) => !open && setDeletingPerson(null)}
      >
        <AlertDialogContent className="border-border/40 bg-card rounded-2xl p-6 shadow-2xl sm:max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl font-medium tracking-tight italic">
              Delete Person{" "}
              <span className="text-[#86A694]">@{deletingPerson?.name}</span>?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground pt-2 text-sm leading-relaxed">
              This will remove the person from all your entries. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex flex-row gap-3 sm:justify-end">
            <AlertDialogCancel className="hover:bg-muted/50 mt-0 flex-1 rounded-xl border-none bg-transparent sm:flex-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="min-w-[100px] flex-1 rounded-xl bg-[#86A694] !bg-none text-white hover:opacity-90 sm:flex-none"
            >
              {deleteMutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
