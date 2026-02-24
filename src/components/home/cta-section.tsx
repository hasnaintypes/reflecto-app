"use client";
import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Mail,
  Send,
  Users,
  Zap,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CTASection() {
  const { data: session } = useSession();

  return (
    <section className="bg-[#fafafa] py-24 dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card border-border relative overflow-hidden rounded-[3rem] border p-12 md:p-24"
        >
          {/* --- Animated Floating Icons --- */}
          {/* We use absolute positioning with varied durations to create a "drifting" effect */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20 dark:opacity-40">
            <FloatingIcon
              icon={<Mail size={20} />}
              top="10%"
              left="10%"
              delay={0}
            />
            <FloatingIcon
              icon={<Zap size={20} />}
              top="15%"
              right="15%"
              delay={1}
            />
            <FloatingIcon
              icon={<FileText size={20} />}
              bottom="15%"
              left="15%"
              delay={2}
            />
            <FloatingIcon
              icon={<Users size={20} />}
              bottom="10%"
              right="10%"
              delay={3}
            />
            <FloatingIcon
              icon={<Send size={18} />}
              top="50%"
              right="5%"
              delay={1.5}
            />
            <FloatingIcon
              icon={<Sparkles size={18} />}
              bottom="40%"
              left="8%"
              delay={2.5}
            />
          </div>

          {/* --- Background Glow --- */}
          <div className="bg-primary/5 absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

          {/* --- Main Content --- */}
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-primary font-mono text-[10px] font-bold tracking-[0.4em] uppercase">
                Final_Step
              </span>
              <h2 className="text-foreground mt-6 mb-8 font-serif text-5xl leading-[1.1] italic md:text-7xl">
                Your growth, <br />
                <span className="text-muted-foreground/50">
                  perfectly tracked.
                </span>
              </h2>
              <p className="text-muted-foreground mx-auto mb-10 max-w-md text-lg">
                Join{" "}
                <span className="text-foreground font-semibold">2,847+</span>{" "}
                seekers finding clarity and intention through the Reflection
                Engine.
              </p>

              <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Link href={session ? "/write" : "/auth/sign-up"}>
                  <button className="bg-primary text-primary-foreground hover:shadow-primary/25 group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-10 py-5 text-sm font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95">
                    <span className="relative z-10">
                      {session ? "Open Your Journal" : "Start Your Journey"}
                    </span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  </button>
                </Link>
              </div>

              <p className="text-muted-foreground mt-8 text-[11px] font-medium tracking-tighter uppercase">
                No credit card required • 14-day premium trial
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper component for floating background elements
interface FloatingIconProps extends HTMLMotionProps<"div"> {
  icon: React.ReactNode;
  delay?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

function FloatingIcon({
  icon,
  delay = 0,
  top,
  left,
  right,
  bottom,
  ...props
}: FloatingIconProps) {
  return (
    <motion.div
      style={{ position: "absolute", top, left, right, bottom }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className="border-border bg-background flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm"
      {...props}
    >
      <div className="text-muted-foreground">{icon}</div>
    </motion.div>
  );
}
