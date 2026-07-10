import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";
import RsvpForm from "@/components/rsvp-form";
import { ACCENT_STYLES, CATEGORY_ICONS } from "@/lib/accent";
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
  const CategoryIcon = CATEGORY_ICONS[event.category];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink-soft hover:text-brand-plum-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all events
      </Link>

      <div className={`mt-6 flex h-56 items-center justify-center rounded-3xl sm:h-72 ${styles.bg}`}>
        <CategoryIcon className={`h-16 w-16 ${styles.text} opacity-70`} strokeWidth={1.1} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${styles.bg} ${styles.text}`}>
            {event.category}
          </span>

          <h1 className="mt-4 text-balance font-serif-display text-3xl font-semibold text-brand-plum-900 sm:text-4xl">
            {event.title}
          </h1>

          <p className="mt-3 text-lg leading-relaxed text-brand-ink-soft">{event.tagline}</p>

          <div className="mt-8 space-y-4 border-t border-brand-blush-200/70 pt-8">
            <h2 className="font-serif-display text-xl font-semibold text-brand-plum-900">
              About this event
            </h2>
            <p className="leading-relaxed text-brand-ink-soft">{event.description}</p>
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-brand-blush-200/70 pt-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blush-100">
              <User className="h-5 w-5 text-brand-plum-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-brand-ink-soft">Hosted by</p>
              <p className="font-medium text-brand-plum-900">{event.host}</p>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6 rounded-3xl border border-brand-blush-200/70 bg-brand-ivory p-6">
            <dl className="space-y-4 text-sm">
              <div className="flex gap-3">
                <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-brand-plum-600" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-brand-ink-soft">Date</dt>
                  <dd className="font-medium text-brand-plum-900">
                    {formatEventDateLong(event.startDate)}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-plum-600" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-brand-ink-soft">Time</dt>
                  <dd className="font-medium text-brand-plum-900">
                    {formatEventTimeRange(event.startDate, event.endDate)}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-plum-600" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-brand-ink-soft">Location</dt>
                  <dd className="font-medium text-brand-plum-900">{event.locationName}</dd>
                  {event.address && (
                    <dd className="text-brand-ink-soft">{event.address}</dd>
                  )}
                </div>
              </div>
              {typeof event.spotsLeft === "number" && (
                <div className="rounded-xl bg-brand-blush-100 px-4 py-3 text-center text-sm font-medium text-brand-plum-700">
                  {event.spotsLeft > 0
                    ? `Only ${event.spotsLeft} spots left`
                    : "Waitlist only"}
                </div>
              )}
            </dl>

            <div className="border-t border-brand-blush-200/70 pt-6">
              <h2 className="mb-4 font-serif-display text-lg font-semibold text-brand-plum-900">
                Reserve your spot
              </h2>
              <RsvpForm eventId={event.id} eventTitle={event.title} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
