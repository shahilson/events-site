import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";
import BuyTicketsForm from "@/components/buy-tickets-form";
import { ACCENT_STYLES } from "@/lib/accent";
import { formatEventDateLong, formatEventTimeRange } from "@/lib/format";
import { getAllEvents, getEventBySlug } from "@/lib/wix/events";

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event Not Found — Kindred Circle" };
  return {
    title: `${event.title} — Kindred Circle`,
    description: event.tagline,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const styles = ACCENT_STYLES[event.accent];

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden bg-brand-line sm:h-96">
        <Image
          src={event.imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent" />
        <Link
          href="/events"
          className="absolute left-6 top-6 inline-flex items-center gap-1.5 bg-brand-ivory/90 px-3 py-1.5 text-sm font-medium text-brand-ink sm:left-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all events
        </Link>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide ${styles.bg} ${styles.text}`}>
              {event.category}
            </span>

            <h1 className="mt-4 text-balance font-extralight leading-[1.02] tracking-tight text-brand-ink text-4xl sm:text-5xl">
              {event.title}
            </h1>

            <p className="mt-3 text-lg leading-relaxed text-brand-ink-soft">{event.tagline}</p>

            <div className="mt-8 space-y-4 border-t border-brand-line pt-8">
              <h2 className="text-xl font-semibold text-brand-ink">
                About this event
              </h2>
              <p className="leading-relaxed text-brand-ink-soft">{event.description}</p>
            </div>

            <div className="mt-8 flex items-center gap-3 border-t border-brand-line pt-8">
              <div className="flex h-11 w-11 items-center justify-center border border-brand-line">
                <User className="h-5 w-5 text-brand-ink" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-brand-ink-soft">Hosted by</p>
                <p className="font-medium text-brand-ink">{event.host}</p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 border border-brand-line bg-brand-ivory p-6">
              <dl className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink" />
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-brand-ink-soft">Date</dt>
                    <dd className="font-medium text-brand-ink">
                      {formatEventDateLong(event.startDate)}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink" />
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-brand-ink-soft">Time</dt>
                    <dd className="font-medium text-brand-ink">
                      {formatEventTimeRange(event.startDate, event.endDate)}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink" />
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-brand-ink-soft">Location</dt>
                    <dd className="font-medium text-brand-ink">{event.locationName}</dd>
                    {event.address && (
                      <dd className="text-brand-ink-soft">{event.address}</dd>
                    )}
                  </div>
                </div>
              </dl>

              <div className="border-t border-brand-line pt-6">
                <h2 className="mb-4 text-lg font-semibold text-brand-ink">
                  Get your ticket
                </h2>
                <BuyTicketsForm
                  eventId={event.id}
                  eventTitle={event.title}
                  ticketDefinitionId={event.ticketDefinitionId}
                  eventPageUrl={event.eventPageUrl}
                  ticketPrice={event.ticketPrice}
                  ticketCurrency={event.ticketCurrency}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
