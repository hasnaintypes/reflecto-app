"use client";

import React, { createContext, useContext, useState } from "react";
import type { Editor } from "@tiptap/react";

interface EditorContextType {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
  isCentered: boolean;
  setIsCentered: (isCentered: boolean) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isCentered, setIsCentered] = useState(false);

  return (
    <EditorContext.Provider value={{ editor, setEditor, isCentered, setIsCentered }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useSharedEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useSharedEditor must be used within an EditorProvider");
  }
  return context;
}
