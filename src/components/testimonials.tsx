import Image from "next/image";
import SectionHeading from "@/components/section-heading";
import { placeholderImage } from "@/lib/images";

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
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <SectionHeading eyebrow="In their words" title="What our members say" />

      <div className="mt-12 grid gap-10 border-t border-brand-line pt-10 md:grid-cols-3 md:gap-8">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="flex h-full flex-col">
            <blockquote className="text-xl font-light leading-relaxed tracking-tight text-brand-ink">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden bg-brand-line">
                <Image
                  src={placeholderImage(t.name, 80, 80)}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover grayscale-[15%]"
                />
              </div>
              <p className="text-sm text-brand-ink-soft">
                <span className="font-semibold text-brand-ink">{t.name}</span>
                {" — "}
                {t.context}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
