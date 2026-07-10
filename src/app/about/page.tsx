import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import ValuesSection from "@/components/values-section";
import Testimonials from "@/components/testimonials";

export const metadata: Metadata = {
  title: "Our Community — Kindred Circle",
  description: "The story and values behind Kindred Circle, a community of meetups and social events for like-minded women.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <SectionHeading
          eyebrow="Our story"
          title="A community built one honest conversation at a time"
          align="center"
        />
        <p className="mt-6 leading-relaxed text-brand-ink-soft">
          Kindred Circle started with a handful of women meeting for sunrise
          walks because the group chats and networking events we&apos;d tried
          all felt the same — crowded, performative, and strangely lonely. We
          wanted something smaller and more honest: rooms where you could show
          up tired, ambitious, uncertain, or all three, and still feel like
          you belonged.
        </p>
        <p className="mt-4 leading-relaxed text-brand-ink-soft">
          Today we host wellness mornings, hikes, founder fireside chats,
          studio nights, and everything in between — across a dozen cities and
          growing. Every event is planned by our community team with one
          question in mind: would we want to be there ourselves?
        </p>

        <Link
          href="/events"
          className="mt-8 inline-flex items-center gap-2 bg-brand-ink px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-ivory transition-colors hover:bg-brand-periwinkle"
        >
          See what&apos;s coming up
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ValuesSection />
      <Testimonials />
    </div>
  );
}
