export default function TestimonialsSection() {
  const testimonials = [
    {
      id: "ANC-0088",
      quote:
        "I used to struggle with mental clutter. Now, seeing my patterns visualized in Reflecto feels like having a dedicated therapist in my pocket. It captures my thoughts so clearly.",
      author: "Alex Chen",
      role: "SEEKER & CREATOR",
    },
    {
      id: "ANC-2301",
      quote:
        "The first journal that actually talks back. The insights are brief, meaningful, and ruthlessly honest. I'm finally building habits that stick.",
      author: "Marcus Otero",
      role: "ARCHITECT & SEEKER",
    },
    {
      id: "ANC-7725",
      quote:
        "Reflecto handles my messy morning brain before I've even had coffee. It's not just a journaling tool, it's a total lifestyle shift.",
      author: "Sarah Jenkins",
      role: "DESIGNER & MINDFUL",
    },
    {
      id: "ANC-0030",
      quote:
        "It knows when to be formal and when to use an emoji. It's like it read my mind before I even typed the prompt.",
      author: "Elena Fisher",
      role: "PRODUCT & NOTION",
    },
    {
      id: "ANC-2134",
      quote:
        "The minimalist interface is a breath of fresh air. Finally, software that respects my attention span.",
      author: "David Park",
      role: "DIRECTOR & FIGMA",
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-start justify-between">
          <div>
            <span className="text-muted-foreground font-mono text-xs tracking-wider">
              ◆ HALL OF FAME
            </span>
            <h2 className="mt-4 max-w-md text-4xl leading-tight font-bold tracking-tight md:text-5xl">
              Stories of clarity and growth
            </h2>
          </div>
          <p className="text-muted-foreground hidden max-w-xs text-sm md:block">
            Uncensored correspondence from the network.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card border-border rounded-2xl border p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground font-mono text-xs">
                  REF
                </span>
                <span className="text-primary font-mono text-xs">
                  {testimonial.id}
                </span>
                <div className="bg-secondary h-12 w-12 rounded-lg" />
              </div>
              <p className="mb-6 text-sm leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-muted-foreground font-mono text-xs">
                    {testimonial.role}
                  </p>
                </div>
                <div className="border-border flex h-4 w-4 items-center justify-center rounded border">
                  <span className="text-[8px]">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {testimonials.slice(3, 4).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border-border rounded-2xl border p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground font-mono text-xs">
                  REF
                </span>
                <span className="text-primary font-mono text-xs">
                  {testimonial.id}
                </span>
                <div className="bg-secondary h-12 w-12 rounded-lg" />
              </div>
              <p className="mb-6 text-sm leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-muted-foreground font-mono text-xs">
                    {testimonial.role}
                  </p>
                </div>
                <div className="border-border flex h-4 w-4 items-center justify-center rounded border">
                  <span className="text-[8px]">↗</span>
                </div>
              </div>
            </div>
          ))}

          {/* Join CTA */}
          <div className="bg-secondary/50 border-border flex flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center">
            <div className="border-border mb-3 flex h-8 w-8 items-center justify-center rounded-full border">
              <span className="text-lg">+</span>
            </div>
            <span className="text-muted-foreground font-mono text-sm">
              YOUR STORY HERE
            </span>
            <p className="text-muted-foreground mt-1 text-sm">
              Join the archive.
            </p>
          </div>

          {testimonials.slice(4).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border-border rounded-2xl border p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground font-mono text-xs">
                  REF
                </span>
                <span className="text-primary font-mono text-xs">
                  {testimonial.id}
                </span>
                <div className="bg-secondary h-12 w-12 rounded-lg" />
              </div>
              <p className="mb-6 text-sm leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-muted-foreground font-mono text-xs">
                    {testimonial.role}
                  </p>
                </div>
                <div className="border-border flex h-4 w-4 items-center justify-center rounded border">
                  <span className="text-[8px]">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
