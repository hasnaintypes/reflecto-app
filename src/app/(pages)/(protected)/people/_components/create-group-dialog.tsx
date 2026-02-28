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
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface CreateGroupDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  people: any[] | undefined;
  onConfirm: (groupName: string, personIds: string[]) => Promise<void>;
  isPending: boolean;
}

export function CreateGroupDialog({
  isOpen,
  onOpenChange,
  people,
  onConfirm,
  isPending,
}: CreateGroupDialogProps) {
  const [groupName, setGroupName] = useState("");
  const [selectedPersonIds, setSelectedPersonIds] = useState<string[]>([]);

  const handleConfirm = async () => {
    if (!groupName.trim() || selectedPersonIds.length === 0) return;
    await onConfirm(groupName, selectedPersonIds);
    setGroupName("");
    setSelectedPersonIds([]);
  };

  const togglePerson = (personId: string) => {
    setSelectedPersonIds((prev) =>
      prev.includes(personId) ? prev.filter((id) => id !== personId) : [...prev, personId],
    );
  };

  const availablePeople = people?.filter((p) => !p.group) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-border/40 bg-card sm:max-w-[440px] rounded-2xl shadow-2xl overflow-hidden p-0">
        <DialogHeader className="p-6 pt-8 pb-4">
          <DialogTitle className="font-serif text-2xl font-medium italic tracking-tight">
            Create New Group
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 px-6 pb-8">
          <div className="space-y-2">
            <Label htmlFor="create-group" className="text-muted-foreground/80 text-xs font-medium uppercase tracking-wider">
              Group Name
            </Label>
            <Input
              id="create-group"
              placeholder="e.g. Work"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="bg-muted/30 border-border/40 h-12 rounded-xl focus-visible:ring-primary/20"
              autoComplete="off"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-muted-foreground/80 text-xs font-medium uppercase tracking-wider">
              Select Ungrouped People
            </Label>
            <div className="border-border/40 bg-muted/20 max-h-52 overflow-y-auto rounded-xl border p-2 custom-scrollbar">
              {availablePeople.length > 0 ? (
                availablePeople.map((person) => (
                  <div
                    key={person.id}
                    onClick={() => togglePerson(person.id)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${
                      selectedPersonIds.includes(person.id)
                        ? "bg-[#34D399]/10 text-[#34D399]"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className={`h-4 w-4 rounded border transition-all flex items-center justify-center ${
                      selectedPersonIds.includes(person.id)
                        ? "bg-[#34D399] border-[#34D399]"
                        : "border-border"
                    }`}>
                      {selectedPersonIds.includes(person.id) && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{person.name}</span>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground/40 py-8 text-center text-xs italic">
                  No ungrouped people available.
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="bg-muted/30 border-t border-border/40 p-6 flex flex-row gap-3 sm:justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="hover:bg-muted/50 flex-1 rounded-xl sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!groupName.trim() || selectedPersonIds.length === 0 || isPending}
            className="bg-[#34D399] text-white hover:opacity-90 flex-1 rounded-xl sm:flex-none min-w-[120px]"
          >
            {isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "Create Group"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
