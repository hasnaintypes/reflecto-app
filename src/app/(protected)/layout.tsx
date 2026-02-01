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
        <div className="relative h-screen bg-[#080808] selection:bg-white/10 overflow-hidden">
          {/* Static Logo Branding */}
          <div className="fixed top-0 left-12 w-[72px] h-20 flex items-center justify-center z-[110]">
            <Logo size="sm" className="hover:opacity-80 transition-opacity" />
          </div>

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="pl-[72px] flex flex-col relative h-screen overflow-hidden">
            <Header />
            
            <main className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
              <div className="mx-auto max-w-5xl">
                {children}
              </div>
            </main>
          </div>
          
          <HelpButton />
        </div>
      </TooltipProvider>
    </EditorProvider>
  );
}
