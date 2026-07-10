import SectionHeading from "@/components/section-heading";

const VALUES = [
  {
    number: "01",
    title: "Genuine connection",
    body: "Small enough gatherings that you'll actually talk to people, not just stand near them.",
  },
  {
    number: "02",
    title: "A safe, welcoming space",
    body: "Every event is hosted with care — inclusive, judgment-free, and built on mutual respect.",
  },
  {
    number: "03",
    title: "Room to grow",
    body: "Wellness, career, creativity, movement — events designed to help you become more you.",
  },
  {
    number: "04",
    title: "Community over crowd",
    body: "We're building lasting friendships and support systems, not just a calendar of events.",
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

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ number, title, body }) => (
            <div key={title} className="border-t border-brand-line pt-5">
              <span className="font-serif-display text-sm text-brand-clay">{number}</span>
              <h3 className="mt-3 font-serif-display text-lg font-semibold text-brand-ink">
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
