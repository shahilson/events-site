import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import EventCard from "@/components/event-card";
import { EventItem } from "@/lib/types";
import { formatEventDate, formatEventTime } from "@/lib/format";

export default function FeaturedEvents({ events }: { events: EventItem[] }) {
  if (events.length === 0) return null;

  const [lead, ...rest] = events;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Don't miss out"
          title="Featured gatherings"
          subtitle="A few upcoming events our community is especially excited about."
        />
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink transition-colors hover:text-brand-clay"
        >
          View all events
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Link
        href={`/events/${lead.slug}`}
        className="group mt-10 grid gap-6 border-b border-brand-line pb-10 lg:grid-cols-2 lg:gap-10"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-line">
          <Image
            src={lead.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="object-cover grayscale-[15%] transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-clay">
            {lead.category}
          </p>
          <h3 className="mt-3 text-balance font-serif-display text-3xl font-semibold leading-tight text-brand-ink transition-colors group-hover:text-brand-clay sm:text-4xl">
            {lead.title}
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-brand-ink-soft">{lead.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-ink-soft">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatEventDate(lead.startDate)} &middot; {formatEventTime(lead.startDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {lead.isOnline ? "Online" : lead.locationName}
            </span>
          </div>
        </div>
      </Link>

      {rest.length > 0 && (
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
