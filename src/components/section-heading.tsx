export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-rust">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-balance font-extralight leading-[1.02] tracking-tight text-brand-ink text-4xl sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-balance text-base leading-relaxed text-brand-ink-soft">
          {subtitle}
        </p>
      )}
    </div>
  );
}
