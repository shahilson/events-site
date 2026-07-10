import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { EventItem } from "@/lib/types";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/format";
import { ACCENT_STYLES } from "@/lib/accent";

export default function EventCard({ event }: { event: EventItem }) {
  const styles = ACCENT_STYLES[event.accent];

  return (
    <Link href={`/events/${event.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-line">
        <Image
          src={event.imageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale-[15%] transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-4 top-4 px-3 py-1 text-xs font-medium uppercase tracking-wide ${styles.bg} ${styles.text}`}
        >
          {event.category}
        </span>
        <span className="absolute right-4 top-4 bg-brand-ink px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-ivory">
          {formatPrice(event.ticketPrice, event.ticketCurrency)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 border-b border-brand-line pb-6 pt-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-brand-ink-soft">
          <Calendar className="h-3.5 w-3.5" />
          {formatEventDate(event.startDate)} &middot; {formatEventTime(event.startDate)}
        </div>

        <h3 className="font-serif-display text-xl font-semibold leading-snug text-brand-ink transition-colors group-hover:text-brand-clay">
          {event.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-brand-ink-soft">
          {event.tagline}
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm text-brand-ink-soft">
          <MapPin className="h-4 w-4" />
          {event.isOnline ? "Online" : event.locationName}
        </div>
      </div>
    </Link>
  );
}
