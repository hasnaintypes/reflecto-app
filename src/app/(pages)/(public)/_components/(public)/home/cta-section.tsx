import { ArrowRight, FileText, Mail, Send, Users, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="bg-card border-border relative overflow-hidden rounded-3xl border p-12 md:p-16">
          {/* Decorative corner icons */}
          <div className="border-border absolute top-8 left-8 flex h-10 w-10 items-center justify-center rounded-lg border">
            <Mail className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="border-border absolute top-8 right-8 flex h-10 w-10 items-center justify-center rounded-lg border">
            <Zap className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="border-border absolute bottom-8 left-8 flex h-10 w-10 items-center justify-center rounded-lg border">
            <FileText className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="border-border absolute right-8 bottom-8 flex h-10 w-10 items-center justify-center rounded-lg border">
            <Users className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="border-border absolute top-1/2 right-16 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border">
            <Send className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="border-border absolute bottom-1/3 left-16 flex h-10 w-10 items-center justify-center rounded-lg border">
            <span className="text-muted-foreground text-lg">+</span>
          </div>

          {/* Main content */}
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-serif text-4xl leading-tight md:text-5xl">
              Your growth,
              <br />
              perfectly tracked.
            </h2>
            <p className="text-muted-foreground mb-8">
              Join 2,847 seekers finding clarity and intention every single day.
            </p>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors">
              Start Typing
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
