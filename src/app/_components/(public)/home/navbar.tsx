"use client";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import React, { useState } from "react";
import { navItems } from "@/constants";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className="top-0">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <NavbarButton variant="primary" href="/auth/sign-in">
            Get Started
          </NavbarButton>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="block px-2 py-1 text-black dark:text-neutral-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <NavbarButton
              variant="primary"
              className="mt-2"
              href="/auth/sign-in"
            >
              Get Started
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
