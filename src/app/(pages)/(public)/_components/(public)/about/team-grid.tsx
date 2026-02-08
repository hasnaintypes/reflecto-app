"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TeamGrid() {
  const members = [
    {
      name: "Elara Vance",
      role: "Founder / Logic Architecture",
      bio: "Former AI researcher obsessed with the intersection of mindfulness and metadata.",
      image: "/images/avatars/avatar-1.png",
      id: "HUMAN_001",
    },
    {
      name: "Julian Thorne",
      role: "Lead Engineer / Iron Vault",
      bio: "Privacy extremist and cryptography expert. Believes code is the only law.",
      image: "/images/avatars/avatar-2.png",
      id: "HUMAN_002",
    },
    {
      name: "Suki Chen",
      role: "Product Vision / Spirit",
      bio: "Minimalist designer focused on reducing the cognitive load of reflection.",
      image: "/images/avatars/avatar-3.png",
      id: "HUMAN_003",
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="border-primary/20 mb-20 flex flex-col items-start gap-4 border-l-2 pl-8">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-xs font-bold tracking-[0.4em] uppercase"
          >
            {"// Human_Logic"}
          </motion.span>
          <h2 className="text-foreground max-w-2xl font-serif text-4xl leading-tight italic md:text-6xl">
            The architects of <br />
            <span className="text-muted-foreground/40">conscious code.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-default"
            >
              <div className="border-border/50 bg-secondary/20 group-hover:border-primary/30 group-hover:shadow-primary/5 relative mb-6 h-[350px] overflow-hidden rounded-3xl border transition-all group-hover:shadow-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="bg-background/80 border-border/40 absolute top-4 right-4 rounded border px-2 py-1 font-mono text-[9px] font-bold tracking-widest uppercase backdrop-blur-sm">
                  {member.id}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-foreground text-xl font-bold">
                    {member.name}
                  </h3>
                  <div className="bg-primary/20 h-px flex-1" />
                </div>
                <p className="text-primary font-mono text-[10px] font-bold tracking-widest uppercase">
                  {member.role}
                </p>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
