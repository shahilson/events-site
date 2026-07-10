import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";

const VALUES = [
  {
    title: "Genuine connection",
    body: "Small enough gatherings that you'll actually talk to people, not just stand near them.",
    bg: "bg-brand-periwinkle",
    text: "text-brand-ivory",
  },
  {
    title: "A safe, welcoming space",
    body: "Every event is hosted with care — inclusive, judgment-free, and built on mutual respect.",
    bg: "bg-brand-butter",
    text: "text-brand-ink",
  },
  {
    title: "Room to grow",
    body: "Wellness, career, creativity, movement — events designed to help you become more you.",
    bg: "bg-brand-rust",
    text: "text-brand-ivory",
  },
  {
    title: "Community over crowd",
    body: "We're building lasting friendships and support systems, not just a calendar of events.",
    bg: "bg-brand-moss",
    text: "text-brand-ivory",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-brand-ivory py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Why Kindred Circle"
          title="Built around women who show up for each other"
          subtitle="We started this community because finding your people shouldn't feel this hard. Here's what we care about most."
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {VALUES.map(({ title, body, bg, text }) => (
            <div key={title} className={`flex flex-col justify-between p-7 ${bg} ${text} min-h-52`}>
              <div>
                <h3 className="text-2xl font-light leading-tight tracking-tight">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-90">{body}</p>
              </div>
              <ArrowRight className="mt-6 h-5 w-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
