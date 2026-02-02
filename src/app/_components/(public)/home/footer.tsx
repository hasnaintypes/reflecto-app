import { cn } from "@/lib/utils";

import { Footer, FooterBottom } from "@/components/ui/footer";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterProps {
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  copyright = "© 2025 REFLECTO. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4 py-12", className)}>
      <div className="max-w-container mx-auto">
        <Footer className="border-border/40 border-t pt-0 pb-0">
          <FooterBottom className="mt-0 border-t-0 pt-6">
            <div className="text-muted-foreground/60">{copyright}</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a
                  href="/login"
                  className="hover:text-foreground transition-colors"
                >
                  Sign in
                </a>
                <a
                  href="/signup"
                  className="hover:text-foreground transition-colors"
                >
                  Sign up
                </a>
              </div>
              <span className="text-muted-foreground/20">|</span>
              <div className="flex items-center gap-4">
                {policies.map((policy, index) => (
                  <a
                    key={index}
                    href={policy.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {policy.text}
                  </a>
                ))}
              </div>
              {showModeToggle && (
                <div className="border-border/40 ml-2 border-l pl-6">
                  <ModeToggle />
                </div>
              )}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
