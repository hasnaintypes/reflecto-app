"use client";

import React, { createContext, useState } from "react";
import type { Editor } from "@tiptap/react";

interface EditorContextType {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
  isCentered: boolean;
  setIsCentered: (isCentered: boolean) => void;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isCentered, setIsCentered] = useState(false);

  return (
    <EditorContext.Provider
      value={{ editor, setEditor, isCentered, setIsCentered }}
    >
      {children}
    </EditorContext.Provider>
  );
}
