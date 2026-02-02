export default function WorkflowSection() {
  const steps = [
    {
      number: "01",
      title: "Capture",
      description: "One messy thought. Or a voice note while you walk.",
      visual: "note",
    },
    {
      number: "02",
      title: "Reflect",
      description: "AI helps you drill deeper into why you feel this way.",
      visual: "scan",
    },
    {
      number: "03",
      title: "Synthesize",
      description: "Patterns emerge. Your subconscious becomes conscious.",
      visual: "draft",
    },
    {
      number: "04",
      title: "Grow",
      description: "Turn insights into action. One day at a time.",
      visual: "send",
    },
  ];

  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-start justify-between">
          <div>
            <span className="text-muted-foreground font-mono text-xs tracking-wider">
              ◆ WORKFLOW_AUTOMATION
            </span>
            <h2 className="mt-4 max-w-md text-4xl leading-tight font-bold tracking-tight md:text-5xl">
              Four seconds from chaos to clarity.
            </h2>
          </div>
          <p className="text-muted-foreground hidden max-w-xs text-sm md:block">
            No prompts. No editing. Just you, perfected.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="bg-card border-border h-full rounded-2xl border p-6">
                {/* Visual placeholder */}
                <div className="bg-secondary/50 relative mb-6 flex aspect-square items-center justify-center overflow-hidden rounded-xl">
                  {step.visual === "note" && (
                    <div className="rotate-[-2deg] rounded border border-amber-100 bg-[#fffef0] p-4 shadow-sm">
                      <p className="mb-2 font-mono text-[10px]">
                        <span className="bg-primary/10 text-primary block w-fit rounded-sm px-1.5 py-0.5 font-bold">
                          REFLECTION_INPUT
                        </span>
                      </p>
                      <p className="mt-1 font-serif text-sm italic">
                        <span className="bg-primary text-primary-foreground rounded-sm px-1">
                          "I need more clarity."
                        </span>
                      </p>
                    </div>
                  )}
                  {step.visual === "scan" && (
                    <div className="w-full space-y-2 px-4">
                      <div className="bg-border h-2 w-3/4 rounded" />
                      <div className="bg-border h-2 w-full rounded" />
                      <div className="bg-border h-2 w-2/3 rounded" />
                      <div className="mt-4 flex gap-1">
                        <div className="bg-accent h-3 w-3 rounded-full" />
                        <div className="bg-border h-3 flex-1 rounded" />
                      </div>
                    </div>
                  )}
                  {step.visual === "draft" && (
                    <div className="bg-card border-border w-4/5 rounded-lg border p-3 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-muted-foreground font-mono text-[10px]">
                          ANALYSIS
                        </span>
                        <span className="text-primary font-mono text-[10px]">
                          GROWTH
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="bg-border h-1.5 w-full rounded" />
                        <div className="bg-border h-1.5 w-4/5 rounded" />
                        <div className="bg-border h-1.5 w-3/4 rounded" />
                      </div>
                    </div>
                  )}
                  {step.visual === "send" && (
                    <div className="text-center">
                      <div className="bg-accent/50 inline-flex items-center gap-2 rounded-full px-4 py-2">
                        <span className="font-mono text-xs">INSIGHT</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-2 flex items-start justify-between">
                  <span className="text-muted-foreground font-mono text-xs">
                    {step.number}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-medium">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="border-border absolute top-1/2 -right-3 hidden w-6 border-t border-dashed md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
