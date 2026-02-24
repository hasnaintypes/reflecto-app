import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background Decorative Elements */}
      <div className="bg-primary/5 absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
      <div className="bg-primary/10 absolute top-1/4 right-0 -z-10 h-[300px] w-[300px] rounded-full blur-[100px]" />

      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="text-primary/20 absolute -top-12 left-1/2 -translate-x-1/2 text-[180px] font-bold select-none">
            404
          </div>
          <div className="bg-muted flex h-24 w-24 items-center justify-center rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">
            <Search size={40} className="text-primary animate-pulse" />
          </div>
        </div>

        <h1 className="font-playfair mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Page Not Found
        </h1>

        <p className="text-muted-foreground mb-12 max-w-[460px] text-lg leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group min-w-[160px] rounded-full border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10"
          >
            <Link href="/" className="flex items-center gap-2">
              <MoveLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              Go Back Home
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="group shadow-primary/20 min-w-[160px] rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <Link href="/write" className="flex items-center gap-2">
              <Home size={18} />
              To Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="text-muted-foreground/30 absolute bottom-8 flex gap-8 text-sm">
        <span>© 2026 Reflecto App</span>
        <Link href="/about" className="hover:text-primary transition-colors">
          Support
        </Link>
        <Link href="/about" className="hover:text-primary transition-colors">
          Privacy
        </Link>
      </div>
    </div>
  );
}
