"use client";

import {
  IconBrandTwitter,
  IconBrandGithub,
  IconMail,
} from "@tabler/icons-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-neutral-950/50 px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#030303] to-transparent"></div>
        <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-indigo-500/5 blur-xl"></div>
        <div className="absolute top-10 right-10 h-24 w-24 rounded-full bg-purple-500/5 blur-xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="logo"
                width={30}
                height={30}
                priority
                className="h-8 w-8 rounded-sm"
              />
              <span className="text-xl font-bold text-white">Reflecto</span>
            </div>
            <p className="max-w-md text-center text-sm text-white/60 md:text-left">
              Your private reflection space. Build meaningful habits through
              secure journaling.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://x.com/bynainee"
              className="text-white/40 transition-colors hover:text-white"
            >
              <IconBrandTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/hasnaintypes/reflecto-app"
              className="text-white/40 transition-colors hover:text-white"
            >
              <IconBrandGithub className="h-5 w-5" />
            </a>
            <a
              href="mailto:bugsnipper.dev@gmail.com"
              className="text-white/40 transition-colors hover:text-white"
            >
              <IconMail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
          <div className="mb-4 text-sm text-white/40 md:mb-0">
            © 2024 Reflecto. Built with privacy in mind.
          </div>
          <div className="flex items-center space-x-4 text-sm text-white/60">
            <span className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <span>All systems operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

