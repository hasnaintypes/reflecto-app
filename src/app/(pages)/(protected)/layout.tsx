import React from "react";
import { EditorProvider } from "@/components/journal-editor";
import { HelpButton } from "@/components/shared";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header, Sidebar, Logo } from "@/components/layout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EditorProvider>
      <TooltipProvider delayDuration={400}>
        <div className="bg-background relative h-screen overflow-hidden selection:bg-white/10">
          <div className="fixed top-0 left-12 z-[110] flex h-20 w-[72px] items-center justify-center">
            <Logo size="md" className="transition-opacity hover:opacity-80" />
          </div>

          <Sidebar />

          <div className="relative flex h-screen min-w-0 flex-col overflow-x-hidden pl-[72px]">
            <Header />

            <main className="flex-1 overflow-x-hidden overflow-y-auto px-8 pb-8 no-scrollbar">
              <div className="mx-auto max-w-5xl">{children}</div>
            </main>
          </div>

          <HelpButton />
        </div>
      </TooltipProvider>
    </EditorProvider>
  );
}
