import { Check } from "lucide-react";

export default function PricingSection() {
  const features = [
    "Unlimited Reflections",
    "Deep Insight Heatmaps",
    "Dream Analysis Engine",
    "Multi-device Sync",
    "Lifetime Memory Vault",
  ];

  return (
    <section id="pricing" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="text-muted-foreground font-mono text-xs tracking-wider">
            ◆ PRICING
          </span>
          <h2 className="mt-4 mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Invest in your
            <br />
            self-growth
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="rotate-[-2deg] rounded border border-amber-100 bg-[#fffef0] px-3 py-1 shadow-sm">
              <span className="font-mono text-xs">FOUNDERS_FREE</span>
            </div>
            <p className="text-muted-foreground text-sm">
              No hidden fees. 14-day free trial
            </p>
            <div className="rotate-[2deg] rounded border border-amber-100 bg-[#fffef0] px-3 py-1 shadow-sm">
              <span className="font-mono text-xs">APPROVED_BUDGET</span>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[1, 2, 3].map((tier) => (
            <div
              key={tier}
              className={`bg-card relative rounded-2xl border p-6 ${
                tier === 2 ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              {tier === 2 && (
                <div className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono text-xs">
                  ◆ MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <span className="text-muted-foreground font-mono text-xs">
                  MINDFULNESS
                </span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-serif text-4xl">$12</span>
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">
                  For individuals seeking clarity and daily intention.
                </p>
              </div>

              <div className="mb-6 space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="bg-accent flex h-4 w-4 items-center justify-center rounded-full">
                      <Check className="text-accent-foreground h-2.5 w-2.5" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full rounded-full py-3 text-sm font-medium transition-colors ${
                  tier === 2
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border hover:bg-secondary border"
                }`}
              >
                GET STARTED
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
