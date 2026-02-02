import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Main hero area */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="space-y-6">
            <div className="text-muted-foreground border-border inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs">
              <span>INTUITIVE REFLECTION ENGINE V1.0</span>
            </div>

            <h1 className="text-5xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
              Reflection that
              <br />
              whispers back.
            </h1>

            <p className="text-muted-foreground max-w-md text-lg">
              Capture your thoughts. Unlock patterns you never knew existed.
            </p>

            <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors">
              Start Typing
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right visual */}
          <div className="relative">
            {/* Interface mockup container */}
            <div className="bg-secondary/50 border-border/50 relative rounded-3xl border p-8">
              {/* Top labels */}
              <div className="text-muted-foreground mb-4 flex justify-between font-mono text-[10px]">
                <span>NO.01 — REFLECTO:MIND_INTERFACE</span>
                <span>SECURE_CONNECTION ESTABLISHED</span>
              </div>

              {/* Sticky note */}
              <div className="absolute top-20 -left-4 w-36 rotate-[-3deg] rounded border border-amber-100 bg-[#fffef0] p-3 shadow-sm">
                <p className="mb-1 font-mono text-[10px]">
                  <span className="bg-primary/10 text-primary block w-fit rounded-sm px-1.5 py-0.5 font-bold">
                    REFLECTION_ENTRY
                  </span>
                </p>
                <p className="mt-1 font-serif text-sm italic">
                  <span className="bg-primary text-primary-foreground rounded-sm px-1">
                    "Why am I feeling so restless?"
                  </span>
                </p>
              </div>

              {/* Typewriter keyboard */}
              <div className="mx-auto my-6 max-w-sm rounded-2xl bg-[#4a5d52] p-6">
                <div className="mb-2 flex justify-between px-2 font-mono text-[8px] text-white/70">
                  <span>DAILY REFLECTION ANALYSIS</span>
                  <span>SYNC_DATE</span>
                </div>
                <div className="mb-4 px-2 font-mono text-[10px] text-white/80">
                  <p>Stream of Consciousness</p>
                  <p>Subject: Clarity Seeker</p>
                </div>
                <div className="rounded-xl bg-[#3a4a42] p-3">
                  <div className="grid grid-cols-10 gap-1">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
                      (key) => (
                        <div
                          key={key}
                          className="flex h-5 w-5 items-center justify-center rounded bg-[#2a3a32] font-mono text-[8px] text-white/60"
                        >
                          {key}
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-1 grid grid-cols-10 gap-1">
                    {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(
                      (key) => (
                        <div
                          key={key}
                          className="flex h-5 w-5 items-center justify-center rounded bg-[#2a3a32] font-mono text-[8px] text-white/60"
                        >
                          {key}
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-1 grid grid-cols-9 gap-1 px-2">
                    {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map(
                      (key) => (
                        <div
                          key={key}
                          className="flex h-5 w-5 items-center justify-center rounded bg-[#2a3a32] font-mono text-[8px] text-white/60"
                        >
                          {key}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Chat bubbles */}
              <div className="absolute top-32 -right-2 space-y-2">
                <div className="bg-card border-border max-w-[180px] rounded-xl border p-3 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full">
                      <span className="text-primary text-[10px] font-bold">
                        R
                      </span>
                    </div>
                    <span className="text-xs font-medium">Internal Voice</span>
                    <span className="text-primary text-[10px] font-bold tracking-widest uppercase">
                      INSIGHT
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    You've been writing about this for 3 days.
                  </p>
                </div>

                <div className="bg-card border-border max-w-[200px] rounded-xl border p-3 shadow-sm">
                  <p className="text-muted-foreground text-xs italic">
                    "There's a pattern here. Every time you mention 'work', your
                    energy levels drop."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
