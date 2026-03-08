"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home } from "lucide-react";

export default function ProtectedError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6 text-center">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground max-w-md text-sm">
        An unexpected error occurred. Please try again or go back to the
        dashboard.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline" size="sm">
          <RotateCcw size={16} className="mr-2" />
          Try Again
        </Button>
        <Button asChild size="sm">
          <Link href="/write">
            <Home size={16} className="mr-2" />
            Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
