export default function PatternDivider() {
  return (
    <div
      className="w-full h-[34px] opacity-85"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, var(--color-terracotta) 0, var(--color-terracotta) 6px, transparent 6px, transparent 12px)",
        WebkitMaskImage:
          "radial-gradient(circle at 6px 6px, black 3.2px, transparent 3.4px)",
        WebkitMaskSize: "12px 12px",
        maskImage:
          "radial-gradient(circle at 6px 6px, black 3.2px, transparent 3.4px)",
        maskSize: "12px 12px",
      }}
    />
  );
}
