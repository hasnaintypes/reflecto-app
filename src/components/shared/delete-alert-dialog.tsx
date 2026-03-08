"use client";

import React from "react";
import { Loader2 } from "lucide-react";
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

interface DeleteAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isDeleting?: boolean;
}

export function DeleteAlertDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete the item.",
  isDeleting = false,
}: DeleteAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-border/40 bg-card rounded-2xl p-6 shadow-2xl sm:max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-2xl font-medium tracking-tight italic">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground pt-2 text-sm leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex flex-row gap-3 sm:justify-end">
          <AlertDialogCancel className="hover:bg-muted/50 mt-0 flex-1 rounded-xl border-none bg-transparent sm:flex-none">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            aria-disabled={isDeleting}
            className="min-w-[100px] flex-1 rounded-xl bg-red-500 bg-none text-white hover:bg-red-600 sm:flex-none"
          >
            {isDeleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
