import { HeartHandshake, ShieldCheck, Sparkles, Users2 } from "lucide-react";
import SectionHeading from "@/components/section-heading";

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Genuine connection",
    body: "Small enough gatherings that you'll actually talk to people, not just stand near them.",
  },
  {
    icon: ShieldCheck,
    title: "A safe, welcoming space",
    body: "Every event is hosted with care — inclusive, judgment-free, and built on mutual respect.",
  },
  {
    icon: Sparkles,
    title: "Room to grow",
    body: "Wellness, career, creativity, movement — events designed to help you become more you.",
  },
  {
    icon: Users2,
    title: "Community over crowd",
    body: "We're building lasting friendships and support systems, not just a calendar of events.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-brand-ivory py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why Kindred Circle"
          title="Built around women who show up for each other"
          subtitle="We started this community because finding your people shouldn't feel this hard. Here's what we care about most."
          align="center"
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blush-100">
                <Icon className="h-6 w-6 text-brand-plum-600" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-serif-display text-lg font-semibold text-brand-plum-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
