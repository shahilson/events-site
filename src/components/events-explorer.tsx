"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import EventCard from "@/components/event-card";
import { EventCategory, EventItem } from "@/lib/types";

const CATEGORIES: (EventCategory | "All")[] = [
  "All",
  "Wellness",
  "Outdoors",
  "Professional",
  "Creative",
  "Social",
];

export default function EventsExplorer({ events }: { events: EventItem[] }) {
  const [category, setCategory] = useState<EventCategory | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return events
      .filter((event) => category === "All" || event.category === category)
      .filter((event) => {
        if (!query.trim()) return true;
        const haystack = `${event.title} ${event.tagline} ${event.locationName}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase());
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [events, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-brand-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`border-b-2 pb-1 text-sm font-bold uppercase tracking-wide transition-colors ${
                category === c
                  ? "border-brand-rust text-brand-ink"
                  : "border-transparent text-brand-ink-soft hover:text-brand-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink-soft" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events or locations"
            className="w-full border-b border-brand-line bg-transparent py-2.5 pl-6 pr-2 text-sm text-brand-ink placeholder:text-brand-ink-soft/70 focus:outline-none focus:border-brand-ink"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-brand-ink-soft">
          No events match just yet — try a different category or search term.
        </p>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
