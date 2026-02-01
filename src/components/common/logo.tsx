import Image from "next/image";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const sans = Inter({
  subsets: ["latin"],
});

interface LogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const sizeMap = {
  xs: "h-6 w-6",
  sm: "h-7 w-7",
  md: "h-10 w-10",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

const textMap = {
  xs: "text-base",
  sm: "text-lg",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-5xl",
};

export default function Logo({ className, size = "md", showText = true }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center p-0.5 overflow-hidden",
          sizeMap[size]
        )}
      >
        <Image
          src="/logo.png"
          alt="Reflecto Logo"
          width={200}
          height={200}
          className="h-full w-full rounded-full object-contain"
        />
      </div>
      {showText && (
        <span
          className={cn(
            "text-white/90 font-bold tracking-tight",
            sans.className,
            textMap[size]
          )}
        >
          reflecto
        </span>
      )}
    </div>
  );
}
