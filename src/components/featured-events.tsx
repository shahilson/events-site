import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import EventCard from "@/components/event-card";
import { EventItem } from "@/lib/types";

export default function FeaturedEvents({ events }: { events: EventItem[] }) {
  if (events.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Don't miss out"
          title="Featured gatherings"
          subtitle="A few upcoming events our community is especially excited about."
        />
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-plum-700 hover:text-brand-plum-600"
        >
          View all events
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
