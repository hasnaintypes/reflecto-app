import { Check, Lock, Mail, Zap } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-start justify-between">
          <div>
            <span className="text-muted-foreground font-mono text-xs tracking-wider">
              ◆ SYSTEM_MODULES
            </span>
            <h2 className="mt-4 max-w-lg text-4xl leading-tight font-bold tracking-tight md:text-5xl">
              Why seekers choose Reflecto
            </h2>
          </div>
          <p className="text-muted-foreground hidden max-w-xs text-sm md:block">
            The mindfulness of a 19th-century journal meets the infinite
            insights of 2025.
          </p>
        </div>

        {/* Top row features */}
        <div className="mb-6 grid gap-6 md:grid-cols-3">
          {/* Tone Control */}
          <div className="bg-card border-border rounded-2xl border p-6">
            <div className="mb-6 flex items-start justify-between">
              <span className="text-muted-foreground font-mono text-xs">
                FIELD
              </span>
              <span className="text-muted-foreground font-mono text-xs">
                PATTERN_ANALYSIS
              </span>
            </div>
            <div className="bg-secondary/50 mb-6 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="bg-card border-border flex items-center gap-2 rounded-full border px-3 py-1">
                  <div className="bg-primary h-4 w-4 rounded-full" />
                  <div className="border-border h-4 w-4 rounded-full border-2" />
                </div>
                <div className="bg-border h-1 flex-1 rounded-full">
                  <div className="bg-primary h-full w-2/3 rounded-full" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">
                  INSIGHTS
                </span>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Deep Insights</h3>
            <p className="text-muted-foreground text-sm">
              Automatic heatmaps and sentiment tracking uncover the rhythms of
              your life.
            </p>
          </div>

          {/* Works Everywhere */}
          <div className="bg-card border-border rounded-2xl border p-6">
            <div className="mb-6 flex items-start justify-between">
              <span className="text-muted-foreground font-mono text-xs">
                FIELD
              </span>
              <span className="text-muted-foreground font-mono text-xs">
                CHANNEL_INPUT
              </span>
            </div>
            <div className="bg-secondary/50 mb-6 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-2">
                {["Gmail", "Outlook", "Slack", "Teams", "Discord", "More"].map(
                  (app, i) => (
                    <div
                      key={app}
                      className={`rounded-lg p-2 text-center ${i < 5 ? "bg-card border-border border" : "border-border border border-dashed"}`}
                    >
                      <div className="bg-secondary mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded">
                        <Mail className="text-muted-foreground h-3 w-3" />
                      </div>
                      <span className="text-muted-foreground font-mono text-[10px]">
                        {app}
                      </span>
                    </div>
                  ),
                )}
              </div>
              <div className="mt-2 flex justify-end">
                <span className="text-accent-foreground bg-accent rounded px-2 py-0.5 font-mono text-[10px]">
                  + MORE
                </span>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Multi-Modal Capture</h3>
            <p className="text-muted-foreground text-sm">
              Whether it's a 3am dream or a midday highlight, record it in
              seconds.
            </p>
          </div>

          {/* Private By Design */}
          <div className="bg-card border-border rounded-2xl border p-6">
            <div className="mb-6 flex items-start justify-between">
              <span className="text-muted-foreground font-mono text-xs">
                FIELD
              </span>
              <span className="text-muted-foreground font-mono text-xs">
                SECURITY_GRADE
              </span>
            </div>
            <div className="bg-secondary/50 mb-6 flex items-center justify-center rounded-xl p-4">
              <div className="relative">
                <div className="border-accent flex h-16 w-16 items-center justify-center rounded-full border-4">
                  <Lock className="text-foreground h-6 w-6" />
                </div>
                <div className="bg-primary absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full">
                  <Check className="text-primary-foreground h-3 w-3" />
                </div>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Personal Sanctuary</h3>
            <p className="text-muted-foreground text-sm">
              Enterprise-grade privacy. Your inner thoughts never train our
              models.
            </p>
          </div>
        </div>

        {/* Bottom row features */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Saves Time */}
          <div className="bg-card border-border rounded-2xl border p-6">
            <div className="flex gap-6">
              <div className="bg-secondary/50 flex-shrink-0 rounded-xl p-4">
                <div className="border-accent relative flex h-20 w-20 items-center justify-center rounded-full border-4">
                  <Zap className="text-foreground h-8 w-8" />
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-muted-foreground font-mono text-xs">
                    METRIC
                  </span>
                </div>
                <h3 className="mb-1 text-2xl font-semibold">
                  Builds 100% Awareness
                </h3>
                <p className="text-muted-foreground text-sm">
                  Transform vague feelings into actionable clarity. Reflect
                  handled the synthesis, so you can focus on growth.
                </p>
              </div>
            </div>
          </div>

          {/* Volume */}
          <div className="bg-card border-border rounded-2xl border p-6">
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-muted-foreground font-mono text-xs">
                    OUTPUT
                  </span>
                </div>
                <h3 className="mb-1 text-2xl font-semibold">
                  500+ Dreams Recorded
                </h3>
                <p className="text-muted-foreground text-sm">
                  Your subconscious holds the key. Track recurring themes and
                  hidden desires across months of entries.
                </p>
              </div>
              <div className="bg-secondary/50 flex-shrink-0 rounded-xl p-4">
                <div className="flex gap-1">
                  {["5", "0", "0", "+"].map((num, i) => (
                    <div
                      key={i}
                      className="bg-card border-border flex h-10 w-8 items-center justify-center rounded border"
                    >
                      <span className="font-mono text-lg">{num}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
