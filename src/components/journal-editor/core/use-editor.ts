"use client";

import { useContext } from "react";
import { EditorContext } from "./editor-provider";

export function useSharedEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useSharedEditor must be used within an EditorProvider");
  }
  return context;
}
