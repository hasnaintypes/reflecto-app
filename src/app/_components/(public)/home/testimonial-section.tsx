"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "@/constants";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative px-4 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 h-28 w-28 rounded-full bg-purple-500/5 blur-xl"></div>
        <div className="absolute bottom-10 left-20 h-36 w-36 rounded-full bg-indigo-500/5 blur-xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            What our users
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {" "}
              say
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Join thousands of users who have transformed their reflection
            practice with Reflecto.
          </p>
        </div>

        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className="mb-8"
        />
      </div>
    </section>
  );
}
