interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-7xl",
  xl: "text-9xl",
};

export default function Logo({ className, size = "lg" }: LogoProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-[var(--radius-md)] bg-transparent ${className}`}
    >
      <span
        className={`font-sans leading-none font-bold text-[var(--color-primary)] ${sizeMap[size]}`}
        style={{ borderRadius: "var(--radius-md)" }}
      >
        r<span className="align-top">.</span>
      </span>
    </div>
  );
}
