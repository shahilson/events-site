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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-rose-500">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-balance font-serif-display text-3xl font-semibold text-brand-plum-900 sm:text-4xl">
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
