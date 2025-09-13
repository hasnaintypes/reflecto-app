"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border-2 border-white/[0.15] backdrop-blur-[2px]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection({
  badge = "Private Journaling",
  title1 = "Your Thoughts,",
  title2 = "Your Space",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="top-[15%] left-[-10%] md:top-[20%] md:left-[-5%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="top-[70%] right-[-5%] md:top-[75%] md:right-[0%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="top-[10%] right-[15%] md:top-[15%] md:right-[20%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="top-[5%] left-[20%] md:top-[10%] md:left-[25%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-indigo-400/30 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-6 py-3 shadow-lg shadow-indigo-500/10 backdrop-blur-md md:mb-12"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg shadow-indigo-500/50"></div>
            <span className="text-sm font-medium tracking-wide text-white/90">
              {badge}
            </span>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7, duration: 1, ease: "easeInOut" }}
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl">
              <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 bg-clip-text text-transparent",
                  pacifico.className,
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9, duration: 1, ease: "easeInOut" }}
          >
            <p className="mx-auto mb-8 max-w-xl px-4 text-base leading-relaxed font-light tracking-wide text-white/40 sm:text-lg md:text-xl">
              Build meaningful daily habits through secure, AI-enhanced
              journaling designed for deep personal reflection.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.1, duration: 1, ease: "easeInOut" }}
          >
            <Link
              href="/auth/sign-in"
              className="cursor-pointer rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:from-indigo-600 hover:to-purple-600 hover:shadow-xl"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
    </div>
  );
}
