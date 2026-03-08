"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, RotateCcw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div className="bg-primary/5 absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
      <div className="bg-primary/10 absolute top-1/4 right-0 -z-10 h-[300px] w-[300px] rounded-full blur-[100px]" />

      <div className="flex flex-col items-center text-center">
        <h1 className="font-playfair mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Something went wrong
        </h1>

        <p className="text-muted-foreground mb-12 max-w-[460px] text-lg leading-relaxed">
          An unexpected error occurred. Please try again or return to the home
          page.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            onClick={reset}
            variant="outline"
            size="lg"
            className="group min-w-[160px] rounded-full border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10"
          >
            <RotateCcw
              size={18}
              className="mr-2 transition-transform group-hover:-rotate-45"
            />
            Try Again
          </Button>

          <Button
            asChild
            size="lg"
            className="group shadow-primary/20 min-w-[160px] rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <Link href="/" className="flex items-center gap-2">
              <MoveLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              Go Back Home
            </Link>
          </Button>
        </div>
      </div>

      <div className="text-muted-foreground/30 absolute bottom-8 flex gap-8 text-sm">
        <span>&copy; 2026 Reflecto App</span>
      </div>
    </div>
  );
}
