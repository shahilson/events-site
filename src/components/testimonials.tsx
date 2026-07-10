import SectionHeading from "@/components/section-heading";

const TESTIMONIALS = [
  {
    quote:
      "I moved to the city knowing no one. Three sunrise yoga sessions later I had a group chat, a hiking buddy, and standing Thursday plans.",
    name: "Aisha R.",
    context: "Member since 2024",
  },
  {
    quote:
      "The fireside chats changed how I negotiate, full stop. It's rare to find a room this honest about the hard parts of building something.",
    name: "Karina L.",
    context: "Member since 2023",
  },
  {
    quote:
      "No pressure, no small talk fatigue — just women who actually want to be there. I look forward to these events more than anything else on my calendar.",
    name: "Devon M.",
    context: "Member since 2025",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="In their words" title="What our members say" align="center" />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex h-full flex-col justify-between rounded-3xl border border-brand-blush-200/70 bg-brand-ivory p-7"
          >
            <blockquote className="font-serif-display text-lg leading-relaxed text-brand-plum-900">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-brand-ink-soft">
              <span className="font-semibold text-brand-plum-700">{t.name}</span>
              {" — "}
              {t.context}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
