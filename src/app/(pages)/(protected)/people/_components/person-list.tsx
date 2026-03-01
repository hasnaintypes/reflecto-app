import { PersonItem } from "./person-item";
import { Loader2 } from "lucide-react";
import { type SharedPerson } from "@/types/person.types";

interface PersonListProps {
  people: SharedPerson[] | undefined;
  isLoading: boolean;
  onEditName: (person: SharedPerson) => void;
  onDelete: (person: SharedPerson) => void;
}

export function PersonList({
  people,
  isLoading,
  onEditName,
  onDelete,
}: PersonListProps) {
  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!people || people.length === 0) {
    return (
      <div className="text-muted-foreground py-20 text-center">
        <p className="text-lg">No people found yet.</p>
        <p className="text-sm opacity-60">Try mentioning someone with @name.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {people.map((person) => (
        <PersonItem
          key={person.id}
          person={person}
          onEditName={onEditName}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
