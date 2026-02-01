import React from "react";
import { EditorProvider } from "./_components/editor-context";
import { Header } from "./_components/header";
import { HelpButton } from "./_components/help-button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "./_components/sidebar";
import Logo from "@/components/common/logo";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EditorProvider>
      <TooltipProvider delayDuration={400}>
        <div className="relative h-screen overflow-hidden bg-[#080808] selection:bg-white/10">
          {/* Static Logo Branding */}
          <div className="fixed top-0 left-12 z-[110] flex h-20 w-[72px] items-center justify-center">
            <Logo size="sm" className="transition-opacity hover:opacity-80" />
          </div>

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="relative flex h-screen flex-col overflow-hidden pl-[72px]">
            <Header />

            <main className="custom-scrollbar flex-1 overflow-y-auto px-8 pb-8">
              <div className="mx-auto max-w-5xl">{children}</div>
            </main>
          </div>

          <HelpButton />
        </div>
      </TooltipProvider>
    </EditorProvider>
  );
}
