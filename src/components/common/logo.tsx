export default function Logo() {
  return (
    <div className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-transparent">
      <span
        className="font-sans text-7xl leading-none font-bold text-[var(--color-primary)]"
        style={{ borderRadius: "var(--radius-md)" }}
      >
        r<span className="align-top">.</span>
      </span>
    </div>
  );
}
