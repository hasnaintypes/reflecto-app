import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/40 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="border-primary flex h-6 w-6 items-center justify-center rounded-sm border-2">
            <span className="text-primary font-mono text-xs font-bold">R</span>
          </div>
          <span className="font-serif text-lg tracking-tight">Reflecto</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#manifesto"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Manifesto
          </Link>
        </nav>

        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 py-2 text-sm font-medium transition-colors">
          Get Started
        </button>
      </div>
    </header>
  );
}
