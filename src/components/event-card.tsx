import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { EventItem } from "@/lib/types";
import { formatEventDate, formatEventTime } from "@/lib/format";
import { ACCENT_STYLES, CATEGORY_ICONS } from "@/lib/accent";

export default function EventCard({ event }: { event: EventItem }) {
  const styles = ACCENT_STYLES[event.accent];
  const CategoryIcon = CATEGORY_ICONS[event.category];
  const almostFull = typeof event.spotsLeft === "number" && event.spotsLeft <= 5;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-brand-blush-200/70 bg-brand-ivory shadow-sm shadow-brand-plum-900/5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-plum-900/10"
    >
      <div
        className={`relative flex h-40 items-center justify-center ${styles.bg}`}
      >
        <CategoryIcon
          className={`h-10 w-10 ${styles.text} opacity-70`}
          strokeWidth={1.25}
        />
        <span
          className={`absolute left-4 top-4 rounded-full bg-brand-ivory/90 px-3 py-1 text-xs font-medium ${styles.text}`}
        >
          {event.category}
        </span>
        {almostFull && (
          <span className="absolute right-4 top-4 rounded-full bg-brand-plum-700 px-3 py-1 text-xs font-medium text-brand-ivory">
            Almost full
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-brand-ink-soft">
          <Calendar className="h-3.5 w-3.5" />
          {formatEventDate(event.startDate)} &middot; {formatEventTime(event.startDate)}
        </div>

        <h3 className="font-serif-display text-xl font-semibold leading-snug text-brand-plum-900 transition-colors group-hover:text-brand-plum-600">
          {event.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-brand-ink-soft">
          {event.tagline}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2 text-sm text-brand-ink-soft">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {event.isOnline ? "Online" : event.locationName}
          </span>
          {typeof event.spotsLeft === "number" && (
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {event.spotsLeft} left
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
